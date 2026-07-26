"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CountryFlag from "@/components/shared/CountryFlag";

const heroImage = "/assets/hero-students.jpg";

const cyclingCountries = [
  { name: "United Kingdom", flagCode: "gb", color: "#FF4444" },
  { name: "Canada", flagCode: "ca", color: "#FF3131" },
  { name: "Australia", flagCode: "au", color: "#00BFFF" },
  { name: "New Zealand", flagCode: "nz", color: "#FFFFFF" },
  { name: "Malaysia", flagCode: "my", color: "#FFD700" },
];

const HeroSection = () => {
  const { t } = useLanguage();
  const [cycleIndex, setCycleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % cyclingCountries.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const current = cyclingCountries[cycleIndex];

  return (
    <section className="relative min-h-[600px] lg:min-h-[92vh] flex items-center overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#283492] via-[#3B4CAA] to-[#5B6BC0]" />

      {/* Hero image — full bleed background */}
      <div className="absolute inset-0 z-[1]">
        <img
          src={heroImage}
          alt="Diverse international students celebrating graduation on a university campus"
          width={1920}
          height={1280}
          className="w-full h-full object-cover object-[center_40%]"
        />
      </div>
      {/* Gradient overlays for seamless blending */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#283492] from-5% via-[#3B4CAA]/90 via-35% to-transparent to-75%" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#283492]/60 to-transparent" />

      {/* Decorative shapes */}
      <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-[5%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-[20%] w-64 h-64 border border-white/5 rounded-full pointer-events-none" />
      <div className="absolute top-[30%] right-[15%] w-40 h-40 border border-accent/10 rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-widest uppercase bg-accent/20 text-accent rounded font-heading">
              Trusted Education Consultancy
            </span>

            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mb-2">
              {t.hero.title}{" "}
              <span className="text-accent">{t.hero.titleHighlight}</span>
            </h1>

            {/* Cycling destination */}
            <div className="h-10 sm:h-12 md:h-14 mb-4 overflow-hidden">
              <motion.span
                key={cycleIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="flex items-center gap-2 sm:gap-3 font-heading font-bold text-xl sm:text-2xl md:text-3xl whitespace-nowrap"
                style={{ color: current.color }}
              >
                Study in {current.name}
                <CountryFlag code={current.flagCode} size="lg" className="shadow-lg shrink-0" />
              </motion.span>
            </div>

            <p className="text-base md:text-lg text-white/80 mb-6 max-w-xl leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/contact">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-semibold rounded px-6">
                  {t.hero.cta1}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link href="/destinations">
                <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-heading font-semibold rounded px-6 bg-white/5">
                  {t.hero.cta2}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 0 960 40 720 30C480 20 240 0 0 20L0 60Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
