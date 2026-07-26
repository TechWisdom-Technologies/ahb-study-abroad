"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CountryFlag from "@/components/shared/CountryFlag";
import { destinationData, DestinationInfo } from "@/data/destinationDetails";
import { countrySlug } from "@/hooks/useCountries";
import {
  ArrowRight, GraduationCap, Wallet, Briefcase, CalendarDays,
  FileText, CheckCircle2, Building2, ArrowLeft, Languages, BookOpen,
  Star, Clock, ClipboardList, Lightbulb,
  Monitor, Stethoscope, Scale, FlaskConical, BarChart3,
  Cpu, Landmark, Globe2, Wrench, Palette, HeartPulse, Pill, BrainCircuit,
  TrendingUp, Award, BookMarked, Users
} from "lucide-react";

const destUk = "/assets/dest-uk.jpg";
const destCanada = "/assets/dest-canada.jpg";
const destAustralia = "/assets/dest-australia.jpg";
const destNz = "/assets/dest-nz.jpg";
const destMalaysia = "/assets/dest-malaysia.jpg";
const destKorea = "/assets/dest-korea.jpg";
const destJapan = "/assets/dest-japan.jpg";
const destItaly = "/assets/dest-italy.jpg";
const destMalta = "/assets/dest-malta.jpg";
const destCyprus = "/assets/dest-cyprus.jpg";
const destFinland = "/assets/dest-finland.jpg";
const campusPartners = "/assets/campus-partners.jpg";
const notesGuidance = "/assets/notes-guidance.jpg";

const imageMap: Record<string, string> = {
  uk: destUk, canada: destCanada, australia: destAustralia,
  "new-zealand": destNz, malaysia: destMalaysia, "south-korea": destKorea,
  japan: destJapan, italy: destItaly, malta: destMalta,
  cyprus: destCyprus, finland: destFinland,
};

const ctaBgMap: Record<string, string> = {
  uk: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80",
  canada: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1920&q=80",
  australia: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1920&q=80",
  "new-zealand": "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1920&q=80",
  malaysia: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1920&q=80",
  "south-korea": "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1920&q=80",
  japan: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1920&q=80",
  italy: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1920&q=80",
  malta: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=1920&q=80",
  cyprus: "https://images.unsplash.com/photo-1600016033405-a81c1a742f8c?w=1920&q=80",
  finland: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=1920&q=80",
};

const getCourseIcon = (course: string) => {
  const lower = course.toLowerCase();
  if (lower.includes("engineering") || lower.includes("mechanical") || lower.includes("civil")) return Wrench;
  if (lower.includes("computer") || lower.includes("it") || lower.includes("software") || lower.includes("data") || lower.includes("cyber") || lower.includes("ai") || lower.includes("information tech")) return Monitor;
  if (lower.includes("medicine") || lower.includes("medical") || lower.includes("health") || lower.includes("biomedical")) return Stethoscope;
  if (lower.includes("nursing") || lower.includes("physiotherapy") || lower.includes("occupational")) return HeartPulse;
  if (lower.includes("pharmacy") || lower.includes("pharmaceutical")) return Pill;
  if (lower.includes("law") || lower.includes("legal")) return Scale;
  if (lower.includes("science") || lower.includes("biology") || lower.includes("chemistry") || lower.includes("physics") || lower.includes("environmental")) return FlaskConical;
  if (lower.includes("business") || lower.includes("mba") || lower.includes("management") || lower.includes("marketing") || lower.includes("commerce")) return BarChart3;
  if (lower.includes("finance") || lower.includes("accounting") || lower.includes("economics")) return TrendingUp;
  if (lower.includes("design") || lower.includes("art") || lower.includes("creative") || lower.includes("media") || lower.includes("animation") || lower.includes("fashion")) return Palette;
  if (lower.includes("architecture") || lower.includes("construction") || lower.includes("built")) return Landmark;
  if (lower.includes("hospitality") || lower.includes("tourism") || lower.includes("culinary")) return Globe2;
  if (lower.includes("psychology") || lower.includes("neuroscience")) return BrainCircuit;
  if (lower.includes("education") || lower.includes("teaching") || lower.includes("tesol")) return BookMarked;
  if (lower.includes("social") || lower.includes("human resource") || lower.includes("communication")) return Users;
  if (lower.includes("technology")) return Cpu;
  return BookOpen;
};

