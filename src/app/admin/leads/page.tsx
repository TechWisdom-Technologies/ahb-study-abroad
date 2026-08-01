"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Eye, Trash2, Mail, Phone, BookOpen, Clock, CheckCircle, XCircle, Search, Globe2, GraduationCap, Calendar, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  destination: string | null;
  course: string | null;
  status: string;
  notes: string | null;
  created_at: string;
  lead_type: string;
  details: Record<string, string> | null;
};

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  contacted: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  converted: "bg-green-500/20 text-green-400 border-green-500/30",
  closed: "bg-red-500/20 text-red-400 border-red-500/30",
};

const statusIcons: Record<string, React.ReactNode> = {
  new: <Clock className="w-3 h-3" />,
  contacted: <Mail className="w-3 h-3" />,
  converted: <CheckCircle className="w-3 h-3" />,
  closed: <XCircle className="w-3 h-3" />,
};

const tabLabels: Record<string, string> = {
  general: "General Lead",
  english_test: "English Test Taker",
  special: "Special Lead",
  course: "Course Lead",
};

export default function LeadsAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewLead, setViewLead] = useState<Lead | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("general");
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/leads");
      if (res.ok) {
        const data = await res.json();
        setLeads(data || []);
      } else {
        toast({ title: "Error", description: "Failed to load leads.", variant: "destructive" });
      }
    } catch (err) {
      console.error("Failed to load leads:", err);
      toast({ title: "Error", description: "Could not connect to server.", variant: "destructive" });
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast({ title: "Updated", description: `Status changed to ${status}` });
        fetchLeads();
        if (viewLead?.id === id) setViewLead({ ...viewLead, status });
      } else {
        toast({ title: "Error", description: "Failed to update status.", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to connect to server.", variant: "destructive" });
    }
  };

  const saveNotes = async () => {
    if (!viewLead) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${viewLead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
      if (res.ok) {
        toast({ title: "Saved", description: "Notes updated." });
        fetchLeads();
      } else {
        toast({ title: "Error", description: "Failed to save notes.", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to connect to server.", variant: "destructive" });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`/api/admin/leads?id=${deleteId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast({ title: "Deleted" });
        fetchLeads();
      } else {
        toast({ title: "Error", description: "Failed to delete lead.", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to connect to server.", variant: "destructive" });
    }
    setDeleteId(null);
  };

  const fieldLabel = (key: string) => key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  const tabLeads = leads.filter(l => (l.lead_type || "general") === activeTab);
  const filtered = tabLeads
    .filter(l => statusFilter === "all" || l.status === statusFilter)
    .filter(l => {
      if (!search) return true;
      const q = search.toLowerCase();
      return l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || l.phone.includes(q);
    });

  const counts = { all: tabLeads.length, new: 0, contacted: 0, converted: 0, closed: 0 };
  tabLeads.forEach(l => { if (counts[l.status as keyof typeof counts] !== undefined) counts[l.status as keyof typeof counts]++; });

  const tabCounts = { general: 0, english_test: 0, special: 0, course: 0 };
  leads.forEach(l => { const t = (l.lead_type || "general") as keyof typeof tabCounts; if (tabCounts[t] !== undefined) tabCounts[t]++; });

  const renderTable = () => (
    <>
      {/* Search & Status Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, phone..."
            className="pl-9 border-border bg-card text-foreground"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["all", "new", "contacted", "converted", "closed"] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded text-sm font-medium border transition-colors capitalize ${
                statusFilter === s
                  ? "bg-primary/20 text-primary border-primary/30"
                  : "bg-card border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {s} ({counts[s]})
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground text-sm">Loading leads...</p>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground text-sm">No leads found.</p>
      ) : (
        <div className="border border-border rounded overflow-x-auto w-full bg-card">
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="text-foreground font-semibold">Name</TableHead>
                <TableHead className="text-foreground font-semibold">Contact</TableHead>
                <TableHead className="text-foreground font-semibold">Status</TableHead>
                <TableHead className="text-foreground font-semibold">Date</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lead) => (
                <TableRow key={lead.id} className="border-border hover:bg-muted/30">
                  <TableCell className="font-medium text-foreground">{lead.name}</TableCell>
                  <TableCell>
                    <div className="text-xs space-y-0.5 text-muted-foreground">
                      <div className="flex items-center gap-1 text-foreground"><Mail className="w-3 h-3 text-muted-foreground" />{lead.email}</div>
                      <div className="flex items-center gap-1 text-foreground"><Phone className="w-3 h-3 text-muted-foreground" />{lead.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border capitalize font-medium ${statusColors[lead.status] || ""}`}>
                      {statusIcons[lead.status]} {lead.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {format(new Date(lead.created_at), "dd MMM yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="icon" className="w-8 h-8 rounded hover:bg-muted text-muted-foreground hover:text-foreground" onClick={() => { setViewLead(lead); setNotes(lead.notes || ""); }}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8 rounded hover:bg-red-500/10 text-muted-foreground hover:text-red-600" onClick={() => setDeleteId(lead.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-2xl text-foreground">Leads</h2>
      </div>

      <Tabs value={activeTab} onValueChange={v => { setActiveTab(v); setStatusFilter("all"); setSearch(""); }}>
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 mb-4">
          <TabsList className="w-max sm:w-auto bg-muted">
            {(["general", "english_test", "special", "course"] as const).map(tab => (
              <TabsTrigger key={tab} value={tab} className="text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-background">
                <span className="hidden sm:inline">{tabLabels[tab]}</span>
                <span className="sm:hidden">{tabLabels[tab].split(" ")[0]}</span>
                {" "}({tabCounts[tab]})
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {["general", "english_test", "special", "course"].map(tab => (
          <TabsContent key={tab} value={tab}>
            {renderTable()}
          </TabsContent>
        ))}
      </Tabs>

      {/* View Lead Dialog */}
      <Dialog open={!!viewLead} onOpenChange={() => setViewLead(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto p-0 border-0 bg-background border-border">
          {viewLead && (
            <>
              {/* Header with gradient */}
              <div className="bg-gradient-to-br from-[#141C3A] via-[#172140] to-[#0E142B] p-6 rounded-t-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="relative z-10">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#5CBAE6] bg-[#5CBAE6]/15 px-2 py-0.5 rounded mb-2 inline-block">
                    {tabLabels[(viewLead.lead_type || "general") as keyof typeof tabLabels] || viewLead.lead_type}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-white flex items-center gap-2">
                    <User className="w-5 h-5 text-white/80" /> {viewLead.name}
                  </h3>
                  <div className="flex flex-wrap gap-3 mt-3 text-white/80 text-sm">
                    <a href={`mailto:${viewLead.email}`} className="flex items-center gap-1 hover:text-white transition-colors">
                      <Mail className="w-3.5 h-3.5" /> {viewLead.email}
                    </a>
                    <a href={`tel:${viewLead.phone}`} className="flex items-center gap-1 hover:text-white transition-colors">
                      <Phone className="w-3.5 h-3.5" /> {viewLead.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-white/50 text-xs">
                    <Calendar className="w-3 h-3" /> {format(new Date(viewLead.created_at), "dd MMM yyyy, hh:mm a")}
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-5">
                {/* Quick info cards */}
                <div className="grid grid-cols-2 gap-3">
                  {viewLead.course && (
                    <div className="bg-primary/5 border border-primary/10 rounded p-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1"><BookOpen className="w-3 h-3" /> Course</div>
                      <p className="text-sm font-medium text-foreground">{viewLead.course}</p>
                    </div>
                  )}
                  {(viewLead.details?.preferred_destination || viewLead.destination) && (
                    <div className="bg-green-500/5 border border-green-500/10 rounded p-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1"><Globe2 className="w-3 h-3" /> Preferred Country</div>
                      <p className="text-sm font-medium text-foreground">{String(viewLead.details?.preferred_destination || viewLead.destination)}</p>
                    </div>
                  )}
                  {viewLead.details?.preferred_uni && (
                    <div className="bg-blue-500/5 border border-blue-500/10 rounded p-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1"><GraduationCap className="w-3 h-3" /> Preferred University</div>
                      <p className="text-sm font-medium text-foreground">{String(viewLead.details.preferred_uni)}</p>
                    </div>
                  )}
                </div>

                {/* Additional Details */}
                {viewLead.details && Object.keys(viewLead.details).filter(k => !["preferred_destination", "preferred_uni"].includes(k)).length > 0 && (
                  <div className="bg-muted/30 border border-border rounded p-4">
                    <h4 className="font-heading font-semibold text-sm mb-3 flex items-center gap-2 text-foreground">
                      <span className="w-1.5 h-1.5 bg-[#141C3A] rounded-full" /> Additional Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                      {Object.entries(viewLead.details)
                        .filter(([k, v]) => v && String(v).trim() && !["preferred_destination", "preferred_uni"].includes(k))
                        .map(([k, v]) => (
                          <div key={k} className="text-xs py-1 border-b border-border/50 last:border-0">
                            <span className="text-muted-foreground">{fieldLabel(k)}</span>
                            <p className="text-foreground font-medium mt-0.5">{String(v)}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Status */}
                <div>
                  <label className="text-sm font-medium mb-2 block text-foreground">Status</label>
                  <div className="flex gap-2 flex-wrap">
                    {["new", "contacted", "converted", "closed"].map(s => (
                      <button
                        key={s}
                        onClick={() => updateStatus(viewLead.id, s)}
                        className={`px-3 py-1.5 rounded text-xs border capitalize transition-all font-medium ${
                          viewLead.status === s
                            ? statusColors[s] + " shadow-sm font-semibold"
                            : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 bg-card"
                        }`}
                      >
                        {statusIcons[s]} {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-sm font-medium mb-1 block text-foreground">Notes</label>
                  <Textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Add notes about this lead..." className="border-border bg-card text-foreground" />
                </div>
              </div>

              <div className="px-6 pb-5 flex justify-end gap-2">
                <Button variant="outline" className="rounded" onClick={() => setViewLead(null)}>Close</Button>
                <Button onClick={saveNotes} className="rounded bg-gradient-to-r from-[#141C3A] to-[#0E142B] text-white hover:opacity-90">Save Notes</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="bg-background border border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-heading font-bold text-foreground">Delete this lead?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded">Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-600 hover:bg-red-700 text-white rounded" onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
