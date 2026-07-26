"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import {
  BookOpen, Clock, Award, Users, CheckCircle2, ArrowRight,
  GraduationCap, Headphones, PenTool, MessageSquare,
  Target, Star, ChevronDown, Send
} from "lucide-react";
import CourseRegistrationModal from "@/components/CourseRegistrationModal";

const ieltsHero = "/assets/ielts-hero.jpg";
const ieltsModuleListening = "/assets/ielts-module-listening.jpg";
const ieltsModuleReading = "/assets/ielts-module-reading.jpg";
const ieltsModuleWriting = "/assets/ielts-module-writing.jpg";
const ieltsModuleSpeaking = "/assets/ielts-module-speaking.jpg";
const logoPte = "/assets/logo-pte.png";
const logoLinguaskill = "/assets/logo-linguaskill.png";
const logoToefl = "/assets/logo-toefl.png";
const logoDuolingo = "/assets/logo-duolingo.png";
const logoOet = "/assets/logo-oet.png";
const ieltsFaq = "/assets/ielts-faq.jpg";

/* ─── Data ─── */
const testModules = [
  {
    icon: Headphones, title: "Listening", duration: "30 minutes + 10 min transfer time", img: ieltsModuleListening,
    questions: "40 questions", sections: "4 sections",
    desc: "You will listen to four recordings of native English speakers and answer questions based on each recording.",
    details: [
      "Section 1: A conversation between two people in an everyday social context",
      "Section 2: A monologue in an everyday social context (e.g. a speech about local facilities)",
      "Section 3: A conversation between up to four people in an educational or training context",
      "Section 4: A monologue on an academic subject (e.g. a university lecture)",
    ],
    taskTypes: "Multiple choice, matching, plan/map/diagram labelling, form/note/table/flow-chart/summary completion, sentence completion",
    scoring: "Each correct answer receives 1 mark. Band scores are calculated from 40 raw marks.",
  },
  {
    icon: BookOpen, title: "Reading", duration: "60 minutes", img: ieltsModuleReading,
    questions: "40 questions", sections: "3 passages",
    desc: "You will read three long passages taken from books, journals, magazines and newspapers. Texts are authentic and academic in nature.",
    details: [
      "Passage 1: Generally the easiest, often descriptive or factual in nature",
      "Passage 2: Moderately difficult with more complex arguments and viewpoints",
      "Passage 3: The most challenging passage with abstract concepts and dense argumentation",
      "Texts range from descriptive and factual to discursive and analytical",
    ],
    taskTypes: "Multiple choice, identifying information (True/False/Not Given), identifying writer's views (Yes/No/Not Given), matching, sentence completion, summary completion, diagram labelling, short-answer questions",
    scoring: "Each correct answer receives 1 mark. No penalty for incorrect answers — never leave blanks.",
  },
  {
    icon: PenTool, title: "Writing", duration: "60 minutes", img: ieltsModuleWriting,
    questions: "2 tasks", sections: "Task 1 + Task 2",
    desc: "You will complete two writing tasks. Task 2 carries twice as many marks as Task 1, so manage your time accordingly.",
    details: [
      "Task 1 (20 min): Describe, summarise or explain visual information such as graphs, tables, charts or diagrams in at least 150 words",
      "Task 2 (40 min): Write an essay in response to a point of view, argument or problem in at least 250 words",
      "You are assessed on: Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy",
      "Handwritten or computer-delivered options available depending on test centre",
    ],
    taskTypes: "Task 1: Report writing from visual data. Task 2: Discursive/argumentative essay",
    scoring: "Marked by certified examiners using four criteria, each contributing equally to the band score.",
  },
  {
    icon: MessageSquare, title: "Speaking", duration: "11–14 minutes", img: ieltsModuleSpeaking,
    questions: "3 parts", sections: "Face-to-face interview",
    desc: "A face-to-face interview with a certified IELTS examiner. The test is recorded and assesses your spoken English across three distinct parts.",
    details: [
      "Part 1 (4–5 min): Introduction and general questions about yourself, home, work, studies and interests",
      "Part 2 (3–4 min): Individual long turn — you receive a task card and speak for 1–2 minutes on the topic, then answer follow-up questions",
      "Part 3 (4–5 min): Two-way discussion — the examiner asks further questions linked to the Part 2 topic, exploring abstract ideas",
      "Assessed on: Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, and Pronunciation",
    ],
    taskTypes: "Spontaneous speech, extended monologue, and analytical discussion",
    scoring: "Marked by the examiner in real time using four equally weighted criteria.",
  },
];

