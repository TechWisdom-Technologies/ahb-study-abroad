"use client";

import HeroSection from "@/components/home/HeroSection";
import AnnouncementTicker from "@/components/home/AnnouncementTicker";
import StatsSection from "@/components/home/StatsSection";
import DestinationsGrid from "@/components/home/DestinationsGrid";
import WhyChoose from "@/components/home/WhyChoose";
import JourneySteps from "@/components/home/JourneySteps";
import ConsultationForm from "@/components/home/ConsultationForm";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ScholarshipsSection from "@/components/home/ScholarshipsSection";
import PartnersSection from "@/components/home/PartnersSection";
import FaqSection from "@/components/home/FaqSection";
import CtaSection from "@/components/home/CtaSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AnnouncementTicker />
      <StatsSection />
      <DestinationsGrid />
      <WhyChoose />
      <JourneySteps />
      <ConsultationForm />
      <TestimonialsSection />
      <ScholarshipsSection />
      <PartnersSection />
      <FaqSection />
      <CtaSection />
    </>
  );
}
