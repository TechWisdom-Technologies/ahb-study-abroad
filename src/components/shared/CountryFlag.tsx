import React from "react";

type CountryFlagProps = {
  code: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
};

const sizeClasses = {
  sm: "h-4 w-6",
  md: "h-5 w-7.5",
  lg: "h-6 w-9",
  xl: "h-8.5 w-13",
  "2xl": "h-10 w-16",
};

const CountryFlag = ({ code, size = "md", className = "" }: CountryFlagProps) => {
  const cleanCode = (code || "").toLowerCase().trim();
  return (
    <img
      src={`/flags/${cleanCode}.svg`}
      alt={`${code.toUpperCase()} Flag`}
      aria-hidden="true"
      loading="eager"
      decoding="async"
      style={{
        imageRendering: "-webkit-optimize-contrast",
      }}
      className={`${sizeClasses[size] || sizeClasses.md} inline-block shrink-0 rounded-[2px] object-cover ${className}`.trim()}
    />
  );
};

export default CountryFlag;