const scoreBands = [
  { band: "9", level: "Expert", desc: "Full command of the language" },
  { band: "8", level: "Very Good", desc: "Occasional inaccuracies" },
  { band: "7", level: "Good", desc: "Handles complex language well" },
  { band: "6.5", level: "Competent", desc: "Most university minimum" },
  { band: "6", level: "Competent", desc: "Effective despite inaccuracies" },
  { band: "5.5", level: "Modest", desc: "Partial command of language" },
];

const whyIelts = [
  { icon: GraduationCap, title: "University Admissions", desc: "Accepted by 11,000+ organizations worldwide including universities, employers, and immigration authorities." },
  { icon: Target, title: "Immigration", desc: "Required for visa applications to UK, Australia, Canada, New Zealand and many other countries." },
  { icon: Award, title: "Career Growth", desc: "Demonstrates English proficiency to employers globally, opening doors to international career opportunities." },
  { icon: Star, title: "Globally Recognized", desc: "The world's most popular English test for higher education and migration, taken by over 3.5 million people annually." },
];

const otherExams = [
  { name: "PTE Academic", full: "Pearson Test of English", desc: "Computer-based English test accepted by thousands of universities and colleges globally. Results typically available within 48 hours.", logo: logoPte },
  { name: "Linguaskill", full: "Cambridge Linguaskill", desc: "Fast, convenient online test from Cambridge. Ideal for university admissions and visa applications with quick results.", logo: logoLinguaskill },
  { name: "TOEFL iBT", full: "Test of English as a Foreign Language", desc: "Widely accepted English test, especially popular for US and Canadian university admissions.", logo: logoToefl },
  { name: "Duolingo English Test", full: "Duolingo English Test (DET)", desc: "Affordable, convenient online English proficiency test accepted by 4,000+ programs worldwide.", logo: logoDuolingo },
  { name: "OET", full: "Occupational English Test", desc: "Designed for healthcare professionals seeking to practice in English-speaking countries.", logo: logoOet },
];

/* ─── Preparation Tips per Module ─── */
const listeningTips = [
  "Practice listening without subtitles daily",
  "Focus on keywords and signpost words",
  "Learn to predict answers before audio plays",
  "Practice note-taking while listening",
  "Familiarize yourself with different accents",
  "Listen to BBC, CNN, and TED Talks daily",
  "Practice spelling of common academic words",
  "Read questions carefully before audio starts",
  "Don't leave any answers blank",
  "Review and transfer answers carefully",
];

const readingTips = [
  "Skim passages before reading questions",
  "Practice scanning for specific information",
  "Learn to identify paragraph main ideas",
  "Build academic vocabulary daily",
  "Time yourself: 20 minutes per passage",
  "Read newspapers and journals regularly",
  "Practice True/False/Not Given questions",
  "Underline key words in questions",
  "Don't spend too long on one question",
  "Read the instructions very carefully",
];

const writingTips = [
  "Plan your essay for 5 minutes before writing",
  "Use varied sentence structures and vocabulary",
  "Practice Task 1 data descriptions regularly",
  "Write at least 250 words for Task 2",
  "Use linking words for coherence",
  "Address all parts of the question",
  "Proofread for grammar errors",
  "Practice time management: 20 + 40 min",
  "Learn common essay structures",
  "Avoid repeating the same words",
];

const speakingTips = [
  "Practice speaking English every day",
  "Record yourself and listen back",
  "Expand answers with examples",
  "Don't memorize scripted answers",
  "Use a range of tenses naturally",
  "Practice the 2-minute long turn",
  "Stay calm and speak at natural pace",
  "Learn topic-specific vocabulary",
  "Ask the examiner to repeat if needed",
  "Practice with a partner or tutor",
];

const moduleColors = [
  { bg: "bg-blue-50", border: "border-blue-200", title: "text-blue-700", icon: "text-blue-500", accent: "bg-blue-500", bullet: "text-blue-400" },
  { bg: "bg-emerald-50", border: "border-emerald-200", title: "text-emerald-700", icon: "text-emerald-500", accent: "bg-emerald-500", bullet: "text-emerald-400" },
  { bg: "bg-amber-50", border: "border-amber-200", title: "text-amber-700", icon: "text-amber-500", accent: "bg-amber-500", bullet: "text-amber-400" },
  { bg: "bg-purple-50", border: "border-purple-200", title: "text-purple-700", icon: "text-purple-500", accent: "bg-purple-500", bullet: "text-purple-400" },
];

const moduleTipsData = [
  { title: "Listening", icon: Headphones, tips: listeningTips },
  { title: "Reading", icon: BookOpen, tips: readingTips },
  { title: "Writing", icon: PenTool, tips: writingTips },
  { title: "Speaking", icon: MessageSquare, tips: speakingTips },
];

