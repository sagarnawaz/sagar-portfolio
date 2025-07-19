"use client"

import { useState, useEffect } from "react"
import { Loader } from "@/components/loader"
import { Navbar } from "@/components/navbar"
import { HomeSection } from "@/components/home-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

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
      <div className={`min-h-screen bg-background text-foreground ${loading ? "hidden" : ""}`}>
        <Navbar />
        <main className="relative z-10">
          <HomeSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  )
}
