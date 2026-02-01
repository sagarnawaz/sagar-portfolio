"use client";

import { useEffect, useRef } from "react";
// import { initScrollAnimations } from "@/lib/animations"; // Moved to parent to coordinate with scene
// But wait, the prompt "Call this inside Sections.tsx using useEffect" is good advice if we can access the scene.
// However, the scene is in CanvasScene. We need a way to link them.
// The Plan said "Sections component".
// Let's implement the HTML structure here first.

export default function Sections() {
  return (
    <div className="content-wrapper absolute top-0 left-0 w-full h-full z-5 overflow-y-auto no-scrollbar">
      <div className="scroll-height h-[500vh] relative">
        
        {/* Section 0: Intro */}
        <section id="section-0" className="active absolute top-0 left-0 w-full h-screen flex flex-col justify-center px-[10%] pointer-events-none opacity-0 invisible transition-opacity duration-500 [&.active]:opacity-100 [&.active]:visible [&.active]:pointer-events-auto">
            <p className="mono-text reveal-text font-mono text-base leading-relaxed max-w-[500px] text-white/60 mb-8">CREATIVE DEVELOPER & UX ARCHITECT</p>
            <h1 className="reveal-text text-[12vw] md:text-[6vw] leading-none font-extrabold -tracking-[0.04em] mb-4 uppercase clip-polygon">Digital<br/>Alchemy</h1>
            <div className="mono-text reveal-text font-mono text-base leading-relaxed max-w-[500px] text-white/60 mb-8">
                Crafting immersive web experiences where code meets cinema. <br/>
                Scroll to explore.
            </div>
        </section>

        {/* Section 1: About / Skills */}
        <section id="section-1" className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center px-[10%] pointer-events-none opacity-0 invisible transition-opacity duration-500 [&.active]:opacity-100 [&.active]:visible [&.active]:pointer-events-auto">
            <div className="flex flex-col gap-8">
                <div>
                    <h2 className="reveal-text text-[8vw] md:text-[4vw] leading-none font-light mb-8 text-white/80">The Architecture</h2>
                    <p className="mono-text reveal-text font-mono text-base leading-relaxed max-w-[500px] text-white/60 mb-8">I build performant, accessible, and visually striking applications. Not just websites, but digital ecosystems.</p>
                </div>
                <div className="skills-grid flex flex-wrap gap-4 max-w-[600px]">
                    {["Three.js / WebGL", "React / Next.js", "GSAP Animation", "TypeScript", "Node.js", "GLSL Shaders"].map(skill => (
                        <div key={skill} className="skill-tag reveal-text font-mono border border-white/30 px-6 py-2 rounded-full text-sm backdrop-blur-[5px] bg-white/5 transition-all duration-300 hover:border-[#00f3ff] hover:bg-[rgba(0,243,255,0.1)] hover:shadow-[0_0_15px_rgba(0,243,255,0.3)] cursor-hover">
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Section 2: Projects */}
        <section id="section-2" className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center px-[10%] pointer-events-none opacity-0 invisible transition-opacity duration-500 [&.active]:opacity-100 [&.active]:visible [&.active]:pointer-events-auto">
            <h2 className="reveal-text text-[8vw] md:text-[4vw] leading-none font-light mb-8 text-white/80">Selected Works</h2>
            <div className="project-list flex flex-col gap-8">
                {[
                    { meta: "01 // E-COMMERCE", title: "Neon Genesis" },
                    { meta: "02 // FINTECH", title: "Vortex Dashboard" },
                    { meta: "03 // ART INSTALLATION", title: "Ethereal Voices" }
                ].map((project, i) => (
                    <div key={i} className="project-item reveal-text border-t border-white/20 pt-8 transition-all duration-300 cursor-pointer pointer-events-auto group">
                        <div className="project-meta font-mono text-[0.8rem] text-[#ff0055] mb-2">{project.meta}</div>
                        <div className="project-title text-[2rem] md:text-[3rem] font-extrabold transition-all duration-400 ease-[cubic-bezier(0.165,0.84,0.44,1)] group-hover:text-[#00f3ff] group-hover:pl-5">{project.title}</div>
                    </div>
                ))}
            </div>
        </section>

        {/* Section 3: Contact */}
        <section id="section-3" className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center px-[10%] pointer-events-none opacity-0 invisible transition-opacity duration-500 [&.active]:opacity-100 [&.active]:visible [&.active]:pointer-events-auto">
            <h2 className="reveal-text text-[8vw] md:text-[4vw] leading-none font-light mb-8 text-white/80">Ready to Collaborate?</h2>
            <p className="mono-text reveal-text font-mono text-base leading-relaxed max-w-[500px] text-white/60 mb-12">Currently available for select commissions and technical consulting.</p>
            <a href="#" className="contact-link reveal-text inline-block text-[3rem] font-extrabold text-[#e0e0e0] no-underline relative pointer-events-auto after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-1 after:bg-[#ff0055] after:transition-[width] after:duration-400 hover:after:w-full">
                HELLO@AETHER.DEV
            </a>
        </section>

      </div>
    </div>
  );
}
