"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ExperienceStats } from "@/components/experience-stats"

gsap.registerPlugin(ScrollTrigger)

interface AboutProps {
  heading?: string
  bioText?: string
  imageSrc?: string
  skills?: string[]
  className?: string
}

export function AboutSection({
  heading = "About Me",
  bioText = "I'm Sagar Nawaz, With 2 years of experience as a Full-Stack Developer, I build end-to-end web solutions using React, Next.js, Node.js, and databases, focusing on performance, scalability, and clean user experiences.",
  imageSrc = "/my-pic.png",
  skills = ["React", "WebGL", "Next.js"],
  className
}: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  
  // Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return
    
    let clientX, clientY;
    
    if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = e.clientX;
        clientY = e.clientY;
    }
    
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect()
    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5
    
    // Max tilt 15 degrees
    setTilt({ x: y * 15, y: -x * 15 })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }
  
  useEffect(() => {
    if (!sectionRef.current) return
    
    const ctx = gsap.context(() => {
        // Text Reveal
        gsap.fromTo(
          ".reveal-up",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
            }
          }
        )

        // Image Reveal
         gsap.fromTo(imageContainerRef.current, 
            { scale: 0.9, opacity: 0, filter: "blur(10px)" },
            { 
                scale: 1, 
                opacity: 1, 
                filter: "blur(0px)",
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%"
                }
            }
        )
        
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className={cn("py-24 md:py-32 bg-background relative z-10 overflow-hidden", className)}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Text Content */}
            <div className="space-y-10 order-2 lg:order-1">
                <div className="space-y-4">
                    <h2 className="reveal-up text-4xl md:text-6xl font-bold text-foreground">
                        {heading.split(' ')[0]} <span className="text-muted-foreground font-light">{heading.split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <p className="reveal-up text-xl md:text-2xl font-light leading-relaxed text-foreground/90 max-w-lg">
                        {bioText}
                    </p>
                </div>

                {/* <div className="reveal-up">
                    <ExperienceStats />
                </div> */}
            </div>

            {/* Right Column: Floating Image with WebGL-style Tilt */}
            <div className={`order-1 lg:order-2 flex justify-center lg:justify-end relative perspective-1000`}>
                 {/* Decorative Glow Behind Image */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/20 blur-[80px] rounded-full pointer-events-none" />
                 
                 <div 
                    ref={imageContainerRef}
                    onMouseMove={handlePointerMove}
                    onTouchMove={handlePointerMove}
                    onMouseLeave={handleMouseLeave}
                    onTouchEnd={handleMouseLeave}
                    className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl group transition-all duration-200 ease-out"
                    style={{
                        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                        transformStyle: "preserve-3d"
                    }}
                 >
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-transparent z-10 pointer-events-none group-hover:opacity-50 transition-opacity duration-500 mix-blend-overlay" />
                    
                    {/* Gloss Effect */}
                    <div 
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                            transform: `translate(${tilt.y * 2}px, ${tilt.x * 2}px)`
                        }}
                     />
                    
                    <Image
                        src={imageSrc}
                        alt="Profile Illustration"
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-115"
                    />
                 </div>
            </div>

        </div>
      </div>
    </section>
  )
}

