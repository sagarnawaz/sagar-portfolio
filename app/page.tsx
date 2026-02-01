"use client";

import { useEffect, useState, useRef } from "react";
import CanvasScene from "@/components/CanvasScene";
import Cursor from "@/components/Cursor";
import Loader from "@/components/Loader";
import Header from "@/components/Header";
import NavRail from "@/components/NavRail";
import Sections from "@/components/Sections";
import { initScrollAnimations } from "@/lib/animations";

export default function Home() {
  const [sceneState, setSceneState] = useState<any>(null);
  
  // We use a ref to hold the scene state to avoid re-running effects if state updates trigger re-renders
  // but useEffect dependency on sceneState is fine.
  const sceneRef = useRef<any>(null);

  const handleSceneReady = (scene: any) => {
      sceneRef.current = scene;
      setSceneState(scene);
  };

  useEffect(() => {
    if (sceneRef.current) {
        // Init animations only when scene is ready
        initScrollAnimations(sceneRef);
    }
  }, [sceneState]);

  return (
    <>
      <Loader />
      <Cursor />
      
      {/* 3D Background */}
      <CanvasScene onSceneReady={handleSceneReady} />

      <div id="ui-layer" className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none grid grid-rows-[auto_1fr_auto] grid-cols-[1fr_auto]">
        <Header />
        <NavRail />
      </div>

      <Sections />
    </>
  );
}
