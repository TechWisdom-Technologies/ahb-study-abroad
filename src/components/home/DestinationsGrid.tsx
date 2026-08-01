"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Wallet, Sparkles } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import CountryFlag from "@/components/shared/CountryFlag";
import { useCountries } from "@/hooks/useCountries";
import { ShineBorder } from "@/components/ui/shine-border";

const imageMap: Record<string, string> = {
  "uk": "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&q=80",
  "canada": "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600&q=80",
  "united-states": "https://images.pexels.com/photos/2190283/pexels-photo-2190283.jpeg?auto=compress&cs=tinysrgb&w=600",
  "australia": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80",
  "ireland": "https://images.pexels.com/photos/1483053/pexels-photo-1483053.jpeg?auto=compress&cs=tinysrgb&w=600",
  "new-zealand": "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=600&q=80",
  "france": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
  "germany": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",
  "netherlands": "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=600&q=80",
  "sweden": "https://images.unsplash.com/photo-1509356843151-3e7d96241e11?w=600&q=80",
  "finland": "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=600&q=80",
  "denmark": "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=600&q=80",
  "hungary": "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80",
  "malta": "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=600&q=80",
  "malaysia": "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80",
  "china": "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=600&q=80",

};

const fallbackImage = "/assets/hero-bg.jpg";

const DestinationsGrid = () => {
  const { t, language } = useLanguage();
  const { countries } = useCountries();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getImage = (d: typeof countries[0]) => d.card_image_url || imageMap[d.slug] || fallbackImage;
  const visibleCountries = countries.slice(0, isMobile ? 5 : 8);

  return (
    <section className="py-10">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading font-semibold text-xl md:text-3xl text-foreground">{t.destinations.title}</h2>
          <p className="text-xs md:text-base text-muted-foreground mt-2 max-w-xl mx-auto">{t.destinations.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8">
          {visibleCountries.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/destinations/${d.slug}`}
                className="flex flex-col h-full relative rounded-xl overflow-hidden bg-card shadow-md border border-border/50"
              >
                <ShineBorder shineColor={["#5CBAE6", "#141C3A", "#ffffff"]} borderWidth={2} className="z-30" />

                {/* Top Image Section */}
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-muted">
                  <img src={getImage(d)} alt={`Study in ${d.name}`} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-black/5" />
                </div>

                {/* Bottom Content Section */}
                <div className="p-5 flex flex-col flex-grow bg-card z-20 relative border-t border-border/10">
                  <div className="flex items-center gap-3 mb-3.5">
                    <CountryFlag code={d.flag_code} size="md" className="shadow-sm border border-border/50 ring-2 ring-background" />
                    <h3 className="font-heading font-medium text-foreground text-lg">{d.name}</h3>
                  </div>

                  <div className="space-y-2.5 text-sm text-muted-foreground">
                    {d.university_count ? (
                      <div className="flex items-center gap-2.5">
                        <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{d.university_count}+ Universities</span>
                      </div>
                    ) : null}
                    {d.expense_range ? (
                      <div className="flex items-center gap-2.5">
                        <Wallet className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="truncate">{d.expense_range}</span>
                      </div>
                    ) : null}
                    {d.special_feature ? (
                      <div className="flex items-center gap-2.5">
                        <Sparkles className="w-4 h-4 text-accent flex-shrink-0" />
                        <span className="line-clamp-1">{d.special_feature}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/destinations">
            <InteractiveHoverButton className="bg-primary text-white border-transparent hover:bg-accent hover:border-accent">
              {language === "en" ? "View All Destinations" : "সব গন্তব্য দেখুন"}
            </InteractiveHoverButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DestinationsGrid;
