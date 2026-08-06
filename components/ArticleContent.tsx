import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import type { ArticleDetail } from "@/sanity/lib/queries";

const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-slate-700">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-8 text-xl font-bold text-slate-900">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-6 text-lg font-semibold text-slate-900">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-4 text-base font-semibold text-slate-900">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-200 pl-4 italic text-slate-600">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        className="font-medium text-blue-600 hover:text-blue-700"
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => (
      <Image
        src={urlFor(value).width(1200).height(675).fit("crop").url()}
        alt={value?.alt || ""}
        width={1200}
        height={675}
        className="rounded-lg"
      />
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-1 pl-5 text-slate-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-1 pl-5 text-slate-700">{children}</ol>
    ),
  },
};

export default function ArticleContent({ article }: { article: ArticleDetail }) {
  return (
    <>
      <p className="mt-6 rounded-lg border border-blue-100 bg-blue-50 px-4 py-4 text-base font-medium text-slate-900">
        {article.summary}
      </p>

      {article.keyTakeaways && article.keyTakeaways.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-slate-900">Key takeaways</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
            {article.keyTakeaways.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8 space-y-4">
        <PortableText value={article.body} components={portableTextComponents} />
      </div>

      {article.isSyndicated && article.sourceName && (
        <p className="mt-6 text-sm text-slate-500">
          Based on reporting from{" "}
          {article.sourceUrl ? (
            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              {article.sourceName}
            </a>
          ) : (
            article.sourceName
          )}
          .
        </p>
      )}

      {article.faqs && article.faqs.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold text-slate-900">
            Frequently asked questions
          </h2>
          <div className="mt-4 divide-y divide-slate-200 border-t border-slate-200">
            {article.faqs.map((faq) => (
              <details key={faq.question} className="py-4">
                <summary className="cursor-pointer list-none font-medium text-slate-900">
                  {faq.question}
                </summary>
                <p className="mt-2 text-slate-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
