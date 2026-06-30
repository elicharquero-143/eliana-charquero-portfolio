"use client";

import { useEffect, useRef, useState } from "react";

export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      return;
    }

    setIsEnabled(true);

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let currentX = pointerX;
    let currentY = pointerY;
    let frameId = 0;

    const updatePointer = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
    };

    const animate = () => {
      currentX += (pointerX - currentX) * 0.18;
      currentY += (pointerY - currentY) * 0.18;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  if (!isEnabled) {
    return null;
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] size-3 rounded-full bg-ink opacity-85 mix-blend-multiply"
      ref={dotRef}
    />
  );
}
