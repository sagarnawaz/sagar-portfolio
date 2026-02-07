"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

interface HeartbeatLoaderProps {
  onComplete: () => void;
}

export function HeartbeatLoader({ onComplete }: HeartbeatLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [interactionRequired, setInteractionRequired] = useState(true);

  // SVG Path for ECG: baseline -> P -> QRS -> T -> baseline
  // Dimensions 400x100
  const ecgPath = "M0,50 L140,50 L150,40 L160,50 L170,50 L175,80 L185,10 L195,90 L200,50 L210,50 L225,40 L235,50 L400,50";

  // Simulate progress
  useEffect(() => {
    const tl = gsap.timeline({
      onUpdate: () => setProgress(Math.floor(tl.progress() * 100)),
      onComplete: () => {
         // Final stretch and transition
         handleTransition();
      }
    });
    tl.to({}, { duration: 5 }); // 5 second intro/load sequence
  }, []);

  const handleTransition = () => {
    const tl = gsap.timeline({
        onComplete: onComplete
    });

    // Final strong pulse
    tl.to(containerRef.current, {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out"
    });

    // Stretch ECG line
    tl.to(pathRef.current, {
        scaleX: 20,
        opacity: 0,
        duration: 1.5,
        ease: "power4.in"
    }, "-=0.1");

    // Fade out background
    tl.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut"
    }, "-=1");
  };

  // Synthesize heartbeat sound
  const playHeartbeatSound = useCallback(() => {
    if (isMuted || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') ctx.resume();

    const playTone = (freq: number, startTime: number, duration: number, volume: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);
        
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.exponentialRampToValueAtTime(volume, startTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    // Lub-Dub
    playTone(60, now, 0.15, 0.3); // Lub (Low frequency)
    playTone(50, now + 0.2, 0.2, 0.2); // Dub (Slightly lower and longer)
  }, [isMuted]);

  // Main animation loop for heartbeat
  useEffect(() => {
    const pulseTimeline = gsap.timeline({ repeat: -1 });

    const bpm = gsap.utils.mapRange(0, 100, 60, 120, progress);
    const interval = 60 / bpm;

    pulseTimeline.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: interval * 0.8,
        ease: "none",
        onStart: () => {
            playHeartbeatSound();
        }
    });

    // Rhythmic pulse of the glow
    gsap.to(containerRef.current, {
        filter: `drop-shadow(0 0 ${gsap.utils.mapRange(0, 100, 5, 20, progress)}px #00f3ff)`,
        duration: 0.2,
        repeat: 1,
        yoyo: true
    });

    return () => {
        pulseTimeline.kill();
    };
  }, [progress, playHeartbeatSound]);

  const handleStartInteraction = () => {
    setInteractionRequired(false);
    setIsMuted(false);
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative w-[300px] sm:w-[500px] h-[200px] flex items-center justify-center">
        <svg 
            viewBox="0 0 400 100" 
            className="w-full h-full overflow-visible"
            preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="ecg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f3ff" />
              <stop offset="100%" stopColor="#ff0055" />
            </linearGradient>
            <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Base ECG Path */}
          <path 
            ref={pathRef}
            d={ecgPath}
            fill="none"
            stroke="url(#ecg-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="filter-[url(#glow)]"
            strokeDasharray="400"
            strokeDashoffset="400"
          />
        </svg>
      </div>

      <div className="mt-10 font-mono text-[10px] tracking-[0.5em] text-[#e0e0e0] uppercase opacity-50 flex flex-col items-center gap-4">
        <span>Vitalizing Experience {progress}%</span>
        {interactionRequired && (
            <button 
                onClick={handleStartInteraction}
                className="px-4 py-2 border border-[#00f3ff]/30 rounded-full hover:bg-[#00f3ff]/10 transition-colors duration-300 pointer-events-auto"
            >
                ENABLE AUDIO
            </button>
        )}
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent scale-x-150 blur-sm" />
      </div>
    </div>
  );
}
