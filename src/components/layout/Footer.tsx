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
    <footer className="section-dark">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Column 1: Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <img src={ahbLogo} alt="AHB Study Abroad" className="h-12 w-auto rounded" />
            </div>
            <p className="text-sm text-white/70 leading-relaxed mb-4">{t.footer.about}</p>
            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/"
                className="w-8 h-8 rounded bg-[#1877F2] flex items-center justify-center hover:bg-[#3b93ff] transition-colors text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/"
                className="w-8 h-8 rounded bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center hover:brightness-125 transition-all text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/"
                className="w-8 h-8 rounded bg-[#0A66C2] flex items-center justify-center hover:bg-[#2d88e0] transition-colors text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/"
                className="w-8 h-8 rounded bg-[#FF0000] flex items-center justify-center hover:bg-[#ff3333] transition-colors text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Discover */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${dotColors[0]}`} />
              {t.footer.discover}
            </h4>
            <ul className="space-y-2.5">
              {t.footer.discoverLinks.map((item, i) => {
                const Icon = discoverIcons[i];
                return (
                  <li key={i}>
                    <Link href={discoverRoutes[i]} className="text-sm text-white/70 hover:text-accent transition-colors flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-accent" />
                      <span>{item}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Top Regions */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${dotColors[1]}`} />
              {t.footer.topRegions}
            </h4>
            <ul className="space-y-2.5">
              {t.footer.regionsList.map((item, i) => (
                <li key={i}>
                  <Link href={`/destinations/${regionSlugs[i]}`} className="text-sm text-white/70 hover:text-accent transition-colors flex items-center gap-2">
                    <img src={regionFlags[i]} alt="" className="w-4 h-3 rounded-[2px] object-cover shrink-0" />
                    <span>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Services */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${dotColors[2]}`} />
              {t.footer.services}
            </h4>
            <ul className="space-y-2.5">
              {t.footer.servicesList.map((item, i) => {
                const Icon = serviceIcons[i] || BookOpen;
                return (
                  <li key={i}>
                    <Link href="/services" className="text-sm text-white/70 hover:text-accent transition-colors flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span>{item}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${dotColors[3]}`} />
              {t.footer.contact}
            </h4>
            <div className="space-y-3 mb-4">
              <a href="https://maps.google.com/?q=Mirpur-11,Dhaka" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm text-white/70 hover:text-accent transition-colors">
                <MapPin className="w-4 h-4 shrink-0 text-accent mt-0.5" />
                <span>{t.footer.address}</span>
              </a>
              <a href="tel:+8801621999965" className="flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors">
                <Phone className="w-4 h-4 shrink-0 text-accent" />
                <span>{t.footer.phone}</span>
              </a>
              <a href="mailto:ahbstudyabroad@gmail.com" className="flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors">
                <Mail className="w-4 h-4 shrink-0 text-accent" />
                <span>{t.footer.email}</span>
              </a>
            </div>
            <h4 className="font-heading font-semibold text-white mb-2 flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${dotColors[4]}`} />
              {t.footer.officeHours}
            </h4>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Clock className="w-4 h-4 shrink-0 text-accent" />
              <span>{t.footer.officeHoursDetail}</span>
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
