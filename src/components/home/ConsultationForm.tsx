"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Clock, Users, Globe2 } from "lucide-react";
import { countries } from "@/data/countries";
import CountryFlag from "@/components/shared/CountryFlag";

const consultationBg = "/assets/consultation-bg.jpg";
const consultationStudents = "/assets/consultation-students.jpg";

const highlights = [
  { icon: CheckCircle2, text: "100% Free Consultation" },
  { icon: Clock, text: "Response within 24 hours" },
  { icon: Users, text: "Expert counselors" },
  { icon: Globe2, text: "11 countries covered" },
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
    <section className="py-16 relative overflow-hidden" id="consultation">
      <div className="absolute inset-0 bg-gradient-to-br from-[#283492] via-[#3B4CAA] to-[#5B6BC0]" />
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
        <img
          src={consultationBg}
          alt="Students in consultation"
          className="w-full h-full object-cover opacity-20"
          loading="lazy"
        />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-white mb-3">{t.consultation.title}</h2>
            <p className="text-white/70 mb-6">{t.consultation.subtitle}</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 rounded p-3 border border-white/10">
                  <h.icon className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-sm text-white/80 font-medium">{h.text}</span>
                </div>
              ))}
            </div>

            <div className="relative rounded overflow-hidden hidden lg:block">
              <img
                src={consultationStudents}
                alt="Students in counseling session"
                className="w-full h-48 object-cover rounded"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3B4CAA] to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-white text-sm font-heading font-semibold">Join 2,500+ students who started their journey with us</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded p-6 space-y-4">
              <Input
                name="name"
                placeholder={t.consultation.name}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input name="email" type="email" placeholder={t.consultation.email} required className="bg-white/10 border-white/20 text-white placeholder:text-white/40" />
                <Input name="phone" type="tel" placeholder={t.consultation.phone} required className="bg-white/10 border-white/20 text-white placeholder:text-white/40" />
              </div>
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
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
              <Input name="course" placeholder={t.consultation.course} className="bg-white/10 border-white/20 text-white placeholder:text-white/40" />
              <Button type="submit" disabled={loading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-semibold">
                <Send className="w-4 h-4 mr-2" />
                {loading ? "..." : t.consultation.submit}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationForm;
