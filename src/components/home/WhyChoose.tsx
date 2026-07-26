"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Gift, Award, ShieldCheck, Building2, Wallet, HeartHandshake } from "lucide-react";

const whyImg1 = "/assets/why-choose-1.jpg";
const whyImg2 = "/assets/why-choose-2.jpg";
const whyImg3 = "/assets/why-choose-3.jpg";
const whyImg4 = "/assets/why-choose-4.jpg";
const whyImg5 = "/assets/why-choose-5.jpg";
const whyImg6 = "/assets/why-choose-6.jpg";

const icons = [Gift, Award, ShieldCheck, Building2, Wallet, HeartHandshake];
const images = [whyImg1, whyImg2, whyImg3, whyImg4, whyImg5, whyImg6];

const WhyChoose = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 section-muted">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">{t.whyChoose.title}</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">{t.whyChoose.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {t.whyChoose.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group overflow-hidden rounded bg-card border border-border hover:border-primary/40 transition-all"
              >
                <div className="h-36 overflow-hidden relative">
                  <img src={images[i]} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width={800} height={512} />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded bg-primary flex items-center justify-center shadow-lg">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>
                <div className="p-4 pt-2">
                  <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
