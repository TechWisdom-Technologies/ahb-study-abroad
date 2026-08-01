"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import {
  GraduationCap,
  Briefcase,
  BookOpen,
  Award,
  Languages,
  FileCheck,
  FileText,
  FolderOpen,
  Home,
  Landmark,
  Plane,
  ArrowRight,
} from "lucide-react";

const serviceIcons = [
  GraduationCap,
  Briefcase,
  BookOpen,
  Award,
  Languages,
  FileCheck,
  FileText,
  FolderOpen,
  Home,
  Landmark,
  Plane,
];

const ServicesSection = () => {
  const { t, language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Provide service fallback details in English/Bengali
  const servicesList = [
    {
      title: language === "en" ? "University & College Admission" : "বিশ্ববিদ্যালয় ও কলেজ ভর্তি",
      desc: language === "en" 
        ? "Direct applications and admissions support to top-tier international universities." 
        : "শীর্ষস্থানীয় আন্তর্জাতিক বিশ্ববিদ্যালয়গুলিতে সরাসরি আবেদন এবং ভর্তি সহায়তা।",
    },
    {
      title: language === "en" ? "Career Counseling" : "ক্যারিয়ার কাউন্সেলিং",
      desc: language === "en" 
        ? "Personalized guidance to align your study programs with future global career goals." 
        : "ভবিষ্যতের বৈশ্বিক ক্যারিয়ার লক্ষ্যের সাথে আপনার স্টাডি প্রোগ্রাম মেলানোর জন্য ব্যক্তিগত নির্দেশিকা।",
    },
    {
      title: language === "en" ? "Course Selection" : "কোর্স নির্বাচন",
      desc: language === "en" 
        ? "Expert guidance in choosing the right path based on your academic background." 
        : "আপনার একাডেমিক ব্যাকগ্রাউন্ডের উপর ভিত্তি করে সঠিক পথ বেছে নেওয়ার বিষয়ে বিশেষজ্ঞ গাইডেন্স।",
    },
    {
      title: language === "en" ? "Scholarship Guidance" : "স্কলারশিপ গাইডেন্স",
      desc: language === "en" 
        ? "Assistance in identifying and applying for fully-funded and partial scholarships." 
        : "সম্পূর্ণ অর্থায়নকৃত এবং আংশিক স্কলারশিপ খুঁজে পেতে এবং আবেদন করতে সহায়তা।",
    },
    {
      title: language === "en" ? "IELTS & English Language Consultation" : "আইইএলটিএস এবং ইংরেজি ভাষা পরামর্শ",
      desc: language === "en" 
        ? "Preparation advice and resources to excel in English proficiency tests." 
        : "ইংরেজি দক্ষতা পরীক্ষায় ভালো করার জন্য প্রস্তুতির পরামর্শ এবং সংস্থান।",
    },
    {
      title: language === "en" ? "Student Visa Processing" : "স্টুডেন্ট ভিসা প্রসেসিং",
      desc: language === "en" 
        ? "End-to-end guidance through the student visa application and submission flow." 
        : "স্টুডেন্ট ভিসা আবেদন এবং জমা দেওয়ার সম্পূর্ণ প্রক্রিয়ায় শেষ-টু-শেষ নির্দেশিকা।",
    },
    {
      title: language === "en" ? "Statement of Purpose (SOP) Assistance" : "স্টেটমেন্ট অব পারপাস (SOP) সহায়তা",
      desc: language === "en" 
        ? "Professional reviews and structure tips to craft a compelling SOP for admission." 
        : "ভর্তির জন্য একটি আকর্ষণীয় SOP তৈরি করতে পেশাদার পর্যালোচনা এবং কাঠামোগত টিপস।",
    },
    {
      title: language === "en" ? "Visa Documentation Support" : "ভিসা ডকুমেন্টেশন সহায়তা",
      desc: language === "en" 
        ? "Meticulous verification and assembly of all financial and academic documents." 
        : "সমস্ত আর্থিক এবং একাডেমিক নথিপত্রের নিখুঁত যাচাইকরণ এবং সংকলন।",
    },
    {
      title: language === "en" ? "Accommodation Guidance" : "আবাসন গাইডেন্স",
      desc: language === "en" 
        ? "Help finding secure, comfortable, and affordable student lodging near campus." 
        : "ক্যাম্পাসের কাছাকাছি নিরাপদ, আরামদায়ক এবং সাশ্রয়ী স্টুডেন্ট আবাসন খুঁজে পেতে সহায়তা।",
    },
    {
      title: language === "en" ? "Education Loan & Financial Advice" : "শিক্ষা ঋণ এবং আর্থিক পরামর্শ",
      desc: language === "en" 
        ? "Guidance on study loans, bank statements, and managing study-abroad budgets." 
        : "স্টাডি লোন, ব্যাংক স্টেটমেন্ট এবং বিদেশে পড়াশোনার বাজেট পরিচালনার বিষয়ে পরামর্শ।",
    },
    {
      title: language === "en" ? "Pre-Departure Briefing" : "প্রাক-যাত্রার ব্রিফিং",
      desc: language === "en" 
        ? "Crucial briefings on travel, culture, banking, and academic preparation before flight." 
        : "উড়ানের আগে ভ্রমণ, সংস্কৃতি, ব্যাংকিং এবং একাডেমিক প্রস্তুতি সম্পর্কে গুরুত্বপূর্ণ ব্রিফিং।",
    },
  ];

  return (
    <section className="py-10 relative overflow-hidden">
      {/* SVG Gradient definition for Lucide icons */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="service-icon-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1d4ed8" />
            <stop offset="100%" stopColor="#5CBAE6" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container relative z-10">
        <div className="text-center mb-12">
          <h2 className="font-heading font-semibold text-xl md:text-3xl text-foreground">
            {language === "en" ? "Our Services" : "আমাদের সেবাসমূহ"}
          </h2>
          <p className="text-xs md:text-base text-muted-foreground mt-2 max-w-2xl mx-auto">
            {language === "en" 
              ? "Comprehensive global education consultancy services tailored to your academic aspirations." 
              : "আপনার একাডেমিক আকাঙ্ক্ষার সাথে সামঞ্জস্যপূর্ণ ব্যাপক বৈশ্বিক শিক্ষা কনসালটেন্সি সেবাসমূহ।"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {servicesList.slice(0, isMobile ? 5 : 8).map((service, i) => {
            const Icon = serviceIcons[i] || GraduationCap;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.05, duration: 0.4 }}
                className="relative flex flex-col justify-between p-5 bg-gradient-to-br from-white via-primary/[0.02] to-accent/[0.06] border border-primary/10 rounded-xl h-full overflow-hidden shadow-sm"
              >
                <div>
                  <div className="mb-3.5 w-fit">
                    <Icon className="w-8 h-8" stroke="url(#service-icon-gradient)" strokeWidth={1.8} />
                  </div>
                  <h3 className="font-heading font-semibold text-[15px] text-primary mb-1.5">
                    {service.title}
                  </h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                
                {/* Decorative bottom line - now solid by default */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-accent to-primary scale-x-100" />
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link href="/services">
            <InteractiveHoverButton className="bg-primary text-white border-transparent hover:bg-accent hover:border-accent">
              {language === "en" ? "Explore All Services" : "সকল সেবা দেখুন"}
            </InteractiveHoverButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
