import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border border-transparent p-2 px-8 py-2.5 text-center font-heading font-normal text-sm whitespace-nowrap transition-colors duration-300 shadow-none",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        <span className="inline-block whitespace-nowrap transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 translate-x-8 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 px-4 whitespace-nowrap">
        <span className="whitespace-nowrap">{children}</span>
        <ArrowRight className="w-4 h-4 shrink-0" />
      </div>
    </button>
  )
}
