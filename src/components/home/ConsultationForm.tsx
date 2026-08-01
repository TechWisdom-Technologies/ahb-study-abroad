"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Clock, Users, Globe2 } from "lucide-react";
import { countries } from "@/data/countries";
import CountryFlag from "@/components/shared/CountryFlag";

const consultationBg = "/assets/consultation-bg.jpg";
const consultationStudents = "/assets/consultation-students.jpg";
const freeConsultationBg = "/assets/free-consultation-bg.jpg";

const highlights = [
  { icon: CheckCircle2, text: "100% Free Consultation" },
  { icon: Clock, text: "Response within 24 hours" },
  { icon: Users, text: "Expert counselors" },
  { icon: Globe2, text: "16 countries covered" },
];

const ConsultationForm = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setLoading(true);

    const selectedCountryData = countries.find((c) => c.value === selectedCountry);

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          phone: formData.get("phone") as string,
          course: (formData.get("course") as string) || null,
          leadType: "general",
          details: { preferred_destination: selectedCountryData?.label || selectedCountry || null },
        }),
      });

      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        toast({ title: "Error", description: result.error || "Something went wrong. Please try again.", variant: "destructive" });
        return;
      }

      setSelectedCountry("");
      toast({ title: "Success!", description: t.consultation.success });
      form.reset();
    } catch (err: any) {
      setLoading(false);
      toast({ title: "Error", description: "Failed to connect to server.", variant: "destructive" });
    }
  };

  const selectedCountryData = countries.find((country) => country.value === selectedCountry);

  return (
    <section className="py-10 relative overflow-hidden" id="consultation">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${freeConsultationBg})` }} />
      <div className="absolute inset-0 bg-black/70" />

      <div className="container relative z-10">
        <div className="text-center mb-10">
          <h2 className="font-heading font-semibold text-xl md:text-3xl text-white mb-3">{t.consultation.title}</h2>
          <p className="text-xs md:text-base text-white/80 max-w-xl mx-auto">{t.consultation.subtitle}</p>
        </div>

        <div className="max-w-xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-white border border-primary/10 shadow-xl shadow-primary/[0.02] rounded-xl p-6 space-y-4">
              <Input
                name="name"
                placeholder={t.consultation.name}
                required
                className="bg-white border-primary/10 text-primary placeholder:text-muted-foreground/60"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input name="email" type="email" placeholder={t.consultation.email} required className="bg-white border-primary/10 text-primary placeholder:text-muted-foreground/60" />
                <Input name="phone" type="tel" placeholder={t.consultation.phone} required className="bg-white border-primary/10 text-primary placeholder:text-muted-foreground/60" />
              </div>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="bg-white border-primary/10 text-primary">
                  <span className="flex min-w-0 items-center gap-2">
                    {selectedCountryData ? <CountryFlag code={selectedCountryData.flagCode} size="sm" /> : null}
                    <SelectValue placeholder={t.consultation.destination} />
                  </span>
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value} textValue={country.label}>
                      <span className="flex items-center gap-2">
                        <CountryFlag code={country.flagCode} size="sm" />
                        <span>{country.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input name="course" placeholder={t.consultation.course} className="bg-white border-primary/10 text-primary placeholder:text-muted-foreground/60" />
              <InteractiveHoverButton type="submit" disabled={loading} className="w-full bg-primary text-white border-transparent hover:bg-accent hover:border-accent">
                <Send className="w-4 h-4 mr-2 inline-block" />
                {loading ? "..." : t.consultation.submit}
              </InteractiveHoverButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
