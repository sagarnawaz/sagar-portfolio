"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // animate out on load is handled by parent or self?
    // In the HTML version, it waited for window.load.
    // In Next.js, we can just run this effect.
    
    const tl = gsap.timeline({ delay: 0.5 });
    
    tl.to(loaderRef.current, {
        opacity: 0,
        duration: 1,
        pointerEvents: 'none',
        ease: 'power3.out'
    });

  }, []);

  return (
    <div
      ref={loaderRef}
      id="loader"
      className="fixed top-0 left-0 w-full h-full bg-black z-[10000] flex justify-center items-center font-mono text-[#00f3ff]"
    >
      INITIALIZING SYSTEM...
    </div>
  );
}
