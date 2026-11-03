"use client";

import { useEffect, useState, useCallback } from "react";
import {
  ShieldCheck,
  Plane,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

type VisaApprovalItem = {
  id: string;
  studentName: string;
  country: string;
  visaType?: string | null;
  flagUrl?: string | null;
  createdAt?: string;
};

const countryNameToCode: Record<string, string> = {
  "united kingdom": "gb",
  uk: "gb",
  britain: "gb",
  "great britain": "gb",
  england: "gb",
  canada: "ca",
  "united states": "us",
  usa: "us",
  us: "us",
  australia: "au",
  germany: "de",
  ireland: "ie",
  malaysia: "my",
  china: "cn",
  "new zealand": "nz",
  finland: "fi",
  france: "fr",
  sweden: "se",
  netherlands: "nl",
  holland: "nl",
  japan: "jp",
  "south korea": "kr",
  korea: "kr",
  denmark: "dk",
  norway: "no",
  italy: "it",
  spain: "es",
  singapore: "sg",
  cyprus: "cy",
  hungary: "hu",
  poland: "pl",
  belgium: "be",
  switzerland: "ch",
  malta: "mt",
  portugal: "pt",
};

function resolveFlag(country: string, explicitUrl?: string | null) {
  if (explicitUrl && explicitUrl.trim().length > 0) {
    return explicitUrl.trim();
  }
  const clean = (country || "").toLowerCase().trim();
  const code = countryNameToCode[clean] || (clean.length === 2 ? clean : null);
  if (code) {
    return `/flags/${code}.svg`;
  }
  return null;
}

export default function VisaApprovalsSection() {
  const [approvals, setApprovals] = useState<VisaApprovalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadVisaApprovals() {
      try {
        const res = await fetch("/api/visa-approvals");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data)) {
            setApprovals(data);
          }
        }
      } catch (err) {
        console.error("Failed to load visa approvals:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadVisaApprovals();
    return () => {
      isMounted = false;
    };
  }, []);

  // Update carousel count and current slide
  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Smooth Auto-play with pause on hover
  useEffect(() => {
    if (!api || isPaused || count <= 1) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3500);

    return () => clearInterval(interval);
  }, [api, isPaused, count]);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  if (loading || approvals.length === 0) {
    return null;
  }

  return (
    <section
      className="py-10 md:py-12 relative bg-gradient-to-b from-[#141C3A]/[0.02] via-white to-[#5CBAE6]/[0.04] border-y border-[#141C3A]/10 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141C3A]/5 border border-[#5CBAE6]/40 text-[#141C3A] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#0284c7]" />
              <span>Real Students • Official Visa Grants</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#141C3A] tracking-tight">
              Recent <span className="text-[#0284c7]">Visa Approvals</span>
            </h2>
          </div>

          {/* Controls with Brand Palette */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-[#141C3A] bg-white border border-[#5CBAE6]/30 px-3.5 py-1.5 rounded-lg shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
              <span>98.5% Visa Success Rate</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={scrollPrev}
                aria-label="Previous slide"
                className="w-8 h-8 rounded-lg bg-white border border-[#141C3A]/15 shadow-sm hover:bg-[#141C3A]/5 hover:border-[#141C3A]/30 text-[#141C3A] flex items-center justify-center transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next slide"
                className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#141C3A] to-[#1e2a56] text-[#5CBAE6] hover:text-white shadow-sm hover:shadow flex items-center justify-center transition-all active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Embla Carousel */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3 sm:-ml-4">
            {approvals.map((item, idx) => {
              const flag = resolveFlag(item.country, item.flagUrl);
              const initials = item.studentName
                ? item.studentName
                    .split(" ")
                    .filter(Boolean)
                    .map((n: string) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()
                : "ST";

              const formattedDate = item.createdAt
                ? new Date(item.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })
                : "Recent";

              return (
                <CarouselItem
                  key={item.id || idx}
                  className="pl-3 sm:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="h-full bg-white rounded-xl border border-[#141C3A]/10 shadow-sm hover:shadow-lg hover:shadow-[#141C3A]/5 hover:border-[#5CBAE6] transition-all flex flex-col justify-between overflow-hidden select-none group">
                    {/* Header */}
                    <div className="px-3.5 py-2.5 bg-gradient-to-r from-[#141C3A]/[0.03] to-[#5CBAE6]/[0.08] border-b border-[#141C3A]/10 flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        {flag ? (
                          <img
                            src={flag}
                            alt={item.country}
                            className="w-5 h-3.5 object-cover rounded-[2px] border border-slate-200 shrink-0 shadow-xs"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-sm">🌐</span>
                        )}
                        <span className="text-xs font-bold text-[#141C3A] font-heading capitalize truncate">
                          {item.country}
                        </span>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-3.5 flex flex-col gap-2.5 flex-1 justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#141C3A] via-[#1b254b] to-[#0284c7] text-white flex items-center justify-center font-heading font-extrabold text-xs shrink-0 shadow-sm ring-2 ring-[#5CBAE6]/25">
                          {initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-heading font-bold text-[#141C3A] text-sm leading-tight truncate group-hover:text-[#0284c7] transition-colors">
                            {item.studentName}
                          </h4>
                          <div className="flex items-center gap-1 text-[10px] text-[#0284c7] font-semibold mt-0.5">
                            <ShieldCheck className="w-2.5 h-2.5" />
                            <span>Verified Student</span>
                          </div>
                        </div>
                      </div>

                      {/* Visa Category Pill with Brand Tint */}
                      <div className="text-[11px] text-[#141C3A] bg-gradient-to-r from-[#141C3A]/[0.03] to-[#5CBAE6]/[0.07] border border-[#5CBAE6]/25 px-2.5 py-1.5 rounded-lg font-medium truncate flex items-center gap-1.5">
                        <Plane className="w-3 h-3 text-[#0284c7] shrink-0 rotate-45" />
                        <span className="truncate">{item.visaType || "Student Visa"}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-3.5 py-2 bg-gradient-to-r from-[#141C3A]/[0.02] to-transparent border-t border-[#141C3A]/5 flex items-center text-[10px] text-slate-500">
                      <span>Intake: {formattedDate}</span>
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {/* Carousel Pagination Dots */}
        {count > 1 && (
          <div className="flex justify-center items-center gap-1.5 mt-5">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`transition-all rounded-full ${
                  current === index
                    ? "w-6 h-1.5 bg-gradient-to-r from-[#141C3A] to-[#0284c7]"
                    : "w-1.5 h-1.5 bg-[#141C3A]/20 hover:bg-[#141C3A]/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
