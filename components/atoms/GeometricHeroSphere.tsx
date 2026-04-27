"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const SphereCore = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Rotate the entire group continuously
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x += 0.001;
      groupRef.current.rotation.z += 0.0005;
    }
  });

  // Extract vertices to place small spheres on nodes
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1, 2), []); // detail=2 gives a nice triangulated look
  
  const vertices = useMemo(() => {
    const pos = geo.attributes.position;
    const v = [];
    for (let i = 0; i < pos.count; i++) {
      v.push(new THREE.Vector3().fromBufferAttribute(pos, i));
    }
    // Remove duplicates to avoid overlapping nodes
    const unique: THREE.Vector3[] = [];
    v.forEach((v1) => {
      if (!unique.some((v2) => v1.distanceTo(v2) < 0.01)) {
        unique.push(v1);
      }
    });
    return unique;
  }, [geo]);

  // Use KopoPay brand colors
  const brandCyan = "#2ACED1";
  const brandGreen = "#008E96";

  return (
    <group ref={groupRef} scale={4.5}>
      {/* Wireframe */}
      <mesh geometry={geo}>
        <meshBasicMaterial 
          color={brandCyan} 
          wireframe 
          transparent 
          opacity={0.4} 
        />
      </mesh>
      
      {/* Solid translucent inner sphere for depth */}
      <mesh geometry={geo}>
        <meshBasicMaterial 
          color={brandGreen} 
          transparent 
          opacity={0.05} 
        />
      </mesh>

      {/* Nodes at vertices */}
      {vertices.map((v, i) => (
        <mesh key={i} position={v}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color={brandGreen} />
        </mesh>
      ))}
    </group>
  );
};

export const GeometricHeroSphere = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative flex items-center justify-center cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} gl={{ alpha: true }}>
        <ambientLight intensity={0.5} />
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <SphereCore />
        </Float>
      </Canvas>
    </div>
  );
};
