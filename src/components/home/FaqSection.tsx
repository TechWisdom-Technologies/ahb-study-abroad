"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqIllustration = "/assets/faq-illustration.jpg";

const faqs = [
  {
    q: "Is Cambry's service really free?",
    a: "Yes! Our counseling, application support, and university placement services are completely free. We are funded by our partner institutions.",
  },
  {
    q: "What English proficiency tests do you support?",
    a: "We provide support and registration for IELTS, TOEFL, PTE Academic, and Linguaskill. We also offer preparation courses for all these exams.",
  },
  {
    q: "How long does the entire process take?",
    a: "From initial counseling to departure, the process typically takes 3-6 months depending on the country, intake, and visa processing times.",
  },
  {
    q: "Can I get a scholarship through Cambry?",
    a: "Absolutely! We actively help students find and apply for scholarships. Many of our partner universities offer exclusive scholarships for our students.",
  },
  {
    q: "Do you help with visa applications?",
    a: "We provide complete visa file optimization and preparation support. While we don't process visas directly, we ensure your application is thorough and well-prepared.",
  },
  {
    q: "Which countries can I study in through Cambry?",
    a: "Our primary destinations are UK, Canada, Australia, New Zealand, and Malaysia. We also work with South Korea, Japan, Italy, Malta, Cyprus, and Finland.",
  },
];

const FaqSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 section-muted">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground">{t.faq.title}</h2>
          <p className="text-muted-foreground mt-2">{t.faq.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
          <div className="lg:col-span-3 flex flex-col">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="bg-card border border-border rounded px-4">
                  <AccordionTrigger className="text-left font-heading font-medium text-foreground text-sm hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="lg:col-span-2 hidden lg:flex h-full min-h-0 flex-col self-stretch overflow-hidden">
            <div className="flex-1 basis-0 min-h-0 rounded overflow-hidden">
              <img
                src={faqIllustration}
                alt="Frequently asked questions"
                className="w-full h-full object-cover rounded"
                loading="lazy"
              />
            </div>
            <div className="shrink-0 mt-3 bg-primary/5 border border-primary/10 rounded p-3 text-center">
              <p className="font-heading font-semibold text-foreground text-sm mb-0.5">Still have questions?</p>
              <p className="text-xs text-muted-foreground leading-tight">Contact us anytime - we're here to help.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
