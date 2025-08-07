"use client"

import { useEffect } from "react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function AppEffectsProvider() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return null;
} 