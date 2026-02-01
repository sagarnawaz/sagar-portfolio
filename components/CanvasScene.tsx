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

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none">
       <canvas ref={canvasRef} id="webgl-canvas" className="w-full h-full block" />
    </div>
  );
}
