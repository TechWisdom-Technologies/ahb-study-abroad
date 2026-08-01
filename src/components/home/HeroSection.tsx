"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import CountryFlag from "@/components/shared/CountryFlag";
import { ShineBorder } from "@/components/ui/shine-border";

const FlagIcon = ({ code, size = "xl" }: { code: string; size?: "sm" | "md" | "lg" | "xl" }) => (
  <div className="relative shadow-lg overflow-hidden rounded-md flex items-center justify-center p-0">
    <ShineBorder shineColor={["#5CBAE6", "#141C3A", "#ffffff"]} borderWidth={1} className="z-30" />
    <div className="z-20 relative rounded-[2px] overflow-hidden flex items-center justify-center">
      <CountryFlag code={code} size={size} />
    </div>
  </div>
);

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <section className="relative min-h-[600px] lg:min-h-[92vh] flex items-center overflow-hidden bg-[#141C3A]">
      {/* Base background colors */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#141C3A] via-[#1A254D] to-[#2B3C7A]" />
      <div className="absolute inset-0 z-[1] bg-[url('/assets/grid-pattern.svg')] opacity-10" />

      {/* Decorative shapes */}
      <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none z-[1]" />
      <div className="absolute bottom-10 left-[5%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-[1]" />

      {/* City background overlay */}
      <div className="absolute bottom-0 lg:-bottom-24 left-0 right-0 z-[2] pointer-events-none flex justify-center overflow-hidden">
        <img
          src="/assets/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="w-full max-w-[1920px] h-auto object-cover opacity-20 mix-blend-lighten brightness-90 mask-image-[linear-gradient(to_bottom,transparent,black)]"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 100%)' }}
        />
      </div>

      <div className="container relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 py-10 lg:py-0">
        
        {/* Left Column: Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:items-start lg:text-left pt-0 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center lg:items-start"
          >
            <span className="inline-block text-xs md:text-md mb-3 font-normal tracking-widest uppercase text-white rounded font-heading">
              Unlock Your Potential Worldwide
            </span>

            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15] mb-6">
              {t.hero.title}{" "}
              <span className="text-accent">{t.hero.titleHighlight}</span>
            </h1>

            <p className="text-sm md:text-lg text-white mb-8 max-w-xl leading-relaxed mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>

            {/* Mobile Spinning Flags (hidden on desktop) */}
            <div className="lg:hidden w-full h-[240px] flex items-center justify-center relative mb-6">
              <div className="absolute w-[180px] h-[180px] bg-accent/15 rounded-full blur-[40px] z-0" />
              
              {/* Inner Ring – 5 countries */}
              <OrbitingCircles radius={45} duration={25} iconSize={26}>
                <FlagIcon code="gb" size="sm" />
                <FlagIcon code="ca" size="sm" />
                <FlagIcon code="us" size="sm" />
                <FlagIcon code="au" size="sm" />
                <FlagIcon code="ie" size="sm" />
              </OrbitingCircles>

              {/* Outer Ring – 11 countries */}
              <OrbitingCircles radius={95} duration={40} reverse iconSize={26}>
                <FlagIcon code="nz" size="sm" />
                <FlagIcon code="fr" size="sm" />
                <FlagIcon code="de" size="sm" />
                <FlagIcon code="nl" size="sm" />
                <FlagIcon code="se" size="sm" />
                <FlagIcon code="fi" size="sm" />
                <FlagIcon code="dk" size="sm" />
                <FlagIcon code="hu" size="sm" />
                <FlagIcon code="mt" size="sm" />
                <FlagIcon code="my" size="sm" />
                <FlagIcon code="cn" size="sm" />
              </OrbitingCircles>
            </div>

            <div className="flex flex-row justify-center lg:justify-start gap-3 w-full">
              <Link href="/contact">
                <InteractiveHoverButton className="bg-accent text-white border-transparent hover:bg-[#141C3A] hover:border-[#141C3A] font-heading font-normal px-4 py-2 sm:px-8 sm:py-2.5 text-[11px] sm:text-xs shadow-none">
                  {t.hero.cta1}
                </InteractiveHoverButton>
              </Link>
              <Link href="/destinations">
                <InteractiveHoverButton className="bg-white/5 text-white border-white/40 hover:bg-white hover:border-white hover:text-[#141C3A] font-heading font-normal px-4 py-2 sm:px-8 sm:py-2.5 text-[11px] sm:text-xs">
                  {t.hero.cta2}
                </InteractiveHoverButton>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Orbiting Circles (hidden on mobile) */}
        <div className="w-full lg:w-1/2 hidden lg:flex justify-center items-center relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[400px] lg:h-[500px] w-full flex items-center justify-center"
          >
            {/* Glow behind orbits */}
            <div className="absolute w-[300px] h-[300px] bg-accent/15 rounded-full blur-[80px] z-0" />

            {/* Inner Ring – 5 countries */}
            <OrbitingCircles radius={80} duration={25} iconSize={40}>
              <FlagIcon code="gb" />
              <FlagIcon code="ca" />
              <FlagIcon code="us" />
              <FlagIcon code="au" />
              <FlagIcon code="ie" />
            </OrbitingCircles>

            {/* Outer Ring – 11 countries (reverse) */}
            <OrbitingCircles radius={170} duration={40} reverse iconSize={40}>
              <FlagIcon code="nz" />
              <FlagIcon code="fr" />
              <FlagIcon code="de" />
              <FlagIcon code="nl" />
              <FlagIcon code="se" />
              <FlagIcon code="fi" />
              <FlagIcon code="dk" />
              <FlagIcon code="hu" />
              <FlagIcon code="mt" />
              <FlagIcon code="my" />
              <FlagIcon code="cn" />
            </OrbitingCircles>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
