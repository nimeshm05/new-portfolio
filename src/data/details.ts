export type DetailKind = "project" | "about" | "writing";

export type MediaTone = "blue" | "lime";

export type ProjectMeta = {
  company?: string;
  timeline?: string;
  type?: string;
  client?: string;
  role?: string;
};

export type DetailItem = {
  id: string;
  title: string;
  kind: DetailKind;
  /** Path under /public for details media video */
  previewVideo?: string;
  /** Optional color grade for details media */
  mediaTone?: MediaTone;
  /** Project metadata shown in preview + details */
  meta?: ProjectMeta;
  description?: string;
  tagline?: string;
};
