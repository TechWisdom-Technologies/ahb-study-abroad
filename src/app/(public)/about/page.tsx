"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CountryFlag from "@/components/shared/CountryFlag";
import {
  ArrowRight, Target, Eye, Heart, Users, Building2, Globe2, TrendingUp,
  CheckCircle2, Quote, Handshake, BookOpen, ShieldCheck, User
} from "lucide-react";

const aboutHero = "/assets/about-hero.jpg";
const aboutStory = "/assets/about-story.jpg";
const aboutTeam = "/assets/about-team.jpg";
const certBritishCouncil = "/assets/cert-british-council.png";
const certIcef = "/assets/cert-icef.png";
const certPier = "/assets/cert-pier.png";
const certEnz = "/assets/cert-enz.png";
const certAirc = "/assets/cert-airc.png";
const certStudyMalaysia = "/assets/cert-studymalaysia.png";

const useCountUp = (target: number, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
};

const timeline = [
  { year: "2015", title: "Founded AHB Study Abroad", desc: "AHB Study Abroad was established in Dhaka with a student-first approach to global education." },
  { year: "2017", title: "UK & Canada Admissions", desc: "Expanded direct counseling & admission support for UK and Canadian universities." },
  { year: "2019", title: "Global Expansion", desc: "Added Australia, USA, and European study destinations to our offerings." },
  { year: "2021", title: "High Visa Success", desc: "Achieved one of the highest visa approval rates for Bangladeshi students." },
  { year: "2023", title: "Trusted Consultancy", desc: "Expanded partner network to 300+ universities across 17+ countries." },
  { year: "2025", title: "End-to-End Support", desc: "Continuing to guide thousands of students with transparent and reliable services." },
];

const values = [
  { icon: Target, title: "Our Mission", desc: "To empower students with quality education opportunities across the globe while ensuring a hassle-free admission and visa process." },
  { icon: Eye, title: "Our Vision", desc: "To be Bangladesh's most trusted education consultancy, guiding every student toward academic excellence and global career success." },
  { icon: Heart, title: "Our Values", desc: "Honest & transparent guidance, student-first approach, personalized counseling, and end-to-end support before and after arrival." },
];

const certifications = [
  { name: "British Council IELTS Partner", logo: certBritishCouncil },
  { name: "ICEF Certified Agency", logo: certIcef },
  { name: "PIER Certified (Australia)", logo: certPier },
  { name: "Education New Zealand Recognized", logo: certEnz },
  { name: "AIRC Member", logo: certAirc },
  { name: "StudyMalaysia Partner", logo: certStudyMalaysia },
];

const partners = [
  { name: "University of Manchester", logo: "/partners/manchester.svg", flag: "gb", url: "https://www.manchester.ac.uk" },
  { name: "University of Leeds", logo: "/partners/leeds.svg", flag: "gb", url: "https://www.leeds.ac.uk" },
  { name: "Coventry University", logo: "/partners/coventry.svg", flag: "gb", url: "https://www.coventry.ac.uk" },
  { name: "University of Sunderland", logo: "/partners/sunderland.svg", flag: "gb", url: "https://www.sunderland.ac.uk" },
  { name: "Middlesex University", logo: "/partners/middlesex.svg", flag: "gb", url: "https://www.mdx.ac.uk" },
  { name: "University of Toronto", logo: "/partners/toronto.svg", flag: "ca", url: "https://www.utoronto.ca" },
  { name: "Monash University", logo: "/partners/monash.svg", flag: "au", url: "https://www.monash.edu" },
  { name: "University of Melbourne", logo: "/partners/melbourne.svg", flag: "au", url: "https://www.unimelb.edu.au" },
  { name: "University of Auckland", logo: "/partners/auckland.svg", flag: "nz", url: "https://www.auckland.ac.nz" },
  { name: "University of Canterbury", logo: "/partners/canterbury.svg", flag: "nz", url: "https://www.canterbury.ac.nz" },
  { name: "University of Malaya", logo: "/partners/malaya.svg", flag: "my", url: "https://www.um.edu.my" },
  { name: "Taylor's University", logo: "/partners/taylors.svg", flag: "my", url: "https://university.taylors.edu.my" },
];

const whyDifferent = [
  { icon: Handshake, title: "Honest & Transparent", desc: "No hidden rules. Honest, transparent guidance at every step of your application." },
  { icon: ShieldCheck, title: "High Visa Success", desc: "Our meticulous visa file preparation and expert guidance ensure high approval rates." },
  { icon: Globe2, title: "17+ Destinations", desc: "Comprehensive university admission options in Canada, UK, USA, Australia, Europe & Asia." },
  { icon: BookOpen, title: "End-to-End Support", desc: "From university selection to visa processing and arrival support - we're with you always." },
];

