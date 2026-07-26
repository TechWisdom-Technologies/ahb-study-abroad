"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, GraduationCap, BookOpen, FileText,
  Users, Plane, Wallet, Languages, CheckCircle2, MessageCircle,
  ClipboardCheck, HeadphonesIcon
} from "lucide-react";

const servicesHero = "/assets/services-hero.jpg";
const serviceCounseling = "/assets/service-counseling.jpg";
const serviceUniversity = "/assets/service-university.jpg";
const serviceExam = "/assets/service-exam.jpg";
const serviceVisa = "/assets/service-visa.jpg";
const serviceParent = "/assets/service-parent.jpg";
const serviceDeparture = "/assets/service-departure.jpg";
const serviceScholarship = "/assets/service-scholarship.jpg";

const services = [
  {
    icon: GraduationCap,
    image: serviceCounseling,
    title: "Study Abroad Counseling",
    desc: "Personalized one-on-one sessions with certified education consultants who understand your goals, budget, and aspirations.",
    features: ["Academic profile assessment", "Country & university shortlisting", "Course selection guidance", "Budget planning"],
  },
  {
    icon: BookOpen,
    image: serviceUniversity,
    title: "University Selection & Application",
    desc: "Expert assistance in selecting the right universities and preparing strong applications that stand out.",
    features: ["University research & matching", "SOP & essay writing support", "Document preparation", "Application tracking"],
  },
  {
    icon: Languages,
    image: serviceExam,
    title: "English Language Exam Support",
    desc: "Complete support for IELTS, TOEFL, PTE Academic, and Linguaskill - from preparation to registration.",
    features: ["IELTS/TOEFL/PTE preparation", "Mock tests & practice sessions", "Exam registration assistance", "Score improvement strategies"],
  },
  {
    icon: FileText,
    image: serviceVisa,
    title: "Visa File Optimization",
    desc: "Thorough visa file preparation with high success rates. We ensure your application is complete and compelling.",
    features: ["Document checklist preparation", "Financial document review", "Visa interview coaching", "Application submission guidance"],
  },
  {
    icon: Users,
    image: serviceParent,
    title: "Parent Support Desk",
    desc: "Dedicated support for parents with concerns about their child's education journey abroad.",
    features: ["Parent counseling sessions", "Safety & accommodation briefing", "Financial planning guidance", "Regular progress updates"],
  },
  {
    icon: Plane,
    image: serviceDeparture,
    title: "Pre-Departure & Arrival Support",
    desc: "Complete assistance from booking flights to settling into your new city and university.",
    features: ["Pre-departure orientation", "Accommodation assistance", "Airport pickup coordination", "Local SIM & bank setup"],
  },
  {
    icon: Wallet,
    image: serviceScholarship,
    title: "Scholarship Assistance",
    desc: "We actively search, match, and help you apply for scholarships to reduce your financial burden.",
    features: ["Scholarship database access", "Eligibility assessment", "Application support", "Interview preparation"],
  },
];

