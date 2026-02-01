import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MutableRefObject } from "react";

export const initScrollAnimations = (
    sceneRef: MutableRefObject<any>
) => {
  gsap.registerPlugin(ScrollTrigger);

  // Initial Reveal of Section 0 text
  gsap.from('#section-0 .reveal-text', {
    y: 50,
    opacity: 0,
    duration: 1.5,
    stagger: 0.2,
    ease: "power3.out",
    delay: 0.8
  });

  // Define Timeline for 3D Scene Evolution
  const tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".scroll-height",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
    }
  });

  const { camera, particles, pointLight, setMorphTarget } = sceneRef.current;

  if (!camera || !particles) return;

  // 1. Intro -> About (Sphere to Torus, Move Camera)
  tl.to(camera.position, {
      z: 6,
      duration: 2
  }, 0)
  .call(() => { setMorphTarget('torus'); }, [], 0)
  .to(particles.rotation, {
      y: Math.PI / 2,
      duration: 2
  }, 0)
  .to(pointLight.color, {
      r: 1, g: 0, b: 0.3, // Shift to pinkish
      duration: 2
  }, 0);

  // 2. About -> Projects (Torus spins faster, Camera Zooms)
  tl.to(camera.position, {
      z: 8,
      x: 2,
      duration: 2
  }, 2)
  .to(particles.rotation, {
      z: Math.PI,
      duration: 2
  }, 2);

  // 3. Projects -> Contact (Torus to Plane, Reset Camera)
  tl.to(camera.position, {
      z: 10,
      x: 0,
      y: -2,
      duration: 2
  }, 4)
  .call(() => { setMorphTarget('plane'); }, [], 4)
  .to(particles.rotation, {
      x: -Math.PI / 4,
      duration: 2
  }, 4);

  // Section Visibility & Text Reveal Logic
  const sections = document.querySelectorAll('section');
  const navDots = document.querySelectorAll('.nav-dot');

  sections.forEach((section, index) => {
      ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
              setActiveSection(index, navDots, sections);
              animateTextIn(section);
          },
          onEnterBack: () => {
              setActiveSection(index, navDots, sections);
              animateTextIn(section);
          }
      });
  });
};

function setActiveSection(index: number, navDots: NodeListOf<Element>, sections: NodeListOf<Element>) {
    // Nav Dots
    navDots.forEach(dot => dot.classList.remove('active'));
    navDots[index]?.classList.add('active');

    // Sections
    sections.forEach(sec => sec.classList.remove('active'));
    sections[index]?.classList.add('active');
}

function animateTextIn(section: Element) {
    const texts = section.querySelectorAll('.reveal-text');
    // Reset animation state slightly for replayability
    gsap.fromTo(texts, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );
}
