"use client";

import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";
import { useDragScroll } from "@/hooks/useDragScroll";

const staticAnnouncements = [
  { text: "🎓 UK & Canada upcoming intake applications open - Apply early with AHB Study Abroad!", link: "" },
  { text: "📢 Free IELTS consultation & guidance available - Register now!", link: "" },
  { text: "🇨🇦 Canada Study Permit processing guidance - Contact AHB Study Abroad", link: "" },
  { text: "🏆 AHB Study Abroad - Trusted Overseas Education & Visa Consultancy", link: "" },
  { text: "🇦🇺 Australia, USA, Europe & Malaysia admissions open!", link: "" },
];

type Announcement = { text: string; link: string };

const AnnouncementTicker = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(staticAnnouncements);
  const dragRef = useDragScroll();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("/api/announcements");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const dbItems = data.map((a: any) => ({ text: a.text, link: a.linkUrl || "" }));
            setAnnouncements([...dbItems, ...staticAnnouncements]);
          }
        }
      } catch (err) {
        console.error("Error loading announcements:", err);
      }
    };
    fetchAnnouncements();
  }, []);

  const renderItem = (a: Announcement, i: number) => (
    <span key={i} className="mx-8 text-sm font-medium inline-flex items-center gap-1.5 font-sans">
      <span className="shrink-0">📢</span>
      {a.link ? (
        <a href={a.link} target="_blank" rel="noopener noreferrer" className="hover:underline">{a.text}</a>
      ) : (
        <span>{a.text}</span>
      )}
    </span>
  );

  return (
    <div className="bg-gradient-to-r from-[#141C3A] via-[#1d2b5c] to-[#141C3A] text-white py-3.5 overflow-hidden border-b border-white/5">
      <div className="container flex items-center gap-3">
        <div className="flex-shrink-0 flex items-center gap-1.5 font-heading font-semibold text-sm text-white">
          <span>Announcements</span>
          <span className="mx-1 text-white/30">|</span>
        </div>
        <div className="overflow-hidden flex-1">
          <div ref={dragRef} className="flex animate-ticker whitespace-nowrap">
            {[...announcements, ...announcements].map((a, i) => renderItem(a, i))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementTicker;
