"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Send, Facebook, Instagram, Youtube, Linkedin, Globe2, MessageSquare } from "lucide-react";
import { countries } from "@/data/countries";
import CountryFlag from "@/components/shared/CountryFlag";

const contactCards = [
  {
    icon: Phone,
    title: "Call Us",
    text: "+880 1621999965",
    sub: "Sat-Thu: 10AM - 7PM (WhatsApp)",
    href: "tel:+8801621999965",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    icon: Mail,
    title: "Email Us",
    text: "ahbstudyabroad@gmail.com",
    sub: "We reply within 24 hours",
    href: "mailto:ahbstudyabroad@gmail.com",
    color: "from-green-500/20 to-green-600/10",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    text: "House-06, Lane-04, Block-C",
    sub: "Avenue-05, Mirpur-11, Dhaka-1216",
    href: "https://maps.google.com/?q=Mirpur-11,Dhaka",
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    icon: Clock,
    title: "Office Hours",
    text: "Sat - Thu: 10:00 AM - 7:00 PM",
    sub: "Friday: Closed",
    color: "from-orange-500/20 to-orange-600/10",
  },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/", label: "Facebook", hoverBg: "hover:bg-[#1877F2]" },
  { icon: Instagram, href: "https://www.instagram.com/", label: "Instagram", hoverBg: "hover:bg-gradient-to-br hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF]" },
  { icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn", hoverBg: "hover:bg-[#0A66C2]" },
  { icon: Youtube, href: "https://www.youtube.com/", label: "YouTube", hoverBg: "hover:bg-[#FF0000]" },
];

export default function ContactPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const { toast } = useToast();

  const selectedCountryData = countries.find((country) => country.value === selectedCountry);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    setLoading(true);

    const selectedData = countries.find((c) => c.value === selectedCountry);

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name") as string,
          email: fd.get("email") as string,
          phone: fd.get("phone") as string,
          leadType: "general",
          details: { preferred_destination: selectedData?.label || selectedCountry || null, message: fd.get("message") || "" },
        }),
      });

      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        toast({ title: "Error", description: result.error || "Something went wrong. Please try again.", variant: "destructive" });
        return;
      }

      setSelectedCountry("");
      toast({ title: "Message Sent!", description: "We'll get back to you within 24 hours." });
      form.reset();
    } catch (err) {
      setLoading(false);
      toast({ title: "Error", description: "Failed to connect to server.", variant: "destructive" });
    }
  };

  return (
    <>
      {/* Hero */}
      {/* Hero */}
      <section className="relative min-h-[600px] lg:min-h-[92vh] flex items-center overflow-hidden bg-[#141C3A]">
        {/* Base background colors & image overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#141C3A] via-[#1A254D] to-[#2B3C7A]" />
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-lighten brightness-90 z-[1]"
        />
        <div className="absolute inset-0 z-[2] bg-[url('/assets/grid-pattern.svg')] opacity-10" />

        {/* Decorative glows */}
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] pointer-events-none z-[2]" />
        <div className="absolute bottom-10 left-[5%] w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] pointer-events-none z-[2]" />

        <div className="container relative z-10 py-20 lg:py-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-md mb-3 font-normal tracking-widest uppercase text-white rounded font-heading">
              Contact Us
            </span>
            <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15] mb-6">
              Let's Start Your Journey
            </h1>
            <p className="text-base md:text-lg text-white leading-relaxed max-w-xl mx-auto">
              Have questions about studying abroad? Our expert counselors are ready to guide you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-12 mt-4 relative z-20">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {card.href ? (
                  <a
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`block p-5 bg-gradient-to-br ${card.color} bg-card border border-border rounded hover:border-primary/30 hover:shadow-lg transition-all group`}
                  >
                    <div className="w-11 h-11 rounded bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <card.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-sm mb-1">{card.title}</h3>
                    <p className="text-sm font-medium text-foreground">{card.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
                  </a>
                ) : (
                  <div className={`p-5 bg-gradient-to-br ${card.color} bg-card border border-border rounded`}>
                    <div className="w-11 h-11 rounded bg-primary/10 flex items-center justify-center mb-3">
                      <card.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground text-sm mb-1">{card.title}</h3>
                    <p className="text-sm font-medium text-foreground">{card.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Sidebar */}
      <section className="py-12">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-card border border-border rounded p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-xl text-foreground">Send Us a Message</h2>
                    <p className="text-sm text-muted-foreground">Fill out the form and we'll get back to you shortly</p>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input name="name" placeholder="Full Name" required />
                    <Input name="email" type="email" placeholder="Email Address" required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input name="phone" type="tel" placeholder="Phone Number" required />
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger>
                        <span className="flex min-w-0 items-center gap-2">
                          {selectedCountryData ? <CountryFlag code={selectedCountryData.flagCode} size="sm" /> : null}
                          <SelectValue placeholder="Interested Country" />
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
                  </div>
                  <Textarea name="message" placeholder="Tell us about your study abroad plans..." rows={5} required />
                  <InteractiveHoverButton type="submit" disabled={loading} className="w-full sm:w-auto bg-primary text-white border-transparent hover:bg-accent hover:border-accent">
                    <Send className="w-4 h-4 mr-2 inline-block" />
                    {loading ? "Sending..." : "Send Message"}
                  </InteractiveHoverButton>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Why Contact */}
              <div className="bg-card border border-border rounded p-6">
                <h3 className="font-heading font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-primary" />
                  Why Contact AHB Study Abroad?
                </h3>
                <ul className="space-y-3">
                  {[
                    "100% free consultation & guidance",
                    "Expert counselors with 5+ years experience",
                    "Partnerships with 300+ universities",
                    "98% visa success rate",
                    "Complete application to arrival support",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div className="bg-card border border-border rounded p-6">
                <h3 className="font-heading font-bold text-lg text-foreground mb-4">Follow Us</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-3 py-2.5 rounded bg-primary/5 border border-border ${social.hoverBg} hover:text-white transition-all text-sm font-medium text-foreground`}
                    >
                      <social.icon className="w-4 h-4" />
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="pb-16">
        <div className="container">
          <div className="rounded overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0!2d90.3942!3d23.7734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c79f1a2d4b5d%3A0x1234567890!2sMohakhali%20DOHS%2C%20Dhaka%201206!5e0!3m2!1sen!2sbd!4v1700000000000"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="AHB Education Office - Mirpur-11, Dhaka"
            />
          </div>
        </div>
      </section>
    </>
  );
}
