"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (footerRef.current && typeof window !== "undefined") {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            toggleActions: "play none none reverse",
          },
        }
      )
    }
  }, [])

  return (
    <footer
      ref={footerRef}
      className="bg-gradient-to-r from-primary-dark-navy to-accent-purple text-white py-6 text-center text-sm opacity-0"
    >
      <div className="container mx-auto px-4">
        <p>
          Developed by Sagar Nawaz <span className="text-red-500">❤️</span>
        </p>
        <p className="mt-2 text-gray-300">
          © {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  )
}
