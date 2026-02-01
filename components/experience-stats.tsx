"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

interface StatItem {
    label: string
    value: number
    suffix?: string
}

const stats: StatItem[] = [
    { label: "Years Experience", value: 4, suffix: "+" },
    { label: "Projects Completed", value: 32, suffix: "+" },
    { label: "Happy Clients", value: 15, suffix: "+" },
]

export function ExperienceStats({ className }: { className?: string }) {
    const sectionRef = useRef<HTMLDivElement>(null)
    const numbersRef = useRef<(HTMLSpanElement | null)[]>([])

    useEffect(() => {
        if (!sectionRef.current) return

        const ctx = gsap.context(() => {
            numbersRef.current.forEach((el, index) => {
                if (!el) return
                const targetValue = stats[index].value
                
                // Animate the object property, update text content
                gsap.from(el, {
                    textContent: 0,
                    duration: 2.5,
                    ease: "power2.out",
                    snap: { textContent: 1 },
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                    }
                })
            })

            // Fade in labels
            gsap.fromTo(".stat-label",
                { opacity: 0, y: 20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1, 
                    stagger: 0.2, 
                    delay: 0.5,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 85%",
                    }
                }
            )

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <div 
            ref={sectionRef} 
            className={cn("grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 py-12 border-t border-white/5", className)}
        >
            {stats.map((stat, index) => (
                <div key={index} className="flex flex-col items-start justify-center">
                    <div className="flex items-baseline gap-1">
                        <span 
                            ref={(el) => { numbersRef.current[index] = el }}
                            className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-purple-500 tabular-nums"
                        >
                            {stat.value}
                        </span>
                        <span className="text-3xl md:text-5xl font-bold text-purple-500/80">
                            {stat.suffix}
                        </span>
                    </div>
                    <p className="stat-label text-sm md:text-base font-mono text-muted-foreground uppercase tracking-wider mt-2">
                        {stat.label}
                    </p>
                </div>
            ))}
        </div>
    )
}
