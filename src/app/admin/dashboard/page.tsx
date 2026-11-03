"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, GraduationCap, BookOpen, Award, MessageSquare, Megaphone, Users, TrendingUp, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

type Lead = { id: string; name: string; email: string; status: string; destination: string | null; created_at: string };

const formatDateSafe = (val: unknown, pattern: string = "dd MMM") => {
  if (!val) return "—";
  const d = new Date(val as any);
  if (isNaN(d.getTime())) return "—";
  try {
    return format(d, pattern);
  } catch {
    return "—";
  }
};

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState({
    countries: 0, universities: 0, english_tests: 0,
    scholarships: 0, testimonials: 0, announcements: 0, leads: 0,
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [leadStats, setLeadStats] = useState({ new: 0, contacted: 0, converted: 0, closed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/admin/dashboard-stats");
        if (res.ok) {
          const data = await res.json();
          setCounts(data.counts);
          setRecentLeads(data.recentLeads);
          setLeadStats(data.leadStats);
        }
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total Leads", count: counts.leads, icon: Users, path: "/admin/leads", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { label: "Countries", count: counts.countries, icon: Globe, path: "/admin/countries", color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Universities", count: counts.universities, icon: GraduationCap, path: "/admin/universities", color: "text-green-400", bg: "bg-green-500/10" },
    { label: "English Tests", count: counts.english_tests, icon: BookOpen, path: "/admin/english-tests", color: "text-orange-400", bg: "bg-orange-500/10" },
    { label: "Scholarships", count: counts.scholarships, icon: Award, path: "/admin/scholarships", color: "text-yellow-400", bg: "bg-yellow-500/10" },
    { label: "Testimonials", count: counts.testimonials, icon: MessageSquare, path: "/admin/testimonials", color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "Announcements", count: counts.announcements, icon: Megaphone, path: "/admin/announcements", color: "text-red-400", bg: "bg-red-500/10" },
  ];

  const statusColors: Record<string, string> = {
    new: "bg-blue-500/20 text-blue-400",
    contacted: "bg-yellow-500/20 text-yellow-400",
    converted: "bg-green-500/20 text-green-400",
    closed: "bg-red-500/20 text-red-400",
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-muted-foreground text-sm">
        Loading dashboard statistics...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading font-bold text-2xl text-foreground">Dashboard</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Welcome back to AHB Study Abroad Admin</p>
        </div>
        <div className="text-xs text-muted-foreground">{format(new Date(), "EEEE, dd MMMM yyyy")}</div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {cards.map((c) => (
          <Link key={c.path} href={c.path} className="block">
            <Card className="hover:border-primary/30 transition-all cursor-pointer group bg-card/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded flex items-center justify-center ${c.bg}`}>
                    <c.icon className={`w-4.5 h-4.5 ${c.color}`} />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-2xl font-bold text-foreground">{c.count}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{c.label}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Lead Pipeline */}
        <Card className="bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-foreground">
              <TrendingUp className="w-4 h-4 text-primary" /> Lead Pipeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {(["new", "contacted", "converted", "closed"] as const).map(status => {
              const total = Object.values(leadStats).reduce((a, b) => a + b, 0) || 1;
              const pct = Math.round((leadStats[status] / total) * 100);
              return (
                <div key={status}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="capitalize text-muted-foreground">{status}</span>
                    <span className="font-medium text-foreground">{leadStats[status]}</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        status === "new" ? "bg-blue-500" :
                        status === "contacted" ? "bg-yellow-500" :
                        status === "converted" ? "bg-green-500" : "bg-red-500"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Leads */}
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border">
          <CardHeader className="pb-3 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium flex items-center gap-2 text-foreground">
              <Clock className="w-4 h-4 text-primary" /> Recent Leads
            </CardTitle>
            <Link href="/admin/leads" className="text-xs text-primary hover:underline">View all →</Link>
          </CardHeader>
          <CardContent>
            {recentLeads.length === 0 ? (
              <p className="text-sm text-muted-foreground">No leads yet. They'll appear here when students submit the consultation form.</p>
            ) : (
              <div className="space-y-2">
                {recentLeads.map(lead => (
                  <div key={lead.id} className="flex items-center justify-between p-2.5 rounded bg-muted/30 border border-border/50">
                    <div>
                      <div className="font-medium text-sm text-foreground">{lead.name}</div>
                      <div className="text-xs text-muted-foreground">{lead.email} · {lead.destination || "No destination"}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs capitalize ${statusColors[lead.status] || ""}`}>
                        {lead.status}
                      </span>
                      <span className="text-xs text-muted-foreground">{formatDateSafe(lead.created_at, "dd MMM")}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
