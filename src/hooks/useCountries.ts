import { useEffect, useState } from "react";

export type DBCountry = {
  id: string;
  name: string;
  flag_code: string;
  flag_image_url?: string | null;
  description: string | null;
  sort_order: number;
  is_active: boolean;
  slug: string;
  university_count?: number;
  expense_range?: string | null;
  special_feature?: string | null;
  card_image_url?: string | null;
  hero_image_url?: string | null;
  popular_courses?: unknown;
};

const knownSlugs: Record<string, string> = {
  "united kingdom": "uk",
  "canada": "canada",
  "united states": "usa",
  "australia": "australia",
  "new zealand": "new-zealand",
  "ireland": "ireland",
  "germany": "germany",
  "france": "france",
  "netherlands": "netherlands",
  "sweden": "sweden",
  "finland": "finland",
  "denmark": "denmark",
  "hungary": "hungary",
  "malta": "malta",
  "malaysia": "malaysia",
  "china": "china",
};

export const countrySlug = (name: string): string => {
  return knownSlugs[name.toLowerCase()] || name.toLowerCase().replace(/\s+/g, "-");
};

const staticCountries: DBCountry[] = [
  { id: "uk", name: "United Kingdom", flag_code: "gb", description: null, sort_order: 0, is_active: true, slug: "uk", university_count: 8, expense_range: "£10,000 - £38,000/yr", special_feature: "3-year post-graduation work permit" },
  { id: "canada", name: "Canada", flag_code: "ca", description: null, sort_order: 1, is_active: true, slug: "canada", university_count: 10, expense_range: "CAD 7,000 - 60,000/yr", special_feature: "Post-graduation work permit up to 3 years" },
  { id: "usa", name: "United States", flag_code: "us", description: null, sort_order: 2, is_active: true, slug: "usa", university_count: 12, expense_range: "$15,000 - $55,000/yr", special_feature: "OPT & STEM OPT extension options" },
  { id: "australia", name: "Australia", flag_code: "au", description: null, sort_order: 3, is_active: true, slug: "australia", university_count: 8, expense_range: "AUD 4,000 - 70,000+/yr", special_feature: "3-year post-study work visa" },
  { id: "new-zealand", name: "New Zealand", flag_code: "nz", description: null, sort_order: 4, is_active: true, slug: "new-zealand", university_count: 6, expense_range: "NZD 22,000 - 35,000/yr", special_feature: "Safe, welcoming environment" },
  { id: "ireland", name: "Ireland", flag_code: "ie", description: null, sort_order: 5, is_active: true, slug: "ireland", university_count: 5, expense_range: "EUR 9,000 - 25,000/yr", special_feature: "2-year stay-back visa" },
  { id: "germany", name: "Germany", flag_code: "de", description: null, sort_order: 6, is_active: true, slug: "germany", university_count: 7, expense_range: "EUR 0 - 3,000/yr", special_feature: "Tuition-free public universities" },
  { id: "france", name: "France", flag_code: "fr", description: null, sort_order: 7, is_active: true, slug: "france", university_count: 6, expense_range: "EUR 3,000 - 15,000/yr", special_feature: "Post-study work visa" },
  { id: "netherlands", name: "Netherlands", flag_code: "nl", description: null, sort_order: 8, is_active: true, slug: "netherlands", university_count: 5, expense_range: "EUR 8,000 - 20,000/yr", special_feature: "1-year orientation year visa" },
  { id: "sweden", name: "Sweden", flag_code: "se", description: null, sort_order: 9, is_active: true, slug: "sweden", university_count: 4, expense_range: "SEK 80,000 - 140,000/yr", special_feature: "Innovative research hubs" },
  { id: "finland", name: "Finland", flag_code: "fi", description: null, sort_order: 10, is_active: true, slug: "finland", university_count: 5, expense_range: "EUR 6,000 - 18,000/yr", special_feature: "2-year post-study work permit" },
  { id: "denmark", name: "Denmark", flag_code: "dk", description: null, sort_order: 11, is_active: true, slug: "denmark", university_count: 4, expense_range: "EUR 6,000 - 16,000/yr", special_feature: "High quality of life" },
  { id: "hungary", name: "Hungary", flag_code: "hu", description: null, sort_order: 12, is_active: true, slug: "hungary", university_count: 5, expense_range: "EUR 3,000 - 8,000/yr", special_feature: "Stipendium Hungaricum scholarships" },
  { id: "malta", name: "Malta", flag_code: "mt", description: null, sort_order: 13, is_active: true, slug: "malta", university_count: 4, expense_range: "EUR 5,000 - 15,000/yr", special_feature: "Affordable tuition in EU" },
  { id: "malaysia", name: "Malaysia", flag_code: "my", description: null, sort_order: 14, is_active: true, slug: "malaysia", university_count: 6, expense_range: "RM 5,000 - 60,000/yr", special_feature: "Generous government scholarships" },
  { id: "china", name: "China", flag_code: "cn", description: null, sort_order: 15, is_active: true, slug: "china", university_count: 8, expense_range: "RMB 15,000 - 45,000/yr", special_feature: "CSC & Provincial scholarships" },
];

export const useCountries = () => {
  const [countries, setCountries] = useState<DBCountry[]>(staticCountries);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch("/api/countries");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const dbCountries: DBCountry[] = data.map((c: any) => ({
              id: c.id,
              name: c.name,
              flag_code: c.flagCode,
              flag_image_url: c.flagImageUrl || null,
              description: c.description || null,
              sort_order: c.sortOrder,
              is_active: c.isActive,
              slug: countrySlug(c.name),
              university_count: c.universityCount ?? 0,
              expense_range: c.expenseRange ?? null,
              special_feature: c.specialFeature ?? null,
              card_image_url: c.cardImageUrl ?? null,
              hero_image_url: c.heroImageUrl ?? null,
              popular_courses: c.popularCourses ?? null,
            }));
            const dbSlugs = new Set(dbCountries.map(c => c.slug));
            const remaining = staticCountries.filter(c => !dbSlugs.has(c.slug));
            setCountries([...dbCountries, ...remaining]);
          }
        }
      } catch (err) {
        console.error("Error loading countries hook:", err);
      }
      setLoading(false);
    };
    fetchCountries();
  }, []);

  return { countries, loading };
};
