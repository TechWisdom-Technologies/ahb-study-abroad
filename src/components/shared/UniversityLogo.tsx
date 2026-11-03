"use client";

import React, { useState } from "react";
import { GraduationCap } from "lucide-react";

interface UniversityLogoProps {
  name: string;
  logoUrl?: string | null;
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Generates a clean, intelligent monogram / acronym for any university.
 * e.g. "Kunming Medical University" -> "KMU"
 *      "University of British Columbia (UBC)" -> "UBC"
 *      "University of Toronto" -> "U of T"
 *      "Civil Aviation University of China" -> "CAUC"
 */
export function getUniversityMonogram(name: string): string {
  if (!name) return "UNI";

  // 1. Check for explicit acronym in parentheses e.g. "(NJUST)", "(UESTC)", "(UBC)", "(SFU)", "(SCU)"
  const parenMatch = name.match(/\(([A-Za-z]{2,8})\)/);
  if (parenMatch && parenMatch[1]) {
    return parenMatch[1].toUpperCase();
  }

  // 2. Well-known custom patterns
  const lower = name.toLowerCase();
  if (lower.includes("toronto")) return "U of T";
  if (lower.includes("mcgill")) return "McGill";
  if (lower.includes("waterloo")) return "UW";
  if (lower.includes("british columbia")) return "UBC";
  if (lower.includes("oxford")) return "OXF";
  if (lower.includes("cambridge")) return "CAM";
  if (lower.includes("harvard")) return "HAR";
  if (lower.includes("melbourne")) return "UniMelb";
  if (lower.includes("sydney")) return "USYD";
  if (lower.includes("dalhousie")) return "DAL";
  if (lower.includes("calgary")) return "UCalgary";
  if (lower.includes("alberta")) return "UAlberta";
  if (lower.includes("ottawa")) return "uOttawa";
  if (lower.includes("three gorges")) return "CTGU";

  // 3. Clean noise words
  const clean = name
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/^\d+[-–\s]+/, "")
    .replace(/–.*$/, "")
    .replace(/-.*$/, "")
    .trim();

  const stopWords = new Set(["of", "and", "&", "the", "in", "for", "at", "de", "und", "du", "la"]);
  const words = clean
    .split(/[\s\-–—/]+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0 && !stopWords.has(w.toLowerCase()));

  if (words.length === 0) return "UNI";
  if (words.length === 1) return words[0].slice(0, 4).toUpperCase();
  if (words.length === 2) return (words[0][0] + words[1][0]).toUpperCase();
  if (words.length === 3) return (words[0][0] + words[1][0] + words[2][0]).toUpperCase();

  // 4+ words: take first letters, max 4 letters
  return words.slice(0, 4).map((w) => w[0]).join("").toUpperCase();
}

// Deterministic dignified color themes for the monogram badge
const BADGE_THEMES = [
  { bg: "from-[#141C3A] to-[#1E294B]", text: "text-amber-300", border: "border-[#2E3B5E]", cap: "text-amber-300/40" },
  { bg: "from-[#0D2A4A] to-[#144272]", text: "text-[#5CBAE6]", border: "border-[#1D548F]", cap: "text-[#5CBAE6]/40" },
  { bg: "from-[#1A2E35] to-[#254A56]", text: "text-emerald-300", border: "border-[#2D5A68]", cap: "text-emerald-300/40" },
  { bg: "from-[#2C1D38] to-[#432A55]", text: "text-purple-300", border: "border-[#5B3973]", cap: "text-purple-300/40" },
  { bg: "from-[#381F24] to-[#552D34]", text: "text-rose-300", border: "border-[#733C46]", cap: "text-rose-300/40" },
];

function getBadgeTheme(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return BADGE_THEMES[Math.abs(hash) % BADGE_THEMES.length];
}

export default function UniversityLogo({
  name,
  logoUrl,
  className = "w-12 h-12",
  size = "md",
}: UniversityLogoProps) {
  const [hasError, setHasError] = useState(false);
  const monogram = getUniversityMonogram(name);
  const theme = getBadgeTheme(name);

  // If logoUrl is present and hasn't errored
  const showImage = Boolean(logoUrl) && !hasError;

  return (
    <div
      className={`relative rounded-lg shrink-0 overflow-hidden flex items-center justify-center p-1 border shadow-sm transition-all duration-200 ${
        showImage
          ? "bg-white border-border/80 hover:border-primary/40"
          : `bg-gradient-to-b ${theme.bg} ${theme.border}`
      } ${className}`}
      title={name}
    >
      {showImage ? (
        <img
          src={logoUrl!}
          alt={name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-contain select-none"
          onLoad={(e) => {
            const img = e.currentTarget;
            // CRITICAL FIX: Google's s2/favicons fallback for missing icons is a 16x16 grey globe.
            // Detect this 16x16 dummy image and reject it, gracefully revealing the sharp monogram crest!
            if (
              img.src.includes("google.com/s2/favicons") &&
              img.naturalWidth <= 16 &&
              img.naturalHeight <= 16
            ) {
              setHasError(true);
            }
          }}
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="relative flex flex-col items-center justify-center w-full h-full text-center select-none px-0.5">
          <GraduationCap className={`w-3.5 h-3.5 absolute top-0.5 ${theme.cap}`} />
          <span
            className={`font-heading font-extrabold tracking-wider ${theme.text} uppercase z-10 drop-shadow-sm mt-1.5 ${
              monogram.length > 4 ? "text-[9px]" : monogram.length > 3 ? "text-[10px]" : "text-[11.5px]"
            }`}
          >
            {monogram}
          </span>
          <span className="text-[7px] font-semibold text-white/50 tracking-wider leading-none mt-0.5 uppercase">
            UNI
          </span>
        </div>
      )}
    </div>
  );
}

