import type React from "react"
import "./globals.css"
import { Outfit, Space_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import { CustomCursor } from "@/components/custom-cursor"
import { WhatsAppFloat } from "@/components/whatsapp-float"

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit",
  display: 'swap',
})

const spaceMono = Space_Mono({ 
  weight: ['400', '700'],
  subsets: ["latin"], 
  variable: "--font-space-mono",
  display: 'swap',
})

export const metadata = {
  icons: "/favicon.ico",
  title: "Sagar Nawaz",
  description: "A Full-Stack Developer specializing in React, Next.js, Node.js, and scaling modern web applications.",
  keywords: ["Full-Stack Developer", "React Developer", "Next.js", "Node.js", "Web Development", "Karachi", "Pakistan"],
  authors: [{ name: "Sagar Nawaz" }],
  openGraph: {
    title: "Sagar Nawaz | Full-Stack Developer",
    description: "Crafting Scalable & Interactive Web Experiences. View my projects and journey.",
    url: "https://s-n-r.vercel.app/", // Placeholder URL
    siteName: "Sagar Nawaz Portfolio",
    locale: "en_US",
    type: "website",
  },

}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sagar Nawaz",
  "jobTitle": "Full-Stack Developer",
  "url": "https://s-n-r.vercel.app/",
  "sameAs": [
    "https://github.com/sagarnawaz",
    "https://linkedin.com/in/sagar-nawaz-12081223a"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Karachi",
    "addressRegion": "Sindh",
    "addressCountry": "Pakistan"
  },
  "knowsAbout": ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "Three.js"]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* GSAP CDN removed to use npm imports only */}
      </head>
      <body className={`${outfit.variable} ${spaceMono.variable} font-sans antialiased bg-background text-foreground selection:bg-primary/30`} suppressHydrationWarning={true}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
          <WhatsAppFloat />
        </ThemeProvider>
      </body>
    </html>
  )
}
