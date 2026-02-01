"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Download } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { gsap } from "gsap"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  
  // Animation on load
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    )
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsOpen(false)
    }
  }

  const navItems = ["Home", "About", "Skills", "Projects", "Contact"]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none">
      <nav 
        ref={navRef}
        className="pointer-events-auto bg-background/50 dark:bg-black/30 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-full px-6 py-2 shadow-2xl flex items-center space-x-1 md:space-x-2"
      >
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item}
              variant="ghost"
              className="relative text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 data-[active=true]:text-black dark:data-[active=true]:text-white transition-all duration-300 rounded-full px-4"
              onClick={() => scrollToSection(item.toLowerCase())}
            >
              {item}
            </Button>
          ))}
        </div>

        <div className="h-4 w-[1px] bg-black/10 dark:bg-white/10 hidden md:block mx-2" />

        <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
                asChild
                variant="outline"
                className="rounded-full border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-xs font-mono h-8"
            >
                <a href="/cv_sagar_nawaz.pdf" download="cv_sagar_nawaz.pdf" aria-label="Download CV">
                CV
                </a>
            </Button>
            {/* Mobile Menu Toggle */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full hover:bg-black/5 dark:hover:bg-white/5"
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
                aria-expanded={isOpen}
            >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
         <div className="absolute top-24 left-4 right-4 bg-background/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl p-4 flex flex-col space-y-2 md:hidden pointer-events-auto shadow-2xl animate-in slide-in-from-top-4 fade-in duration-300">
            {navItems.map((item) => (
                <Button
                key={item}
                variant="ghost"
                className="w-full text-left justify-start text-lg font-medium"
                onClick={() => scrollToSection(item.toLowerCase())}
                >
                {item}
                </Button>
            ))}
         </div>
      )}
    </header>
  )
}
