"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import { GithubIcon, LinkedinIcon, Mail, MessageCircle, MapPin, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

gsap.registerPlugin(ScrollTrigger)

interface ContactSectionProps {
  email?: string
  phoneNumber?: string
  ctaText?: string
  subText?: string
  className?: string
}

export function ContactSection({ 
    email = "sagarnawaz44@gmail.com", 
    phoneNumber = "+923042448375",
    ctaText = "Let's align our visions.", 
    subText = "Available for freelance & full-time opportunities.",
    className 
}: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredBtn, setHoveredBtn] = useState<"email" | "whatsapp" | null>(null)
  
  // Time State
  const [time, setTime] = useState("")

  useEffect(() => {
    // Update Karachi Time
    const updateTime = () => {
        const now = new Date()
        const options: Intl.DateTimeFormatOptions = { 
            timeZone: "Asia/Karachi", 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        }
        setTime(now.toLocaleTimeString('en-US', options))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (sectionRef.current) {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                ".reveal-text",
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            )
            
            // Radar Animation
             gsap.to(".radar-ring", {
                scale: 2,
                opacity: 0,
                duration: 2,
                repeat: -1,
                stagger: 0.5,
                ease: "power1.out"
            })
        }, sectionRef)
        return () => ctx.revert()
    }
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={cn("min-h-[80vh] flex flex-col justify-center relative z-10 py-24 overflow-hidden", className)}
    >
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Content */}
            <div className="space-y-10 text-center lg:text-left order-2 lg:order-1">
                <div className="space-y-6">
                    <h2 className="reveal-text text-lg md:text-xl font-mono text-cyan-400 uppercase tracking-widest flex items-center justify-center lg:justify-start gap-3">
                        <span className="w-8 h-[1px] bg-cyan-400"></span>
                        Next Steps
                    </h2>
                    <h3 className="reveal-text text-5xl md:text-7xl font-bold tracking-tighter text-foreground leading-[0.9]">
                        {ctaText}
                    </h3>
                    <p className="reveal-text text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
                        {subText}
                    </p>
                </div>

                <div className="reveal-text flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                     {/* Email Button */}
                    <a 
                        href={`mailto:${email}`}
                        className="w-full sm:w-auto"
                        onMouseEnter={() => setHoveredBtn("email")}
                        onMouseLeave={() => setHoveredBtn(null)}
                    >
                        <Button 
                            size="lg"
                            className={cn(
                                "w-full h-14 rounded-full text-lg border bg-background/50 backdrop-blur-md transition-all duration-300",
                                hoveredBtn === "email" 
                                    ? "border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                                    : "border-black/10 dark:border-white/10 text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                            )}
                        >
                            <Mail className="mr-3 h-5 w-5" />
                            Email Me
                        </Button>
                    </a>

                    {/* WhatsApp Button */}
                    <a 
                        href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=Hi%20Sagar,%20I'm%20interested%20in%20collaborating...`}
                        target="_blank"
                        rel="noopener noreferrer"
                         className="w-full sm:w-auto"
                         onMouseEnter={() => setHoveredBtn("whatsapp")}
                         onMouseLeave={() => setHoveredBtn(null)}
                    >
                         <Button 
                            size="lg"
                            className={cn(
                                "w-full h-14 rounded-full text-lg border bg-background/50 backdrop-blur-md transition-all duration-300",
                                hoveredBtn === "whatsapp" 
                                    ? "border-[#25D366] text-[#25D366] shadow-[0_0_20px_rgba(37,211,102,0.3)]"
                                    : "border-black/10 dark:border-white/10 text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                            )}
                        >
                            <MessageCircle className="mr-3 h-5 w-5" />
                            WhatsApp
                        </Button>
                    </a>
                </div>

                <div className="reveal-text flex justify-center lg:justify-start gap-6 pt-4">
                     <SocialLink href="https://github.com/sagarnawaz" icon={GithubIcon} />
                     <SocialLink href="https://linkedin.com/in/sagar-nawaz-12081223a" icon={LinkedinIcon} />
                </div>
            </div>

            {/* Right Column: Globe/Radar Visual */}
            <div className="reveal-text order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative w-80 h-80 md:w-96 md:h-96">
                    {/* Radar Rings */}
                    <div className="absolute inset-0 flex items-center justify-center">
                         <div className="radar-ring absolute w-24 h-24 border border-cyan-500/30 rounded-full" />
                         <div className="radar-ring absolute w-24 h-24 border border-cyan-500/20 rounded-full delay-75" />
                         <div className="radar-ring absolute w-24 h-24 border border-cyan-500/10 rounded-full delay-150" />
                    </div>

                     {/* Central Hub */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-black/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-3xl flex flex-col items-center justify-center shadow-2xl z-10">
                        <div className="w-12 h-12 bg-cyan-500/10 rounded-full flex items-center justify-center mb-4 text-cyan-400">
                             <MapPin className="w-6 h-6 animate-bounce" />
                        </div>
                        <h4 className="text-lg font-bold text-foreground">Karachi, PK</h4>
                        <div className="flex items-center gap-2 mt-2 text-sm font-mono text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {time || "Loading..."}
                        </div>
                        <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-medium">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Available for work
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-500/20 rounded-tr-3xl" />
                    <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyan-500/20 rounded-bl-3xl" />
                </div>
            </div>

        </div>
        
         <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-muted-foreground font-mono opacity-50">
            © {new Date().getFullYear()} Sagar Nawaz. Crafted with Next.js & Three.js.
        </div>
    </section>
  )
}

function SocialLink({ href, icon: Icon }: { href: string, icon: any }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-full border border-black/10 dark:border-white/10 bg-transparent hover:bg-black/5 dark:hover:bg-white/5 hover:scale-110 transition-all duration-300 text-foreground"
        >
            <Icon className="h-5 w-5" />
        </a>
    )
}
