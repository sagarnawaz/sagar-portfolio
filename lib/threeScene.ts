import * as THREE from 'three';
import gsap from 'gsap';

export const initThreeScene = (canvas: HTMLCanvasElement) => {
    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.002); // Depth fog

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f3ff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0xff0055, 1);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    // --- MORPHING PARTICLE SYSTEM ---
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x00f3ff); // Cyan
    const color2 = new THREE.Color(0xff0055); // Pink

    // Points generation functions
    const getSpherePoints = () => {
        const vectors = [];
        const r = 2;
        for (let i = 0; i < particleCount; i++) {
            const phi = Math.acos(-1 + (2 * i) / particleCount);
            const theta = Math.sqrt(particleCount * Math.PI) * phi;
            vectors.push(new THREE.Vector3(
                r * Math.cos(theta) * Math.sin(phi),
                r * Math.sin(theta) * Math.sin(phi),
                r * Math.cos(phi)
            ));
        }
        return vectors;
    };

    const getTorusPoints = () => {
        const vectors = [];
        const R = 2.5; // Major radius
        const r = 0.8; // Minor radius
        for (let i = 0; i < particleCount; i++) {
            const u = (i / particleCount) * Math.PI * 2;
            const v = (i / particleCount) * Math.PI * 2;
            const twist = u * 0.5;
            
            vectors.push(new THREE.Vector3(
                (R + r * Math.cos(v + twist)) * Math.cos(u),
                (R + r * Math.cos(v + twist)) * Math.sin(u),
                r * Math.sin(v)
            ));
        }
        return vectors;
    };

    const getPlanePoints = () => {
        const vectors = [];
        const size = 6;
        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * size;
            const z = (Math.random() - 0.5) * size;
            const y = (Math.random() - 0.5) * 0.5;
            vectors.push(new THREE.Vector3(x, y - 2, z));
        }
        return vectors;
    };

    // Initialize as Sphere
    const spherePoints = getSpherePoints();
    const torusPoints = getTorusPoints();
    const planePoints = getPlanePoints();

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = spherePoints[i].x;
        positions[i * 3 + 1] = spherePoints[i].y;
        positions[i * 3 + 2] = spherePoints[i].z;

        colors[i * 3] = color1.r;
        colors[i * 3 + 1] = color1.g;
        colors[i * 3 + 2] = color1.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.8
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Starfield
    const starGeo = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPos = new Float32Array(starCount * 3);
    for(let i=0; i<starCount*3; i++) {
        starPos[i] = (Math.random() - 0.5) * 40;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({color: 0x444444, size: 0.02});
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - windowHalfX);
        mouseY = (event.clientY - windowHalfY);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation Loop
    const clock = new THREE.Clock();
    let animId: number;

    // Globals for external control
    const state = {
        activeMorphTarget: 'sphere' as 'sphere' | 'torus' | 'plane'
    };

    const animate = () => {
        animId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        const targetX = mouseX * 0.001;
        const targetY = mouseY * 0.001;

        particles.rotation.y += 0.05 * (targetX - particles.rotation.y);
        particles.rotation.x += 0.05 * (targetY - particles.rotation.x);
        particles.rotation.z += 0.002;

        const scale = 1 + Math.sin(elapsedTime * 0.5) * 0.05;
        particles.scale.set(scale, scale, scale);

        stars.rotation.y -= 0.0005;

        // Morphing Logic
        const positions = geometry.attributes.position.array as Float32Array;
        let sourceArray: THREE.Vector3[], targetArray: THREE.Vector3[];

        if (state.activeMorphTarget === 'sphere') { targetArray = spherePoints; } 
        else if (state.activeMorphTarget === 'torus') { targetArray = torusPoints; } 
        else if (state.activeMorphTarget === 'plane') { targetArray = planePoints; } 
        else { targetArray = spherePoints; }

        for(let i=0; i<particleCount; i++) {
            const idx = i * 3;
            // Simple lerp for morphing
            positions[idx] += (targetArray[i].x - positions[idx]) * 0.05;
            positions[idx+1] += (targetArray[i].y - positions[idx+1]) * 0.05;
            positions[idx+2] += (targetArray[i].z - positions[idx+2]) * 0.05;
        }
        geometry.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // cleanup
    return {
        dispose: () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            cancelAnimationFrame(animId);
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        },
        camera,
        particles,
        pointLight,
        setMorphTarget: (target: 'sphere' | 'torus' | 'plane') => {
            state.activeMorphTarget = target;
        }
    };
};
