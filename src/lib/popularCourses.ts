/**
 * Popular courses helpers.
 *
 * Stored format (countries.popular_courses JSON array):
 *   [{ category: "IT", courses: ["CSE", "Computer Science", "Data Science"] }, ...]
 *
 * Legacy format (still supported when reading): a plain string array where
 * each string is a category without sub-courses, e.g. ["Business", "IT"].
 * Mixed arrays (strings + objects) are also accepted.
 */

export type CourseCategory = { category: string; courses: string[] };

const toStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];

/** Converts any supported shape into a list of course categories. */
export function normalizePopularCourses(raw: unknown): CourseCategory[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((entry): CourseCategory[] => {
    if (typeof entry === "string") return [{ category: entry, courses: [] }];
    if (entry && typeof entry === "object") {
      const obj = entry as Record<string, unknown>;
      const category = typeof obj.category === "string" ? obj.category : typeof obj.name === "string" ? obj.name : "";
      return [{ category, courses: toStringArray(obj.courses) }];
    }
    return [];
  });
}

/** Cleans empty values before saving. */
export function serializePopularCourses(categories: CourseCategory[]): CourseCategory[] {
  return categories
    .map((c) => ({ category: c.category.trim(), courses: c.courses.map((s) => s.trim()).filter(Boolean) }))
    .filter((c) => c.category || c.courses.length > 0);
}