const faqs = [
  { q: "What is the IELTS test fee in Bangladesh?", a: "The IELTS test fee is approximately BDT 25,500. Cambry can help you register at the best available rate and guide you through the payment process." },
  { q: "How long is the IELTS score valid?", a: "IELTS scores are valid for 2 years from the test date. Plan your test accordingly based on your university application or visa timeline." },
  { q: "What's the difference between Academic and General Training?", a: "Academic IELTS is for university admissions and professional registration. General Training is for migration and work experience. Cambry will advise which one you need." },
  { q: "How soon can I retake the IELTS?", a: "You can retake IELTS as soon as you feel ready — there's no waiting period. We recommend at least 2-4 weeks of additional preparation between attempts." },
  { q: "Does Cambry provide IELTS coaching?", a: "Yes! We offer comprehensive IELTS preparation courses with experienced trainers, mock tests, and personalized feedback to help you achieve your target score." },
  { q: "What score do I need for studying abroad?", a: "Most universities require a minimum overall band of 6.0-6.5, with no individual band below 5.5-6.0. Requirements vary by university and program." },
];

const allExamOptions = [
  "IELTS Academic", "IELTS General Training", "IELTS UKVI Academic",
  "IELTS UKVI General", "IELTS Life Skills", "PTE Academic",
  "Linguaskill", "TOEFL iBT", "Duolingo English Test", "OET",
];

