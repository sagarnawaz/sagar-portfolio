"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function HomeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headlineRef.current,
        { y: 100, opacity: 0, rotate: 2 },
        { y: 0, opacity: 1, rotate: 0, duration: 1.5, delay: 0.2 }
      )
      .fromTo(
        taglineRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=1"
      )
      .fromTo(
        buttonRef.current,
        { y: 20, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1 },
        "-=0.8"
      );
    }
  }, [])

  const handleViewWorkClick = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden z-10"
    >
      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        <h1
          ref={headlineRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-foreground mix-blend-difference"
        >
          SAGAR NAWAZ
        </h1>
        <p
          ref={taglineRef}
          className="text-base sm:text-xl md:text-2xl font-mono text-muted-foreground max-w-3xl mx-auto leading-relaxed"
        >
          <span className="block mb-2 sm:mb-4 text-cyan-400 font-bold">Full-Stack Developer | 2 Years Experience</span>
          Crafting Scalable & Interactive Web Experiences.
          <br/>
          <span className="text-xs md:text-base opacity-80 mt-2 block">
            React • Next.js • Node.js • TypeScript • MongoDB
          </span>
        </p>
        <div className="pt-8">
            <Button
            ref={buttonRef}
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-6 text-lg border-foreground/20 hover:bg-foreground hover:text-background transition-all duration-500"
            onClick={handleViewWorkClick}
            >
            Explore Work
            </Button>
        </div>
      </div>
    </section>
  )
}
