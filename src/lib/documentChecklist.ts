/**
 * Document checklist helpers.
 *
 * Stored format (countries.document_checklist JSON):
 *   { categories: [{ title: "Undergraduate", items: ["Passport", ...] }, ...] }
 *
 * Legacy format (still supported when reading):
 *   { undergraduate: string[]; postgraduate: string[] }
 */

export type DocumentCategory = { title: string; items: string[] };

export type DocumentChecklistData = { categories: DocumentCategory[] };

const LEGACY_TITLES: Record<string, string> = {
  undergraduate: "Undergraduate",
  postgraduate: "Postgraduate",
};

const toStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];

/** Converts any supported checklist shape into a list of categories. */
export function normalizeDocumentChecklist(raw: unknown): DocumentCategory[] {
  if (!raw || typeof raw !== "object") return [];

  // Plain array of categories
  if (Array.isArray(raw)) {
    return raw
      .filter((c): c is Record<string, unknown> => !!c && typeof c === "object")
      .map((c) => ({ title: typeof c.title === "string" ? c.title : "", items: toStringArray(c.items) }));
  }

  const obj = raw as Record<string, unknown>;

  // New format
  if (Array.isArray(obj.categories)) {
    return normalizeDocumentChecklist(obj.categories);
  }

  // Legacy format: each key is a category
  return Object.entries(obj)
    .filter(([, value]) => Array.isArray(value))
    .map(([key, value]) => ({
      title: LEGACY_TITLES[key] ?? key.charAt(0).toUpperCase() + key.slice(1),
      items: toStringArray(value),
    }));
}

/** True when at least one category contains at least one document. */
export function hasDocuments(categories: DocumentCategory[] | undefined | null): boolean {
  return !!categories && categories.some((c) => c.items.some((i) => i.trim().length > 0));
}

/** Cleans empty values before saving. */
export function serializeDocumentChecklist(categories: DocumentCategory[]): DocumentChecklistData {
  return {
    categories: categories
      .map((c) => ({ title: c.title.trim(), items: c.items.map((i) => i.trim()).filter(Boolean) }))
      .filter((c) => c.title || c.items.length > 0),
  };
}

