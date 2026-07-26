"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, X, Save, ChevronDown, ChevronRight } from "lucide-react";

type ArrayKey = "highlights" | "why_choose" | "popular_courses" | "intakes" | "special_notes";

const StringArrayEditor = ({ label, items, onAdd, onUpdate, onRemove }: {
  label: string;
  items: string[];
  onAdd: () => void;
  onUpdate: (idx: number, val: string) => void;
  onRemove: (idx: number) => void;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <Label className="text-xs font-semibold">{label}</Label>
      <Button size="sm" variant="ghost" onClick={onAdd}><Plus className="w-3 h-3 mr-1" /> Add</Button>
    </div>
    {items.map((item, i) => (
      <div key={i} className="flex gap-2">
        <Input value={item} onChange={e => onUpdate(i, e.target.value)} className="text-xs border-border" placeholder={`${label} item...`} />
        <Button size="icon" variant="ghost" onClick={() => onRemove(i)}><X className="w-3 h-3 text-destructive" /></Button>
      </div>
    ))}
  </div>
);

type Props = {
  countryId: string;
  countryName: string;
  onBack: () => void;
};

type Section = "basic" | "content" | "courses" | "english" | "tuition" | "documents" | "notes";

const ImageUploadInput = ({ value, onChange, placeholder }: { value: string; onChange: (url: string) => void; placeholder?: string }) => {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        onChange(data.url);
      } else {
        alert("Upload failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to connect to server.");
    }
    setUploading(false);
  };

  return (
    <div className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1"
      />
      <input
        type="file"
        ref={fileRef}
        onChange={handleUpload}
        className="hidden"
        accept="image/*"
      />
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="px-3 shrink-0 rounded"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? "..." : "Upload"}
      </Button>
    </div>
  );
};

