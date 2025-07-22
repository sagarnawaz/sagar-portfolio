"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Download } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { gsap } from "gsap"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 3 },
      ) // Delay after loader
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap && mobileMenuRef.current) {
      if (isOpen) {
        gsap.to(mobileMenuRef.current, { x: 0, duration: 0.3, ease: "power2.out" })
      } else {
        gsap.to(mobileMenuRef.current, { x: "100%", duration: 0.3, ease: "power2.in" })
      }
    }
  }, [isOpen])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false) // Close mobile menu after clicking a link
    }
  }

  return (
    <header ref={navRef} className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-accent-neon-blue">
        &lt;Sagar<span className="text-foreground">Nawaz&gt;</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
            <Button
              key={item}
              variant="ghost"
              className="text-lg font-medium text-foreground hover:text-accent-neon-blue transition-colors duration-300"
              onClick={() => scrollToSection(item.toLowerCase())}
            >
              {item}
            </Button>
          ))}
          <ThemeToggle />
          <Button
            asChild
            className="bg-accent-purple hover:bg-accent-purple/80 text-white transition-all duration-300 group"
          >
            <a href="/cv_sagar_nawaz.pdf" download="cv_sagar_nawaz.pdf" aria-label="Download CV">
              Download CV <Download className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            </a>
          </Button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-64 bg-background/95 backdrop-blur-lg shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-40`}
      >
        <div className="flex flex-col items-start p-6 space-y-4 mt-16">
          {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
            <Button
              key={item}
              variant="ghost"
              className="w-full text-left text-xl font-medium text-foreground hover:text-accent-neon-blue"
              onClick={() => scrollToSection(item.toLowerCase())}
            >
              {item}
            </Button>
          ))}
          <Button
            asChild
            className="w-full bg-accent-purple hover:bg-accent-purple/80 text-white transition-all duration-300 group"
          >
            <a href="https://drive.google.com/file/d/1xwm-x2onDZzH3YB1YMxoovZYcmMcXkmx/view" download="cv_sagar_nawaz.pdf" aria-label="Download CV">
              Download CV <Download className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}
