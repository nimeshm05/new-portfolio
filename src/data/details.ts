export type DetailKind = "project" | "about" | "writing";

export type MediaTone = "blue" | "lime";

export type DetailItem = {
  id: string;
  title: string;
  kind: DetailKind;
  /** Path under /public for details media video */
  previewVideo?: string;
  /** Optional color grade for details media */
  mediaTone?: MediaTone;
};
