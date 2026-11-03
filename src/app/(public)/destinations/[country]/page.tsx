"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import CountryFlag from "@/components/shared/CountryFlag";
import { destinationData, DestinationInfo } from "@/data/destinationDetails";
import { countrySlug } from "@/hooks/useCountries";
import { DocumentCategory, hasDocuments, normalizeDocumentChecklist } from "@/lib/documentChecklist";
import { CourseCategory, normalizePopularCourses } from "@/lib/popularCourses";
import { lookupUniversityMeta } from "@/lib/universityLookup";
import UniversityLogo from "@/components/shared/UniversityLogo";
import {
  ArrowRight, GraduationCap, Wallet, Briefcase, CalendarDays,
  FileText, CheckCircle2, Building2, ArrowLeft, Languages, BookOpen,
  Star, Clock, ClipboardList, Lightbulb,
  Monitor, Stethoscope, Scale, FlaskConical, BarChart3,
  Cpu, Landmark, Globe2, Wrench, Palette, HeartPulse, Pill, BrainCircuit,
  TrendingUp, Award, BookMarked, Users, ChevronDown, ChevronUp, ExternalLink
} from "lucide-react";

const destUk = "/assets/dest-uk.jpg";
const destCanada = "/assets/dest-canada.jpg";
const destAustralia = "/assets/dest-australia.jpg";
const destNz = "/assets/dest-nz.jpg";
const destMalaysia = "/assets/dest-malaysia.jpg";
const destMalta = "/assets/dest-malta.jpg";
const destFinland = "/assets/dest-finland.jpg";
const campusPartners = "/assets/campus-partners.jpg";
const notesGuidance = "/assets/notes-guidance.jpg";

const imageMap: Record<string, string> = {
  uk: destUk, canada: destCanada, australia: destAustralia,
  "new-zealand": destNz, malaysia: destMalaysia,
  malta: destMalta, finland: destFinland,
};

const ctaBgMap: Record<string, string> = {
  uk: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80",
  canada: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1920&q=80",
  australia: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1920&q=80",
  "new-zealand": "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1920&q=80",
  malaysia: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1920&q=80",
  malta: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=1920&q=80",
  finland: "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=1920&q=80",
};

const UNIS_PER_PAGE = 10;
const COURSES_PER_BATCH = 10;

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

const getDocCategoryIcon = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes("post") || lower.includes("master")) return BookOpen;
  if (lower.includes("phd") || lower.includes("doctor") || lower.includes("research")) return FlaskConical;
  if (lower.includes("visa")) return FileText;
  if (lower.includes("foundation") || lower.includes("diploma") || lower.includes("pathway")) return BookMarked;
  if (lower.includes("financ") || lower.includes("bank") || lower.includes("sponsor")) return Wallet;
  return GraduationCap;
};

type DestinationPageInfo = Omit<DestinationInfo, "documentChecklist" | "popularCourses"> & {
  documentChecklist: DocumentCategory[];
  popularCourses: CourseCategory[];
};

const fromStaticInfo = (info: DestinationInfo): DestinationPageInfo => ({
  ...info,
  popularCourses: normalizePopularCourses(info.popularCourses),
  documentChecklist: normalizeDocumentChecklist(info.documentChecklist),
});

const buildInfoFromDB = (dbCountry: any, slug: string): DestinationPageInfo | null => {
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
    popularCourses: (() => {
      const fromDB = normalizePopularCourses(dbCountry.popularCourses);
      return fromDB.length > 0 ? fromDB : normalizePopularCourses(h.popularCourses);
    })(),
    workRights: dbCountry.workRights || h.workRights || "",
    intakes: (Array.isArray(dbCountry.intakes) && dbCountry.intakes.length > 0) ? dbCountry.intakes : (h.intakes || []),
    visaInfo: dbCountry.visaInfo || h.visaInfo || "",
    universities: h.universities || [],
    englishRequirements: (Array.isArray(dbCountry.englishRequirements) && dbCountry.englishRequirements.length > 0) ? dbCountry.englishRequirements : (h.englishRequirements || []),
    tuitionDetails: (Array.isArray(dbCountry.tuitionDetails) && dbCountry.tuitionDetails.length > 0) ? dbCountry.tuitionDetails : (h.tuitionDetails || []),
    partnerInstitutions: h.partnerInstitutions,
    documentChecklist: (() => {
      const fromDB = normalizeDocumentChecklist(dbCountry.documentChecklist);
      return hasDocuments(fromDB) ? fromDB : normalizeDocumentChecklist(h.documentChecklist);
    })(),
    specialNotes: (Array.isArray(dbCountry.specialNotes) && dbCountry.specialNotes.length > 0) ? dbCountry.specialNotes : (h.specialNotes || []),
  };
};

