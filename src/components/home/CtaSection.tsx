"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Globe, Award } from "lucide-react";

const CtaSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Single full-bleed background image */}
      <img
        src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1920&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-[#283492]/85" />
      {/* Accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/6 rounded-full blur-[150px] pointer-events-none" />

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
            <GraduationCap className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold text-accent uppercase tracking-wider">Your Future Starts Here</span>
          </div>

          <h2 className="font-heading font-bold text-3xl md:text-5xl text-white mb-4 leading-tight">
            {t.cta.title}
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            {t.cta.subtitle}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center backdrop-blur-sm">
                <Globe className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="text-white font-heading font-bold text-lg leading-none">11+</p>
                <p className="text-white/50 text-xs">Countries</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center backdrop-blur-sm">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="text-white font-heading font-bold text-lg leading-none">300+</p>
                <p className="text-white/50 text-xs">Universities</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded bg-accent/10 flex items-center justify-center backdrop-blur-sm">
                <Award className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="text-white font-heading font-bold text-lg leading-none">98.3%</p>
                <p className="text-white/50 text-xs">Visa Success</p>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-semibold rounded px-8 text-base">
                {t.cta.button}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link href="/destinations">
              <Button size="lg" className="bg-white/10 border border-white/30 text-white hover:bg-white/20 font-heading font-semibold rounded px-8 text-base backdrop-blur-sm">
                Explore Destinations
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
