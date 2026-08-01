"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, Building2, Globe2, TrendingUp } from "lucide-react";

const useCountUp = (target: number, duration: number = 2000, start: boolean = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(progress === 1 ? target : Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

const StatsSection = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const students = useCountUp(2500, 2000, visible);
  const partners = useCountUp(300, 2000, visible);
  const countries = useCountUp(16, 1500, visible);
  const success = useCountUp(98.3, 2000, visible);

  const stats = [
    { icon: Users, value: `${students}+`, label: t.stats.students },
    { icon: Building2, value: `${partners}+`, label: t.stats.partners },
    { icon: Globe2, value: `${countries}`, label: t.stats.countries },
    { icon: TrendingUp, value: `${success}%`, label: t.stats.success },
  ];

  return (
    <section ref={ref} className="py-10 bg-gradient-to-r from-[#141C3A] via-[#1d2b5c] to-[#141C3A] border-b border-white/10">
      <div className="container">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-5 h-5 md:w-8 md:h-8 text-accent mx-auto mb-1.5 md:mb-2" />
              <div className="font-heading font-medium sm:font-extrabold text-base sm:text-2xl md:text-4xl text-white leading-none">{stat.value}</div>
              <div className="text-[8px] sm:text-xs md:text-sm text-white/70 mt-1 md:mt-1.5 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
