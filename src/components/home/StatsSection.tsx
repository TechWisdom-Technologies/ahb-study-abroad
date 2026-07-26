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
  const countries = useCountUp(11, 1500, visible);
  const success = useCountUp(98.3, 2000, visible);

  const stats = [
    { icon: Users, value: `${students}+`, label: t.stats.students },
    { icon: Building2, value: `${partners}+`, label: t.stats.partners },
    { icon: Globe2, value: `${countries}`, label: t.stats.countries },
    { icon: TrendingUp, value: `${success}%`, label: t.stats.success },
  ];

  return (
    <section ref={ref} className="py-12 section-dark">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="font-heading font-extrabold text-3xl md:text-4xl text-white">{stat.value}</div>
              <div className="text-sm text-white/70 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
