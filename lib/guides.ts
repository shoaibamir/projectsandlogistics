export type Guide = {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
};

export const GUIDES: Guide[] = [
  {
    slug: "what-is-an-nvocc",
    title: "What is an NVOCC?",
    description:
      "A plain-language explanation of non-vessel operating common carriers and what they do.",
    datePublished: "2026-07-31",
  },
  {
    slug: "ocean-freight-forwarder-vs-nvocc",
    title: "Ocean freight forwarder vs. NVOCC: what's the difference?",
    description: "How these two types of ocean transportation intermediary compare.",
    datePublished: "2026-07-31",
  },
  {
    slug: "freight-forwarder-licensing-in-the-us",
    title: "How freight forwarder licensing works in the US",
    description: "An overview of FMC licensing for ocean transportation intermediaries.",
    datePublished: "2026-07-31",
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}
