"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { ArrowRight, GraduationCap } from "lucide-react";
import CountryFlag from "@/components/shared/CountryFlag";
import { useCountries } from "@/hooks/useCountries";
import { destinationData } from "@/data/destinationDetails";

const destinationsHero = "/assets/std-des-bg.jpg";

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

export default function DestinationsPage() {
  const { countries } = useCountries();
  const displayCountries = Array.from(new Map(countries.map(c => [c.slug, c])).values());

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[600px] lg:min-h-[92vh] flex items-center overflow-hidden bg-[#141C3A]">
        {/* Base background colors & image overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#141C3A] via-[#1A254D] to-[#2B3C7A]" />
        <img
          src={destinationsHero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-lighten brightness-90 z-[1]"
        />
        <div className="absolute inset-0 z-[2] bg-[url('/assets/grid-pattern.svg')] opacity-10" />

        {/* Decorative glows */}
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none z-[2]" />
        <div className="absolute bottom-10 left-[5%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-[2]" />

        <div className="container relative z-10 py-20 lg:py-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-md mb-3 font-normal tracking-widest uppercase text-white rounded font-heading">
              Destinations
            </span>
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15] mb-6">
              Study in {displayCountries.length} Countries Worldwide
            </h1>
            <p className="text-base md:text-lg text-white leading-relaxed max-w-xl mx-auto">
              Explore our partner destinations and find the perfect country for your study abroad journey.
            </p>
            <div className="mt-8 flex justify-center">
              <Link href="/contact">
                <InteractiveHoverButton className="bg-accent text-white border-transparent hover:bg-[#141C3A] hover:border-[#141C3A] font-heading font-normal px-8 py-2.5 text-xs shadow-none">
                  Contact Us
                </InteractiveHoverButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-14">
        <div className="container">
          <div className="grid grid-cols-1 gap-6">
            {displayCountries.map((country, i) => {
              const slug = country.slug;
              const info = destinationData[slug];
              const img = country.card_image_url || imageMap[slug] || fallbackImage;
              return (
                <motion.div
                  key={country.id || slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.02 }}
                >
                  <div className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all hover:shadow-lg flex flex-col md:flex-row items-stretch h-[400px] sm:h-[360px] md:h-[330px]">
                    {/* Left Side: Only Image */}
                    <div className="w-full md:w-80 h-44 sm:h-48 md:h-full overflow-hidden relative shrink-0">
                      <img
                        src={img}
                        alt={country.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={600}
                        height={400}
                      />
                    </div>

                    {/* Right Side: Stacked Content */}
                    <div className="p-5 md:py-6 md:px-7 flex-1 flex flex-col justify-between overflow-hidden">
                      <div className="space-y-3">
                        {/* 1. Flag with Country Name */}
                        <div className="flex items-center gap-3.5">
                          <img
                            src={`/flags/${country.flag_code}.svg`}
                            alt=""
                            aria-hidden="true"
                            className="h-10 w-16 md:w-18 object-cover rounded shadow-sm border border-border/50 shrink-0"
                          />
                          <h3 className="font-heading font-medium text-black text-2xl md:text-4xl truncate">{country.name}</h3>
                        </div>

                        {/* 2. Brief Info */}
                        <p className="text-black text-xs md:text-sm leading-relaxed line-clamp-2 min-h-[38px] overflow-hidden">
                          {info?.tagline || country.description || `Study in ${country.name} with top university partnerships and end-to-end guidance.`}
                        </p>

                        {/* 3. Estimated Tuition Fees */}
                        <div className="space-y-1 shrink-0">
                          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">Estimated Tuition</span>
                          <div className="px-2.5 py-1 bg-[#5CBAE6]/15 text-[#141C3A] border border-[#5CBAE6]/30 text-xs font-medium rounded-md w-fit">
                            {info?.tuitionRange || country.expense_range || "Contact for Tuition Fees"}
                          </div>
                        </div>

                        {/* 4. Featured Programs */}
                        <div className="space-y-1 shrink-0">
                          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">Featured Programs</span>
                          <div className="flex items-center gap-1.5 overflow-hidden whitespace-nowrap">
                            {(info?.popularCourses && info.popularCourses.length > 0
                              ? info.popularCourses.slice(0, 3)
                              : ["Business & Management", "Computer Science & IT", "Engineering"]
                            ).map((c) => (
                              <span key={c} className="px-2.5 py-1 bg-[#5CBAE6]/15 text-[#141C3A] border border-[#5CBAE6]/30 text-xs font-medium rounded-md shrink-0">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* 5. Action Buttons */}
                      <div className="pt-2 flex items-center gap-3 justify-start shrink-0">
                        <Link href={`/destinations/${slug}`}>
                          <InteractiveHoverButton className="w-36 h-10 bg-primary text-white hover:bg-[#141C3A] text-xs font-heading font-normal shadow-none border-transparent justify-center">
                            Explore
                          </InteractiveHoverButton>
                        </Link>
                        <Link href="/contact">
                          <InteractiveHoverButton className="w-36 h-10 bg-white text-primary border border-primary/20 hover:bg-primary hover:text-white hover:border-primary text-xs font-heading font-normal shadow-none justify-center">
                            Contact Us
                          </InteractiveHoverButton>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#141C3A]/85" />
        <div className="container relative z-10 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">Not Sure Which Country Is Right for You?</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto text-lg">Our expert counselors will help you choose the best destination based on your goals, budget, and career aspirations.</p>
          <Link href="/contact">
            <InteractiveHoverButton className="bg-accent text-white border-transparent hover:bg-[#141C3A] hover:border-[#141C3A]">
              Get Free Guidance
            </InteractiveHoverButton>
          </Link>
        </div>
      </section>
    </>
  );
}
