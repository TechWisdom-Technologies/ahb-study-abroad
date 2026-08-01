"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqIllustration = "/assets/faq-illustration.jpg";

const faqs = [
  {
    q: "Is AHB Study Abroad's counseling guidance free?",
    a: "Yes! Our counseling, application support, and guidance services are completely free and transparent with no hidden costs.",
  },
  {
    q: "What English proficiency tests do you support?",
    a: "We provide support and guidance for IELTS, TOEFL, PTE Academic, and Duolingo English Test.",
  },
  {
    q: "How long does the entire process take?",
    a: "From initial counseling to departure, the process typically takes 3-6 months depending on the country, intake, and visa processing times.",
  },
  {
    q: "Can I get a scholarship through AHB Study Abroad?",
    a: "Pardonably yes! We actively help students find and apply for scholarships based on academic results and financial requirements.",
  },
  {
    q: "Do you help with visa applications?",
    a: "We provide complete visa file optimization, documentation guidance, and pre-departure preparation support.",
  },
  {
    q: "Which countries can I study in through AHB Study Abroad?",
    a: "We offer admission & visa support for Canada, UK, USA, Australia, Ireland, New Zealand, France, Germany, Netherlands, Sweden, Finland, Denmark, Hungary, Malta, Malaysia, and China.",
  },
];

const FaqSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-10">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading font-semibold text-xl md:text-3xl text-foreground">{t.faq.title}</h2>
          <p className="text-xs md:text-base text-muted-foreground mt-2">{t.faq.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          <div className="lg:col-span-3 flex flex-col">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded px-4">
                  <AccordionTrigger className="text-left font-heading font-normal sm:font-medium text-foreground text-sm hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="lg:col-span-2 hidden lg:flex h-full min-h-0 flex-col self-stretch overflow-hidden">
            <div className="flex-1 basis-0 min-h-0 rounded overflow-hidden relative group">
              <img
                src={faqIllustration}
                alt="Frequently asked questions"
                className="w-full h-full object-cover rounded transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#330066]/20 mix-blend-multiply pointer-events-none rounded" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141C3A]/60 via-transparent to-transparent pointer-events-none rounded" />
            </div>
            <Link
              href="/contact"
              className="shrink-0 mt-3 block bg-gradient-to-r from-[#330066] to-[#5CBAE6] border border-[#5CBAE6]/20 rounded p-3.5 text-center text-white hover:opacity-95 hover:scale-[1.01] transition-all duration-300 shadow-md group"
            >
              <p className="font-heading font-semibold text-sm mb-0.5 group-hover:text-white transition-colors">Still have questions?</p>
              <p className="text-xs text-white/90 leading-tight">Contact us anytime - we're here to help.</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
