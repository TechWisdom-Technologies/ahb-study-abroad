"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Globe, GraduationCap, BookOpen, Award, MessageSquare,
  Megaphone, LogOut, Menu, X, LayoutDashboard, Users, Stamp,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const cambryLogoWhite = "/assets/cambry-logo-white.png";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Leads", icon: Users, path: "/admin/leads" },
  { label: "Countries", icon: Globe, path: "/admin/countries" },
  { label: "Universities", icon: GraduationCap, path: "/admin/universities" },
  { label: "Add New Course", icon: BookOpen, path: "/admin/english-tests" },
  { label: "Scholarships", icon: Award, path: "/admin/scholarships" },
  { label: "Testimonials", icon: MessageSquare, path: "/admin/testimonials" },
  { label: "Announcements", icon: Megaphone, path: "/admin/announcements" },
  { label: "Visa Approvals", icon: Stamp, path: "/admin/visa-approvals" },
];

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const isLoginPage = pathname === "/admin";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me");
        if (!res.ok) {
          if (!isLoginPage) {
            router.push("/admin");
          }
        } else {
          const data = await res.json();
          setUserEmail(data.user?.email || "");
          if (isLoginPage) {
            router.push("/admin/dashboard");
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        if (!isLoginPage) {
          router.push("/admin");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a2266] via-[#283492] to-[#3B4CAA]">
        <div className="flex flex-col items-center gap-4">
          <img src={cambryLogoWhite} alt="Cambry" className="h-12 w-auto opacity-80" />
          <div className="flex items-center gap-2 text-white/60">
            <div className="w-5 h-5 border-2 border-white/20 border-t-[#FFD40E] rounded-full animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f8f9fc] via-[#f1f4f9] to-[#e6ecf5] text-foreground font-sans">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-screen w-[260px] flex flex-col transition-transform duration-300 ease-out md:translate-x-0",
        "bg-gradient-to-b from-[#283492] via-[#2c3a9e] to-[#1e2873]",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Sidebar header with logo */}
        <div className="relative px-5 h-[81px] flex items-center border-b border-white/[0.06] shrink-0">
          <div className="flex items-center justify-between w-full">
            <Link href="/admin/dashboard" className="flex items-center" onClick={() => setSidebarOpen(false)}>
              <img src={cambryLogoWhite} alt="Cambry" className="h-10 w-auto" />
            </Link>
            <button
              className="md:hidden w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-0.5 mt-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 relative",
                  isActive
                    ? "bg-[#FFD40E]/15 text-[#FFD40E] shadow-sm shadow-[#FFD40E]/5"
                    : "text-white/60 hover:bg-white/[0.06] hover:text-white/90"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#FFD40E] rounded-r-full" />
                )}
                <item.icon className={cn(
                  "w-[18px] h-[18px] shrink-0 transition-colors",
                  isActive ? "text-[#FFD40E]" : "text-white/40 group-hover:text-white/70"
                )} />
                <span className="truncate">{item.label}</span>
                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 ml-auto text-[#FFD40E]/50" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="px-3 border-t border-white/[0.06] h-[50px] flex items-center justify-center shrink-0 mt-auto">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2.5 text-white/40 hover:text-red-400 hover:bg-red-500/10 h-8 text-[13px]"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-[260px] min-w-0">
        {/* Top header */}
        <header className="sticky top-0 z-30 bg-white/60 backdrop-blur-xl border-b border-white/80 shadow-[0_4px_30px_rgba(0,0,0,0.02)] h-[81px] flex items-center px-4 md:px-5 gap-3 shrink-0">
          {/* Mobile menu button */}
          <button
            className="md:hidden w-9 h-9 rounded-lg bg-[#283492]/5 flex items-center justify-center hover:bg-[#283492]/10 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5 text-[#283492]" />
          </button>

          {/* Admin Portal Label on Left */}
          <div className="flex items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#283492]/10 to-[#283492]/5 border border-[#283492]/10 rounded-sm">
              <span className="text-[#283492] text-xs font-semibold tracking-[0.1em] uppercase">Admin Portal</span>
            </div>
            {userEmail && (
              <span className="ml-3 text-xs text-muted-foreground hidden sm:inline-block">
                Logged in as: <strong className="text-foreground">{userEmail}</strong>
              </span>
            )}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 sm:p-5 md:p-6 overflow-x-hidden">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200/60 bg-white/50 px-4 sm:px-6 h-[50px] flex items-center shrink-0 mt-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 w-full">
            <p className="text-[11px] text-gray-400">
              © {new Date().getFullYear()} Cambry International Admission Center
            </p>
            <p className="text-[11px] text-gray-300">
              Admin Panel v1.0
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
