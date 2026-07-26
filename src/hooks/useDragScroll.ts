import { useRef, useEffect } from "react";

/**
 * Makes a CSS-animated ticker draggable via mouse/touch in both directions.
 * Pauses animation while dragging, resumes on release.
 */
export function useDragScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    isDragging: false,
    startX: 0,
    frozenTranslateX: 0,
    dragOffset: 0,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.style.cursor = "grab";
    el.style.touchAction = "pan-y"; // allow vertical scroll, capture horizontal

    const getTranslateX = (): number => {
      const transform = getComputedStyle(el).transform;
      if (!transform || transform === "none") return 0;
      const match = transform.match(/matrix\(([^)]+)\)/);
      if (match) {
        const values = match[1].split(",").map(Number);
        return values[4] || 0;
      }
      return 0;
    };

    const onPointerDown = (e: PointerEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.startX = e.clientX;
      stateRef.current.frozenTranslateX = getTranslateX();
      stateRef.current.dragOffset = 0;

      el.style.animationPlayState = "paused";
      el.style.transform = `translateX(${stateRef.current.frozenTranslateX}px)`;
      el.style.cursor = "grabbing";
      el.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!stateRef.current.isDragging) return;
      e.preventDefault();
      const dx = e.clientX - stateRef.current.startX;
      stateRef.current.dragOffset = dx;
      const newX = stateRef.current.frozenTranslateX + dx;
      el.style.transform = `translateX(${newX}px)`;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!stateRef.current.isDragging) return;
      stateRef.current.isDragging = false;
      el.style.cursor = "grab";
      el.releasePointerCapture(e.pointerId);
      // Resume auto-scroll
      el.style.transform = "";
      el.style.animationPlayState = "running";
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return containerRef;
}
