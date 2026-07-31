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
  const dark = scrolled || open;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${dark
      ? "bg-[#1E2870]/95 border-white/10"
      : "bg-white/95 border-border"
      }`}>
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src={dark ? ahbLogoWhite : ahbLogoDark} alt="AHB Study Abroad" className="h-10 w-auto rounded transition-all duration-300" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {links.map((link) => {
            const Icon = navIcons[link.to] || Home;
            const isDest = link.to === "/destinations";

            if (isDest) {
              return (
                <div
                  key={link.to}
                  className="relative"
                  onMouseEnter={() => setDesktopDestOpen(true)}
                  onMouseLeave={() => setDesktopDestOpen(false)}
                >
                  <Link
                    href={link.to}
                    onClick={() => setDesktopDestOpen(false)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium transition-colors duration-300 rounded ${isActive(link.to)
                      ? dark ? "text-accent bg-white/10" : "text-primary bg-primary/5"
                      : dark ? "text-white/70 hover:text-white hover:bg-white/5" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {link.label}
                    <ChevronDown className={`w-3 h-3 ml-0.5 transition-transform ${desktopDestOpen ? "rotate-180" : ""}`} />
                  </Link>
                  {desktopDestOpen && (
                    <div className="absolute top-full left-0 pt-1 z-50">
                      <div className="bg-[#1E2870] border border-white/10 rounded shadow-xl py-3 px-2 w-[380px] grid grid-cols-2 gap-0.5">
                        {countries.map((country) => (
                          <Link
                            key={country.id}
                            href={`/destinations/${country.slug}`}
                            onClick={() => setDesktopDestOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <CountryFlag code={country.flag_code} size="sm" />
                            <span>{country.name}</span>
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
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium transition-colors duration-300 rounded ${isActive(link.to)
                  ? dark ? "text-accent bg-white/10" : "text-primary bg-primary/5"
                  : dark ? "text-white/70 hover:text-white hover:bg-white/5" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs transition-colors duration-300 ${dark ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <Globe className="w-3.5 h-3.5" />
            {t.langSwitch}
          </button>
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-semibold text-xs px-4" onClick={() => setConsultationOpen(true)}>
            {t.nav.freeConsultation}
          </Button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => { setOpen(!open); setDestOpen(false); }} className={`lg:hidden p-2 transition-colors duration-300 ${dark ? "text-white" : "text-foreground"}`}>
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      {open && (
        <div style={{ top: "64px" }} className="lg:hidden fixed inset-x-0 bottom-0 z-[100] bg-[#1E2870] flex flex-col">
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
                      className={`flex-1 flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded transition-colors ${isActive(link.to)
                        ? "text-accent bg-white/5"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                        }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {link.label}
                    </Link>
                    {isDest && (
                      <button
                        onClick={() => setDestOpen(!destOpen)}
                        className="p-2 text-white/60 hover:text-white transition-colors"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${destOpen ? "rotate-180" : ""}`} />
                      </button>
                    )}
                  </div>

                  {isDest && destOpen && (
                    <div className="ml-7 mr-3 mb-1 border-l border-white/10 pl-3 space-y-0 max-h-[40vh] overflow-y-auto">
                      {countries.map((country) => (
                        <Link
                          key={country.id}
                          href={`/destinations/${country.slug}`}
                          onClick={() => { setOpen(false); setDestOpen(false); }}
                          className="flex items-center gap-2.5 px-2.5 py-2 text-xs text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors"
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

          <div className="shrink-0 px-5 py-4 border-t border-white/10 flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-white/70 hover:text-white transition-colors"
            >
              <Globe className="w-4 h-4" />
              {t.langSwitch}
            </button>
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-heading font-semibold text-sm py-2.5" onClick={() => { setOpen(false); setConsultationOpen(true); }}>
              {t.nav.freeConsultation}
            </Button>
          </div>
        </div>
      )}

      <SpecialLeadModal open={consultationOpen} onOpenChange={setConsultationOpen} />
    </nav>
  );
};

export default Navbar;
