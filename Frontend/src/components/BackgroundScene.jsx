import React, { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function ParticleNetwork({ isMobile, reducedMotion }) {
  const pointsRef = useRef();
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  const particleCount = isMobile ? 500 : 1200;

  // Generate particle positions and cyan (#22c1f0) / magenta (#e0219e) colors
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color("#22c1f0");
    const magentaColor = new THREE.Color("#e0219e");

    for (let i = 0; i < particleCount; i++) {
      // Spread across wide 3D space
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 25;

      // Mix cyan and magenta colors randomly
      const mixedColor = Math.random() > 0.4 ? cyanColor : magentaColor;
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return [pos, col];
  }, [particleCount]);

  // Track mouse movement for subtle parallax (desktop only)
  useEffect(() => {
    if (isMobile || reducedMotion) return;

    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, reducedMotion]);

  useFrame((state, delta) => {
    if (reducedMotion || document.hidden || !groupRef.current) return;

    // Slow ambient rotation
    groupRef.current.rotation.y += delta * 0.05;
    groupRef.current.rotation.x += delta * 0.02;

    // Subtle mouse parallax damping
    if (!isMobile) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        groupRef.current.rotation.y + mouse.current.x * 0.05,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.current.y * 0.05,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.08 : 0.06}
          vertexColors
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Floating icosahedron tech nodes matching hero neon rings */}
      <mesh position={[-8, 6, -10]} rotation={[0.4, 0.2, 0]}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial color="#22c1f0" wireframe transparent opacity={0.2} />
      </mesh>

      <mesh position={[9, -7, -12]} rotation={[0.2, 0.5, 0]}>
        <icosahedronGeometry args={[2, 1]} />
        <meshBasicMaterial color="#e0219e" wireframe transparent opacity={0.25} />
      </mesh>

      <mesh position={[-6, -10, -8]} rotation={[0.6, 0.1, 0]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial color="#22c1f0" wireframe transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export default function BackgroundScene() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.removeEventListener("resize", checkMobile);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div
      tabIndex={-1}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <Suspense fallback={null}>
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 15], fov: 60 }}
          style={{ background: "transparent" }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ParticleNetwork isMobile={isMobile} reducedMotion={reducedMotion} />
        </Canvas>
      </Suspense>
    </div>
  );
}
