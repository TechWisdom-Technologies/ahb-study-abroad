"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
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
    image: serviceUniversity,
    title: "University & College Admission",
    desc: "Direct application and admission support for top colleges and universities across Canada, UK, USA, Australia, and Europe.",
    features: ["Direct university applications", "Fast offer turnaround", "Scholarship matching", "Offer letter acceptance"],
  },
  {
    icon: Users,
    image: serviceCounseling,
    title: "Career Counseling",
    desc: "In-depth counseling to align your academic goals with global career opportunities and employment prospects.",
    features: ["1-on-1 counselor advice", "Global career mapping", "Industry demand analysis", "Personalized study plan"],
  },
  {
    icon: BookOpen,
    image: serviceUniversity,
    title: "Course Selection",
    desc: "Professional guidance to choose the right subject, degree level, and major tailored to your academic background.",
    features: ["Subject credit evaluation", "Future-proof course choice", "Prerequisite matching", "Flexible intake selection"],
  },
  {
    icon: Wallet,
    image: serviceScholarship,
    title: "Scholarship Guidance",
    desc: "Expert assistance in identifying and applying for merit-based and financial aid scholarships.",
    features: ["Scholarship search & match", "Fee waiver support", "Grant application guidance", "High success rate"],
  },
  {
    icon: Languages,
    image: serviceExam,
    title: "IELTS & English Language Consultation",
    desc: "Comprehensive guidance for IELTS, TOEFL, PTE Academic, and Duolingo score requirements and preparation.",
    features: ["Score requirement review", "MOI & exam waiver advice", "Prep strategy consultation", "Exam booking assistance"],
  },
  {
    icon: FileText,
    image: serviceVisa,
    title: "Student Visa Processing",
    desc: "Meticulous student visa file preparation with one of the highest approval rates in Bangladesh.",
    features: ["Visa file creation", "Embassy interview prep", "Visa rules compliance", "High approval record"],
  },
  {
    icon: ClipboardCheck,
    image: serviceVisa,
    title: "Statement of Purpose (SOP) Assistance",
    desc: "Professional guidance to craft a compelling, authentic Statement of Purpose (SOP) and Study Plan.",
    features: ["SOP structure advice", "Authenticity review", "Personal essay guidance", "Visa SOP optimization"],
  },
  {
    icon: CheckCircle2,
    image: serviceVisa,
    title: "Visa Documentation Support",
    desc: "Detailed review and organization of financial, academic, and legal documents for visa submission.",
    features: ["Financial proof review", "Sponsor document check", "Notary & translation advice", "Error-free documentation"],
  },
  {
    icon: Plane,
    image: serviceDeparture,
    title: "Accommodation Guidance",
    desc: "Assistance in finding safe, affordable student housing, on-campus dorms, or shared apartments abroad.",
    features: ["On-campus housing booking", "Off-campus apartment guidance", "Verified student rooms", "Safety & budget review"],
  },
  {
    icon: Wallet,
    image: serviceScholarship,
    title: "Education Loan & Financial Advice",
    desc: "Clear financial planning advice to meet tuition, living costs, and bank solvency requirements.",
    features: ["Bank statement advice", "Loan sponsor guidance", "Fund requirement breakdown", "Financial planning"],
  },
  {
    icon: HeadphonesIcon,
    image: serviceDeparture,
    title: "Pre-Departure Briefing",
    desc: "Comprehensive briefing before you travel to ensure a smooth transition to your study destination.",
    features: ["Travel & airport tips", "Customs & luggage rules", "Local SIM & bank account", "Orientation guidance"],
  },
];

const whyChooseItems = [
  "Experienced Education Consultants",
  "Honest & Transparent Guidance",
  "Personalized Student Support",
  "High Visa Success Rate",
  "End-to-End Admission Assistance",
  "Fast & Reliable Service",
  "Support Before and After Arrival",
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
      <section className="relative min-h-[600px] lg:min-h-[92vh] flex items-center overflow-hidden bg-[#141C3A]">
        {/* Base background colors & image overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#141C3A] via-[#1A254D] to-[#2B3C7A]" />
        <img
          src={servicesHero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-lighten brightness-90 z-[1]"
        />
        <div className="absolute inset-0 z-[2] bg-[url('/assets/grid-pattern.svg')] opacity-10" />

        {/* Decorative glows */}
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none z-[2]" />
        <div className="absolute bottom-10 left-[5%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-[2]" />

        <div className="container relative z-10 py-20 lg:py-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-md mb-3 font-normal tracking-widest uppercase text-white rounded font-heading">Our Services</span>
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15] mb-6">Everything You Need to Study Abroad</h1>
            <p className="text-base md:text-lg text-white leading-relaxed max-w-xl mx-auto">From your first consultation to your arrival at university - we provide complete, free support at every step.</p>
            <div className="mt-8 flex justify-center">
              <Link href="/contact">
                <InteractiveHoverButton className="bg-accent text-white border-transparent hover:bg-[#141C3A] hover:border-[#141C3A] font-heading font-normal px-8 py-2.5 text-xs shadow-none">
                  Contact Us
                </InteractiveHoverButton>
              </Link>
            </div>
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

      {/* Why Choose AHB Study Abroad? */}
      <section className="py-14 bg-background">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl text-foreground">Why Choose AHB Study Abroad?</h2>
            <p className="text-muted-foreground mt-2">Your trusted partner for international education and student visa success</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {whyChooseItems.map((item, i) => (
              <div key={i} className="bg-card border border-border rounded p-4 flex items-center gap-3 hover:border-primary/40 transition-all shadow-sm">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <span className="font-heading font-medium text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#141C3A]/85" />
        <div className="container relative z-10 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">Ready to Get Started?</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto text-lg">All our services are completely free. Book a consultation today and take the first step.</p>
          <Link href="/contact">
            <InteractiveHoverButton className="bg-accent text-white border-transparent hover:bg-[#141C3A] hover:border-[#141C3A]">
              Book Free Consultation
            </InteractiveHoverButton>
          </Link>
        </div>
      </section>
    </>
  );
}
