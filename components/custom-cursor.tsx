"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.2, ease: "power3.out" })
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.4, ease: "power3.out" })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("button, a, input, textarea, [role='button']")) {
        gsap.to(ring, { scale: 2, background: "rgba(99,102,241,0.15)", borderColor: "#6366f1" })
      }
    }
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("button, a, input, textarea, [role='button']")) {
        gsap.to(ring, { scale: 1, background: "rgba(255,255,255,0.08)", borderColor: "#fff" })
      }
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mouseout", handleMouseOut)

    // Hide cursor on mobile
    const handleResize = () => {
      if (window.innerWidth < 768) {
        dot.style.display = "none"
        ring.style.display = "none"
      } else {
        dot.style.display = "block"
        ring.style.display = "block"
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mouseout", handleMouseOut)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#6366f1",
          pointerEvents: "none",
          zIndex: 9999,
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "2px solid #fff",
          background: "rgba(255,255,255,0.08)",
          pointerEvents: "none",
          zIndex: 9998,
          transform: "translate(-50%, -50%)",
          transition: "background 0.2s, border-color 0.2s",
        }}
      />
    </>
  )
} 