import type { StructureResolver } from "sanity/structure";

function articleList(S: Parameters<StructureResolver>[0], title: string, contentType: string) {
  return S.listItem()
    .title(title)
    .child(
      S.documentList()
        .title(title)
        .filter('_type == "article" && contentType == $contentType')
        .params({ contentType })
        .defaultOrdering([{ field: "publishedAt", direction: "desc" }]),
    );
}

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      articleList(S, "News", "news"),
      articleList(S, "Blog", "blog"),
      articleList(S, "Guides", "guide"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== "article",
      ),
    ]);
