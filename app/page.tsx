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
import { HeartbeatLoader } from "@/components/HeartbeatLoader"
import { Footer } from "@/components/footer"

// Lazy load the 3D Scene to improve initial load time
const CanvasScene = dynamic(() => import("@/components/CanvasScene"), { ssr: false })

export default function Page() {
  const [loading, setLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  const handleLoaded = () => {
    setLoading(false)
    // Synchronize content fade-in with loader dissolve
    setTimeout(() => setShowContent(true), 100)
  }

  return (
    <>
      {loading && <HeartbeatLoader onComplete={handleLoaded} />}
      <div className={`min-h-screen bg-transparent text-foreground transition-opacity duration-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
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
