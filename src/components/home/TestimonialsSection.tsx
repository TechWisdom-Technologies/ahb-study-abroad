"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Quote, ChevronDown } from "lucide-react";
import { useDragScroll } from "@/hooks/useDragScroll";
import { useIsMobile } from "@/hooks/use-mobile";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { ShineBorder } from "@/components/ui/shine-border";

const staticTestimonials = [
  { name: "Rahul Ahmed", university: "University of Manchester", country: "United Kingdom", flagCode: "gb", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80", quote: "AHB Education made my dream of studying in the UK a reality. From application to visa, they handled everything professionally. I got a scholarship too!" },
  { name: "Fatima Khan", university: "University of Toronto", country: "Canada", flagCode: "ca", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80", quote: "I was confused about which country to choose. AHB Education's counselors helped me find the perfect university in Canada. Their support was incredible." },
  { name: "Sakib Hasan", university: "University of Melbourne", country: "Australia", flagCode: "au", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80", quote: "The entire process was smooth and stress-free. AHB Education's team is very knowledgeable and they guided me at every step. Highly recommended!" },
  { name: "Nusrat Jahan", university: "University of Auckland", country: "New Zealand", flagCode: "nz", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80", quote: "I got my New Zealand student visa in just 3 weeks thanks to AHB Education's expert visa file preparation. They truly care about students." },
  { name: "Tanvir Islam", university: "University of Malaya", country: "Malaysia", flagCode: "my", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80", quote: "Affordable tuition, great campus, and AHB Education made the whole process hassle-free. I'm now pursuing my MBA in Kuala Lumpur!" },
  { name: "Asha Akter", university: "Coventry University", country: "United Kingdom", flagCode: "gb", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80", quote: "AHB Education's scholarship assistance saved me thousands of pounds. Their dedication to students is unmatched. I couldn't have done it without them." },
  { name: "Rafiq Uddin", university: "University of Canterbury", country: "New Zealand", flagCode: "nz", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80", quote: "From Dhaka to Christchurch, AHB Education was with me every step. Their pre-departure briefing was incredibly helpful for settling in." },
  { name: "Mira Chowdhury", university: "Monash University", country: "Australia", flagCode: "au", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80", quote: "I received a partial scholarship at Monash thanks to AHB Education's guidance. The team went above and beyond to help me achieve my goals." },
];

type Testimonial = { name: string; university: string; country: string; flagCode: string; image: string; quote: string; mediaType?: string; mediaUrl?: string };

const TestimonialCard = ({ item }: { item: Testimonial }) => (
  <div className="bg-card border border-border/50 rounded-xl overflow-hidden p-4 flex flex-col h-full relative shadow-md">
    <ShineBorder shineColor={["#5CBAE6", "#141C3A", "#ffffff"]} borderWidth={2} className="z-30" />
    <div className="relative z-20 flex flex-col h-full">
    {item.mediaType === "video" && item.mediaUrl ? (
      <div className="mb-3 rounded overflow-hidden aspect-video">
        <iframe
          src={item.mediaUrl.replace("watch?v=", "embed/")}
          className="w-full h-full"
          allowFullScreen
          loading="lazy"
          title={`${item.name} testimonial`}
        />
      </div>
    ) : (
      <Quote className="w-5 h-5 text-accent mb-2 flex-shrink-0" />
    )}
    {item.quote && (
      <p className="text-foreground text-xs leading-relaxed mb-3 line-clamp-4 flex-1 font-sans">
        "{item.quote}"
      </p>
    )}
    <div className="flex items-center gap-2 pt-2 border-t border-border mt-auto">
      <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0 text-primary font-heading font-bold text-xs">
        {item.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
      </div>
      <div className="min-w-0">
        <div className="font-heading font-semibold text-foreground text-xs truncate">{item.name}</div>
        <div className="text-[10px] text-muted-foreground truncate">{item.university}</div>
        {item.country && (
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className="truncate">{item.country}</span>
            {item.flagCode && <img src={`/flags/${item.flagCode}.svg`} alt="" className="h-[10px] w-auto inline-block rounded-[1px]" />}
          </div>
        )}
      </div>
    </div>
  </div>
</div>
);

const TestimonialsSection = () => {
  const { t } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(staticTestimonials);
  const [visibleCount, setVisibleCount] = useState(4);
  const isMobile = useIsMobile();
  const dragRef = useDragScroll();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/testimonials");
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const dbItems: Testimonial[] = data.map((t: any) => ({
              name: t.name,
              university: t.university || "",
              country: t.country || "",
              flagCode: t.flagCode || "",
              image: t.imageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
              quote: t.quote || "",
              mediaType: t.mediaType,
              mediaUrl: t.mediaUrl || undefined,
            }));
            setTestimonials([...dbItems, ...staticTestimonials]);
          }
        }
      } catch (err) {
        console.error("Error loading testimonials:", err);
      }
    };
    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 2);
  };

  return (
    <section className="py-10 overflow-hidden">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="font-heading font-semibold text-xl md:text-3xl text-foreground">{t.testimonials.title}</h2>
          <p className="text-xs md:text-base text-muted-foreground mt-2">{t.testimonials.subtitle}</p>
        </div>
      </div>

      {isMobile ? (
        <div className="container">
          <div className="grid grid-cols-2 gap-3">
            {testimonials.slice(0, visibleCount).map((item, i) => (
              <TestimonialCard key={i} item={item} />
            ))}
          </div>
          {visibleCount < testimonials.length && (
            <div className="text-center mt-6">
              <InteractiveHoverButton
                onClick={handleLoadMore}
                className="bg-card text-foreground border-border px-5 py-2 text-sm"
              >
                Load More
              </InteractiveHoverButton>
            </div>
          )}
        </div>
      ) : (
        <div className="relative">
          <div ref={dragRef} className="flex animate-ticker-slow gap-4 px-4">
            {[...testimonials, ...testimonials].map((item, i) => (
              <div key={i} className="flex-shrink-0 w-[300px]">
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default TestimonialsSection;
