"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
// import { BriefcaseIcon, GraduationCapIcon, CodeIcon } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface JourneyItem {
    year: string
    title: string
    company: string
    description: string
    skills: string[]
}

const journeyData: JourneyItem[] = [
    {
        year: "2026",
        title: "Full-Stack Developer",
        company: "Quickers Venture",
        description: "Building scalable full-stack applications using Next.js, Node.js, and MongoDB. Delivering production-ready solutions for diverse clients.",
        skills: ["Next.js", "Node.js", "MongoDB", "system Design"]
    },
     {
        year: "2025",
        title: "Web Dev Internship",
        company: "Quickers Venture",
        description: "Entered the professional world. Learned agile workflows, git version control, and foundational frontend architectural patterns.",
        skills: ["JavaScript", "React", "Laravel", "MySql", "Bootstrap"]
    },
    {
        year: "2024",
        title: "Graduted in Computer Science",
        company: "Sindh Madressatul Islam University",
        description: "Graduated with a Bachelor's degree in Computer Science. Developed a strong foundation in programming, algorithms, and software development.",
        skills: ["Data Structure", "Algorithms", "Software Development", "System Design"]
    },
    {
        year: "2023",
        title: "Web and App Program",
        company: "SMIT",
        description: "Learned agile workflows, git version control, and foundational frontend architectural patterns.",
        skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express.js", "Bootstrap", "Git", "GitHub"]
    },
   
    {
        year: "2022",
        title: "The Beginning",
        company: "Self-Taught",
        description: "Started the journey with Hello World. Obsessed with UI/UX and logic.",
        skills: ["Passion", "Curiosity"]
    }
]

export function ExperienceTimeline() {
    const sectionRef = useRef<HTMLElement>(null)
    const lineRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!sectionRef.current || !lineRef.current) return

        const ctx = gsap.context(() => {
            // Animate the vertical line drawing
            gsap.fromTo(lineRef.current, 
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "bottom 40%",
                        scrub: 0.5,
                    }
                }
            )

            // Animate items
            const items = gsap.utils.toArray(".timeline-item")
            items.forEach((item: any) => {
                gsap.fromTo(item,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                        }
                    }
                )
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="py-24 md:py-32 relative z-10">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center mb-24 space-y-4">
                     <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground">
                        Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#ff0055]">Timeline</span>
                    </h2>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Connecting Line (Absolute Center) */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-black/5 dark:bg-white/5 -translate-x-1/2 md:-translate-x-1/2 h-full rounded-full">
                        <div 
                            ref={lineRef}
                            className="w-full h-full origin-top bg-gradient-to-b from-[#00f3ff] via-purple-500 to-[#ff0055] rounded-full shadow-[0_0_15px_rgba(0,243,255,0.6)]"
                        />
                    </div>

                    <div className="space-y-16 md:space-y-24">
                        {journeyData.map((item, index) => (
                            <TimelineCard key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function TimelineCard({ item, index }: { item: JourneyItem, index: number }) {
    const isEven = index % 2 === 0
    
    return (
        <div className={cn(
            "timeline-item relative flex flex-col md:flex-row items-start",
            isEven ? "md:flex-row-reverse" : ""
        )}>
            {/* Timeline Node (Center) */}
            <div className="absolute left-[0] md:left-1/2 w-8 h-8 -translate-x-[calc(50%-0.5px)] md:-translate-x-1/2 bg-background border-2 border-[#00f3ff] rounded-full z-20 flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                 <div className="w-2 h-2 bg-[#00f3ff] rounded-full animate-pulse" />
            </div>

            {/* Content Card */}
            <div className={cn(
                "ml-12 md:ml-0 md:w-1/2 px-4 md:px-12 w-full",
                // isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left" // Actually aligning text left looks better usually, but let's see.
                // Keeping text alignment left for readability, but padding shifts the block.
            )}>
                <div className={cn(
                    "p-6 bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-xl hover:border-[#00f3ff]/30 hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 group",
                    isEven ? "md:text-right" : "md:text-left"
                )}>
                    <div className={cn(
                        "flex flex-col gap-2 mb-4",
                        isEven ? "md:items-end" : "md:items-start"
                    )}>
                        <span className="text-[#00f3ff] font-mono text-sm tracking-widest uppercase flex items-center gap-2">
                             {item.year}
                        </span>
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-black dark:group-hover:text-white transition-colors">{item.title}</h3>
                        <p className="text-md font-medium text-foreground/60">{item.company}</p>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                        {item.description}
                    </p>
                </div>
            </div>
        </div>
    )
}
