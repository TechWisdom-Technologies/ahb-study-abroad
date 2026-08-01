"use client";

/* Footer component */
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin, Youtube, BookOpen, FileText, Languages, ShieldCheck, Award, Plane, Home, Users, Briefcase, PenLine, PhoneCall } from "lucide-react";

const ahbLogo = "/assets/ahb-logo-white.png";

const discoverRoutes = ["/", "/about", "/services", "/ielts", "/contact"];
const discoverIcons = [Home, Users, Briefcase, PenLine, PhoneCall];
const regionSlugs = ["canada", "uk", "usa", "australia", "germany"];
const regionFlags = ["/flags/ca.svg", "/flags/gb.svg", "/flags/us.svg", "/flags/au.svg", "/flags/de.svg"];
const serviceIcons = [BookOpen, FileText, Languages, ShieldCheck, Award, Plane];

const dotColors = ["bg-yellow-400", "bg-red-500", "bg-green-500", "bg-yellow-400", "bg-red-500"];

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-b from-[#141C3A] via-[#1A254D] to-[#2B3C7A] border-t border-white/5">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Column 1: Brand */}
          <div>
            <div className="mb-4">
              <Link href="/">
                <img src={ahbLogo} alt="AHB Study Abroad" className="h-[72px] w-auto rounded transition-opacity hover:opacity-90" />
              </Link>
            </div>
            <p className="text-[13px] text-white/70 leading-relaxed mb-4">{t.footer.about}</p>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/"
                className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-[#1877F2] transition-all duration-300 text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/"
                className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] transition-all duration-300 text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/"
                className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-[#0A66C2] transition-all duration-300 text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/"
                className="w-8 h-8 rounded bg-white/10 flex items-center justify-center hover:bg-[#FF0000] transition-all duration-300 text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Discover & Destinations wrapper for mobile row */}
          <div className="flex justify-between w-full sm:contents">
            {/* Column 2: Discover */}
            <div className="lg:mx-auto">
              <h4 className="font-heading font-semibold text-[14px] text-white mb-4">
                {t.footer.discover}
              </h4>
              <ul className="space-y-2.5">
                {t.footer.discoverLinks.map((item, i) => {
                  const Icon = discoverIcons[i];
                  return (
                    <li key={i}>
                      <Link href={discoverRoutes[i]} className="group text-[13px] text-white/70 hover:text-accent transition-colors flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-white/60 group-hover:text-accent transition-colors" />
                        <span>{item}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 3: Top Destinations */}
            <div className="lg:mx-auto">
              <h4 className="font-heading font-semibold text-[14px] text-white mb-4">
                Top Destinations
              </h4>
              <ul className="space-y-2.5">
                {[
                  { name: "Canada", flag: "/flags/ca.svg", slug: "canada" },
                  { name: "United Kingdom (UK)", flag: "/flags/gb.svg", slug: "uk" },
                  { name: "United States (USA)", flag: "/flags/us.svg", slug: "usa" },
                  { name: "Australia", flag: "/flags/au.svg", slug: "australia" },
                  { name: "Ireland", flag: "/flags/ie.svg", slug: "ireland" },
                ].map((dest, i) => (
                  <li key={i}>
                    <Link href={`/destinations/${dest.slug}`} className="group text-[13px] text-white/70 hover:text-accent transition-colors flex items-center gap-2">
                      <img src={dest.flag} alt={`${dest.name} flag`} className="w-4 h-3 rounded-[2px] object-cover shrink-0 opacity-80 group-hover:opacity-100 transition-opacity" />
                      <span>{dest.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 5: Contact */}
          <div>
            <h4 className="font-heading font-semibold text-[14px] text-white mb-4">
              {t.footer.contact}
            </h4>
            <div className="space-y-3">
              <a href="https://maps.google.com/?q=Mirpur-11,Dhaka" target="_blank" rel="noopener noreferrer" className="group flex items-start gap-2 text-[13px] text-white/70 hover:text-accent transition-colors">
                <MapPin className="w-4 h-4 shrink-0 text-white/60 group-hover:text-accent transition-colors mt-0.5" />
                <span>{t.footer.address}</span>
              </a>
              <a href="tel:+8801621999965" className="group flex items-center gap-2 text-[13px] text-white/70 hover:text-accent transition-colors">
                <Phone className="w-4 h-4 shrink-0 text-white/60 group-hover:text-accent transition-colors" />
                <span>{t.footer.phone}</span>
              </a>
              <a href="mailto:ahbstudyabroad@gmail.com" className="group flex items-center gap-2 text-[13px] text-white/70 hover:text-accent transition-colors">
                <Mail className="w-4 h-4 shrink-0 text-white/60 group-hover:text-accent transition-colors" />
                <span>{t.footer.email}</span>
              </a>
              <div className="flex items-start gap-2 text-[13px] text-white/70">
                <Clock className="w-4 h-4 shrink-0 text-white/60 mt-0.5" />
                <span>{t.footer.officeHoursDetail}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - outside container for full width */}
      <div className="bg-white/[0.03] py-3 px-4 flex flex-col md:flex-row items-center md:justify-between gap-1 md:gap-0 text-center md:text-left">
        <p className="text-xs text-white/40">
          © {new Date().getFullYear()} AHB Study Abroad. {t.footer.rights}
        </p>
        <div className="flex items-center gap-4">
          <Link href="/about" className="text-xs text-white/30 hover:text-white/60 transition-colors">Privacy Policy</Link>
          <Link href="/about" className="text-xs text-white/30 hover:text-white/60 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