const getTuitionMeta = (program: string) => {
  const lower = program.toLowerCase();
  if (lower.includes("foundation") || lower.includes("pathway") || lower.includes("diploma")) return { icon: BookMarked, color: "from-blue-500 to-blue-600", bg: "bg-blue-50", text: "text-blue-600" };
  if (lower.includes("undergraduate") || lower.includes("bachelor")) return { icon: GraduationCap, color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50", text: "text-emerald-600" };
  if (lower.includes("master") || lower.includes("postgraduate") || lower.includes("pg")) return { icon: Award, color: "from-violet-500 to-violet-600", bg: "bg-violet-50", text: "text-violet-600" };
  if (lower.includes("mba")) return { icon: Briefcase, color: "from-amber-500 to-amber-600", bg: "bg-amber-50", text: "text-amber-600" };
  if (lower.includes("phd") || lower.includes("doctoral") || lower.includes("research")) return { icon: FlaskConical, color: "from-rose-500 to-rose-600", bg: "bg-rose-50", text: "text-rose-600" };
  if (lower.includes("english") || lower.includes("language") || lower.includes("ielts")) return { icon: Languages, color: "from-teal-500 to-teal-600", bg: "bg-teal-50", text: "text-teal-600" };
  if (lower.includes("medical") || lower.includes("medicine") || lower.includes("nursing")) return { icon: Stethoscope, color: "from-red-500 to-red-600", bg: "bg-red-50", text: "text-red-600" };
  if (lower.includes("engineering")) return { icon: Wrench, color: "from-indigo-500 to-indigo-600", bg: "bg-indigo-50", text: "text-indigo-600" };
  return { icon: GraduationCap, color: "from-primary to-primary", bg: "bg-primary/10", text: "text-primary" };
};

const courseColors = [
  { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
  { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
  { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-100" },
  { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
  { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100" },
  { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-100" },
  { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-100" },
  { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-100" },
];

const buildInfoFromDB = (dbCountry: any, slug: string): DestinationInfo | null => {
  const hardcoded = destinationData[slug];

  const hasDBContent = dbCountry.tagline || (Array.isArray(dbCountry.highlights) && dbCountry.highlights.length > 0);

  if (!hasDBContent && !hardcoded) return null;

  const h = hardcoded || {} as Partial<DestinationInfo>;

  return {
    slug,
    name: dbCountry.name || h.name || "",
    flagCode: dbCountry.flagCode || h.flagCode || "",
    tagline: dbCountry.tagline || h.tagline || "Explore study opportunities",
    description: dbCountry.description || h.description || "",
    highlights: (Array.isArray(dbCountry.highlights) && dbCountry.highlights.length > 0) ? dbCountry.highlights : (h.highlights || []),
    whyChoose: (Array.isArray(dbCountry.whyChoose) && dbCountry.whyChoose.length > 0) ? dbCountry.whyChoose : (h.whyChoose || []),
    tuitionRange: dbCountry.expenseRange || h.tuitionRange || "",
    livingCost: dbCountry.livingCost || h.livingCost || "",
    popularCourses: (Array.isArray(dbCountry.popularCourses) && dbCountry.popularCourses.length > 0) ? dbCountry.popularCourses : (h.popularCourses || []),
    workRights: dbCountry.workRights || h.workRights || "",
    intakes: (Array.isArray(dbCountry.intakes) && dbCountry.intakes.length > 0) ? dbCountry.intakes : (h.intakes || []),
    visaInfo: dbCountry.visaInfo || h.visaInfo || "",
    universities: h.universities || [],
    englishRequirements: (Array.isArray(dbCountry.englishRequirements) && dbCountry.englishRequirements.length > 0) ? dbCountry.englishRequirements : (h.englishRequirements || []),
    tuitionDetails: (Array.isArray(dbCountry.tuitionDetails) && dbCountry.tuitionDetails.length > 0) ? dbCountry.tuitionDetails : (h.tuitionDetails || []),
    partnerInstitutions: h.partnerInstitutions,
    documentChecklist: (dbCountry.documentChecklist && typeof dbCountry.documentChecklist === "object" && !Array.isArray(dbCountry.documentChecklist) && (dbCountry.documentChecklist.undergraduate?.length > 0 || dbCountry.documentChecklist.postgraduate?.length > 0))
      ? dbCountry.documentChecklist
      : h.documentChecklist,
    specialNotes: (Array.isArray(dbCountry.specialNotes) && dbCountry.specialNotes.length > 0) ? dbCountry.specialNotes : (h.specialNotes || []),
  };
};

interface PageProps {
  params: Promise<{ country: string }>;
}

export default function DestinationDetailPage({ params }: PageProps) {
  const { country } = use(params);
  const [info, setInfo] = useState<DestinationInfo | null>(null);
  const [heroImg, setHeroImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dbUniversities, setDbUniversities] = useState<any[]>([]);

  useEffect(() => {
    if (!country) { setLoading(false); return; }

    const fetchAll = async () => {
      try {
        const hardcoded = destinationData[country];
        const staticImg = imageMap[country] || null;

        const res = await fetch("/api/countries");
        if (res.ok) {
          const countries = await res.json();
          const matchedCountry = countries?.find((c: any) => countrySlug(c.name) === country);

          if (matchedCountry) {
            const builtInfo = buildInfoFromDB(matchedCountry, country);
            if (builtInfo) setInfo(builtInfo);
            else if (hardcoded) setInfo(hardcoded);

            setHeroImg(matchedCountry.heroImageUrl || staticImg);

            const uniRes = await fetch(`/api/universities?countryId=${matchedCountry.id}`);
            if (uniRes.ok) {
              const unis = await uniRes.json();
              setDbUniversities(unis || []);
            }
          } else if (hardcoded) {
            setInfo(hardcoded);
            setHeroImg(staticImg);
          }
        }
      } catch (err) {
        console.error("Error fetching destination details:", err);
      }
      setLoading(false);
    };
    fetchAll();
  }, [country]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">Destination not found</h1>
        <Link href="/destinations"><Button variant="outline">← Back to Destinations</Button></Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#283492] via-[#3B4CAA] to-[#5B6BC0]" />
        {heroImg && <img src={heroImg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />}
        <div className="container relative z-10">
          <Link href="/destinations" className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Destinations
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <CountryFlag code={info.flagCode} size="lg" />
              <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-white">Study in {info.name}</h1>
            </div>
            <p className="text-white/70 text-lg">{info.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      {info.highlights.length > 0 && (
        <section className="py-4 bg-accent">
          <div className="container flex flex-wrap items-center justify-center gap-6">
            {info.highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-accent-foreground" />
                <span className="font-heading font-semibold text-xs text-accent-foreground">{h}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Overview */}
      <section className="py-14">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="font-heading font-bold text-2xl text-foreground mb-4">Why Study in {info.name}?</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{info.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: GraduationCap, label: "Tuition Range", value: info.tuitionRange },
                  { icon: Wallet, label: "Living Cost", value: info.livingCost },
                  { icon: Briefcase, label: "Work Rights", value: info.workRights },
                  { icon: CalendarDays, label: "Intakes", value: info.intakes.join(", ") },
                ].filter(item => item.value).map((item, i) => (
                  <div key={i} className="bg-card border border-border rounded p-4 hover:border-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary mb-2" />
                    <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
                    <div className="font-heading font-semibold text-sm text-foreground">{item.value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {heroImg && <img src={heroImg} alt={info.name} className="rounded w-full h-64 lg:h-full object-cover" loading="lazy" width={800} height={600} />}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      {info.whyChoose && info.whyChoose.length > 0 && (
        <section className="py-12 section-muted">
          <div className="container">
            <h2 className="font-heading font-bold text-2xl text-foreground text-center mb-8">Why Choose {info.name}?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {info.whyChoose.map((reason, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded p-4 flex items-start gap-3 hover:border-primary/20 transition-colors">
                  <Star className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{reason}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Courses */}
      {info.popularCourses.length > 0 && (
        <section className="py-12">
          <div className="container">
            <h2 className="font-heading font-bold text-2xl text-foreground text-center mb-8">Popular Courses</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {info.popularCourses.map((course, i) => {
                const CourseIcon = getCourseIcon(course);
                const palette = courseColors[i % courseColors.length];
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                    className={`bg-card border ${palette.border} rounded p-4 text-center hover:border-primary/30 hover:shadow-md transition-all group`}>
                    <div className={`w-10 h-10 rounded-full ${palette.bg} flex items-center justify-center mx-auto mb-2`}>
                      <CourseIcon className={`w-5 h-5 ${palette.text}`} />
                    </div>
                    <span className="text-xs font-medium text-foreground">{course}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* English Language Requirements */}
      {info.englishRequirements && info.englishRequirements.length > 0 && (
        <section className="py-12 section-muted">
          <div className="container">
            <h2 className="font-heading font-bold text-2xl text-foreground text-center mb-8">
              <Languages className="w-6 h-6 inline-block mr-2 text-primary" />
              English Language Requirements
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-heading font-semibold text-foreground">Level</th>
                    <th className="text-center py-3 px-4 font-heading font-semibold text-foreground">IELTS</th>
                    {info.englishRequirements.some(r => r.pte) && <th className="text-center py-3 px-4 font-heading font-semibold text-foreground">PTE</th>}
                    {info.englishRequirements.some(r => r.toefl) && <th className="text-center py-3 px-4 font-heading font-semibold text-foreground">TOEFL</th>}
                    {info.englishRequirements.some(r => r.duolingo) && <th className="text-center py-3 px-4 font-heading font-semibold text-foreground">Duolingo</th>}
                    {info.englishRequirements.some(r => r.oietc) && <th className="text-center py-3 px-4 font-heading font-semibold text-foreground">OIETC</th>}
                  </tr>
                </thead>
                <tbody>
                  {info.englishRequirements.map((req, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium text-foreground">{req.level}</td>
                      <td className="py-3 px-4 text-center text-muted-foreground">{req.ielts}</td>
                      {info.englishRequirements!.some(r => r.pte) && <td className="py-3 px-4 text-center text-muted-foreground">{req.pte || "-"}</td>}
                      {info.englishRequirements!.some(r => r.toefl) && <td className="py-3 px-4 text-center text-muted-foreground">{req.toefl || "-"}</td>}
                      {info.englishRequirements!.some(r => r.duolingo) && <td className="py-3 px-4 text-center text-muted-foreground">{req.duolingo || "-"}</td>}
                      {info.englishRequirements!.some(r => r.oietc) && <td className="py-3 px-4 text-center text-muted-foreground">{req.oietc || "-"}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Tuition Fee Details */}
      {info.tuitionDetails && info.tuitionDetails.length > 0 && (
        <section className="py-12">
          <div className="container">
            <h2 className="font-heading font-bold text-2xl text-foreground text-center mb-8">
              <Wallet className="w-6 h-6 inline-block mr-2 text-primary" />
              Tuition Fee Breakdown
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {info.tuitionDetails.map((td, i) => {
                const meta = getTuitionMeta(td.program);
                const TdIcon = meta.icon;
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="bg-card border border-border rounded p-5 text-center hover:border-primary/20 hover:shadow-md transition-all group">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${meta.color} flex items-center justify-center mx-auto mb-3 shadow-md`}>
                      <TdIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className={`text-xs font-heading font-semibold ${meta.text} mb-1`}>{td.program}</div>
                    <div className="font-heading font-bold text-lg text-foreground">{td.fee}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Visa Info */}
      {info.visaInfo && (
        <section className="py-12 section-muted">
          <div className="container">
            <div className="bg-card border border-border rounded p-6 flex flex-col md:flex-row items-start gap-4">
              <div className="w-14 h-14 rounded bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground mb-1">Visa Information</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{info.visaInfo}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Partner Institutions */}
      {(() => {
        const dbUnis = dbUniversities
          .filter(u => {
            const hardcodedNames = [
              ...(info.partnerInstitutions || []).map(p => p.name.toLowerCase()),
              ...info.universities.map(u => u.name.toLowerCase()),
            ];
            return !hardcodedNames.includes(u.name.toLowerCase());
          })
          .map(u => ({
            name: u.name,
            url: u.websiteUrl || undefined,
            category: u.isPartner ? "Partner" : undefined,
            scholarship: u.scholarshipAvailable ? "Scholarship Available" : undefined,
            tuition: u.tuitionFeeRange || undefined,
          }));

        const hasPartners = info.partnerInstitutions && info.partnerInstitutions.length > 0;
        const allPartners = hasPartners ? info.partnerInstitutions! : [];
        const allSimpleUnis = info.universities || [];
        const totalUnis = allPartners.length + allSimpleUnis.length + dbUnis.length;

        if (totalUnis === 0) return null;

        return (
          <section className="py-12 relative">
            <div className="container">
              <div className="relative rounded overflow-hidden mb-8">
                <img src={campusPartners} alt="University campus" className="w-full h-40 object-cover" loading="lazy" width={1280} height={512} />
                <div className="absolute inset-0 bg-gradient-to-r from-[#3B4CAA]/90 via-[#3B4CAA]/70 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="container">
                    <h2 className="font-heading font-bold text-2xl text-white">
                      {hasPartners ? `Our Partner Institutions in ${info.name}` : `Partner Universities in ${info.name}`}
                    </h2>
                    {hasPartners && <p className="text-white/70 text-sm mt-1">Click on any institution to visit their official website</p>}
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {allPartners.map((inst, i) => (
                  <motion.div key={`partner-${i}`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                    className="bg-card border border-border rounded p-4 hover:border-primary/20 hover:shadow-md transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        {inst.url ? (
                          <a href={inst.url} target="_blank" rel="noopener noreferrer" className="font-heading font-semibold text-sm text-foreground hover:text-primary transition-colors">{inst.name}</a>
                        ) : (
                          <div className="font-heading font-semibold text-sm text-foreground">{inst.name}</div>
                        )}
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {inst.category && <span className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded">{inst.category}</span>}
                          {inst.rank && <span className="text-[10px] px-1.5 py-0.5 bg-accent/20 text-accent-foreground rounded">{inst.rank}</span>}
                          {inst.scholarship && <span className="text-[10px] px-1.5 py-0.5 bg-accent/10 text-accent-foreground rounded">🎓 {inst.scholarship}</span>}
                        </div>
                        {inst.campus && <div className="text-xs text-muted-foreground mt-1">📍 {inst.campus}</div>}
                        {inst.offerTime && (
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Offer: {inst.offerTime}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {!hasPartners && allSimpleUnis.map((uni, i) => (
                  <motion.div key={`uni-${i}`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className="bg-card border border-border rounded p-4 flex items-center gap-3 hover:border-primary/20 hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      {uni.url ? (
                        <a href={uni.url} target="_blank" rel="noopener noreferrer" className="font-heading font-semibold text-sm text-foreground hover:text-primary transition-colors">{uni.name}</a>
                      ) : (
                        <div className="font-heading font-semibold text-sm text-foreground">{uni.name}</div>
                      )}
                      {uni.rank && <div className="text-xs text-accent font-medium">{uni.rank}</div>}
                    </div>
                  </motion.div>
                ))}
                {dbUnis.map((uni, i) => (
                  <motion.div key={`db-${i}`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (allPartners.length + allSimpleUnis.length + i) * 0.03 }}
                    className="bg-card border border-border rounded p-4 hover:border-primary/20 hover:shadow-md transition-all">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0 mt-0.5">
                        <Building2 className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        {uni.url ? (
                          <a href={uni.url} target="_blank" rel="noopener noreferrer" className="font-heading font-semibold text-sm text-foreground hover:text-primary transition-colors">{uni.name}</a>
                        ) : (
                          <div className="font-heading font-semibold text-sm text-foreground">{uni.name}</div>
                        )}
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {uni.category && <span className="text-[10px] px-1.5 py-0.5 bg-primary/10 text-primary rounded">{uni.category}</span>}
                          {uni.scholarship && <span className="text-[10px] px-1.5 py-0.5 bg-accent/10 text-accent-foreground rounded">🎓 {uni.scholarship}</span>}
                          {uni.tuition && <span className="text-[10px] px-1.5 py-0.5 bg-muted text-muted-foreground rounded">💰 {uni.tuition}</span>}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Document Checklist */}
      {info.documentChecklist && (
        <section className="py-12 section-muted">
          <div className="container">
            <h2 className="font-heading font-bold text-2xl text-foreground text-center mb-8">
              <ClipboardList className="w-6 h-6 inline-block mr-2 text-primary" />
              Application Document Checklist
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded p-5">
                <h3 className="font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" /> Undergraduate
                </h3>
                <ul className="space-y-2">
                  {info.documentChecklist.undergraduate.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-card border border-border rounded p-5">
                <h3 className="font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" /> Postgraduate
                </h3>
                <ul className="space-y-2">
                  {info.documentChecklist.postgraduate.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Special Notes */}
      {info.specialNotes && info.specialNotes.length > 0 && (
        <section className="py-12">
          <div className="container">
            <div className="grid md:grid-cols-[1fr_300px] gap-6 items-start">
              <div className="bg-primary/5 border border-primary/10 rounded p-6">
                <h3 className="font-heading font-bold text-foreground mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-accent" /> Important Notes
                </h3>
                <ul className="space-y-3">
                  {info.specialNotes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hidden md:block">
                <img src={notesGuidance} alt="Expert guidance" className="w-full h-full object-cover rounded" loading="lazy" width={800} height={512} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <img src={ctaBgMap[country || ""] || heroImg || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80"} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#283492]/85" />
        <div className="container relative z-10 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">Ready to Study in {info.name}?</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto text-lg">Get expert guidance on applications, scholarships, and visa processing - completely free.</p>
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
