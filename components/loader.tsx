"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (loaderRef.current && textRef.current && typeof window !== "undefined" && window.gsap) {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 1,
        delay: 2.5, // Fade out after 2.5 seconds (total 3s display)
        onComplete: () => {
          if (loaderRef.current) {
            loaderRef.current.style.display = "none"
          }
        },
      })

      gsap.fromTo(textRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      gsap.to(textRef.current, {
        scale: 1.05,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "power1.inOut",
      })
    }
  }, [])

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[999] flex items-center justify-center bg-gradient-to-br from-primary-dark-navy to-accent-purple text-white"
    >
      <div className="relative flex flex-col items-center">
        <div className="relative w-24 h-24 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-t-4 border-t-accent-neon-blue border-primary-dark-navy animate-spin"></div>
          <div className="absolute inset-4 rounded-full border-2 border-b-2 border-b-accent-purple border-primary-dark-navy animate-spin-reverse"></div>
        </div>
        <div ref={textRef} className="text-3xl font-bold tracking-wide">
          <span className="text-accent-neon-blue">Sagar</span>
          <span className="text-white">Nawaz</span>
        </div>
        <p className="mt-2 text-lg text-gray-300">Loading Portfolio...</p>
      </div>
    </div>
  )
}