interface PageProps {
  params: Promise<{ country: string }>;
}

export default function DestinationDetailPage({ params }: PageProps) {
  const { country } = use(params);
  const [info, setInfo] = useState<DestinationPageInfo | null>(null);
  const [heroImg, setHeroImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [dbUniversities, setDbUniversities] = useState<any[]>([]);
  const [visibleUniCount, setVisibleUniCount] = useState(UNIS_PER_PAGE);
  const [visibleSubCourseCounts, setVisibleSubCourseCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    setVisibleUniCount(UNIS_PER_PAGE);
    setVisibleSubCourseCounts({});
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
            else if (hardcoded) setInfo(fromStaticInfo(hardcoded));

            setHeroImg(matchedCountry.heroImageUrl || staticImg);

            const uniRes = await fetch(`/api/universities?countryId=${matchedCountry.id}`);
            if (uniRes.ok) {
              const unis = await uniRes.json();
              setDbUniversities(unis || []);
            }
          } else if (hardcoded) {
            setInfo(fromStaticInfo(hardcoded));
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
        <Link href="/destinations"><InteractiveHoverButton className="bg-card text-foreground border-border px-5 py-2">← Back to Destinations</InteractiveHoverButton></Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[400px] lg:min-h-[92vh] flex items-center overflow-hidden bg-[#141C3A]">
        {/* Base background colors & image overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#141C3A] via-[#1A254D] to-[#2B3C7A]" />
        {heroImg && (
          <img
            src={heroImg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-lighten brightness-90 z-[1]"
          />
        )}
        <div className="absolute inset-0 z-[2] bg-[url('/assets/grid-pattern.svg')] opacity-10" />

        {/* Decorative glows */}
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none z-[2]" />
        <div className="absolute bottom-10 left-[5%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-[2]" />

        <div className="container relative z-10 py-10 lg:py-0 text-center">
          <Link href="/destinations" className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-xs uppercase tracking-widest font-heading mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to All Destinations
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3.5 mb-4">
              <CountryFlag code={info.flagCode} size="xl" className="shadow-md rounded border border-white/20" />
              <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15]">Study in {info.name}</h1>
            </div>
            <p className="text-sm md:text-lg text-white leading-relaxed max-w-xl mx-auto">{info.tagline}</p>
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
      {info.popularCourses.length > 0 && (() => {
        const hasSubCourses = info.popularCourses.some(cat => cat.courses && cat.courses.length > 0);
        return (
          <section className="py-12">
            <div className="container">
              <h2 className="font-heading font-bold text-2xl text-foreground text-center mb-8">Popular Courses</h2>
              <div className={hasSubCourses ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start" : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"}>
                {info.popularCourses.map((cat, i) => {
                  const title = cat.category || "General";
                  const CourseIcon = getCourseIcon(title);
                  const palette = courseColors[i % courseColors.length];
                  const subCourses = cat.courses || [];
                  const visibleLimit = visibleSubCourseCounts[i] ?? COURSES_PER_BATCH;
                  const shownSubCourses = subCourses.slice(0, visibleLimit);
                  const remainingSub = subCourses.length - shownSubCourses.length;

                  if (!hasSubCourses) {
                    return (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                        className={`bg-card border ${palette.border} rounded p-4 text-center hover:border-primary/30 hover:shadow-md transition-all group`}>
                        <div className={`w-10 h-10 rounded-full ${palette.bg} flex items-center justify-center mx-auto mb-2`}>
                          <CourseIcon className={`w-5 h-5 ${palette.text}`} />
                        </div>
                        <span className="text-xs font-medium text-foreground">{title}</span>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                      className={`bg-card border ${palette.border} rounded-lg p-5 hover:border-primary/30 hover:shadow-md transition-all flex flex-col`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full ${palette.bg} flex items-center justify-center shrink-0`}>
                          <CourseIcon className={`w-5 h-5 ${palette.text}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading font-semibold text-sm text-foreground truncate">{title}</h3>
                          {subCourses.length > 0 && (
                            <span className="text-[11px] text-muted-foreground">{subCourses.length} {subCourses.length === 1 ? "course" : "courses"}</span>
                          )}
                        </div>
                      </div>
                      {subCourses.length > 0 && (
                        <>
                          <ol className="space-y-1.5 pt-3 border-t border-border/60">
                            {shownSubCourses.map((sub, j) => (
                              <li
                                key={j}
                                className="flex items-start gap-2.5 text-xs text-foreground py-1 px-2 rounded hover:bg-muted/50 transition-colors"
                              >
                                <span className={`w-5 h-5 rounded-full ${palette.bg} ${palette.text} text-[10px] font-semibold flex items-center justify-center shrink-0 mt-0.5`}>
                                  {j + 1}
                                </span>
                                <span className="leading-relaxed">{sub}</span>
                              </li>
                            ))}
                          </ol>
                          {subCourses.length > COURSES_PER_BATCH && (
                            <div className="pt-3 mt-2 border-t border-border/40">
                              {remainingSub > 0 ? (
                                <button
                                  type="button"
                                  onClick={() => setVisibleSubCourseCounts(prev => ({ ...prev, [i]: visibleLimit + COURSES_PER_BATCH }))}
                                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-heading font-semibold text-primary hover:underline py-1"
                                >
                                  Show More ({Math.min(COURSES_PER_BATCH, remainingSub)} more)
                                  <ChevronDown className="w-3.5 h-3.5" />
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setVisibleSubCourseCounts(prev => ({ ...prev, [i]: COURSES_PER_BATCH }))}
                                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-heading font-semibold text-muted-foreground hover:text-primary py-1"
                                >
                                  Show Less
                                  <ChevronUp className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })()}

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
        // Collect and unify all universities (hardcoded partners + static unis + DB unis)
        const seenNames = new Set<string>();
        type UnifiedUni = {
          name: string;
          url?: string;
          logoUrl?: string;
          tuition?: string;
          requirements?: string;
          category?: string;
          rank?: string;
          scholarship?: string;
          campus?: string;
          offerTime?: string;
        };

        const allInstitutions: UnifiedUni[] = [];

        // 1. Static partner institutions (e.g. from destinationDetails.ts)
        (info.partnerInstitutions || []).forEach(inst => {
          const clean = inst.name.toLowerCase().trim();
          seenNames.add(clean);
          // Look up enriched meta from DB or lookup dictionary
          const dbMatch = dbUniversities.find(d => d.name.toLowerCase().trim() === clean || d.name.toLowerCase().includes(clean) || clean.includes(d.name.toLowerCase()));
          const meta = lookupUniversityMeta(inst.name, inst.url, info.tuitionRange);

          allInstitutions.push({
            name: inst.name,
            url: inst.url || dbMatch?.websiteUrl || meta.websiteUrl,
            logoUrl: dbMatch?.logoUrl || meta.logoUrl || (inst.url ? `https://www.google.com/s2/favicons?domain=${new URL(inst.url).hostname}&sz=128` : undefined),
            tuition: dbMatch?.tuitionFeeRange || inst.tuition || meta.tuitionFeeRange,
            requirements: dbMatch?.requirements || inst.requirements || meta.requirements,
            category: inst.category || (dbMatch?.isPartner ? "Partner" : undefined),
            rank: inst.rank,
            scholarship: inst.scholarship || (dbMatch?.scholarshipAvailable ? "Scholarship Available" : undefined),
            campus: inst.campus,
            offerTime: inst.offerTime,
          });
        });

        // 2. Simple static universities if any
        (info.universities || []).forEach(uni => {
          const clean = uni.name.toLowerCase().trim();
          if (seenNames.has(clean)) return;
          seenNames.add(clean);
          const dbMatch = dbUniversities.find(d => d.name.toLowerCase().trim() === clean || d.name.toLowerCase().includes(clean) || clean.includes(d.name.toLowerCase()));
          const meta = lookupUniversityMeta(uni.name, uni.url, info.tuitionRange);

          allInstitutions.push({
            name: uni.name,
            url: uni.url || dbMatch?.websiteUrl || meta.websiteUrl,
            logoUrl: dbMatch?.logoUrl || meta.logoUrl || (uni.url ? `https://www.google.com/s2/favicons?domain=${new URL(uni.url).hostname}&sz=128` : undefined),
            tuition: dbMatch?.tuitionFeeRange || meta.tuitionFeeRange,
            requirements: dbMatch?.requirements || meta.requirements,
            rank: uni.rank,
            scholarship: dbMatch?.scholarshipAvailable ? "Scholarship Available" : undefined,
          });
        });

        // 3. Database universities for this country
        dbUniversities.forEach(u => {
          const clean = u.name.toLowerCase().trim();
          if (seenNames.has(clean)) return;
          seenNames.add(clean);
          const meta = lookupUniversityMeta(u.name, u.websiteUrl, info.tuitionRange);

          allInstitutions.push({
            name: u.name,
            url: u.websiteUrl || meta.websiteUrl,
            logoUrl: u.logoUrl || meta.logoUrl,
            tuition: u.tuitionFeeRange || meta.tuitionFeeRange,
            requirements: u.requirements || meta.requirements,
            category: u.isPartner ? "Partner" : undefined,
            scholarship: u.scholarshipAvailable ? "Scholarship Available" : undefined,
          });
        });

        const totalUnis = allInstitutions.length;
        if (totalUnis === 0) return null;

        const shownUnis = allInstitutions.slice(0, visibleUniCount);
        const shownCount = shownUnis.length;
        const remaining = totalUnis - shownCount;
        const delayFor = (index: number, step: number) => (index % UNIS_PER_PAGE) * step;

        const hasPartners = info.partnerInstitutions && info.partnerInstitutions.length > 0;

        return (
          <section id="partner-universities" className="py-12 relative scroll-mt-20">
            <div className="container">
              <div className="relative rounded overflow-hidden mb-8">
                <img src={campusPartners} alt="University campus" className="w-full h-40 object-cover" loading="lazy" width={1280} height={512} />
                <div className="absolute inset-0 bg-gradient-to-r from-[#141C3A]/90 via-[#141C3A]/70 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="container">
                    <h2 className="font-heading font-bold text-2xl text-white">
                      {hasPartners ? `Our Partner Institutions in ${info.name}` : `Partner Universities in ${info.name}`}
                    </h2>
                    <p className="text-white/70 text-sm mt-1">Showing verified tuition fees, admission requirements, and official portals</p>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {shownUnis.map((inst, i) => (
                  <motion.div key={`uni-${i}`} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: delayFor(i, 0.03) }}
                    className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-lg transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-start gap-3.5 mb-2.5">
                        <UniversityLogo name={inst.name} logoUrl={inst.logoUrl} className="w-12 h-12" />
                        <div className="flex-1 min-w-0">
                          {inst.url ? (
                            <a
                              href={inst.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-heading font-bold text-sm text-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                            >
                              <span className="line-clamp-2">{inst.name}</span>
                              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary shrink-0 opacity-70" />
                            </a>
                          ) : (
                            <div className="font-heading font-bold text-sm text-foreground line-clamp-2">{inst.name}</div>
                          )}

                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {inst.category && <span className="text-[10px] font-semibold px-2 py-0.5 bg-primary/10 text-primary rounded-full">{inst.category}</span>}
                            {inst.rank && <span className="text-[10px] font-semibold px-2 py-0.5 bg-accent/20 text-accent-foreground rounded-full">{inst.rank}</span>}
                            {inst.scholarship && <span className="text-[10px] font-semibold px-2 py-0.5 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-full">🎓 {inst.scholarship}</span>}
                          </div>
                        </div>
                      </div>

                      {/* Location or Offer */}
                      {(inst.campus || inst.offerTime) && (
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2 px-1">
                          {inst.campus && <span>📍 {inst.campus}</span>}
                          {inst.offerTime && <span>⏱️ Offer: {inst.offerTime}</span>}
                        </div>
                      )}

                      {/* Tuition Fee Range */}
                      {inst.tuition && (
                        <div className="mt-3 p-2 rounded-md bg-primary/5 border border-primary/10 text-xs">
                          <div className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider mb-0.5">Estimated Tuition</div>
                          <div className="font-semibold text-primary">{inst.tuition}</div>
                        </div>
                      )}

                      {/* Requirements */}
                      {inst.requirements && (
                        <div className="mt-2 p-2 rounded-md bg-muted/40 border border-border/60 text-xs leading-relaxed text-muted-foreground">
                          <span className="font-semibold text-foreground text-[11px] block mb-0.5">Admission Requirements:</span>
                          <span className="text-[11px] line-clamp-3">{inst.requirements}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              {totalUnis > UNIS_PER_PAGE && (
                <div className="flex flex-col items-center gap-2 mt-8">
                  <p className="text-xs text-muted-foreground">
                    Showing {shownCount} of {totalUnis} universities
                  </p>
                  {remaining > 0 ? (
                    <button
                      type="button"
                      onClick={() => setVisibleUniCount(c => c + UNIS_PER_PAGE)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded border border-primary text-primary font-heading font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Show More ({Math.min(UNIS_PER_PAGE, remaining)} more)
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setVisibleUniCount(UNIS_PER_PAGE);
                        document.getElementById("partner-universities")?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded border border-border text-muted-foreground font-heading font-semibold text-sm hover:border-primary hover:text-primary transition-colors"
                    >
                      Show Less
                      <ChevronUp className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>
          </section>
        );
      })()}

      {/* Document Checklist */}
      {hasDocuments(info.documentChecklist) && (
        <section className="py-12 section-muted">
          <div className="container">
            <h2 className="font-heading font-bold text-2xl text-foreground text-center mb-8">
              <ClipboardList className="w-6 h-6 inline-block mr-2 text-primary" />
              Application Document Checklist
            </h2>
            <div className={`grid gap-6 ${info.documentChecklist.length === 1 ? "max-w-xl mx-auto" : info.documentChecklist.length === 2 || info.documentChecklist.length === 4 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
              {info.documentChecklist.filter(cat => cat.items.length > 0).map((cat, ci) => {
                const Icon = getDocCategoryIcon(cat.title);
                return (
                  <div key={ci} className="bg-card border border-border rounded p-5">
                    <h3 className="font-heading font-bold text-foreground mb-3 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-primary" /> {cat.title || "Documents"}
                    </h3>
                    <ul className="space-y-2">
                      {cat.items.map((doc, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
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
      <section className="py-16 md:py-24 relative overflow-hidden">
        <img src={ctaBgMap[country || ""] || heroImg || "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80"} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#141C3A]/85" />
        <div className="container relative z-10 text-center">
          <h2 className="font-heading font-semibold text-2xl md:font-bold md:text-4xl text-white mb-3">Ready to Start Your Journey to {info.name}?</h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto text-xs md:text-lg">Our expert counselors will guide you through the university selection, application, and visa process for {info.name}.</p>
          <Link href="/contact">
            <InteractiveHoverButton className="bg-accent text-white border-transparent hover:bg-[#141C3A] hover:border-[#141C3A] text-sm md:text-base px-8 py-3 md:px-10 md:py-4">
              Get Free Consultation
            </InteractiveHoverButton>
          </Link>
        </div>
      </section>
    </>
  );
}
