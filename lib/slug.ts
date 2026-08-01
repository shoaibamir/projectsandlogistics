export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function uniqueSlug(name: string): string {
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${slugify(name)}-${suffix}`;
}
