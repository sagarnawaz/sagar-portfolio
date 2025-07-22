"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Download } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { gsap } from "gsap"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && window.gsap) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 3 }
      )
    }
  }, [])

  useEffect(() => {
    if (dropdownRef.current) {
      if (isOpen) {
        gsap.fromTo(
          dropdownRef.current,
          { opacity: 0, y: -10, height: 0 },
          {
            opacity: 1,
            y: 0,
            height: "auto",
            duration: 0.4,
            ease: "power2.out",
            display: "block"
          }
        )
      } else {
        gsap.to(dropdownRef.current, {
          opacity: 0,
          y: -10,
          height: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            if (dropdownRef.current) dropdownRef.current.style.display = "none"
          }
        })
      }
    }
  }, [isOpen])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  return (
    <header ref={navRef} className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-accent-neon-blue">
          &lt;Sagar<span className="text-foreground">Nawaz&gt;</span>
        </div>

        {/* Desktop Menu */}
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

        {/* Mobile Icon */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Animated Mobile Dropdown */}
      <div
        ref={dropdownRef}
        className="md:hidden px-6 py-4 bg-background shadow-md flex flex-col items-start space-y-4 overflow-hidden"
        style={{ display: "none" }}
      >
        {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
          <Button
            key={item}
            variant="ghost"
            className="w-full text-left text-lg text-foreground hover:text-accent-neon-blue"
            onClick={() => scrollToSection(item.toLowerCase())}
          >
            {item}
          </Button>
        ))}
        <Button
          asChild
          className="w-full bg-accent-purple hover:bg-accent-purple/80 text-white transition-all duration-300 group"
        >
          <a href="/cv_sagar_nawaz.pdf" download="cv_sagar_nawaz.pdf" aria-label="Download CV">
            Download CV <Download className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
          </a>
        </Button>
      </div>
    </header>
  )
}