const processSteps = [
  { icon: MessageCircle, title: "Free Consultation", desc: "Book a session to discuss your goals and aspirations", color: "from-blue-500 to-blue-600", bg: "bg-blue-50", text: "text-blue-600" },
  { icon: ClipboardCheck, title: "Profile Assessment", desc: "We evaluate your academic background and preferences", color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50", text: "text-emerald-600" },
  { icon: BookOpen, title: "Application & Offer", desc: "We handle applications and secure your offer letter", color: "from-violet-500 to-violet-600", bg: "bg-violet-50", text: "text-violet-600" },
  { icon: FileText, title: "Visa Processing", desc: "Expert visa file preparation with 97% success rate", color: "from-amber-500 to-amber-600", bg: "bg-amber-50", text: "text-amber-600" },
  { icon: Plane, title: "Pre-Departure", desc: "Complete orientation and travel preparation support", color: "from-rose-500 to-rose-600", bg: "bg-rose-50", text: "text-rose-600" },
  { icon: HeadphonesIcon, title: "Ongoing Support", desc: "We stay connected even after you arrive abroad", color: "from-teal-500 to-teal-600", bg: "bg-teal-50", text: "text-teal-600" },
];

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#283492] via-[#3B4CAA] to-[#5B6BC0]" />
        <img src={servicesHero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-widest uppercase bg-accent/20 text-accent rounded font-heading">Our Services</span>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-white mb-4">Everything You Need to Study Abroad</h1>
            <p className="text-white/70 text-lg">From your first consultation to your arrival at university - we provide complete, free support at every step.</p>
          </motion.div>
        </div>
      </section>

      {/* Free service banner */}
      <section className="py-4 bg-accent">
        <div className="container flex flex-wrap items-center justify-center gap-6">
          {["100% Free Consultation", "Expert Counselors", "98.3% Visa Success", "300+ University Partners"].map((label, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent-foreground" />
              <span className="font-heading font-semibold text-xs text-accent-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services Grid — 2 columns with images */}
      <section className="py-14">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl text-foreground">What We Offer</h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">Comprehensive support at every stage of your study abroad journey - all completely free.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="bg-card border border-border rounded overflow-hidden hover:border-primary/30 transition-all group flex flex-col sm:flex-row"
              >
                {/* Image */}
                <div className="sm:w-52 h-36 sm:h-auto shrink-0 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    width={640}
                    height={512}
                  />
                </div>
                {/* Content */}
                <div className="p-5 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-9 h-9 rounded bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors shrink-0">
                      <service.icon className="w-4 h-4 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-foreground">{service.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{service.desc}</p>
                  <ul className="grid grid-cols-2 gap-1.5">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 section-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-foreground">How It Works</h2>
            <p className="text-muted-foreground mt-2">Our simple 6-step process to get you to your dream university</p>
          </div>

          {/* Desktop/Tablet: 2 rows with long SVG arrows */}
          <div className="hidden md:flex flex-col gap-2">
            {/* Row 1 */}
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-0">
              {[0, 1, 2].flatMap((index, i) => {
                const step = processSteps[index];
                return [
                  <div key={`r1-card-${index}`} className="bg-card border border-border rounded p-5 text-center">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className={`text-[10px] font-heading font-bold ${step.text} uppercase tracking-wider`}>Step {index + 1}</span>
                    <h4 className="font-heading font-semibold text-sm text-foreground mt-1 mb-1">{step.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>,
                  i < 2 ? (
                    <div key={`r1-arrow-${index}`} className="flex items-center justify-center px-1">
                      <svg width="60" height="24" viewBox="0 0 60 24" fill="none" className="w-full min-w-[40px] max-w-[80px]">
                        <line x1="0" y1="12" x2="50" y2="12" stroke="var(--color-accent)" strokeWidth="3" />
                        <polygon points="50,6 60,12 50,18" fill="var(--color-accent)" />
                      </svg>
                    </div>
                  ) : null,
                ];
              })}
            </div>

            {/* Down arrow aligned to right card */}
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr]">
              <div className="col-start-5 flex items-center justify-center py-1">
                <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
                  <line x1="12" y1="0" x2="12" y2="30" stroke="var(--color-accent)" strokeWidth="3" />
                  <polygon points="6,30 12,40 18,30" fill="var(--color-accent)" />
                </svg>
              </div>
            </div>

            {/* Row 2 — reversed (6, 5, 4) */}
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch gap-0">
              {[5, 4, 3].flatMap((index, i) => {
                const step = processSteps[index];
                return [
                  <div key={`r2-card-${index}`} className="bg-card border border-border rounded p-5 text-center">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className={`text-[10px] font-heading font-bold ${step.text} uppercase tracking-wider`}>Step {index + 1}</span>
                    <h4 className="font-heading font-semibold text-sm text-foreground mt-1 mb-1">{step.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>,
                  i < 2 ? (
                    <div key={`r2-arrow-${index}`} className="flex items-center justify-center px-1">
                      <svg width="60" height="24" viewBox="0 0 60 24" fill="none" className="w-full min-w-[40px] max-w-[80px]">
                        <line x1="60" y1="12" x2="10" y2="12" stroke="var(--color-accent)" strokeWidth="3" />
                        <polygon points="10,6 0,12 10,18" fill="var(--color-accent)" />
                      </svg>
                    </div>
                  ) : null,
                ];
              })}
            </div>
          </div>

          {/* Mobile: vertical stack */}
          <div className="md:hidden space-y-2">
            {processSteps.map((step, i) => (
              <div key={step.title}>
                <div className="bg-card border border-border rounded p-4 text-center">
                  <div className="flex items-center gap-3 text-left">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shrink-0 shadow-md`}>
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className={`text-[9px] font-heading font-bold ${step.text} uppercase tracking-wider`}>Step {i + 1}</span>
                      <h4 className="font-heading font-semibold text-sm text-foreground">{step.title}</h4>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2">{step.desc}</p>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="flex items-center justify-center py-1">
                    <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                      <line x1="12" y1="0" x2="12" y2="20" stroke="var(--color-accent)" strokeWidth="2.5" />
                      <polygon points="7,20 12,28 17,20" fill="var(--color-accent)" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#283492]/85" />
        <div className="container relative z-10 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">Ready to Get Started?</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto text-lg">All our services are completely free. Book a consultation today and take the first step.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-semibold px-8 rounded">
              Book Free Consultation <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
