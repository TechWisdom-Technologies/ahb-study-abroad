"use client";

import { cn } from "@/lib/utils";
import React, { Children } from "react";

export interface OrbitingCirclesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
  reverse?: boolean;
  duration?: number;
  radius?: number;
  path?: boolean;
  iconSize?: number;
  speed?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 1,
  ...props
}: OrbitingCirclesProps) {
  const childArray = Children.toArray(children);
  const childCount = childArray.length;
  const calculatedDuration = duration / speed;

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-white/30 stroke-1"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}

      {childArray.map((child, index) => {
        const animationDelay = -(calculatedDuration / childCount) * index;

        return (
          <div
            key={index}
            style={{
              ["--duration" as string]: calculatedDuration,
              ["--radius" as string]: radius,
              ["--icon-size" as string]: `${iconSize}px`,
              animationDelay: `${animationDelay}s`,
              animationDirection: reverse ? "reverse" : "normal",
              animationName: "orbit",
              animationDuration: `${calculatedDuration}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
            }}
            className={cn(
              "absolute flex items-center justify-center rounded-full z-10 transform-gpu [backface-visibility:hidden] will-change-[transform]",
              className
            )}
            {...props}
          >
            {child}
          </div>
        );
      })}
    </>
  );
}
