"use client";

import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import DestinationsGrid from "@/components/home/DestinationsGrid";
import WhyChoose from "@/components/home/WhyChoose";
import ServicesSection from "@/components/home/ServicesSection";
import ConsultationForm from "@/components/home/ConsultationForm";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PartnersSection from "@/components/home/PartnersSection";
import FaqSection from "@/components/home/FaqSection";

export default function HomePage() {
  return (
    <div className="bg-white bg-gradient-to-br from-primary/[0.03] via-white to-accent/[0.05] min-h-screen">
      <HeroSection />
      <StatsSection />
      <DestinationsGrid />
      <ServicesSection />
      <WhyChoose />
      <TestimonialsSection />
      <PartnersSection />
      <FaqSection />
      <ConsultationForm />
    </div>
  );
}
