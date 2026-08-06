import { SITE_URL } from "@/lib/site";
import type { ArticleDetail, ContentType } from "./queries";

const SECTION_PATH: Record<ContentType, string> = {
  news: "news",
  blog: "blog",
  guide: "guides",
};

const SECTION_LABEL: Record<ContentType, string> = {
  news: "News",
  blog: "Blog",
  guide: "Guides",
};

export function buildArticleJsonLd(article: ArticleDetail) {
  const sectionPath = SECTION_PATH[article.contentType];
  const url = `${SITE_URL}/${sectionPath}/${article.slug}`;

  const articleSchema: Record<string, unknown> = {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.summary,
    datePublished: article.publishedAt,
    dateModified: article._updatedAt,
    url,
    publisher: {
      "@type": "Organization",
      name: "Projects & Logistics Directory",
      url: SITE_URL,
    },
  };

  if (article.plainBody) {
    articleSchema.articleBody = article.plainBody;
  }

  if (article.author) {
    articleSchema.author = {
      "@type": "Person",
      name: article.author.name,
      ...(article.author.role ? { jobTitle: article.author.role } : {}),
      ...(article.author.sameAs?.length ? { sameAs: article.author.sameAs } : {}),
    };
  }

  const graph: unknown[] = [articleSchema];

  if (article.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: article.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  }

  graph.push({
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: SECTION_LABEL[article.contentType],
        item: `${SITE_URL}/${sectionPath}`,
      },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  });

  return { "@context": "https://schema.org", "@graph": graph };
}
