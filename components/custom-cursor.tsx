"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      
      gsap.to(cursor, { 
          x: mouseX, 
          y: mouseY, 
          duration: 0.15, 
          ease: "power2.out" 
      })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("button, a, input, textarea, [role='button']")) {
        gsap.to(cursor, { scale: 1.5, opacity: 0.5, duration: 0.3 })
      }
    }
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("button, a, input, textarea, [role='button']")) {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 })
      }
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", handleMouseOver)
    window.addEventListener("mouseout", handleMouseOut)

    // Hide cursor on mobile
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        cursor.style.display = "none"
      } else {
        cursor.style.display = "block"
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
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-6 h-6 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
    />
  )
}
 