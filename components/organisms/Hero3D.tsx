"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, Text, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

const MovingGradientMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  const shaderArgs = {
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#2ACED1") }, // Cyan Main
      uColor2: { value: new THREE.Color("#008E96") }, // Cyan Dark
      uColor3: { value: new THREE.Color("#034E78") }, // Navy Light
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;
      varying vec2 vUv;
      
      void main() {
        vec2 uv = vUv;
        float wave = sin(uv.x * 10.0 + uTime) * 0.5 + 0.5;
        float wave2 = cos(uv.y * 8.0 - uTime * 0.5) * 0.5 + 0.5;
        
        vec3 finalColor = mix(uColor1, uColor2, wave);
        finalColor = mix(finalColor, uColor3, wave2);
        
        gl_FragColor = vec4(finalColor, 0.8);
      }
    `,
    transparent: true,
  };

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[15, 10, 64, 64]} />
      <shaderMaterial ref={materialRef} args={[shaderArgs]} />
    </mesh>
  );
};

const CreditCard = () => {
  const group = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (group.current) {
      // Gyroscopic drift effect
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      group.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[3.375, 2.125, 0.1]} />
          <meshPhysicalMaterial 
            color="#000C22" 
            metalness={0.6}
            roughness={0.2}
            clearcoat={1.0}
            clearcoatRoughness={0.1}
          />
        </mesh>
        <Text
          position={[-1.2, -0.6, 0.06]}
          fontSize={0.2}
          color="#D8F4F7"
          anchorX="left"
          anchorY="middle"
        >
          Kopo Pay
        </Text>
        <mesh position={[1.1, 0.5, 0.06]}>
          <boxGeometry args={[0.6, 0.4, 0.01]} />
          <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  );
};

export const Hero3D = () => {
  return (
    <div className="absolute inset-0 -z-10 h-[800px] w-full overflow-hidden bg-transparent">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <MovingGradientMesh />
        <CreditCard />
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  );
};
