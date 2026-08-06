import "server-only";
import { randomUUID, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import Parser from "rss-parser";
import { writeClient } from "@/sanity/lib/write-client";
import { paragraphsToBlocks } from "@/sanity/lib/portableText";
import { uniqueSlug } from "@/lib/slug";

const MAX_ITEMS_PER_FEED = 5;

type FeedSource = {
  _id: string;
  name: string;
  feedUrl: string;
  defaultCategory?: { _type: "reference"; _ref: string };
};

type SummaryResult = {
  summary: string;
  keyTakeaways: string[];
  body: string;
};

function isAuthorized(request: Request): boolean {
  const secret = process.env.FEED_INGEST_SECRET;
  if (!secret) return false;

  const provided = request.headers.get("x-ingest-secret") ?? "";
  const providedBuf = Buffer.from(provided);
  const secretBuf = Buffer.from(secret);
  if (providedBuf.length !== secretBuf.length) return false;
  return timingSafeEqual(providedBuf, secretBuf);
}

async function summarizeWithLLM(item: {
  title: string;
  link: string;
  snippet: string;
  sourceName: string;
}): Promise<SummaryResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("Missing environment variable: ANTHROPIC_API_KEY");
  }

  const model = process.env.ANTHROPIC_SUMMARY_MODEL || "claude-sonnet-5";

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      system:
        "You write short, original freight/logistics news commentary for a directory site. " +
        "You are given the title and snippet of a news item from an external source. " +
        "Never copy sentences verbatim from the source material — write your own original " +
        "wording based only on the facts described. Keep claims conservative and only state " +
        "what's clearly implied by the title and snippet provided.",
      messages: [
        {
          role: "user",
          content:
            `Source: ${item.sourceName}\n` +
            `Title: ${item.title}\n` +
            `Snippet: ${item.snippet}\n\n` +
            "Produce an original news summary based on this.",
        },
      ],
      tools: [
        {
          name: "publish_summary",
          description: "Publish an original news summary derived from the source item.",
          input_schema: {
            type: "object",
            properties: {
              summary: {
                type: "string",
                description: "A 1-2 sentence direct-answer summary of the news item.",
              },
              keyTakeaways: {
                type: "array",
                items: { type: "string" },
                description: "2-4 short bullet points with the key facts.",
              },
              body: {
                type: "string",
                description:
                  "2-4 short original paragraphs of commentary/context, separated by blank lines.",
              },
            },
            required: ["summary", "keyTakeaways", "body"],
          },
        },
      ],
      tool_choice: { type: "tool", name: "publish_summary" },
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic API error: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  const toolUse = data.content?.find((block: { type: string }) => block.type === "tool_use");
  if (!toolUse) {
    throw new Error("Anthropic API did not return a tool_use block");
  }
  return toolUse.input as SummaryResult;
}

async function alreadyIngested(sourceUrl: string): Promise<boolean> {
  const existing = await writeClient.fetch(
    `*[_type == "article" && sourceUrl == $url][0]._id`,
    { url: sourceUrl },
    { perspective: "raw" },
  );
  return Boolean(existing);
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const feedSources: FeedSource[] = await writeClient.fetch(
    `*[_type == "feedSource" && active == true]{ _id, name, feedUrl, defaultCategory }`,
  );

  const parser = new Parser();
  const results: Array<{ feed: string; created: string[]; skipped: number; errors: string[] }> = [];

  for (const source of feedSources) {
    const created: string[] = [];
    const errors: string[] = [];
    let skipped = 0;

    try {
      const feed = await parser.parseURL(source.feedUrl);
      const items = (feed.items ?? []).slice(0, MAX_ITEMS_PER_FEED);

      for (const item of items) {
        const link = item.link;
        if (!link || !item.title) {
          skipped += 1;
          continue;
        }

        if (await alreadyIngested(link)) {
          skipped += 1;
          continue;
        }

        try {
          const snippet = item.contentSnippet || item.content || item.summary || "";
          const generated = await summarizeWithLLM({
            title: item.title,
            link,
            snippet,
            sourceName: source.name,
          });

          const slug = uniqueSlug(item.title);
          const docId = `drafts.feed-${randomUUID()}`;

          await writeClient.create({
            _id: docId,
            _type: "article",
            title: item.title,
            slug: { _type: "slug", current: slug },
            contentType: "news",
            summary: generated.summary,
            keyTakeaways: generated.keyTakeaways,
            body: paragraphsToBlocks(generated.body),
            categories: source.defaultCategory ? [source.defaultCategory] : undefined,
            publishedAt: item.isoDate || new Date().toISOString(),
            isSyndicated: true,
            sourceName: source.name,
            sourceUrl: link,
          });

          created.push(docId);
        } catch (error) {
          errors.push(`${link}: ${error instanceof Error ? error.message : String(error)}`);
        }
      }

      await writeClient
        .patch(source._id)
        .set({ lastFetchedAt: new Date().toISOString() })
        .commit();
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error));
    }

    results.push({ feed: source.name, created, skipped, errors });
  }

  return NextResponse.json({ results });
}
