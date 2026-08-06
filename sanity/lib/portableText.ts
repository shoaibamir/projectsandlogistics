import { randomUUID } from "node:crypto";

export function paragraphsToBlocks(text: string) {
  return text
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => ({
      _type: "block",
      _key: randomUUID(),
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: randomUUID(),
          text: paragraph,
          marks: [],
        },
      ],
    }));
}
