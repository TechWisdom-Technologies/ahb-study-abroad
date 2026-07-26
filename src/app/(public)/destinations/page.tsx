"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap } from "lucide-react";
import CountryFlag from "@/components/shared/CountryFlag";
import { useCountries } from "@/hooks/useCountries";
import { destinationData } from "@/data/destinationDetails";

const destinationsHero = "/assets/destinations-hero.jpg";

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
  `https://source.unsplash.com/600x400/?${encodeURIComponent(name + " landmark")}`;

export default function DestinationsPage() {
  const { countries } = useCountries();

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#283492] via-[#3B4CAA] to-[#5B6BC0]" />
        <img src={destinationsHero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-widest uppercase bg-accent/20 text-accent rounded font-heading">Destinations</span>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-white mb-4">Study in {countries.length} Countries Worldwide</h1>
            <p className="text-white/70 text-lg">Explore our partner destinations and find the perfect country for your study abroad journey.</p>
          </motion.div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-14">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {countries.map((country, i) => {
              const slug = country.slug;
              const info = destinationData[slug];
              const img = country.card_image_url || imageMap[slug] || autoImage(country.name);
              return (
                <motion.div
                  key={country.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/destinations/${slug}`} className="block group">
                    <div className="bg-card border border-border rounded overflow-hidden hover:border-primary/40 transition-all hover:shadow-lg">
                      <div className="h-44 overflow-hidden relative">
                        <img src={img} alt={country.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={600} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                          <CountryFlag code={country.flag_code} size="md" />
                          <span className="font-heading font-bold text-white text-lg">{country.name}</span>
                        </div>
                      </div>
                      <div className="p-4">
                        {info ? (
                          <>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{info.tagline}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                              <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" />{info.tuitionRange}</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {info.popularCourses.slice(0, 3).map((c) => (
                                <span key={c} className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded">{c}</span>
                              ))}
                            </div>
                          </>
                        ) : (
                          <>
                            {country.description && <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{country.description}</p>}
                            {country.expense_range && (
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" />{country.expense_range}</span>
                              </div>
                            )}
                            {country.special_feature && (
                              <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded">{country.special_feature}</span>
                            )}
                          </>
                        )}
                        <div className="mt-3 flex items-center gap-1 text-xs font-heading font-semibold text-primary group-hover:text-accent transition-colors">
                          Learn More <ArrowRight className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#283492]/85" />
        <div className="container relative z-10 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">Not Sure Which Country Is Right for You?</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto text-lg">Our expert counselors will help you choose the best destination based on your goals, budget, and career aspirations.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-semibold px-8 rounded">
              Get Free Guidance <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
