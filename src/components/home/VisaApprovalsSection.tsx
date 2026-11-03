"use client";

import { useEffect, useState, useCallback } from "react";
import {
  CheckCircle2,
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
      className="py-10 md:py-12 relative bg-gradient-to-b from-[#F8FAFC] via-white to-[#F8FAFC] border-y border-slate-200/80 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-semibold mb-2">
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>Real Students • Visa Grants</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#141C3A] tracking-tight">
              Recent Visa Approvals
            </h2>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>98.5% Visa Success Rate</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={scrollPrev}
                aria-label="Previous slide"
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 shadow-sm hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Next slide"
                className="w-8 h-8 rounded-lg bg-primary text-white shadow-sm hover:bg-primary/90 flex items-center justify-center transition-all active:scale-95"
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
                  <div className="h-full bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between overflow-hidden select-none">
                    {/* Header */}
                    <div className="px-3.5 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        {flag ? (
                          <img
                            src={flag}
                            alt={item.country}
                            className="w-5 h-3.5 object-cover rounded-[2px] border border-slate-200 shrink-0"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-sm">🌐</span>
                        )}
                        <span className="text-xs font-bold text-[#141C3A] font-heading capitalize truncate">
                          {item.country}
                        </span>
                      </div>

                      <span className="shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Approved</span>
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-3.5 flex flex-col gap-2.5 flex-1 justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#141C3A] text-white flex items-center justify-center font-heading font-bold text-xs shrink-0 shadow-sm">
                          {initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-heading font-bold text-slate-900 text-sm leading-tight truncate">
                            {item.studentName}
                          </h4>
                          <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                            <ShieldCheck className="w-2.5 h-2.5" />
                            <span>Verified Student</span>
                          </div>
                        </div>
                      </div>

                      {/* Visa Category Pill */}
                      <div className="text-[11px] text-slate-700 bg-slate-50 border border-slate-200/70 px-2.5 py-1.5 rounded-md font-medium truncate flex items-center gap-1.5">
                        <Plane className="w-3 h-3 text-primary shrink-0 rotate-45" />
                        <span className="truncate">{item.visaType || "Student Visa"}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-3.5 py-2 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Intake: {formattedDate}</span>
                      <span className="font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">
                        AHB Verified
                      </span>
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
                    ? "w-6 h-1.5 bg-primary"
                    : "w-1.5 h-1.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
