"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Gift, Award, ShieldCheck, Building2, Wallet, HeartHandshake, Plane } from "lucide-react";

const whyChooseImage = "/assets/why-choose-us-img.jpg";

const icons = [Gift, Award, ShieldCheck, Building2, Wallet, HeartHandshake, Plane];

const WhyChoose = () => {
  const { t } = useLanguage();

  return (
    <section className="py-10">
      <div className="container">
        {/* Centered heading */}
        <div className="text-center mb-10">
          <h2 className="font-heading font-semibold text-xl md:text-3xl text-foreground">
            {t.whyChoose.title}
          </h2>
          <p className="text-xs md:text-base text-muted-foreground mt-2 max-w-xl mx-auto">
            {t.whyChoose.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative max-w-[280px] sm:max-w-none mx-auto w-full"
          >
            <div className="rounded-2xl overflow-hidden shadow-xl relative">
              <img
                src={whyChooseImage}
                alt="Why Choose AHB Study Abroad"
                className="w-full h-[192px] lg:h-[480px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141C3A]/80 via-transparent to-transparent rounded-2xl" />
              {/* Gradient border on all four sides */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-accent to-primary" />
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-accent to-primary" />
              <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-accent to-primary" />
              <div className="absolute top-0 right-0 bottom-0 w-[3px] bg-gradient-to-b from-primary via-accent to-primary" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <div>
            <div className="space-y-5">
              {t.whyChoose.items.map((item, i) => {
                const Icon = icons[i];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.35 }}
                    className={`flex items-start gap-4 ${(i === 1 || i === 5) ? "hidden sm:flex" : ""}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-[15px] text-foreground mb-0.5">
                        {item.title}
                      </h3>
                      <p className="text-[13px] text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
