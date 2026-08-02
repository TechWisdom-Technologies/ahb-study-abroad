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
const ahbLogoWhite = "/assets/ahb-logo.png";

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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
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
  const dark = false;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${scrolled
      ? "bg-white border-primary/10 shadow-sm"
      : "bg-[#141C3A] border-white/10 shadow-md"
    }`}>
      <div className="container flex items-center justify-between h-[80px]">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src={ahbLogoDark} alt="AHB Study Abroad" className={`h-[72px] w-auto rounded transition-all duration-300 ${scrolled ? "" : "brightness-0 invert"}`} />
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
              <Link
                key={link.to}
                href={link.to}
                className={`group relative flex items-center h-full gap-1.5 px-3 py-2 text-sm font-heading font-normal transition-colors duration-300 ${isActive(link.to)
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
            );
          })}
 
          <a
            href="https://wa.me/8801621999965"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 h-9 rounded-lg bg-[#25D366] text-white hover:bg-[#20ba5a] transition-all duration-300 shadow-sm ml-3 text-xs font-semibold self-center"
            aria-label="Contact on WhatsApp"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
 
        {/* Mobile toggle */}
        <button onClick={() => { setOpen(!open); setDestOpen(false); }} className={`lg:hidden ml-auto p-2 transition-colors duration-300 ${scrolled ? "text-foreground" : "text-white"}`}>
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
