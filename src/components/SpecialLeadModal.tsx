"use client";

import { useState, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Send, CheckCircle2, Edit2 } from "lucide-react";
import { countries } from "@/data/countries";
import CountryFlag from "@/components/shared/CountryFlag";

const STEPS = [
  "Personal Information",
  "Study Goals",
  "Academic Background",
  "English Proficiency",
  "Financial Information",
  "Travel & Visa History",
  "Work Experience",
  "Preferences & Intent",
  "Urgency & Contact",
  "Review & Submit",
];

type FormData = Record<string, string>;

const initialForm: FormData = {
  name: "", email: "", phone: "", dob: "", nationality: "", address: "",
  destination: "", intake: "", program_level: "", program_name: "", study_reason: "",
  last_degree: "", institution: "", gpa: "", graduation_year: "", major: "",
  english_test: "", english_score: "", test_date: "", target_score: "",
  funding_source: "", budget: "", scholarship_interest: "", sponsor: "",
  passport: "", visa_history: "", visa_refusal: "", travel_countries: "",
  work_experience: "", current_job: "", work_years: "", relevant_skills: "",
  preferred_uni: "", accommodation: "", start_timeline: "", special_needs: "",
  urgency: "", contact_method: "", best_time: "", additional_info: "",
};

const requiredByStep: Record<number, string[]> = {
  0: ["name", "email", "phone"],
  1: ["destination", "program_level"],
  2: ["last_degree", "institution"],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: ["urgency", "contact_method"],
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SpecialLeadModal = ({ open, onOpenChange }: Props) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({ ...initialForm });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showCloseWarning, setShowCloseWarning] = useState(false);
  const { toast } = useToast();

  const set = useCallback((key: string, val: string) => {
    setForm(prev => ({ ...prev, [key]: val }));
  }, []);

  const isFilled = Object.values(form).some(v => v.trim() !== "");

  const handleClose = (val: boolean) => {
    if (!val && isFilled && !submitted) {
      setShowCloseWarning(true);
      return;
    }
    if (!val) reset();
    onOpenChange(val);
  };

  const reset = () => {
    setStep(0);
    setForm({ ...initialForm });
    setSubmitted(false);
    setShowCloseWarning(false);
  };

  const validate = () => {
    const required = requiredByStep[step] || [];
    return required.every(k => form[k]?.trim());
  };

  const next = () => {
    if (!validate()) {
      toast({ title: "Required fields", description: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setStep(s => Math.min(s + 1, STEPS.length - 1));
  };

  const back = () => setStep(s => Math.max(s - 1, 0));

  const submit = async () => {
    setLoading(true);
    const { name, email, phone, destination, ...rest } = form;
    const countryData = countries.find(c => c.value === destination);

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          leadType: "special",
          details: { ...rest, preferred_destination: countryData?.label || destination || null },
        }),
      });

      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        toast({ title: "Error", description: result.error || "Something went wrong. Please try again.", variant: "destructive" });
        return;
      }
      setSubmitted(true);
    } catch (err) {
      setLoading(false);
      toast({ title: "Error", description: "Failed to connect to server.", variant: "destructive" });
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;
  const selectedCountryData = countries.find(c => c.value === form.destination);

  const fieldLabel = (key: string) => key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  const renderInput = (key: string, placeholder: string, type = "text", required = false) => (
    <div>
      <label className="text-sm font-medium text-foreground mb-1 block">
        {placeholder} {required && <span className="text-accent">*</span>}
      </label>
      <Input
        type={type}
        value={form[key]}
        onChange={e => set(key, e.target.value)}
        placeholder={placeholder}
        required={required}
        className="border-primary/20 focus:border-primary focus:ring-primary/30"
      />
    </div>
  );

  const renderTextarea = (key: string, placeholder: string) => (
    <div>
      <label className="text-sm font-medium text-foreground mb-1 block">{placeholder}</label>
      <Textarea value={form[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder} rows={3} className="border-primary/20 focus:border-primary focus:ring-primary/30" />
    </div>
  );

  const renderSelect = (key: string, placeholder: string, options: string[], required = false) => (
    <div>
      <label className="text-sm font-medium text-foreground mb-1 block">
        {placeholder} {required && <span className="text-accent">*</span>}
      </label>
      <Select value={form[key]} onValueChange={v => set(key, v)}>
        <SelectTrigger className="border-primary/20 focus:ring-primary/30"><SelectValue placeholder={placeholder} /></SelectTrigger>
        <SelectContent>
          {options.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );

  const renderCountrySelect = (required = false) => (
    <div>
      <label className="text-sm font-medium text-foreground mb-1 block">
        Preferred Country {required && <span className="text-accent">*</span>}
      </label>
      <Select value={form.destination} onValueChange={v => set("destination", v)}>
        <SelectTrigger className="border-primary/20 focus:ring-primary/30">
          <span className="flex items-center gap-2">
            {selectedCountryData && <CountryFlag code={selectedCountryData.flagCode} size="sm" />}
            <SelectValue placeholder="Select country" />
          </span>
        </SelectTrigger>
        <SelectContent>
          {countries.map(c => (
            <SelectItem key={c.value} value={c.value} textValue={c.label}>
              <span className="flex items-center gap-2">
                <CountryFlag code={c.flagCode} size="sm" />
                <span>{c.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="space-y-3">
          {renderInput("name", "Full Name", "text", true)}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {renderInput("email", "Email Address", "email", true)}
            {renderInput("phone", "Phone Number", "tel", true)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {renderInput("dob", "Date of Birth", "date")}
            {renderInput("nationality", "Nationality")}
          </div>
          {renderInput("address", "Current Address")}
        </div>
      );
      case 1: return (
        <div className="space-y-3">
          {renderCountrySelect(true)}
          {renderSelect("intake", "Preferred Intake", ["January 2025", "May 2025", "September 2025", "January 2026", "May 2026", "September 2026", "Flexible"])}
          {renderSelect("program_level", "Program Level", ["Undergraduate", "Postgraduate", "PhD", "Foundation", "Diploma", "Language Course"], true)}
          {renderInput("program_name", "Desired Program / Subject")}
          {renderTextarea("study_reason", "Why do you want to study abroad?")}
        </div>
      );
      case 2: return (
        <div className="space-y-3">
          {renderInput("last_degree", "Last Completed Degree", "text", true)}
          {renderInput("institution", "Institution Name", "text", true)}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {renderInput("gpa", "GPA / Grade")}
            {renderInput("graduation_year", "Graduation Year")}
          </div>
          {renderInput("major", "Major / Subject")}
        </div>
      );
      case 3: return (
        <div className="space-y-3">
          {renderSelect("english_test", "English Test Taken", ["IELTS", "PTE", "TOEFL", "Duolingo", "Linguaskill", "OET", "Not yet taken", "Other"])}
          {renderInput("english_score", "Score (if available)")}
          {renderInput("test_date", "Test Date", "date")}
          {renderInput("target_score", "Target Score")}
        </div>
      );
      case 4: return (
        <div className="space-y-3">
          {renderSelect("funding_source", "Funding Source", ["Self-funded", "Family", "Scholarship", "Bank Loan", "Employer Sponsored", "Mixed"])}
          {renderInput("budget", "Approximate Annual Budget (USD)")}
          {renderSelect("scholarship_interest", "Interested in Scholarships?", ["Yes", "No", "If available"])}
          {renderInput("sponsor", "Sponsor Name (if any)")}
        </div>
      );
      case 5: return (
        <div className="space-y-3">
          {renderSelect("passport", "Do you have a valid passport?", ["Yes", "No", "Applying"])}
          {renderTextarea("visa_history", "Previous visa history (countries, dates)")}
          {renderSelect("visa_refusal", "Any visa refusals?", ["No", "Yes"])}
          {renderInput("travel_countries", "Countries visited")}
        </div>
      );
      case 6: return (
        <div className="space-y-3">
          {renderSelect("work_experience", "Do you have work experience?", ["No", "Less than 1 year", "1-3 years", "3-5 years", "5+ years"])}
          {renderInput("current_job", "Current Job Title")}
          {renderInput("work_years", "Years of Experience")}
          {renderTextarea("relevant_skills", "Key skills or certifications")}
        </div>
      );
      case 7: return (
        <div className="space-y-3">
          {renderInput("preferred_uni", "Preferred University (if any)")}
          {renderSelect("accommodation", "Accommodation Preference", ["University Halls", "Private Rental", "Homestay", "No Preference"])}
          {renderSelect("start_timeline", "When do you plan to start?", ["ASAP", "Within 3 months", "Within 6 months", "Within 1 year", "Not sure"])}
          {renderTextarea("special_needs", "Any special requirements or preferences?")}
        </div>
      );
      case 8: return (
        <div className="space-y-3">
          {renderSelect("urgency", "How urgent is your application?", ["Very urgent - need to apply this month", "Moderate - within 2-3 months", "Planning ahead - 6+ months", "Just exploring options"], true)}
          {renderSelect("contact_method", "Preferred Contact Method", ["Phone Call", "WhatsApp", "Email", "Any"], true)}
          {renderSelect("best_time", "Best Time to Contact", ["Morning (9-12)", "Afternoon (12-5)", "Evening (5-9)", "Anytime"])}
          {renderTextarea("additional_info", "Anything else you'd like us to know?")}
        </div>
      );
      case 9: return (
        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
          <p className="text-sm text-muted-foreground">Please review your information before submitting.</p>
          {STEPS.slice(0, -1).map((title, i) => {
            const stepFields = Object.entries(form).filter(([_, v]) => v.trim()).filter(([k]) => {
              const ranges: Record<number, string[]> = {
                0: ["name", "email", "phone", "dob", "nationality", "address"],
                1: ["destination", "intake", "program_level", "program_name", "study_reason"],
                2: ["last_degree", "institution", "gpa", "graduation_year", "major"],
                3: ["english_test", "english_score", "test_date", "target_score"],
                4: ["funding_source", "budget", "scholarship_interest", "sponsor"],
                5: ["passport", "visa_history", "visa_refusal", "travel_countries"],
                6: ["work_experience", "current_job", "work_years", "relevant_skills"],
                7: ["preferred_uni", "accommodation", "start_timeline", "special_needs"],
                8: ["urgency", "contact_method", "best_time", "additional_info"],
              };
              return ranges[i]?.includes(k);
            });
            if (stepFields.length === 0) return null;
            return (
              <div key={i} className="border border-primary/20 rounded bg-primary/5 p-3">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-heading font-semibold text-sm text-primary">{title}</h4>
                  <Button variant="ghost" size="sm" onClick={() => setStep(i)} className="text-xs gap-1 h-7 text-accent hover:text-accent/80">
                    <Edit2 className="w-3 h-3" /> Edit
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {stepFields.map(([k, v]) => {
                    let display = v;
                    if (k === "destination") {
                      const c = countries.find(c => c.value === v);
                      display = c?.label || v;
                    }
                    return (
                      <div key={k} className="text-xs">
                        <span className="text-muted-foreground">{fieldLabel(k)}:</span>{" "}
                        <span className="text-foreground font-medium">{display}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      );
      default: return null;
    }
  };

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={v => { if (!v) reset(); onOpenChange(v); }}>
        <DialogContent className="max-w-md border-primary/30">
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-heading font-bold text-xl text-foreground">Application Submitted!</h3>
            <p className="text-muted-foreground text-sm">Our expert counselors will review your application and contact you within 24 hours.</p>
            <Button onClick={() => { reset(); onOpenChange(false); }} className="bg-primary hover:bg-primary/90">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open && !showCloseWarning} onOpenChange={handleClose}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-hidden flex flex-col p-0 border-primary/30">
          {/* Header with logo and progress */}
          <div className="bg-[#072a38] px-6 pt-5 pb-4 rounded-t-lg">
            <div className="flex items-center gap-3 mb-3">
              <img src="/assets/ahb-logo-white.png" alt="AHB Study Abroad" className="h-8 w-auto rounded" />
              <div>
                <h2 className="font-heading font-bold text-lg text-white">Free Consultation</h2>
                <p className="text-white/70 text-xs">Start your study abroad journey</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-white/80">
                <span>Step {step + 1} of {STEPS.length}</span>
                <span>{STEPS[step]}</span>
              </div>
              <Progress value={progress} className="h-2 bg-white/20 [&>div]:bg-accent" />
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {renderStep()}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-primary/10 flex items-center justify-between bg-muted/30">
            <Button variant="outline" onClick={back} disabled={step === 0} className="gap-1 border-primary/20 hover:bg-primary/5">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={next} className="gap-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                Continue <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={submit} disabled={loading} className="gap-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                <Send className="w-4 h-4" /> {loading ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Close Warning */}
      <Dialog open={showCloseWarning} onOpenChange={setShowCloseWarning}>
        <DialogContent className="max-w-sm border-primary/30">
          <h3 className="font-heading font-bold text-lg text-foreground">Discard progress?</h3>
          <p className="text-sm text-muted-foreground">You have unsaved form data. Are you sure you want to close?</p>
          <div className="flex gap-2 justify-end mt-4">
            <Button variant="outline" onClick={() => setShowCloseWarning(false)} className="border-primary/20">Continue Editing</Button>
            <Button variant="destructive" onClick={() => { reset(); setShowCloseWarning(false); onOpenChange(false); }}>Discard</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SpecialLeadModal;
