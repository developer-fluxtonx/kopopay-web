"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Torus, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

const GlobeGroup = () => {
  const globeRef = useRef<THREE.Group>(null);

  // Use KopoPay's Blueish/Navy palette
  const colors = {
    globe: "#3B82F6",
    inner: "#034E78",
    ring1: "#008E96", // Slightly cyan-blue
    ring2: "#8B5CF6", // Purple-blue 
    ring3: "#1E40AF", // Deep blue
    point1: "#3B82F6",
    point2: "#60A5FA",
  };

  // Generate random data for orbiting points
  const points = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      angle: (i / 8) * Math.PI * 2,
      radius: 5.8 + Math.random() * 0.4,
      speed: 0.003 + Math.random() * 0.002,
      yOffset: (Math.random() - 0.5) * 2.5,
      color: i % 2 === 0 ? colors.point1 : colors.point2,
    }));
  }, []);

  useFrame((state) => {
    if (!globeRef.current) return;
    
    // Core globe and satellites should still rotate for "life"
    globeRef.current.rotation.y += 0.002;
    globeRef.current.rotation.x += 0.0005;
  });

  return (
    <group ref={globeRef}>
      {/* ─── Main Wireframe Globe ─── */}
      <Sphere args={[5, 40, 40]}>
        <meshBasicMaterial 
          color={colors.globe} 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </Sphere>

      {/* ─── Inner Glow Sphere ─── */}
      <Sphere args={[4.8, 32, 32]}>
        <meshBasicMaterial 
          color={colors.inner} 
          transparent 
          opacity={0.1} 
        />
      </Sphere>

      {/* ─── Static Outer Rings oriented perfectly in 3D ─── */}
      {/* Ring 1: Near Horizontal Tilt */}
      <Torus 
        args={[7.5, 0.04, 16, 100]} 
        rotation={[Math.PI / 2.3, 0, 0]}
      >
        <meshBasicMaterial color={colors.ring1} transparent opacity={0.3} />
      </Torus>

      {/* Ring 2: Diagonal Cross Tilt */}
      <Torus 
        args={[8.2, 0.03, 16, 100]} 
        rotation={[Math.PI / 1.2, Math.PI / 4, 0]}
      >
        <meshBasicMaterial color={colors.ring2} transparent opacity={0.25} />
      </Torus>

      {/* Ring 3: Vertical/Opposite Cross Tilt */}
      <Torus 
        args={[8.8, 0.02, 16, 100]} 
        rotation={[Math.PI / 4, -Math.PI / 3, 0.5]}
      >
        <meshBasicMaterial color={colors.ring3} transparent opacity={0.2} />
      </Torus>

      {/* ─── Orbiting Points (Satellites) ─── */}
      {points.map((p, i) => (
        <OrbitingPoint key={i} data={p} />
      ))}
    </group>
  );
};

const OrbitingPoint = ({ data }: { data: any }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const angle = useRef(data.angle);

  useFrame(() => {
    if (!meshRef.current) return;
    angle.current += data.speed;
    meshRef.current.position.x = Math.cos(angle.current) * data.radius;
    meshRef.current.position.z = Math.sin(angle.current) * data.radius;
    meshRef.current.position.y = data.yOffset + Math.sin(angle.current * 2) * 0.5;
  });

  return (
    <Sphere ref={meshRef} args={[0.12, 16, 16]}>
      <meshBasicMaterial color={data.color} transparent opacity={0.8} />
    </Sphere>
  );
};

export const AnimatedGlobe = () => {
  return (
    <div className="w-full h-full min-h-[400px] relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 18], fov: 65 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <GlobeGroup />
        </Float>

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};