export default function AboutPage() {
  const { t } = useLanguage();
  const statsRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const s1 = useCountUp(2500, 2000, visible);
  const s2 = useCountUp(300, 2000, visible);
  const s3 = useCountUp(17, 1500, visible);
  const s4 = useCountUp(98, 2000, visible);

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#283492] via-[#3B4CAA] to-[#5B6BC0]" />
        <img src={aboutHero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-widest uppercase bg-accent/20 text-accent rounded font-heading">About Us</span>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-white mb-4">About AHB Study Abroad</h1>
            <p className="text-white/70 text-lg leading-relaxed">AHB Study Abroad is a trusted international education consultancy based in Dhaka, Bangladesh, dedicated to helping students achieve their dream of studying abroad.</p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-14">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-4">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded p-6 hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <v.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-12 section-dark">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: `${s1}+`, label: "Students Placed" },
              { icon: Building2, value: `${s2}+`, label: "Partner Universities" },
              { icon: Globe2, value: `${s3}`, label: "Countries" },
              { icon: TrendingUp, value: `${s4}%`, label: "Visa Success Rate" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className="w-8 h-8 text-accent mx-auto mb-2" />
                <div className="font-heading font-extrabold text-3xl md:text-4xl text-white">{stat.value}</div>
                <div className="text-sm text-white/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-14">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                AHB Study Abroad is a trusted international education consultancy based in Dhaka, Bangladesh, dedicated to helping students achieve their dream of studying abroad. We provide professional guidance throughout every stage of the overseas admission process—from university selection to visa application and pre-departure support.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                With a student-first approach and personalized counseling, we assist students in choosing the right university and program according to their academic background, career goals, and financial capacity. Our experienced team is committed to making the study abroad journey smooth, transparent, and successful.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We proudly offer admission and visa support for Canada, United Kingdom (UK), United States (USA), Australia, Ireland, New Zealand, France, Germany, Netherlands, Sweden, Finland, Denmark, Hungary, Malta, Malaysia, China, and European Study & Student Visa Assistance.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-3">
              <img src={aboutStory} alt="Counseling session" className="rounded w-full h-48 object-cover" loading="lazy" width={800} height={600} />
              <img src={aboutTeam} alt="Students on campus" className="rounded w-full h-48 object-cover mt-8" loading="lazy" width={800} height={600} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Words from Leadership */}
      <section className="py-14 section-muted">
        <div className="container max-w-3xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-foreground text-center mb-10">Words from Our Leadership</h2>
          <div className="grid grid-cols-1 gap-6">
            {/* CEO & Founder */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-card border border-border rounded p-8 relative shadow-sm">
              <Quote className="w-10 h-10 text-accent/30 absolute top-6 right-6" />
              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-8 h-8 text-primary/60" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl text-foreground">Arif Hossain Bhuiyan</h3>
                  <span className="text-xs text-accent font-heading font-semibold uppercase tracking-wider">CEO & Founder</span>
                </div>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed italic">
                "At AHB Study Abroad, we believe every student deserves honest, transparent, and expert guidance to reach their dream university. From university selection to visa processing and arrival support, we walk with you every step of the way to turn your global aspirations into reality."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-14">
        <div className="container">
          <h2 className="font-heading font-bold text-3xl text-foreground text-center mb-10">What Makes Us Different</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyDifferent.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="bg-card border border-border rounded p-5 text-center hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-colors">
                  <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Institutions */}
      <section className="py-14 section-muted">
        <div className="container">
          <h2 className="font-heading font-bold text-3xl text-foreground text-center mb-3">Our Partner Institutions</h2>
          <p className="text-muted-foreground text-center mb-8 max-w-lg mx-auto">We work with 300+ universities and colleges across 11 countries to bring you the best education options.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {partners.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <a href={p.url} target="_blank" rel="noopener noreferrer"
                  className="bg-card border border-border rounded p-4 flex items-center gap-3 hover:border-primary/20 transition-colors block">
                  <div className="w-10 h-10 rounded bg-white border border-border flex items-center justify-center shrink-0 overflow-hidden p-1">
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector("span")) {
                          const span = document.createElement("span");
                          span.className = "text-xs font-bold text-primary";
                          span.textContent = p.name.split(" ").map(w => w[0]).join("").slice(0, 3);
                          parent.appendChild(span);
                        }
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium text-foreground leading-tight">{p.name}</span>
                  <CountryFlag code={p.flag} size="sm" className="ml-auto shrink-0" />
                </a>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/destinations">
              <Button variant="outline" className="font-heading font-semibold text-xs">
                View All Destinations <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14">
        <div className="container">
          <h2 className="font-heading font-bold text-3xl text-foreground text-center mb-10">Our Journey</h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px" />
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative flex items-start mb-6 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1.5 mt-1.5 z-10 ring-4 ring-background" />
                <div className={`ml-10 md:ml-0 md:w-[45%] ${i % 2 === 0 ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8'}`}>
                  <span className="font-heading font-bold text-accent text-sm">{item.year}</span>
                  <h3 className="font-heading font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-12 section-muted">
        <div className="container">
          <h2 className="font-heading font-bold text-2xl text-foreground text-center mb-8">Accreditations & Certifications</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {certifications.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="bg-card border border-border rounded p-4 text-center hover:border-primary/20 transition-colors flex flex-col items-center justify-center">
                <img src={c.logo} alt={c.name} className="w-14 h-14 object-contain mb-2" loading="lazy" width={512} height={512} />
                <span className="text-xs font-medium text-muted-foreground">{c.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#283492]/85" />
        <div className="container relative z-10 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">Ready to Start Your Journey?</h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto text-lg">Join thousands of students who have trusted Cambry to guide them to their dream university abroad.</p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-semibold px-8 rounded">
              Get Free Consultation <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
