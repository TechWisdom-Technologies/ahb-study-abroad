"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Wallet, Sparkles } from "lucide-react";
import CountryFlag from "@/components/shared/CountryFlag";
import { useCountries } from "@/hooks/useCountries";

const imageMap: Record<string, string> = {
  "uk": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
  "canada": "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80",
  "australia": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80",
  "new-zealand": "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&q=80",
  "malaysia": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80",
  "south-korea": "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=600&q=80",
  "japan": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
  "italy": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=600&q=80",
  "malta": "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=600&q=80",
  "cyprus": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
  "finland": "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=600&q=80",
};

const autoImage = (name: string) =>
  `https://source.unsplash.com/600x800/?${encodeURIComponent(name + " landmark")}`;

const DestinationsGrid = () => {
  const { t } = useLanguage();
  const { countries } = useCountries();

  const primary = countries.slice(0, 5);
  const secondary = countries.slice(5);

  const getImage = (d: typeof countries[0]) => d.card_image_url || imageMap[d.slug] || autoImage(d.name);

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">{t.destinations.title}</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">{t.destinations.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
          {primary.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/destinations/${d.slug}`}
                className="group block relative rounded overflow-hidden aspect-[3/4] bg-muted"
              >
                <img src={getImage(d)} alt={`Study in ${d.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="mb-1.5">
                    <CountryFlag code={d.flag_code} size="lg" className="shadow-lg" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-sm mb-1.5">{d.name}</h3>
                  <div className="space-y-1 text-[10px] text-white/80">
                    {d.university_count ? (
                      <div className="flex items-center gap-1">
                        <GraduationCap className="w-3 h-3 text-accent flex-shrink-0" />
                        <span>{d.university_count}+ Universities</span>
                      </div>
                    ) : null}
                    {d.expense_range ? (
                      <div className="flex items-center gap-1">
                        <Wallet className="w-3 h-3 text-accent flex-shrink-0" />
                        <span>{d.expense_range}</span>
                      </div>
                    ) : null}
                    {d.special_feature ? (
                      <div className="flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-accent flex-shrink-0" />
                        <span className="line-clamp-1">{d.special_feature}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="absolute top-2 right-2 w-7 h-7 rounded bg-accent/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-3.5 h-3.5 text-accent-foreground" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {secondary.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {secondary.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={`/destinations/${d.slug}`}
                  className="group block relative rounded overflow-hidden aspect-[3/4] bg-muted"
                >
                  <img src={getImage(d)} alt={`Study in ${d.name}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2.5">
                    <CountryFlag code={d.flag_code} size="sm" className="shadow-lg" />
                    <h3 className="font-heading font-semibold text-white text-xs mb-1">{d.name}</h3>
                    <div className="space-y-0.5 text-[9px] text-white/75">
                      {d.university_count ? (
                        <div className="flex items-center gap-1">
                          <GraduationCap className="w-2.5 h-2.5 text-accent flex-shrink-0" />
                          <span>{d.university_count}+ Unis</span>
                        </div>
                      ) : null}
                      {d.special_feature ? (
                        <div className="flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-accent flex-shrink-0" />
                          <span className="line-clamp-1">{d.special_feature}</span>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link href="/destinations" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors font-heading">
            {t.destinations.viewAll} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinationsGrid;