const DestinationEditor = ({ countryId, countryName, onBack }: Props) => {
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState<Set<Section>>(new Set(["basic"]));

  const [form, setForm] = useState({
    tagline: "",
    hero_image_url: "",
    card_image_url: "",
    living_cost: "",
    work_rights: "",
    visa_info: "",
    highlights: [] as string[],
    why_choose: [] as string[],
    popular_courses: [] as string[],
    intakes: [] as string[],
    english_requirements: [] as { level: string; ielts: string; pte?: string; toefl?: string; duolingo?: string; oietc?: string }[],
    tuition_details: [] as { program: string; fee: string }[],
    document_checklist: { undergraduate: [] as string[], postgraduate: [] as string[] } as { undergraduate: string[]; postgraduate: string[] },
    special_notes: [] as string[],
  });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/admin/countries?id=${countryId}`);
        if (res.ok) {
          const data = await res.json();
          setForm({
            tagline: data.tagline || "",
            hero_image_url: data.hero_image_url || "",
            card_image_url: data.card_image_url || "",
            living_cost: data.living_cost || "",
            work_rights: data.work_rights || "",
            visa_info: data.visa_info || "",
            highlights: Array.isArray(data.highlights) ? data.highlights : [],
            why_choose: Array.isArray(data.why_choose) ? data.why_choose : [],
            popular_courses: Array.isArray(data.popular_courses) ? data.popular_courses : [],
            intakes: Array.isArray(data.intakes) ? data.intakes : [],
            english_requirements: Array.isArray(data.english_requirements) ? data.english_requirements : [],
            tuition_details: Array.isArray(data.tuition_details) ? data.tuition_details : [],
            document_checklist: (() => {
              const dc = data.document_checklist;
              if (dc && typeof dc === "object" && !Array.isArray(dc)) {
                return { undergraduate: Array.isArray(dc.undergraduate) ? dc.undergraduate : [], postgraduate: Array.isArray(dc.postgraduate) ? dc.postgraduate : [] };
              }
              return { undergraduate: [], postgraduate: [] };
            })(),
            special_notes: Array.isArray(data.special_notes) ? data.special_notes : [],
          });
        }
      } catch (err) {
        console.error("Failed to load country details:", err);
      }
    };
    load();
  }, [countryId]);

  const toggle = (s: Section) => {
    setExpanded(prev => {
      const n = new Set(prev);
      if (n.has(s)) { n.delete(s); } else { n.add(s); }
      return n;
    });
  };

  const handleSave = async () => {
    setSaving(true);
    const payload: any = {
      tagline: form.tagline || null,
      hero_image_url: form.hero_image_url || null,
      card_image_url: form.card_image_url || null,
      living_cost: form.living_cost || null,
      work_rights: form.work_rights || null,
      visa_info: form.visa_info || null,
      highlights: form.highlights.filter(Boolean),
      why_choose: form.why_choose.filter(Boolean),
      popular_courses: form.popular_courses.filter(Boolean),
      intakes: form.intakes.filter(Boolean),
      english_requirements: form.english_requirements,
      tuition_details: form.tuition_details,
      document_checklist: form.document_checklist,
      special_notes: form.special_notes.filter(Boolean),
    };

    try {
      const res = await fetch(`/api/admin/countries?id=${countryId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast({ title: "Saved", description: "Destination page details updated." });
      } else {
        const errData = await res.json();
        toast({ title: "Error", description: errData.error || "Failed to update country details.", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to connect to server.", variant: "destructive" });
    }
    setSaving(false);
  };

  // Array helpers
  const addToArray = (key: ArrayKey) => {
    setForm(f => ({ ...f, [key]: [...f[key], ""] }));
  };
  const updateArray = (key: ArrayKey, idx: number, val: string) => {
    setForm(f => ({ ...f, [key]: f[key].map((v, i) => i === idx ? val : v) }));
  };
  const removeFromArray = (key: ArrayKey, idx: number) => {
    setForm(f => ({ ...f, [key]: f[key].filter((_, i) => i !== idx) }));
  };

  // Doc checklist helpers
  const addDoc = (level: "undergraduate" | "postgraduate") => {
    setForm(f => ({
      ...f,
      document_checklist: { ...f.document_checklist, [level]: [...(f.document_checklist[level] || []), ""] },
    }));
  };
  const updateDoc = (level: "undergraduate" | "postgraduate", idx: number, val: string) => {
    setForm(f => ({
      ...f,
      document_checklist: { ...f.document_checklist, [level]: f.document_checklist[level].map((v, i) => i === idx ? val : v) },
    }));
  };
  const removeDoc = (level: "undergraduate" | "postgraduate", idx: number) => {
    setForm(f => ({
      ...f,
      document_checklist: { ...f.document_checklist, [level]: f.document_checklist[level].filter((_, i) => i !== idx) },
    }));
  };

  const renderSectionHeader = (id: Section, label: string) => (
    <button onClick={() => toggle(id)} className="w-full flex items-center justify-between p-3 bg-muted/50 rounded font-heading font-semibold text-sm text-foreground hover:bg-muted transition-colors">
      {label}
      {expanded.has(id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
    </button>
  );

  const renderArrayEditor = (label: string, keyName: ArrayKey) => (
    <StringArrayEditor
      label={label}
      items={form[keyName] || []}
      onAdd={() => addToArray(keyName)}
      onUpdate={(idx, val) => updateArray(keyName, idx, val)}
      onRemove={(idx) => removeFromArray(keyName, idx)}
    />
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="sm" className="rounded" onClick={onBack}><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button>
        <h2 className="font-heading font-bold text-xl text-foreground">Destination Page: {countryName}</h2>
        <div className="ml-auto">
          <Button onClick={handleSave} disabled={saving} size="sm" className="rounded"><Save className="w-4 h-4 mr-1" /> {saving ? "Saving..." : "Save All"}</Button>
        </div>
      </div>

      <div className="space-y-3">
        {/* Basic Info */}
        {renderSectionHeader("basic", "📋 Basic Info & Images")}
        {expanded.has("basic") && (
          <div className="p-4 border rounded space-y-3 bg-card border-border">
            <div>
              <Label className="text-xs">Tagline</Label>
              <Input value={form.tagline} onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))} className="border-border" placeholder="e.g. World-class education with centuries of excellence" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Hero Image URL (destination page banner)</Label>
                <ImageUploadInput value={form.hero_image_url} onChange={url => setForm(f => ({ ...f, hero_image_url: url }))} placeholder="https://images.unsplash.com/..." />
                {form.hero_image_url && <img src={form.hero_image_url} alt="Hero preview" className="mt-2 h-20 rounded object-cover" />}
              </div>
              <div>
                <Label className="text-xs">Card Image URL (homepage card)</Label>
                <ImageUploadInput value={form.card_image_url} onChange={url => setForm(f => ({ ...f, card_image_url: url }))} placeholder="https://images.unsplash.com/..." />
                {form.card_image_url && <img src={form.card_image_url} alt="Card preview" className="mt-2 h-20 rounded object-cover" />}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label className="text-xs">Living Cost</Label>
                <Input value={form.living_cost} onChange={e => setForm(f => ({ ...f, living_cost: e.target.value }))} className="border-border" placeholder="£9,000 - £15,000/year" />
              </div>
              <div>
                <Label className="text-xs">Work Rights</Label>
                <Input value={form.work_rights} onChange={e => setForm(f => ({ ...f, work_rights: e.target.value }))} className="border-border" placeholder="20 hours/week during term" />
              </div>
              <div>
                <Label className="text-xs">Visa Info</Label>
                <Input value={form.visa_info} onChange={e => setForm(f => ({ ...f, visa_info: e.target.value }))} className="border-border" placeholder="Student Visa details..." />
              </div>
            </div>
          </div>
        )}

        {/* Content Lists */}
        {renderSectionHeader("content", "📝 Highlights, Why Choose & Intakes")}
        {expanded.has("content") && (
          <div className="p-4 border rounded space-y-4 bg-card border-border">
            {renderArrayEditor("Highlights (quick stats bar)", "highlights")}
            {renderArrayEditor("Why Choose (reasons)", "why_choose")}
            {renderArrayEditor("Intakes", "intakes")}
          </div>
        )}

        {/* Courses */}
        {renderSectionHeader("courses", "🎓 Popular Courses")}
        {expanded.has("courses") && (
          <div className="p-4 border rounded bg-card border-border">
            {renderArrayEditor("Popular Courses", "popular_courses")}
          </div>
        )}

        {/* English Requirements */}
        {renderSectionHeader("english", "🌐 English Language Requirements")}
        {expanded.has("english") && (
          <div className="p-4 border rounded space-y-3 bg-card border-border">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold">Requirements</Label>
              <Button size="sm" variant="ghost" className="rounded" onClick={() => setForm(f => ({ ...f, english_requirements: [...f.english_requirements, { level: "", ielts: "" }] }))}>
                <Plus className="w-3 h-3 mr-1" /> Add Row
              </Button>
            </div>
            {form.english_requirements.map((req, i) => (
              <div key={i} className="grid grid-cols-2 md:grid-cols-7 gap-2 items-end">
                <div><Label className="text-[10px]">Level</Label><Input value={req.level} onChange={e => setForm(f => ({ ...f, english_requirements: f.english_requirements.map((r, j) => j === i ? { ...r, level: e.target.value } : r) }))} className="text-xs border-border" /></div>
                <div><Label className="text-[10px]">IELTS</Label><Input value={req.ielts} onChange={e => setForm(f => ({ ...f, english_requirements: f.english_requirements.map((r, j) => j === i ? { ...r, ielts: e.target.value } : r) }))} className="text-xs border-border" /></div>
                <div><Label className="text-[10px]">PTE</Label><Input value={req.pte || ""} onChange={e => setForm(f => ({ ...f, english_requirements: f.english_requirements.map((r, j) => j === i ? { ...r, pte: e.target.value } : r) }))} className="text-xs border-border" /></div>
                <div><Label className="text-[10px]">TOEFL</Label><Input value={req.toefl || ""} onChange={e => setForm(f => ({ ...f, english_requirements: f.english_requirements.map((r, j) => j === i ? { ...r, toefl: e.target.value } : r) }))} className="text-xs border-border" /></div>
                <div><Label className="text-[10px]">Duolingo</Label><Input value={req.duolingo || ""} onChange={e => setForm(f => ({ ...f, english_requirements: f.english_requirements.map((r, j) => j === i ? { ...r, duolingo: e.target.value } : r) }))} className="text-xs border-border" /></div>
                <div><Label className="text-[10px]">OIETC</Label><Input value={req.oietc || ""} onChange={e => setForm(f => ({ ...f, english_requirements: f.english_requirements.map((r, j) => j === i ? { ...r, oietc: e.target.value } : r) }))} className="text-xs border-border" /></div>
                <Button size="icon" variant="ghost" onClick={() => setForm(f => ({ ...f, english_requirements: f.english_requirements.filter((_, j) => j !== i) }))}><X className="w-3 h-3 text-destructive" /></Button>
              </div>
            ))}
          </div>
        )}

        {/* Tuition Details */}
        {renderSectionHeader("tuition", "💰 Tuition Fee Breakdown")}
        {expanded.has("tuition") && (
          <div className="p-4 border rounded space-y-3 bg-card border-border">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold">Tuition Details</Label>
              <Button size="sm" variant="ghost" className="rounded" onClick={() => setForm(f => ({ ...f, tuition_details: [...f.tuition_details, { program: "", fee: "" }] }))}>
                <Plus className="w-3 h-3 mr-1" /> Add Row
              </Button>
            </div>
            {form.tuition_details.map((td, i) => (
              <div key={i} className="flex gap-2 items-end">
                <div className="flex-1"><Label className="text-[10px]">Program</Label><Input value={td.program} onChange={e => setForm(f => ({ ...f, tuition_details: f.tuition_details.map((t, j) => j === i ? { ...t, program: e.target.value } : t) }))} className="text-xs border-border" placeholder="e.g. Bachelor's" /></div>
                <div className="flex-1"><Label className="text-[10px]">Fee</Label><Input value={td.fee} onChange={e => setForm(f => ({ ...f, tuition_details: f.tuition_details.map((t, j) => j === i ? { ...t, fee: e.target.value } : t) }))} className="text-xs border-border" placeholder="e.g. £10,000 - £25,000" /></div>
                <Button size="icon" variant="ghost" onClick={() => setForm(f => ({ ...f, tuition_details: f.tuition_details.filter((_, j) => j !== i) }))}><X className="w-3 h-3 text-destructive" /></Button>
              </div>
            ))}
          </div>
        )}

        {/* Document Checklist */}
        {renderSectionHeader("documents", "📄 Document Checklist")}
        {expanded.has("documents") && (
          <div className="p-4 border rounded space-y-4 bg-card border-border">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-xs font-semibold">Undergraduate Documents</Label>
                <Button size="sm" variant="ghost" className="rounded" onClick={() => addDoc("undergraduate")}><Plus className="w-3 h-3 mr-1" /> Add</Button>
              </div>
              {(form.document_checklist?.undergraduate || []).map((doc, i) => (
                <div key={i} className="flex gap-2 mb-1">
                  <Input value={doc} onChange={e => updateDoc("undergraduate", i, e.target.value)} className="text-xs border-border" placeholder="Document name..." />
                  <Button size="icon" variant="ghost" onClick={() => removeDoc("undergraduate", i)}><X className="w-3 h-3 text-destructive" /></Button>
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-xs font-semibold">Postgraduate Documents</Label>
                <Button size="sm" variant="ghost" className="rounded" onClick={() => addDoc("postgraduate")}><Plus className="w-3 h-3 mr-1" /> Add</Button>
              </div>
              {(form.document_checklist?.postgraduate || []).map((doc, i) => (
                <div key={i} className="flex gap-2 mb-1">
                  <Input value={doc} onChange={e => updateDoc("postgraduate", i, e.target.value)} className="text-xs border-border" placeholder="Document name..." />
                  <Button size="icon" variant="ghost" onClick={() => removeDoc("postgraduate", i)}><X className="w-3 h-3 text-destructive" /></Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Special Notes */}
        {renderSectionHeader("notes", "💡 Special Notes")}
        {expanded.has("notes") && (
          <div className="p-4 border rounded bg-card border-border">
            {renderArrayEditor("Special Notes", "special_notes")}
          </div>
        )}
      </div>
    </div>
  );
};

export default DestinationEditor;
