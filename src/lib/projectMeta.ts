import type { ProjectMeta } from "@/data/details";

export type MetaField = {
  label: string;
  value: string;
};

const PREVIEW_META_ORDER: (keyof ProjectMeta)[] = [
  "company",
  "timeline",
  "type",
  "client",
  "role",
];

const DETAILS_META_ORDER: (keyof ProjectMeta)[] = [
  "company",
  "timeline",
  "client",
  "role",
];

const META_LABELS: Record<keyof ProjectMeta, string> = {
  company: "Company",
  timeline: "Timeline",
  type: "Type",
  client: "Client",
  role: "Role",
};

function toFields(
  meta: ProjectMeta | undefined,
  order: (keyof ProjectMeta)[],
): MetaField[] {
  if (!meta) return [];

  return order
    .map((key) => {
      const value = meta[key]?.trim();
      if (!value) return null;
      return { label: META_LABELS[key], value };
    })
    .filter((field): field is MetaField => field != null);
}

export function getPreviewMetaFields(meta?: ProjectMeta): MetaField[] {
  return toFields(meta, PREVIEW_META_ORDER);
}

export function getDetailsMetaFields(meta?: ProjectMeta): MetaField[] {
  return toFields(meta, DETAILS_META_ORDER);
}
