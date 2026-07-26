"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send, GraduationCap, User, Phone, Mail, MessageSquare } from "lucide-react";

const cambryLogoWhite = "/assets/cambry-logo-white.png";

interface CourseRegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courseName: string;
  courseFee?: string | null;
  courseDuration?: string | null;
}

const CourseRegistrationModal = ({ open, onOpenChange, courseName, courseFee, courseDuration }: CourseRegistrationModalProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);

    try {
      const response = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name") as string,
          email: fd.get("email") as string,
          phone: fd.get("phone") as string,
          course: courseName,
          leadType: "course",
          details: {
            course_name: courseName,
            course_fee: courseFee || "",
            course_duration: courseDuration || "",
            message: fd.get("message") || "",
          },
        }),
      });

      const result = await response.json();
      setLoading(false);

      if (!response.ok) {
        toast({ title: "Error", description: result.error || "Something went wrong. Please try again.", variant: "destructive" });
        return;
      }

      toast({ title: "Registration Submitted!", description: "Our team will contact you shortly about this course." });
      onOpenChange(false);
    } catch (err) {
      setLoading(false);
      toast({ title: "Error", description: "Failed to connect to server.", variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-0">
        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-[#330066] via-[#4a0e8f] to-[#330066] p-6 pb-4 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <img src={cambryLogoWhite} alt="Cambry" className="h-8 w-auto" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-white font-heading text-xl">
                Register for Course
              </DialogTitle>
            </DialogHeader>
            <div className="mt-2 bg-white/10 backdrop-blur-sm rounded px-3 py-2 inline-flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-accent" />
              <span className="text-white text-sm font-medium">{courseName}</span>
              {courseFee && <span className="text-accent text-xs ml-2">৳{courseFee}</span>}
              {courseDuration && <span className="text-white/60 text-xs">• {courseDuration}</span>}
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-4 bg-background">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-primary" /> Full Name *
            </label>
            <Input name="name" required placeholder="Enter your full name" className="border-border" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-primary" /> Phone *
              </label>
              <Input name="phone" type="tel" required placeholder="+880 1XXX" className="border-border" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-primary" /> Email *
              </label>
              <Input name="email" type="email" required placeholder="you@email.com" className="border-border" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-primary" /> Message (optional)
            </label>
            <Textarea name="message" rows={2} placeholder="Any questions or requirements..." className="border-border" />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#330066] to-[#4a0e8f] hover:from-[#3d0077] hover:to-[#5511a0] text-white font-heading font-semibold"
          >
            <Send className="w-4 h-4 mr-2" />
            {loading ? "Submitting..." : "Submit Registration"}
          </Button>
          <p className="text-muted-foreground text-xs text-center">
            We'll get back to you within 24 hours.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CourseRegistrationModal;
