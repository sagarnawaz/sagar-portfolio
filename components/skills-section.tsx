"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Heading5Icon as Html5,
  FileCodeIcon as Css3,
  BracesIcon as Javascript,
  AtomIcon as React,
  ForwardIcon as Nextjs,
  WindIcon as Tailwind,
  GitBranch,
  Figma,
  Brain,
  Smartphone,
  Type,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { name: "HTML5", icon: Html5, proficiency: 95 },
  { name: "CSS3", icon: Css3, proficiency: 90 },
  { name: "JavaScript", icon: Javascript, proficiency: 90 },
  { name: "React.js", icon: React, proficiency: 85 },
  { name: "React Native", icon: Smartphone, proficiency: 75 },
  { name: "Next.js", icon: Nextjs, proficiency: 80 },
  { name: "TypeScript", icon: Type, proficiency: 80 },
  { name: "Tailwind CSS", icon: Tailwind, proficiency: 90 },
  { name: "Git", icon: GitBranch, proficiency: 80 },
  { name: "UI/UX Design", icon: Figma, proficiency: 75 },
  { name: "AI Concepts", icon: Brain, proficiency: 70 },
]

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const skillRefs = useRef<(HTMLDivElement | null)[]>([])
  const progressBarRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (sectionRef.current && typeof window !== "undefined" && window.gsap) {
      skillRefs.current.forEach((skillCard, index) => {
        if (skillCard) {
          gsap.fromTo(
            skillCard,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: skillCard,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          )

          const progressBar = progressBarRefs.current[index]
          if (progressBar) {
            gsap.fromTo(
              progressBar,
              { width: "0%" },
              {
                width: `${skills[index].proficiency}%`,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: skillCard,
                  start: "top 85%",
                  toggleActions: "play none none reverse",
                },
              }
            )
          }
        }
      })
    }
  }, [])

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.gsap) {
      gsap.to(e.currentTarget.querySelector("svg"), {
        rotation: 360,
        duration: 0.5,
        ease: "power2.out",
      })
    }
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.gsap) {
      gsap.to(e.currentTarget.querySelector("svg"), {
        rotation: 0,
        duration: 0.5,
        ease: "power2.out",
      })
    }
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-background dark:from-primary-dark-navy/20 dark:to-gray-950"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          My <span className="text-accent-purple">Skills</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <div
                key={skill.name}
                ref={(el) => {
                  skillRefs.current[index] = el
                }}
                className="bg-card p-6 rounded-lg shadow-lg flex flex-col items-center text-center border border-border hover:shadow-xl transition-shadow duration-300 opacity-0"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Icon className="h-16 w-16 text-accent-neon-blue mb-4 transition-transform duration-300" />
                <h3 className="text-2xl font-semibold text-foreground mb-2">{skill.name}</h3>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                  <div
                    ref={(el) => {
                      progressBarRefs.current[index] = el
                    }}
                    className="bg-gradient-to-r from-accent-neon-blue to-accent-purple h-2.5 rounded-full"
                    style={{ width: "0%" }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{skill.proficiency}% Proficiency</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
