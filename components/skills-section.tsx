"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

interface Skill {
  name: string
  icon: string
  level: number
}

interface SkillsSectionProps {
  items?: Skill[]
  className?: string
}

const defaultSkills: Skill[] = [
  { name: "React", icon: "⚛️", level: 95 },
  { name: "Next.js", icon: "▲", level: 90 },
  { name: "TypeScript", icon: "TS", level: 85 },
  { name: "Node.js", icon: "🟢", level: 80 },
  { name: "MongoDB", icon: "🍃", level: 75 },
  { name: "MySql", icon: "🐬", level: 70 },
  { name: "Laravel", icon: "🔴", level: 65 },
  { name: "Three.js", icon: "🧊", level: 70 },
  { name: "GSAP", icon: "🎭", level: 85 },
  { name: "Tailwind", icon: "🌊", level: 95 },
  { name: "GraphQL", icon: "◈", level: 70 },
  { name: "Testing", icon: "🧪", level: 75 },
]

export function SkillsSection({ items = defaultSkills, className }: SkillsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !sectionRef.current) return

    const skills = containerRef.current.children
    const ctx = gsap.context(() => {
        // Entry Animation
        gsap.fromTo(
            skills,
            { opacity: 0, scale: 0.8, z: -100 },
            {
                opacity: 1,
                scale: 1,
                z: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            }
        )

        // Floating Animation (Randomized)
        Array.from(skills).forEach((skill) => {
            gsap.to(skill, {
                y: "random(-10, 10)",
                x: "random(-5, 5)",
                rotation: "random(-2, 2)",
                duration: "random(2, 4)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: Math.random() * 2
            })
        })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={cn("py-32 relative z-10 overflow-visible", className)}
    >
        {/* Ambient Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-6 md:px-12 relative">
        <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tighter">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff0055]">Arsenal</span>
            </h2>
            <p className="text-muted-foreground font-mono text-sm md:text-base max-w-lg mx-auto">
                A curated stack of technologies I use to build immersive digital experiences.
            </p>
        </div>
        
        <div 
            ref={containerRef}
            className="flex flex-wrap justify-center gap-4 md:gap-6 perspective-[1000px]"
        >
            {items.map((skill, i) => (
                <SkillPill key={skill.name} skill={skill} index={i} />
            ))}
        </div>
      </div>
    </section>
  )
}

function SkillPill({ skill, index }: { skill: Skill; index: number }) {
    const pillRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
        if (pillRef.current) {
            gsap.to(pillRef.current, {
                scale: 1.15,
                zIndex: 10,
                duration: 0.3,
                ease: "power2.out",
                boxShadow: "0 0 20px rgba(0, 243, 255, 0.4), 0 0 40px rgba(0, 243, 255, 0.2)"
            })
        }
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
        if (pillRef.current) {
             gsap.to(pillRef.current, {
                scale: 1,
                zIndex: 1,
                duration: 0.3,
                ease: "power2.out",
                boxShadow: "none"
            })
        }
    }

    return (
        <div
            ref={pillRef}
            className={cn(
                "group relative cursor-pointer px-6 py-3 rounded-full",
                "bg-white/5 backdrop-blur-md border border-white/10",
                "transition-colors duration-300 group-hover:border-cyan-400/50"
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span className={cn(
                "relative z-10 text-sm md:text-lg font-mono font-medium text-muted-foreground group-hover:text-white transition-colors duration-300 flex items-center gap-2",
                isHovered && "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            )}>
                <span>{skill.icon}</span>
                {skill.name}
            </span>
            
            {/* Inner Glow Gradient */}
            <div className={cn(
                "absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300",
                "bg-gradient-to-r from-[#00f3ff] to-[#ff0055]"
            )} />
        </div>
    )
}
