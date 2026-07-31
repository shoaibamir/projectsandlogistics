/**
 * Props for a <script type="application/ld+json"> tag. Escapes "<" so a
 * value containing "</script>" can't break out of the script element.
 */
export function jsonLdScriptProps(data: unknown) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    },
  } as const;
}
