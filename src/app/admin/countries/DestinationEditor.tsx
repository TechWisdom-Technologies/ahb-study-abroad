"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, X, Save, ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import { DocumentCategory, normalizeDocumentChecklist, serializeDocumentChecklist } from "@/lib/documentChecklist";
import { CourseCategory, normalizePopularCourses, serializePopularCourses } from "@/lib/popularCourses";

type ArrayKey = "highlights" | "why_choose" | "intakes" | "special_notes";

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
    popular_courses: [] as CourseCategory[],
    intakes: [] as string[],
    english_requirements: [] as { level: string; ielts: string; pte?: string; toefl?: string; duolingo?: string; oietc?: string }[],
    tuition_details: [] as { program: string; fee: string }[],
    document_checklist: [] as DocumentCategory[],
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
            popular_courses: normalizePopularCourses(data.popular_courses),
            intakes: Array.isArray(data.intakes) ? data.intakes : [],
            english_requirements: Array.isArray(data.english_requirements) ? data.english_requirements : [],
            tuition_details: Array.isArray(data.tuition_details) ? data.tuition_details : [],
            document_checklist: normalizeDocumentChecklist(data.document_checklist),
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
      popular_courses: serializePopularCourses(normalizePopularCourses(form.popular_courses)),
      intakes: form.intakes.filter(Boolean),
      english_requirements: form.english_requirements,
      tuition_details: form.tuition_details,
      document_checklist: serializeDocumentChecklist(normalizeDocumentChecklist(form.document_checklist)),
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

  // Popular courses helpers
  const courseCategories = normalizePopularCourses(form.popular_courses);
  const updateCourseCategories = (fn: (cats: CourseCategory[]) => CourseCategory[]) => {
    setForm(f => ({ ...f, popular_courses: fn(normalizePopularCourses(f.popular_courses)) }));
  };
  const addCourseCategory = () => {
    updateCourseCategories(cats => [...cats, { category: "", courses: [""] }]);
  };
  const renameCourseCategory = (catIdx: number, category: string) => {
    updateCourseCategories(cats => cats.map((c, i) => i === catIdx ? { ...c, category } : c));
  };
  const removeCourseCategory = (catIdx: number) => {
    const cat = courseCategories[catIdx];
    if (cat && (cat.category || cat.courses.some(Boolean)) && !confirm(`Delete "${cat.category || "Untitled"}" and all its courses?`)) return;
    updateCourseCategories(cats => cats.filter((_, i) => i !== catIdx));
  };
  const addSubCourse = (catIdx: number) => {
    updateCourseCategories(cats => cats.map((c, i) => i === catIdx ? { ...c, courses: [...c.courses, ""] } : c));
  };
  const updateSubCourse = (catIdx: number, idx: number, val: string) => {
    updateCourseCategories(cats => cats.map((c, i) => i === catIdx ? { ...c, courses: c.courses.map((v, j) => j === idx ? val : v) } : c));
  };
  const removeSubCourse = (catIdx: number, idx: number) => {
    updateCourseCategories(cats => cats.map((c, i) => i === catIdx ? { ...c, courses: c.courses.filter((_, j) => j !== idx) } : c));
  };

  // Doc checklist helpers
  const docCategories = normalizeDocumentChecklist(form.document_checklist);
  const updateCategories = (fn: (cats: DocumentCategory[]) => DocumentCategory[]) => {
    setForm(f => ({ ...f, document_checklist: fn(normalizeDocumentChecklist(f.document_checklist)) }));
  };
  const addCategory = () => {
    updateCategories(cats => [...cats, { title: "", items: [""] }]);
  };
  const renameCategory = (catIdx: number, title: string) => {
    updateCategories(cats => cats.map((c, i) => i === catIdx ? { ...c, title } : c));
  };
  const removeCategory = (catIdx: number) => {
    const cat = docCategories[catIdx];
    if (cat && cat.items.some(Boolean) && !confirm(`Delete "${cat.title || "Untitled"}" and all its documents?`)) return;
    updateCategories(cats => cats.filter((_, i) => i !== catIdx));
  };
  const addDoc = (catIdx: number) => {
    updateCategories(cats => cats.map((c, i) => i === catIdx ? { ...c, items: [...c.items, ""] } : c));
  };
  const updateDoc = (catIdx: number, idx: number, val: string) => {
    updateCategories(cats => cats.map((c, i) => i === catIdx ? { ...c, items: c.items.map((v, j) => j === idx ? val : v) } : c));
  };
  const removeDoc = (catIdx: number, idx: number) => {
    updateCategories(cats => cats.map((c, i) => i === catIdx ? { ...c, items: c.items.filter((_, j) => j !== idx) } : c));
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
          <div className="p-4 border rounded space-y-4 bg-card border-border">
            {courseCategories.length === 0 && (
              <p className="text-xs text-muted-foreground">No course categories yet. Add one below (e.g. IT, Engineering, Business, Medical, Arts).</p>
            )}
            {courseCategories.map((cat, catIdx) => (
              <div key={catIdx} className="border border-border rounded p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    value={cat.category}
                    onChange={e => renameCourseCategory(catIdx, e.target.value)}
                    className="text-xs font-semibold border-border"
                    placeholder="Category name (e.g. IT, Business, Engineering)..."
                  />
                  <Button size="sm" variant="ghost" className="rounded shrink-0" onClick={() => addSubCourse(catIdx)}><Plus className="w-3 h-3 mr-1" /> Add Course</Button>
                  <Button size="icon" variant="ghost" className="shrink-0" title="Delete category" onClick={() => removeCourseCategory(catIdx)}><Trash2 className="w-3.5 h-3.5 text-destructive" /></Button>
                </div>
                {cat.courses.length === 0 && (
                  <p className="text-[11px] text-muted-foreground pl-3">No courses added in this category yet. Click &quot;+ Add Course&quot; to add sub-courses (e.g. CSE, CS, Data Science).</p>
                )}
                {cat.courses.map((course, i) => (
                  <div key={i} className="flex gap-2 pl-3">
                    <Input value={course} onChange={e => updateSubCourse(catIdx, i, e.target.value)} className="text-xs border-border" placeholder="Course name (e.g. CSE, Data Science, MBA)..." />
                    <Button size="icon" variant="ghost" onClick={() => removeSubCourse(catIdx, i)}><X className="w-3 h-3 text-destructive" /></Button>
                  </div>
                ))}
              </div>
            ))}
            <Button size="sm" variant="outline" className="rounded w-full border-dashed" onClick={addCourseCategory}>
              <Plus className="w-3 h-3 mr-1" /> Add Course Category
            </Button>
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
            {docCategories.length === 0 && (
              <p className="text-xs text-muted-foreground">No document categories yet. Add one below (e.g. Undergraduate, Postgraduate, Foundation, PhD, Visa).</p>
            )}
            {docCategories.map((cat, catIdx) => (
              <div key={catIdx} className="border border-border rounded p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Input
                    value={cat.title}
                    onChange={e => renameCategory(catIdx, e.target.value)}
                    className="text-xs font-semibold border-border"
                    placeholder="Category name (e.g. Undergraduate, PhD, Visa)..."
                  />
                  <Button size="sm" variant="ghost" className="rounded shrink-0" onClick={() => addDoc(catIdx)}><Plus className="w-3 h-3 mr-1" /> Add Document</Button>
                  <Button size="icon" variant="ghost" className="shrink-0" title="Delete category" onClick={() => removeCategory(catIdx)}><Trash2 className="w-3.5 h-3.5 text-destructive" /></Button>
                </div>
                {cat.items.map((doc, i) => (
                  <div key={i} className="flex gap-2 pl-3">
                    <Input value={doc} onChange={e => updateDoc(catIdx, i, e.target.value)} className="text-xs border-border" placeholder="Document name..." />
                    <Button size="icon" variant="ghost" onClick={() => removeDoc(catIdx, i)}><X className="w-3 h-3 text-destructive" /></Button>
                  </div>
                ))}
              </div>
            ))}
            <Button size="sm" variant="outline" className="rounded w-full border-dashed" onClick={addCategory}>
              <Plus className="w-3 h-3 mr-1" /> Add Document Category
            </Button>
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
