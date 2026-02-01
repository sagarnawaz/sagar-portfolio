"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Move logic
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    // Hover logic
    const onMouseEnter = () => cursor.classList.add("hovered");
    const onMouseLeave = () => cursor.classList.remove("hovered");

    window.addEventListener("mousemove", moveCursor);

    // Attach to interactive elements
    // We'll use a MutationObserver or just delegate since it's cleaner in React usually
    // But since we have standard HTML elements, global delegation works best for "a", "button" etc.
    const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.matches('a, button, .project-item, .skill-tag, .nav-dot, .cursor-hover')) {
            onMouseEnter();
        }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
         if (target.matches('a, button, .project-item, .skill-tag, .nav-dot, .cursor-hover')) {
            onMouseLeave();
        }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      id="cursor"
      className="fixed top-0 left-0 w-5 h-5 border border-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color] duration-300 mix-blend-difference [&.hovered]:w-20 [&.hovered]:h-20 [&.hovered]:bg-white [&.hovered]:opacity-50 [&.hovered]:border-none"
    />
  );
}