export default function IeltsRegistrationPage() {
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [testType, setTestType] = useState("");
  const [dbTests, setDbTests] = useState<any[]>([]);
  const { toast } = useToast();
  const [courseModal, setCourseModal] = useState<{ open: boolean; name: string; fee?: string | null; duration?: string | null }>({ open: false, name: "" });

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await fetch("/api/english-tests");
        if (res.ok) {
          const data = await res.json();
          setDbTests(data || []);
        }
      } catch (err) {
        console.error("Error loading english tests:", err);
      }
    };
    fetchTests();
  }, []);

  const scrollToForm = (preselect?: string) => {
    if (preselect) setTestType(preselect);
    setShowForm(true);
    setTimeout(() => document.getElementById("ielts-form")?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setLoading(true);

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name") as string,
          email: fd.get("email") as string,
          phone: fd.get("phone") as string,
          destination: "IELTS Registration",
          course: testType || "IELTS",
          leadType: "english_test",
          details: {
            test_type: testType || "Not specified",
            preferred_date: fd.get("preferred_date") || "Flexible",
            message: fd.get("message") || "",
          },
        }),
      });

      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        toast({ title: "Error", description: result.error || "Something went wrong. Please try again.", variant: "destructive" });
        return;
      }

      toast({ title: "Registration Received!", description: "Our team will contact you within 24 hours to help complete your registration." });
      form.reset();
      setTestType("");
      setShowForm(false);
    } catch (err) {
      setLoading(false);
      toast({ title: "Error", description: "Failed to connect to server.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen">
      {/* ─── Hero ─── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={ieltsHero} alt="Students preparing for IELTS" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#283492]/95 via-[#3B4CAA]/85 to-[#3B4CAA]/70" />
        </div>
        <div className="container relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-block bg-accent/20 text-accent font-semibold text-sm px-4 py-1.5 rounded-full mb-4">IELTS Registration & Preparation</span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-4">
              Achieve Your Dream <span className="text-[#E1243B]">IELTS</span> <span className="text-accent">Score</span>
            </h1>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg mb-8">
              Cambry International helps you register for IELTS, prepare effectively, and achieve the score you need for your study abroad journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-semibold text-base px-8"
                onClick={() => scrollToForm()}
              >
                Register for IELTS <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                className="bg-primary-foreground/10 border-2 border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/20 font-heading"
                onClick={() => document.getElementById("about-ielts")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More <ChevronDown className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-3xl mx-auto"
          >
            {[
              { icon: Users, val: "500+", label: "Students Helped" },
              { icon: Award, val: "7.5+", label: "Avg. Band Score" },
              { icon: Clock, val: "24hr", label: "Response Time" },
              { icon: CheckCircle2, val: "Free", label: "Registration Help" },
            ].map((s, i) => (
              <div key={i} className="bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded p-4">
                <s.icon className="w-6 h-6 text-accent mx-auto mb-2" />
                <div className="font-heading font-bold text-2xl text-primary-foreground">{s.val}</div>
                <div className="text-primary-foreground/60 text-sm">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Why IELTS ─── */}
      <section className="py-16 bg-background" id="about-ielts">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">Why Take IELTS?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">The International English Language Testing System is your passport to global opportunities</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyIelts.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded p-6 hover:shadow-lg transition-shadow group"
              >
                <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
                  <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Test Modules with individual images ─── */}
      <section className="py-16 section-dark">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-2">IELTS Test Format</h2>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">Four modules that assess your complete English language ability</p>
          </div>
          <div className="flex flex-col gap-6">
            {testModules.map((mod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col md:flex-row bg-primary-foreground/5 border border-primary-foreground/10 rounded overflow-hidden"
              >
                {/* Image 30% */}
                <div className="md:w-[30%] shrink-0">
                  <img src={mod.img} alt={`${mod.title} module`} className="w-full h-48 md:h-full object-cover" loading="lazy" width={400} height={400} />
                </div>
                {/* Content 70% */}
                <div className="md:w-[70%] p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded bg-accent/20 flex items-center justify-center shrink-0">
                      <mod.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-heading font-bold text-xl text-primary-foreground">{mod.title}</h3>
                    <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded font-medium">{mod.duration}</span>
                  </div>
                  <div className="flex gap-4 mb-3 text-xs text-primary-foreground/50">
                    <span className="bg-primary-foreground/10 px-2 py-0.5 rounded">{mod.questions}</span>
                    <span className="bg-primary-foreground/10 px-2 py-0.5 rounded">{mod.sections}</span>
                  </div>
                  <p className="text-primary-foreground/70 text-sm mb-3">{mod.desc}</p>
                  <ul className="space-y-1.5 mb-3">
                    {mod.details.map((d, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-primary-foreground/60">
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-xs text-primary-foreground/50 space-y-1">
                    <p><strong className="text-primary-foreground/70">Question Types:</strong> {mod.taskTypes}</p>
                    <p><strong className="text-primary-foreground/70">Scoring:</strong> {mod.scoring}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 bg-accent/10 border border-accent/20 rounded p-4 text-center">
            <p className="text-primary-foreground/80 text-sm">
              <strong className="text-accent">Total Test Time:</strong> Approximately 2 hours 45 minutes. The Speaking test may be scheduled on a different day.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Band Scores ─── */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">Understanding Band Scores</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">IELTS scores range from 0 to 9. Here are the key bands for study abroad</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {scoreBands.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`rounded p-4 text-center border ${b.band === "6.5" ? "bg-primary text-primary-foreground border-primary ring-2 ring-accent/30" : "bg-card border-border"}`}
              >
                <div className={`font-heading font-bold text-3xl mb-1 ${b.band === "6.5" ? "text-accent" : "text-primary"}`}>{b.band}</div>
                <div className={`font-semibold text-sm mb-1 ${b.band === "6.5" ? "text-primary-foreground" : "text-foreground"}`}>{b.level}</div>
                <div className={`text-xs ${b.band === "6.5" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{b.desc}</div>
                {b.band === "6.5" && <span className="inline-block mt-2 text-xs bg-accent/20 text-accent px-2 py-0.5 rounded">Most Required</span>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Preparation Tips — 4 columns, 10 tips each ─── */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">Preparation Tips</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Expert tips from our trainers for each IELTS module</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {moduleTipsData.map((mod, ci) => {
              const c = moduleColors[ci];
              return (
                <motion.div
                  key={ci}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ci * 0.1 }}
                  className={`${c.bg} ${c.border} border rounded overflow-hidden`}
                >
                  <div className={`${c.accent} px-4 py-3 flex items-center gap-2`}>
                    <mod.icon className="w-5 h-5 text-white" />
                    <h3 className="font-heading font-semibold text-white">{mod.title}</h3>
                  </div>
                  <div className="p-4 space-y-2.5">
                    {mod.tips.map((tip, ti) => (
                      <div key={ti} className="flex items-start gap-2">
                        <span className={`font-heading font-bold text-xs mt-0.5 ${c.title} shrink-0`}>{(ti + 1).toString().padStart(2, '0')}</span>
                        <p className="text-foreground/80 text-sm leading-snug">{tip}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Other Exams Section with official logos ─── */}
      <section className="py-16 section-dark">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-2">Other Exams You May Consider</h2>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">We also help students register and prepare for these internationally recognized English proficiency tests</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherExams.map((exam, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-primary-foreground/5 border border-primary-foreground/10 rounded p-6 flex flex-col"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 rounded bg-white flex items-center justify-center shrink-0 p-1.5">
                    <img src={exam.logo} alt={exam.name} className="w-full h-full object-contain" loading="lazy" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-primary-foreground">{exam.name}</h3>
                    <p className="text-primary-foreground/50 text-xs">{exam.full}</p>
                  </div>
                </div>
                <p className="text-primary-foreground/60 text-sm flex-1 mb-4">{exam.desc}</p>
                <Button
                  className="w-full bg-accent/20 hover:bg-accent/30 text-accent border border-accent/30 font-heading"
                  onClick={() => scrollToForm(exam.name)}
                >
                  Register for {exam.name} <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Courses from DB ─── */}
      {dbTests && dbTests.length > 0 && (
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">Check Our Available Courses</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Choose the right preparation path for your learning journey</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dbTests.map((test, i) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card border border-border rounded overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {test.imageUrl && (
                    <div className="w-full h-40 overflow-hidden">
                      <img src={test.imageUrl} alt={test.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  )}
                  <div className="bg-primary/5 p-4 border-b border-border">
                    <span className="text-xs uppercase tracking-wider font-semibold text-primary bg-primary/10 px-2 py-1 rounded">Course</span>
                    <h3 className="font-heading font-semibold text-lg text-foreground mt-2">{test.name}</h3>
                  </div>
                  <div className="p-5 space-y-3">
                    {test.description && <p className="text-muted-foreground text-sm">{test.description}</p>}
                    <div className="flex flex-wrap gap-3 text-sm">
                      {test.fee && (
                        <span className="flex items-center gap-1 text-foreground">
                          <span className="text-primary font-semibold text-sm">৳</span> {test.fee}
                        </span>
                      )}
                      {test.duration && (
                        <span className="flex items-center gap-1 text-foreground">
                          <Clock className="w-4 h-4 text-primary" /> {test.duration}
                        </span>
                      )}
                    </div>
                    <Button
                      className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-heading"
                      onClick={() => setCourseModal({ open: true, name: test.name, fee: test.fee, duration: test.duration })}
                    >
                      Register Now <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Common questions about IELTS and our services</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <img src={ieltsFaq} alt="Student consulting with advisor" className="w-full h-full min-h-[250px] object-cover rounded" loading="lazy" width={768} height={512} />
            </div>
            <div className="lg:col-span-3 space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card border border-border rounded overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span className="font-heading font-medium text-foreground pr-4">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4">
                      <p className="text-muted-foreground text-sm">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Registration Form ─── */}
      <section className="py-16 relative overflow-hidden" id="ielts-form">
        <div className="absolute inset-0 bg-gradient-to-br from-[#283492] via-[#3B4CAA] to-[#5B6BC0]" />
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-2">Register for Your Exam</h2>
              <p className="text-primary-foreground/70">Fill out the form below and our team will contact you within 24 hours to assist with your registration.</p>
            </div>

            {!showForm ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-semibold text-lg px-10"
                  onClick={() => setShowForm(true)}
                >
                  Start Registration <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded p-6 md:p-8 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-primary-foreground/80 text-sm font-medium mb-1 block">Full Name *</label>
                    <Input name="name" required className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label className="text-primary-foreground/80 text-sm font-medium mb-1 block">Phone Number *</label>
                    <Input name="phone" type="tel" required className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40" placeholder="+880 1XXXXXXXXX" />
                  </div>
                </div>
                <div>
                  <label className="text-primary-foreground/80 text-sm font-medium mb-1 block">Email Address *</label>
                  <Input name="email" type="email" required className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40" placeholder="your@email.com" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-primary-foreground/80 text-sm font-medium mb-1 block">Which Exam? *</label>
                    <Select value={testType} onValueChange={setTestType}>
                      <SelectTrigger className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
                        <SelectValue placeholder="Select exam type" />
                      </SelectTrigger>
                      <SelectContent>
                        {allExamOptions.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                        {dbTests?.filter(t => !allExamOptions.includes(t.name)).map(t => (
                          <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-primary-foreground/80 text-sm font-medium mb-1 block">Preferred Test Date</label>
                    <Input name="preferred_date" type="date" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40" />
                  </div>
                </div>
                <div>
                  <label className="text-primary-foreground/80 text-sm font-medium mb-1 block">Additional Message</label>
                  <Textarea name="message" rows={3} className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40" placeholder="Any specific requirements or questions..." />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-semibold text-base"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {loading ? "Submitting..." : "Submit Registration"}
                </Button>
                <p className="text-primary-foreground/50 text-xs text-center">
                  Our team will contact you within 24 hours to assist with your registration and preparation.
                </p>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      <CourseRegistrationModal
        open={courseModal.open}
        onOpenChange={(open) => setCourseModal(prev => ({ ...prev, open }))}
        courseName={courseModal.name}
        courseFee={courseModal.fee}
        courseDuration={courseModal.duration}
      />
    </div>
  );
}
