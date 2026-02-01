import * as THREE from "three";

export const initThreeScene = (canvas: HTMLCanvasElement) => {
  const scene = new THREE.Scene();
  // Transparent background
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 30;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // --- Particles ---
  const particleCount = 4000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const originalPositions = new Float32Array(particleCount * 3);
  const targetPositions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const color1 = new THREE.Color("#4F46E5"); // Indigo
  const color2 = new THREE.Color("#8B5CF6"); // Purple
  const color3 = new THREE.Color("#06b6d4"); // Cyan

  // Initial Shape: Random extraction from a sphere
  for (let i = 0; i < particleCount; i++) {
    const r = 20 * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);

    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    originalPositions[i * 3] = x;
    originalPositions[i * 3 + 1] = y;
    originalPositions[i * 3 + 2] = z;

    // Target: Torus or Wave
    targetPositions[i * 3] = x * 1.5;
    targetPositions[i * 3 + 1] = y * 1.5;
    targetPositions[i * 3 + 2] = z * 1.5;

    // Colors
    const mixedColor = color1.clone().lerp(color2, Math.random()).lerp(color3, Math.random());
    colors[i * 3] = mixedColor.r;
    colors[i * 3 + 1] = mixedColor.g;
    colors[i * 3 + 2] = mixedColor.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // --- Mouse Interaction ---
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const handleMouseMove = (event: MouseEvent) => {
    mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
    mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
  };
  window.addEventListener("mousemove", handleMouseMove);

  // --- Morphing Logic ---
  let time = 0;
  
  // Shapes
  const getSpherePos = (i: number) => {
     // Reusing original positions for sphere
     return {
        x: originalPositions[i*3],
        y: originalPositions[i*3+1],
        z: originalPositions[i*3+2]
     }
  }
  
  const getWavePos = (i: number, t: number) => {
     const x = (i % 100 - 50) * 0.8;
     const z = (Math.floor(i / 100) - 20) * 0.8;
     const y = Math.sin(x * 0.2 + t) * 5 + Math.cos(z * 0.2 + t) * 5;
     return {x, y, z};
  }
  
  // --- Animation ---
  let animationId: number;
  let shapeState = 0; // 0: Sphere, 1: Wave
  
  // Auto-switch shapes
  setInterval(() => {
    shapeState = (shapeState + 1) % 2;
  }, 10000);

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    time += 0.005;

    targetX = mouseX * 0.5;
    targetY = mouseY * 0.5;

    particles.rotation.y += 0.001;
    particles.rotation.x += (targetY * 0.001 - particles.rotation.x) * 0.05;
    particles.rotation.y += (targetX * 0.001 - particles.rotation.y) * 0.05;

    const posAttr = particles.geometry.attributes.position;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
        let tx, ty, tz;

        if (shapeState === 0) {
            // Sphere with noise
            const s = getSpherePos(i);
            const noise = Math.sin(time * 2 + i) * 0.5;
            tx = s.x + noise;
            ty = s.y + noise;
            tz = s.z + noise;
        } else {
             // Wave
             const w = getWavePos(i, time);
             tx = w.x;
             ty = w.y;
             tz = w.z;
        }
        
        // Lerp current to target
        array[i * 3] += (tx - array[i * 3]) * 0.03;
        array[i * 3 + 1] += (ty - array[i * 3 + 1]) * 0.03;
        array[i * 3 + 2] += (tz - array[i * 3 + 2]) * 0.03;
    }
    
    posAttr.needsUpdate = true;

    renderer.render(scene, camera);
  };

  animate();

  // --- Resize ---
  const handleResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
  window.addEventListener("resize", handleResize);

  return {
    dispose: () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
};
