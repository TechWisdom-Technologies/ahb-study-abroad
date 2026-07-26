"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error context:", error);
  }, [error]);

  return (
    <div className="flex min-h-[85vh] flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-6 animate-pulse">
        <AlertCircle className="h-10 w-10" />
      </div>
      <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-[#283492] tracking-tight mb-4">
        Something went wrong!
      </h1>
      <p className="text-muted-foreground max-w-md mb-8 text-sm md:text-base leading-relaxed">
        An unexpected error occurred while loading this page. Our technical team has been notified.
      </p>
      <Button
        onClick={() => reset()}
        className="bg-[#283492] hover:bg-[#1a2266] text-white font-semibold gap-2 rounded px-6 py-5"
      >
        <RotateCcw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}
