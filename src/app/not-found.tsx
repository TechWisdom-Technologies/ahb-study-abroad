"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-accent mb-6">
        <FileQuestion className="h-10 w-10" />
      </div>
      <h1 className="font-heading font-extrabold text-6xl md:text-7xl text-[#283492] tracking-tight mb-4">404</h1>
      <h2 className="font-heading font-bold text-xl md:text-2xl text-foreground mb-3">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8 text-sm md:text-base leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link href="/">
        <Button className="bg-[#283492] hover:bg-[#1a2266] text-white font-semibold gap-2 rounded px-6 py-5">
          <Home className="h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
