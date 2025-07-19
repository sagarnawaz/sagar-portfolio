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
    title: "AI Chatbot Interface",
    description:
      "A responsive and intuitive chat interface powered by a custom AI model, featuring real-time responses and user authentication.",
    technologies: ["Next.js", "React", "Tailwind CSS", "AI SDK"],
    category: "AI",
    github: "#",
    live: "#",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "E-commerce Dashboard",
    description:
      "A modern e-commerce admin dashboard with data visualization, product management, and order tracking features.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Chart.js"],
    category: "Frontend",
    github: "#",
    live: "#",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Portfolio Website V2",
    description:
      "My personal portfolio website, showcasing my skills and projects with dynamic animations and a clean design.",
    technologies: ["Next.js", "React", "Tailwind CSS", "GSAP"],
    category: "Frontend",
    github: "#",
    live: "#",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Image Recognition App",
    description:
      "An application that uses machine learning to identify objects in images, built with a user-friendly frontend.",
    technologies: ["React", "Python (Flask)", "TensorFlow.js"],
    category: "AI",
    github: "#",
    live: "#",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "Task Management System",
    description:
      "A full-stack task management system with drag-and-drop functionality and real-time updates.",
    technologies: ["Next.js", "React", "Node.js", "MongoDB"],
    category: "Frontend",
    github: "#",
    live: "#",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "Sentiment Analysis Tool",
    description:
      "A web-based tool for analyzing text sentiment, providing insights into customer feedback and social media data.",
    technologies: ["React", "Python (Django)", "NLTK"],
    category: "AI",
    github: "#",
    live: "#",
    image: "/placeholder.svg?height=400&width=600",
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
    if (sectionRef.current && typeof window !== "undefined" && window.gsap) {
      cardRefs.current.forEach((card) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }
  }, [filter]); // Re-run animation when filter changes

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
      className="py-20 md:py-32 bg-gradient-to-br from-background to-gray-50 dark:from-gray-950 dark:to-primary-dark-navy/20"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-foreground">
          My <span className="text-accent-neon-blue">Projects</span>
        </h2>

        <div className="flex justify-center space-x-4 mb-12">
          {["All", "Frontend", "AI"].map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "outline"}
              className={
                filter === cat
                  ? "bg-accent-purple hover:bg-accent-purple/80 text-white"
                  : "border-accent-neon-blue text-accent-neon-blue hover:bg-accent-neon-blue/10"
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
              className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 opacity-0"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-foreground">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-sm rounded-full bg-accent-neon-blue/10 text-accent-neon-blue font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4">
                <Button
                  asChild
                  variant="outline"
                  className="border-accent-purple text-accent-purple hover:bg-accent-purple/10 bg-transparent"
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
                  className="bg-accent-purple hover:bg-accent-purple/80 text-white"
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
