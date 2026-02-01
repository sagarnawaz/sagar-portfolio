"use client";

import { useEffect, useRef } from "react";
import { initThreeScene } from "@/lib/threeScene";

// We'll expose the scene controls via a ref or a context if needed, 
// for now, we just initialize it and let it run.
// To connect to GSAP, we might need to expose the returned object.

interface CanvasSceneProps {
    onSceneReady?: (scene: any) => void;
}

export default function CanvasScene({ onSceneReady }: CanvasSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const sceneControls = initThreeScene(canvasRef.current);
    
    if (onSceneReady) {
        onSceneReady(sceneControls);
    }

    return () => {
        sceneControls.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} id="webgl-canvas" className="fixed top-0 left-0 w-full h-full z-[1] outline-none" />;
}
