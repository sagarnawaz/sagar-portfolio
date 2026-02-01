"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { HomeSection } from "@/components/home-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { Loader } from "@/components/loader"
import { Footer } from "@/components/footer"

// Lazy load the 3D Scene to improve initial load time
const CanvasScene = dynamic(() => import("@/components/CanvasScene"), { ssr: false })

export default function Page() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000) // Loader displays for 3 seconds
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {loading && <Loader />}
      <div className={`min-h-screen bg-transparent text-foreground ${loading ? "hidden" : ""}`}>
        <CanvasScene />
        <Navbar />
        <main className="relative z-10 selection:bg-accent/30">
          <HomeSection />
          <AboutSection />
          <ExperienceTimeline />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
