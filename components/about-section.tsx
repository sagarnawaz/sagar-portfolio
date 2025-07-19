'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      const items = Array.from(timelineRef.current?.children || [])
      gsap.fromTo(
        items,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-br from-background to-gray-50 dark:from-gray-950 dark:to-primary-dark-navy/20"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          About <span className="text-accent-neon-blue">Me</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          <div ref={imageRef} className="w-full md:w-1/3 flex justify-center opacity-0">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-accent-purple">
              <Image
                src="/my-pic.png?height=320&width=320"
                alt="Sagar Nawaz Profile"
                fill
                style={{ objectFit: 'cover' }}
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
          <div ref={textRef} className="w-full md:w-2/3 text-center md:text-left opacity-0">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              Hello! I'm Sagar Nawaz, a passionate Frontend Developer with a keen interest in Artificial Intelligence.
              My journey in web development began with a fascination for creating intuitive and visually appealing user
              interfaces. Over the years, I've honed my skills in modern web technologies, focusing on delivering
              seamless and engaging user experiences.
            </p>
            <p className="text-lg text-foreground leading-relaxed mb-6">
              I specialize in building robust and scalable applications using React and Next.js, styled with the
              efficiency of Tailwind CSS. My approach combines clean code with innovative design, ensuring that every
              project not only looks great but also performs exceptionally. I'm constantly exploring new ways to
              integrate AI concepts into frontend development, pushing the boundaries of what's possible on the web.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              When I'm not coding, you can find me delving into the latest AI research, experimenting with new design
              trends, or contributing to open-source projects. I'm always eager to learn and grow, embracing new
              challenges that expand my technical horizons.
            </p>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-3xl font-bold text-center mb-10 text-foreground">
            My <span className="text-accent-purple">Journey</span>
          </h3>
          <div
            ref={timelineRef}
            className="relative border-l-4 border-accent-neon-blue pl-8 space-y-12"
          >
            {/* Timeline Item 1 */}
            <div className="relative">
              <div className="absolute -left-10 top-0 w-6 h-6 bg-accent-neon-blue rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <h4 className="text-2xl font-semibold text-foreground mb-2">Senior Frontend Developer</h4>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">Tech Solutions Inc. | 2022 - Present</p>
              <p className="text-md text-gray-700 dark:text-gray-400">
                Leading development of high-performance web applications, implementing AI-driven features, and mentoring
                junior developers.
              </p>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative">
              <div className="absolute -left-10 top-0 w-6 h-6 bg-accent-neon-blue rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <h4 className="text-2xl font-semibold text-foreground mb-2">Frontend Developer</h4>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">Web Innovators Co. | 2019 - 2022</p>
              <p className="text-md text-gray-700 dark:text-gray-400">
                Developed responsive user interfaces, integrated RESTful APIs, and optimized web performance.
              </p>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative">
              <div className="absolute -left-10 top-0 w-6 h-6 bg-accent-neon-blue rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <h4 className="text-2xl font-semibold text-foreground mb-2">Junior Web Developer</h4>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">Creative Digital Agency | 2017 - 2019</p>
              <p className="text-md text-gray-700 dark:text-gray-400">
                Assisted in building and maintaining client websites, focusing on HTML, CSS, and JavaScript.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
