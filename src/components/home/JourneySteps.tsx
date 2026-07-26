"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { MessageSquare, FileText, Stamp, Plane } from "lucide-react";

const journeyImg1 = "/assets/journey-1.jpg";
const journeyImg2 = "/assets/journey-2.jpg";
const journeyImg3 = "/assets/journey-3.jpg";
const journeyImg4 = "/assets/journey-4.jpg";

const stepIcons = [MessageSquare, FileText, Stamp, Plane];
const stepImages = [journeyImg1, journeyImg2, journeyImg3, journeyImg4];

const JourneySteps = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 section-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=30')] bg-cover bg-center opacity-5" />
      <div className="container relative z-10">
        <div className="text-center mb-10">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white">{t.journey.title}</h2>
          <p className="text-white/60 mt-2">{t.journey.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {t.journey.steps.map((step, i) => {
            const Icon = stepIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative group"
              >
                <div className="rounded overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/30 transition-all h-full flex flex-col">
                  <div className="h-28 overflow-hidden relative">
                    <img src={stepImages[i]} alt={step.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3B4CAA] via-[#3B4CAA]/70 to-transparent" />
                    <div className="absolute top-2 left-3 w-7 h-7 rounded bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center font-heading">
                      {i + 1}
                    </div>
                    <div className="absolute bottom-2 left-3 w-10 h-10 rounded bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-heading font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {/* Connector arrow */}
                {i < 3 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 z-10 w-6 h-6 rounded-full bg-accent text-accent-foreground items-center justify-center text-xs font-bold">
                    →
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JourneySteps;
