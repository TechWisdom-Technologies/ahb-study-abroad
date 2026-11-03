"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { Menu, X, Globe, Home, Info, Briefcase, MapPin, FileText, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCountries } from "@/hooks/useCountries";
import CountryFlag from "@/components/shared/CountryFlag";
import SpecialLeadModal from "@/components/SpecialLeadModal";

const ahbLogoDark = "/assets/ahb-logo.png";
const ahbLogoWhite = "/assets/ahb-logo-white.png";

const navIcons: Record<string, React.ElementType> = {
  "/": Home,
  "/about": Info,
  "/services": Briefcase,
  "/destinations": MapPin,
  "/ielts": FileText,
  "/contact": Phone,
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [desktopDestOpen, setDesktopDestOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const { t, toggleLanguage, language } = useLanguage();
  const pathname = usePathname();
  const location = { pathname };
  const { countries } = useCountries();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: t.nav.home },
    { to: "/about", label: t.nav.about },
    { to: "/services", label: t.nav.services },
    { to: "/destinations", label: t.nav.destinations },
    { to: "/ielts", label: t.nav.ielts },
    { to: "/contact", label: t.nav.contact },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${scrolled
      ? "bg-white border-primary/10 shadow-sm"
      : "bg-[#141C3A] border-white/10 shadow-md"
    }`}>
      <div className="container flex items-center justify-between h-[80px]">
        {/* Logo & Brand Name */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <img
            src={scrolled ? ahbLogoDark : ahbLogoWhite}
            alt="AHB Study Abroad Logo"
            className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col justify-center">
            <span
              className={`font-heading font-extrabold text-base sm:text-lg tracking-tight transition-colors duration-300 leading-tight ${
                scrolled ? "text-[#141C3A]" : "text-white"
              }`}
            >
              AHB <span className={scrolled ? "text-primary" : "text-[#5CBAE6]"}>Study Abroad</span>
            </span>
            <span
              className={`text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase transition-colors duration-300 ${
                scrolled ? "text-slate-500" : "text-slate-300/80"
              }`}
            >
              Global Education Consultancy
            </span>
          </div>
        </Link>
 
        {/* Desktop nav */}
        <div className="hidden lg:flex items-stretch gap-2 ml-auto h-full">
          {links.map((link) => {
            const Icon = navIcons[link.to] || Home;
            const isDest = link.to === "/destinations";
 
            if (isDest) {
              return (
                <div
                  key={link.to}
                  className="relative flex items-center h-full"
                  onMouseEnter={() => setDesktopDestOpen(true)}
                  onMouseLeave={() => setDesktopDestOpen(false)}
                >
                  <Link
                    href={link.to}
                    onClick={() => setDesktopDestOpen(false)}
                    className={`group relative flex items-center gap-1.5 px-3 py-2 text-sm font-heading font-normal transition-colors duration-300 ${isActive(link.to)
                      ? scrolled ? "text-primary" : "text-[#5CBAE6]"
                      : scrolled ? "text-foreground hover:text-primary" : "text-white/85 hover:text-[#5CBAE6]"
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="relative">
                      {link.label}
                      <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current transition-all duration-300 ${isActive(link.to) ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"}`} />
                    </span>
                    <ChevronDown className={`w-3 h-3 ml-0.5 transition-transform ${desktopDestOpen ? "rotate-180" : ""}`} />
                  </Link>
                  {desktopDestOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px z-50">
                      <div className="bg-white bg-gradient-to-br from-white via-primary/[0.03] to-accent/[0.07] border border-primary/15 rounded-xl shadow-xl p-3.5 w-[680px] grid grid-cols-4 gap-1.5 backdrop-blur-md">
                        {countries.slice(0, 16).map((country) => (
                          <Link
                            key={country.id}
                            href={`/destinations/${country.slug}`}
                            onClick={() => setDesktopDestOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          >
                            <CountryFlag code={country.flag_code} size="sm" className="shadow-sm border border-border/40 shrink-0" />
                            <span className="truncate">{country.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
 
            return (
              <div key={link.to} className="flex items-center h-full">
                <Link
                  href={link.to}
                  className={`group relative flex items-center gap-1.5 px-3 py-2 text-sm font-heading font-normal transition-colors duration-300 ${isActive(link.to)
                    ? scrolled ? "text-primary" : "text-[#5CBAE6]"
                    : scrolled ? "text-foreground hover:text-primary" : "text-white/85 hover:text-[#5CBAE6]"
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="relative">
                    {link.label}
                    <span className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current transition-all duration-300 ${isActive(link.to) ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"}`} />
                  </span>
                </Link>
              </div>
            );
          })}
 
          {/* WhatsApp CTA */}
          <div className="flex items-center ml-4">
            <a
              href="https://wa.me/+8801977797775?text=Hello%20AHB%20Study%20Abroad,%20I%20would%20like%20to%20know%20more%20about%20studying%20abroad."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-heading font-semibold shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
 
        {/* Mobile menu trigger */}
        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 rounded transition-colors ${scrolled
            ? "text-foreground hover:text-primary hover:bg-primary/5"
            : "text-white hover:text-primary hover:bg-white/10"
            }`}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
 
      {/* Mobile fullscreen menu */}
      {open && (
        <div style={{ top: "80px" }} className="lg:hidden fixed inset-x-0 bottom-0 z-[100] bg-white border-t border-primary/10 flex flex-col">
          <div className="flex-1 px-5 py-3 flex flex-col gap-0">
            {links.map((link) => {
              const Icon = navIcons[link.to] || Home;
              const isDest = link.to === "/destinations";
 
              return (
                <div key={link.to}>
                  <div className="flex items-center">
                    <Link
                      href={link.to}
                      onClick={() => { if (!isDest) { setOpen(false); setDestOpen(false); } }}
                      className={`flex-1 flex items-center gap-2.5 px-3 py-2.5 text-sm font-heading font-medium rounded transition-colors ${isActive(link.to)
                        ? "text-primary bg-primary/5"
                        : "text-foreground hover:text-primary hover:bg-primary/5"
                        }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {link.label}
                    </Link>
                    {isDest && (
                      <button
                        onClick={() => setDestOpen(!destOpen)}
                        className="p-2 text-foreground/60 hover:text-primary transition-colors"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${destOpen ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>
 
                  {isDest && destOpen && (
                    <div className="ml-7 mr-3 mb-1 border-l border-primary/10 pl-3 space-y-0 max-h-[40vh] overflow-y-auto">
                      {countries.map((country) => (
                        <Link
                          key={country.id}
                          href={`/destinations/${country.slug}`}
                          onClick={() => { setOpen(false); setDestOpen(false); }}
                          className="flex items-center gap-2.5 px-2.5 py-2 text-xs text-foreground/70 hover:text-primary hover:bg-primary/5 rounded transition-colors"
                        >
                          <CountryFlag code={country.flag_code} size="sm" />
                          <span>{country.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
 
        </div>
      )}

      <SpecialLeadModal open={consultationOpen} onOpenChange={setConsultationOpen} />
    </nav>
  );
};

export default Navbar;
