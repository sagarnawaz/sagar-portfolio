"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { LinkedinIcon, GithubIcon,  Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

gsap.registerPlugin(ScrollTrigger)

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const successMessageRef = useRef<HTMLDivElement>(null)
  const [showSuccess, setShowSuccess] = useState(false)

 useEffect(() => {
  if (sectionRef.current && typeof window !== "undefined" && window.gsap) {
    gsap.fromTo(
      Array.from(formRef.current?.children || []),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    )
  }
}, [])


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get("name")
    const email = formData.get("email")
    const message = formData.get("message")

    console.log("Contact Form Submission:", { name, email, message })

    // Simulate mailto: link or API call
    const mailtoLink = `mailto:sagar.nawaz@example.com?subject=Portfolio Inquiry from ${name}&body=${message}%0A%0AFrom: ${email}`
    window.open(mailtoLink, "_blank")

    setShowSuccess(true)
    if (successMessageRef.current && typeof window !== "undefined" && window.gsap) {
      gsap.fromTo(
        successMessageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
      )
    }

    // Clear form fields
    if (formRef.current) {
      formRef.current.reset()
    }

    setTimeout(() => {
      setShowSuccess(false)
    }, 5000) // Hide success message after 5 seconds
  }

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (typeof window !== "undefined" && window.gsap) {
      gsap.to(e.target, { scale: 1.01, borderColor: "#3B82F6", duration: 0.2, ease: "power1.out" })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (typeof window !== "undefined" && window.gsap) {
      gsap.to(e.target, { scale: 1, borderColor: "var(--border)", duration: 0.2, ease: "power1.out" })
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-br from-background to-gray-50 dark:from-gray-950 dark:to-primary-dark-navy/20"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          Get In <span className="text-accent-purple">Touch</span>
        </h2>

        <div className="max-w-3xl mx-auto bg-card p-8 rounded-lg shadow-lg border border-border">
          <div className="flex justify-center space-x-6 mb-8">
            <a
              href="https://www.linkedin.com/in/sagar-nawaz-12081223a"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-accent-neon-blue hover:text-accent-purple transition-colors duration-300"
            >
              <LinkedinIcon className="h-8 w-8" />
            </a>
            <a
              href="https://github.com/sagarnawaz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-accent-neon-blue hover:text-accent-purple transition-colors duration-300"
            >
              <GithubIcon  className="h-8 w-8" />
            </a>
          
            <a
              href="mailto:sagarnawaz44@gmail.com"
              aria-label="Email Sagar Nawaz"
              className="text-accent-neon-blue hover:text-accent-purple transition-colors duration-300"
            >
              <Mail className="h-8 w-8" />
            </a>
          </div>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                required
                className="bg-input border-border focus:border-accent-neon-blue transition-colors duration-200"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@example.com"
                required
                className="bg-input border-border focus:border-accent-neon-blue transition-colors duration-200"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Your message here..."
                rows={5}
                required
                className="bg-input border-border focus:border-accent-neon-blue transition-colors duration-200"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-accent-purple hover:bg-accent-purple/80 text-white text-lg py-3 rounded-lg shadow-md transition-all duration-300"
            >
              Send Message
            </Button>
            {showSuccess && (
              <div
                ref={successMessageRef}
                className="mt-4 p-3 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-md text-center opacity-0"
              >
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
