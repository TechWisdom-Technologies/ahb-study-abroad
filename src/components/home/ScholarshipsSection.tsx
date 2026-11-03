"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import CountryFlag from "@/components/shared/CountryFlag";

const staticScholarships = [
  { name: "Chevening Scholarship", country: "United Kingdom", flagCode: "gb", amount: "Full Funding", deadline: "Nov 2026", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80" },
  { name: "Commonwealth Scholarship", country: "United Kingdom", flagCode: "gb", amount: "Full Tuition + Living", deadline: "Dec 2026", image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=400&q=80" },
  { name: "Vanier Canada Graduate", country: "Canada", flagCode: "ca", amount: "$50,000/year", deadline: "Oct 2026", image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=400&q=80" },
  { name: "Australia Awards", country: "Australia", flagCode: "au", amount: "Full Funding", deadline: "Apr 2027", image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=400&q=80" },
  { name: "New Zealand Excellence Awards", country: "New Zealand", flagCode: "nz", amount: "Up to $10,000", deadline: "Mar 2027", image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=400&q=80" },
  { name: "Malaysia International Scholarship", country: "Malaysia", flagCode: "my", amount: "Full Tuition", deadline: "May 2027", image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=400&q=80" },
];

type Scholarship = { name: string; country: string; flagCode: string; amount: string; deadline: string; image: string };

const ScholarshipsSection = () => {
  const { t } = useLanguage();
  const [scholarships, setScholarships] = useState<Scholarship[]>(staticScholarships);

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await fetch("/api/scholarships");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const dbItems: Scholarship[] = data.map((s: any) => ({
              name: s.title,
              country: s.country?.name || "",
              flagCode: s.eligibility || s.country?.flagCode || "",
              amount: s.description || "Contact us",
              deadline: s.deadline || "TBA",
              image: s.amount || "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&q=80",
            }));
            setScholarships(dbItems);
          }
        }
      } catch (err) {
        console.error("Error loading scholarships:", err);
      }
    };
    fetchScholarships();
  }, []);

  return (
    <section className="py-10">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading font-semibold text-3xl text-foreground">{t.scholarships.title}</h2>
          <p className="text-muted-foreground mt-2">{t.scholarships.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {scholarships.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group overflow-hidden rounded bg-card border border-border hover:border-primary/40 transition-all flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
            >
              <div className="h-40 overflow-hidden relative">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <CountryFlag code={s.flagCode} size="sm" className="shadow-md" />
                  <span className="text-[10px] text-white/80 font-heading font-semibold uppercase tracking-wider">{s.country}</span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-bold text-foreground text-sm mb-1.5 line-clamp-1 group-hover:text-primary transition-colors">{s.name}</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs border-t border-border/60 pt-3 mt-1.5">
                    <div>
                      <p className="text-muted-foreground text-[10px] uppercase font-semibold">Benefit</p>
                      <p className="font-medium text-foreground mt-0.5 line-clamp-1">{s.amount}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-[10px] uppercase font-semibold">Deadline</p>
                      <p className="font-medium text-foreground mt-0.5">{s.deadline}</p>
                    </div>
                  </div>
                </div>

                <a href="#consultation" className="mt-4 flex items-center justify-center gap-1.5 w-full py-2 bg-primary/5 hover:bg-primary text-primary hover:text-white rounded text-xs font-semibold transition-all group-hover:bg-primary group-hover:text-white">
                  <span>Apply Now</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScholarshipsSection;
