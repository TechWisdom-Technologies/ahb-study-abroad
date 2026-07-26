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
  { year: "2009", title: "Founded", desc: "Cambry was established in Dhaka with a mission to make global education accessible." },
  { year: "2011", title: "UK Partnership", desc: "Partnered with leading UK universities, became official IELTS registration center." },
  { year: "2014", title: "Growing Network", desc: "Expanded to 50+ university partnerships across the UK and Europe." },
  { year: "2017", title: "Canada & Australia", desc: "Expanded partnerships to Canadian and Australian institutions." },
  { year: "2019", title: "1,000 Students", desc: "Milestone of placing 1,000+ students in top universities worldwide." },
  { year: "2021", title: "Digital Expansion", desc: "Launched online counseling services, expanded to 11 countries." },
  { year: "2023", title: "Award Winning", desc: "Recognized as Best Education Consultancy in Bangladesh." },
  { year: "2025", title: "2,500+ Students", desc: "Continuing to grow with 300+ university partners across 11 countries." },
];

const values = [
  { icon: Target, title: "Our Mission", desc: "To empower Bangladeshi students to access world-class education through expert guidance, transparency, and unwavering support." },
  { icon: Eye, title: "Our Vision", desc: "To be Bangladesh's most trusted education consultancy, enabling every aspiring student to study at their dream university abroad." },
  { icon: Heart, title: "Our Values", desc: "Integrity, student-first approach, transparency in services, and commitment to making quality education accessible to all." },
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
  { icon: Handshake, title: "100% Free Consultation", desc: "We are funded by our partner institutions - students never pay a single taka for our services." },
  { icon: ShieldCheck, title: "98.3% Visa Success", desc: "Our meticulous visa file preparation and expert guidance ensure near-perfect success rates." },
  { icon: Globe2, title: "11 Countries, 300+ Universities", desc: "One of the widest university networks among Bangladeshi education consultancies." },
  { icon: BookOpen, title: "End-to-End Support", desc: "From first consultation to airport pickup abroad - we're with you at every step of your journey." },
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
  const s2 = useCountUp(200, 2000, visible);
  const s3 = useCountUp(11, 1500, visible);
  const s4 = useCountUp(97, 2000, visible);

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#283492] via-[#3B4CAA] to-[#5B6BC0]" />
        <img src={aboutHero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold tracking-widest uppercase bg-accent/20 text-accent rounded font-heading">About Us</span>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-white mb-4">Shaping Futures Through Global Education</h1>
            <p className="text-white/70 text-lg leading-relaxed">Since our founding, Cambry International Admission Center has helped thousands of Bangladeshi students realize their dreams of studying at world-renowned universities.</p>
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
                Founded in 2009 in Dhaka, Bangladesh, Cambry International Admission Center started with a simple belief: every student deserves access to quality global education regardless of their background.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                What began as a small team of passionate education consultants has grown into one of Bangladesh's most trusted agencies, with partnerships spanning 300+ universities across 11 countries.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our 100% free consultation model ensures that financial barriers never stand between a student and their dream university. We are funded by our partner institutions, allowing us to provide unbiased, student-first guidance.
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
        <div className="container">
          <h2 className="font-heading font-bold text-3xl text-foreground text-center mb-10">Words from Our Leadership</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Founder */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-card border border-border rounded p-6 relative">
              <Quote className="w-8 h-8 text-accent/30 absolute top-4 right-4" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-8 h-8 text-primary/60" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground">Shamim Hossain</h3>
                  <span className="text-xs text-accent font-heading font-semibold">Owner</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "When I started Cambry in 2009, I had one dream - to ensure that no talented Bangladeshi student is held back from accessing global education due to lack of guidance or resources. Today, seeing over 2,500 students thriving in universities across 11 countries fills me with immense pride. Every student's success story is a testament to our team's dedication and the trust families place in us."
              </p>
            </motion.div>

            {/* CEO */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded p-6 relative">
              <Quote className="w-8 h-8 text-accent/30 absolute top-4 right-4" />
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="w-8 h-8 text-primary/60" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground">KF Hassan</h3>
                  <span className="text-xs text-accent font-heading font-semibold">CEO</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "At Cambry, we don't just process applications - we build futures. Our 97% visa success rate isn't just a number; it represents thousands of dreams realized. We continuously expand our university partnerships and invest in our team's expertise to ensure every student receives world-class guidance. Our commitment to keeping services 100% free is what truly sets us apart."
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
