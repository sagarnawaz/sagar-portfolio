"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const sunRef = React.useRef<SVGSVGElement>(null)
  const moonRef = React.useRef<SVGSVGElement>(null)

  // Initialize icon visibility based on current theme
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      if (theme === "dark") {
        gsap.set(sunRef.current, { opacity: 0, rotation: 90 })
        gsap.set(moonRef.current, { opacity: 1, rotation: 0 })
      } else {
        gsap.set(sunRef.current, { opacity: 1, rotation: 0 })
        gsap.set(moonRef.current, { opacity: 0, rotation: -90 })
      }
    }
  }, [theme]) // Run once on mount and when theme changes (for initial setup)

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)

    if (typeof window !== "undefined" && window.gsap) {
      if (newTheme === "dark") {
        // Animate Sun out, Moon in
        gsap.to(sunRef.current, { opacity: 0, rotation: 90, duration: 0.5, ease: "power2.in" })
        gsap.to(moonRef.current, { opacity: 1, rotation: 0, duration: 0.5, ease: "power2.out", delay: 0.1 })
      } else {
        // Animate Moon out, Sun in
        gsap.to(moonRef.current, { opacity: 0, rotation: -90, duration: 0.5, ease: "power2.in" })
        gsap.to(sunRef.current, { opacity: 1, rotation: 0, duration: 0.5, ease: "power2.out", delay: 0.1 })
      }
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      <Sun ref={sunRef} className="absolute h-6 w-6" />
      <Moon ref={moonRef} className="absolute h-6 w-6" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
