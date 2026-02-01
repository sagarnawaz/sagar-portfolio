"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import { MessageCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function WhatsAppFloat({ phoneNumber = "+923042448375" }: { phoneNumber?: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false) // For a mini chat window simulation if desired, or just tooltip
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isVisible && buttonRef.current) {
      gsap.fromTo(buttonRef.current,
        { scale: 0, opacity: 0, rotate: -45 },
        { scale: 1, opacity: 1, rotate: 0, duration: 0.5, ease: "back.out(1.7)" }
      )
      
      // Show bubble after a delay
      gsap.fromTo(bubbleRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, delay: 1, ease: "power2.out" }
      )
    }
  }, [isVisible])

  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=Hi%20Sagar,%20I%20saw%20your%20portfolio...`

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
       {/* Chatbot Speech Bubble */}
       <div 
         ref={bubbleRef}
         className="mr-2 mb-1 bg-white text-black text-sm py-2 px-4 rounded-xl rounded-tr-none shadow-xl border border-white/20 origin-bottom-right hidden md:block"
       >
          <p className="font-medium">Need a developer? Let's chat! 👋</p>
       </div>

       {/* Floating Button */}
       <a
         ref={buttonRef}
         href={whatsappUrl}
         target="_blank"
         rel="noopener noreferrer"
         className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] text-white rounded-full shadow-[0_0_20px_rgba(37,211,102,0.5)] hover:shadow-[0_0_30px_rgba(37,211,102,0.8)] transition-all duration-300 hover:scale-110"
         aria-label="Chat on WhatsApp"
       >
         {/* Ping Animation */}
         <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 animate-ping duration-1000 -z-10" />
         
         <MessageCircle className="w-8 h-8 md:w-9 md:h-9 fill-current" />
       </a>
    </div>
  )
}
