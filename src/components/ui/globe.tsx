"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useSpring } from "@react-spring/web";

export interface GlobeProps {
  markers?: { location: [number, number]; size: number }[];
  className?: string;
}

export function Globe({ markers = [], className = "" }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [{ r }, api] = useSpring(() => ({
    r: 0,
    config: {
      mass: 1,
      tension: 280,
      friction: 40,
      precision: 0.001,
    },
  }));

  useEffect(() => {
    let phi = 0;
    let width = 0;
    
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener('resize', onResize);
    onResize();
    
    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 0.9,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1], // White landmasses that react to dark mode
      markerColor: [255 / 255, 68 / 255, 68 / 255], // Brand accent
      glowColor: [1, 1, 1],
      markers: markers,
      onRender: (state: Record<string, any>) => {
        // Called on every animation frame.
        if (!pointerInteracting.current) {
          phi += 0.005;
        }
        state.phi = phi + r.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    } as any);
    
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '1';
      }
    });
    
    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [markers, r]);

  return (
    <div className={`relative aspect-square w-full max-w-[600px] mx-auto ${className}`}>
      <canvas
        ref={canvasRef}
        onPointerDown={(e: any) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          canvasRef.current!.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          canvasRef.current!.style.cursor = 'grab';
        }}
        onMouseMove={(e: any) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({ r: delta / 200 });
          }
        }}
        onTouchMove={(e: any) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta;
            api.start({ r: delta / 100 });
          }
        }}
        className="w-full h-full opacity-0 transition-opacity duration-1000 cursor-grab"
      />
    </div>
  );
}
