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
  const laptopRef = useRef<SVGSVGElement>(null)
  const laptopContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)

      const elements = [
        headlineRef.current,
        taglineRef.current,
        buttonRef.current,
        laptopRef.current,
      ].filter(Boolean)

      // Scroll in animation
      gsap.fromTo(
        elements,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )

      // Floating animation
      gsap.to(laptopRef.current, {
        y: -15,
        duration: 2,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      })

      // Hover rotation
      if (laptopContainerRef.current) {
        const container = laptopContainerRef.current

        const handleMouseEnter = () => {
          gsap.to(laptopRef.current, {
            rotate: 10,
            duration: 0.5,
            ease: "power2.out",
          })
        }

        const handleMouseLeave = () => {
          gsap.to(laptopRef.current, {
            rotate: 0,
            duration: 0.5,
            ease: "power2.out",
          })
        }

        container.addEventListener("mouseenter", handleMouseEnter)
        container.addEventListener("mouseleave", handleMouseLeave)

        return () => {
          container.removeEventListener("mouseenter", handleMouseEnter)
          container.removeEventListener("mouseleave", handleMouseLeave)
        }
      }
    }
  }, [])

  const handleViewWorkClick = () => {
    const projectsSection = document.getElementById("projects")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleHover = (scale: number) => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { scale, duration: 0.3 })
    }
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden
               bg-gradient-to-br from-primary-dark-navy to-accent-purple dark:from-primary-dark-navy dark:to-accent-purple
               before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] before:from-transparent before:via-accent-neon-blue/10 before:to-transparent before:animate-pulse-subtle"
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg"
        >
          Sagar Nawaz - <span className="text-accent-neon-blue">Frontend Developer</span>
        </h1>
        <p
          ref={taglineRef}
          className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto"
        >
          Crafting Modern Web Experiences with <span className="font-semibold text-accent-neon-blue">AI Flair</span>
        </p>
        <Button
          ref={buttonRef}
          size="lg"
          className="bg-accent-neon-blue hover:bg-accent-neon-blue/80 text-white text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 group"
          onClick={handleViewWorkClick}
          onMouseEnter={() => handleHover(1.05)}
          onMouseLeave={() => handleHover(1)}
        >
          View My Work
          <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
        </Button>

        {/* Floating + Hover-Rotate Laptop SVG */}
        <div ref={laptopContainerRef} className="mt-12 cursor-pointer">
          <svg
            ref={laptopRef}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="200"
            height="200"
            fill="none"
            className="mx-auto"
          >
            <rect x="32" y="96" width="448" height="288" rx="24" fill="#4F46E5" />
            <rect x="64" y="128" width="384" height="224" rx="16" fill="#1E1B4B" />
            <circle cx="180" cy="180" r="24" fill="#FACC15" />
            <rect x="220" y="160" width="120" height="20" rx="4" fill="#F9FAFB" />
            <rect x="220" y="190" width="120" height="20" rx="4" fill="#F9FAFB" />
            <rect x="220" y="220" width="80" height="20" rx="4" fill="#F9FAFB" />
            <path d="M 0 400 H 512 L 448 440 H 64 L 0 400 Z" fill="#334155" />
          </svg>
        </div>
      </div>
    </section>
  )
}
