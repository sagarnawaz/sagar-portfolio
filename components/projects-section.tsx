"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "LMS Admin ",
    description:
      "The LMS admin dashboard is a Next.js-based web application designed for admins and instructors to manage educational content.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    category: "Frontend",
    github: "https://github.com/sagarnawaz/lms-admin",
    live: "https://lms-admin-bay.vercel.app/",
    image: "/lms.png?height=400&width=600",
  },
  {
    id: 2,
    title: "E-commerce",
    description:
      "A modern e-commerce UI with data visualization, product management, and order tracking features.",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    category: "Frontend",
    github: "#",
    live: "https://nike-app-green.vercel.app/",
    image: "/ecomerce.png?height=400&width=600",
  },
  {
    id: 3,
    title: "Personal Blogging Website",
    description:
      "My personal blogging website, showcasing my skills and projects with dynamic animations and a clean design.",
    technologies: ["Next.js", "React", "Tailwind CSS", "GSAP"],
    category: "Frontend",
    github: "https://github.com/sagarnawaz/blogging-app",
    live: "https://blogging-app-weld-iota.vercel.app/",
    image: "/blogging.png?height=400&width=600",
  },
  // {
  //   id: 4,
  //   title: "Image Recognition App",
  //   description:
  //     "An application that uses machine learning to identify objects in images, built with a user-friendly frontend.",
  //   technologies: ["React", "Python (Flask)", "TensorFlow.js"],
  //   category: "AI",
  //   github: "#",
  //   live: "#",
  //   image: "/placeholder.svg?height=400&width=600",
  // },
  {
    id: 5,
    title: "Movie Web App ",
    description:
      "A movie web using API with analyzing trending feature, providing filter and search (deboounce) to user.",
    technologies: ["React", "Next.js", "Tailwind CSS", "Appwrite"],
    category: "Frontend",
    github: "#",
    live: "https://movie-web-five-alpha.vercel.app/",
    image: "/movie.png?height=400&width=600",
  },
  {
    id: 6,
    title: "Travel Agent UI",
    description:
      "A Travel agency UI. It SPA functionality and real-time updates.",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    category: "Frontend",
    github: "#",
    live: "https://travel-ui-eight.vercel.app/",
    image: "/travel.png?height=400&width=600",
  },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [filter, setFilter] = useState("All");

  const filteredProjects = projects.filter((project) =>
    filter === "All" ? true : project.category === filter
  );

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [filteredProjects]);
  

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.gsap) {
      gsap.to(e.currentTarget, {
        scale: 1.03,
        rotationY: 5,
        rotationX: 3,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.gsap) {
      gsap.to(e.currentTarget, {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 md:py-32 relative z-10"
    >
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-foreground tracking-tighter">
          Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Works</span>
        </h2>
{/* AI fiter in map*/}
        <div className="flex justify-center space-x-4 mb-16">
          {["All", "Frontend"].map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              className={
                filter === cat
                  ? "bg-cyan-500 hover:bg-cyan-600 text-black border-none"
                  : "border-black/10 dark:border-white/10 text-muted-foreground hover:text-black dark:hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10"
              }
              onClick={() => setFilter(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              ref={(el) => { cardRefs.current[index] = el }}
              className="overflow-hidden bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 hover:border-cyan-500/30 transition-all duration-500 group"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative w-full h-48 overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500/10 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-foreground text-xl group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-muted-foreground group-hover:text-cyan-600 dark:group-hover:text-cyan-300 group-hover:border-cyan-500/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4">
                <Button
                  asChild
                  variant="ghost"
                  className="hover:bg-black/5 dark:hover:bg-white/5 hover:text-cyan-400"
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <Github className="h-4 w-4 mr-2" /> GitHub
                  </a>
                </Button>
                <Button
                  asChild
                  className="bg-black/5 dark:bg-white/10 hover:bg-cyan-500 hover:text-black dark:hover:text-black text-black dark:text-white border border-black/5 dark:border-white/10 transition-all duration-300"
                >
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View live demo of ${project.title}`}
                  >
                    <LinkIcon className="h-4 w-4 mr-2" /> Live Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
