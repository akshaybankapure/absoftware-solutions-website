import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Fix for missing types in R3F elements.
// We augment both global JSX and React.JSX to ensure compatibility with different TS setups.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      sphereGeometry: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      sphereGeometry: any;
      ambientLight: any;
      spotLight: any;
      pointLight: any;
    }
  }
}

interface HeroSceneProps {
  theme: 'dark' | 'light';
}

const AnimatedSphere = ({ theme }: { theme: 'dark' | 'light' }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      
      // Mouse interaction (subtle parallax)
      const { x, y } = state.pointer;
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, x * 1, 0.1);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, y * 1, 0.1);
    }
  });

  const color = theme === 'dark' ? "#6366f1" : "#2563eb"; // Indigo vs Blue
  const emissive = theme === 'dark' ? "#a855f7" : "#000000";

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh ref={meshRef} scale={2.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.6} // Strength of distortion
          speed={2} // Speed of distortion
          roughness={0.2}
          metalness={0.8}
          emissive={emissive}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
};

const BackgroundParticles = ({ theme }: { theme: 'dark' | 'light' }) => {
  return (
    <Stars 
      radius={100} 
      depth={50} 
      count={5000} 
      factor={4} 
      saturation={0} 
      fade 
      speed={1} 
    />
  );
};

const HeroScene: React.FC<HeroSceneProps> = ({ theme }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={theme === 'dark' ? 0.5 : 1.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color={theme === 'dark' ? "#a855f7" : "#2563eb"} />
        
        <AnimatedSphere theme={theme} />
        {theme === 'dark' && <BackgroundParticles theme={theme} />}
      </Canvas>
    </div>
  );
};

export default HeroScene;