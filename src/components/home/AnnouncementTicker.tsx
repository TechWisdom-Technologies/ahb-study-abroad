"use client";

import { useEffect, useState } from "react";
import { useDragScroll } from "@/hooks/useDragScroll";

type Announcement = {
  text: string;
  link?: string | null;
};

const AnnouncementTicker = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const dragRef = useDragScroll();

  useEffect(() => {
    let isMounted = true;
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("/api/announcements");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data)) {
            const dbItems = data.map((a: any) => ({
              text: a.text,
              link: a.linkUrl || a.link || null,
            }));
            setAnnouncements(dbItems);
          }
        }
      } catch (err) {
        console.error("Error loading announcements:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchAnnouncements();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading || announcements.length === 0) {
    return null;
  }

  // Multiply items if few, to ensure marquee continuously fills the screen width
  const repeatCount = announcements.length < 3 ? 6 : announcements.length < 6 ? 4 : 2;
  const displayItems = Array(repeatCount).fill(announcements).flat();

  return (
    <div className="bg-gradient-to-r from-[#141C3A] via-[#1d2b5c] to-[#141C3A] text-white py-3 overflow-hidden border-b border-white/5 shadow-sm">
      <div className="container flex items-center gap-3">
        <div className="flex-shrink-0 flex items-center gap-2 font-heading font-semibold text-xs sm:text-sm text-white">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Announcements</span>
          <span className="mx-1 text-white/30">|</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div ref={dragRef} className="flex animate-ticker whitespace-nowrap cursor-grab active:cursor-grabbing hover:[animation-play-state:paused]">
            {displayItems.map((a, i) => (
              <span key={i} className="mx-8 text-xs sm:text-sm font-medium inline-flex items-center gap-1.5 font-sans">
                <span className="shrink-0">📢</span>
                {a.link ? (
                  <a href={a.link} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-200 hover:text-white transition-colors">
                    {a.text}
                  </a>
                ) : (
                  <span>{a.text}</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementTicker;
