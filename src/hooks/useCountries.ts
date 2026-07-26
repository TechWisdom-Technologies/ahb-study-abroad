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
};

// Known name → slug mappings (to keep existing routes working)
const knownSlugs: Record<string, string> = {
  "united kingdom": "uk",
  "canada": "canada",
  "australia": "australia",
  "new zealand": "new-zealand",
  "malaysia": "malaysia",
  "south korea": "south-korea",
  "japan": "japan",
  "italy": "italy",
  "malta": "malta",
  "cyprus": "cyprus",
  "finland": "finland",
};

export const countrySlug = (name: string): string => {
  return knownSlugs[name.toLowerCase()] || name.toLowerCase().replace(/\s+/g, "-");
};

// Static fallback
const staticCountries: DBCountry[] = [
  { id: "uk", name: "United Kingdom", flag_code: "gb", description: null, sort_order: 0, is_active: true, slug: "uk", university_count: 8, expense_range: "£10,000 - £38,000/yr", special_feature: "3-year post-graduation work permit" },
  { id: "canada", name: "Canada", flag_code: "ca", description: null, sort_order: 1, is_active: true, slug: "canada", university_count: 10, expense_range: "CAD 7,000 - 60,000/yr", special_feature: "Post-graduation work permit up to 3 years" },
  { id: "australia", name: "Australia", flag_code: "au", description: null, sort_order: 2, is_active: true, slug: "australia", university_count: 8, expense_range: "AUD 4,000 - 70,000+/yr", special_feature: "3-year post-study work visa" },
  { id: "new-zealand", name: "New Zealand", flag_code: "nz", description: null, sort_order: 3, is_active: true, slug: "new-zealand", university_count: 6, expense_range: "NZD 22,000 - 35,000/yr", special_feature: "Safe, welcoming environment" },
  { id: "malaysia", name: "Malaysia", flag_code: "my", description: null, sort_order: 4, is_active: true, slug: "malaysia", university_count: 6, expense_range: "RM 5,000 - 60,000/yr", special_feature: "Generous government scholarships" },
  { id: "south-korea", name: "South Korea", flag_code: "kr", description: null, sort_order: 5, is_active: true, slug: "south-korea", university_count: 6, expense_range: "KRW 4M - 8M/yr", special_feature: "K-culture with quality education" },
  { id: "japan", name: "Japan", flag_code: "jp", description: null, sort_order: 6, is_active: true, slug: "japan", university_count: 6, expense_range: "JPY 535K - 1.5M/yr", special_feature: "Very affordable public universities" },
  { id: "italy", name: "Italy", flag_code: "it", description: null, sort_order: 7, is_active: true, slug: "italy", university_count: 6, expense_range: "EUR 1,000 - 4,000/yr", special_feature: "Nearly free public university education" },
  { id: "malta", name: "Malta", flag_code: "mt", description: null, sort_order: 8, is_active: true, slug: "malta", university_count: 4, expense_range: "EUR 5,000 - 15,000/yr", special_feature: "Affordable tuition in EU" },
  { id: "cyprus", name: "Cyprus", flag_code: "cy", description: null, sort_order: 9, is_active: true, slug: "cyprus", university_count: 4, expense_range: "EUR 3,000 - 8,000/yr", special_feature: "English-taught programs in Mediterranean" },
  { id: "finland", name: "Finland", flag_code: "fi", description: null, sort_order: 10, is_active: true, slug: "finland", university_count: 5, expense_range: "EUR 6,000 - 18,000/yr", special_feature: "Free tuition at public universities for EU/EEA" },
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
