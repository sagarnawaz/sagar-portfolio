import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"
import { CustomCursor } from "@/components/custom-cursor"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sagar Nawaz - Frontend Developer Portfolio",
  description: "Sagar Nawaz's portfolio showcasing modern web experiences with AI flair.",
    generator: 'v0.dev'
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
      <body className={`${inter.className} antialiased`} suppressHydrationWarning={true}>
        <CustomCursor />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
