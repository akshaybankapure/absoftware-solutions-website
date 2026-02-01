import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

const Geometry = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.05;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.08;
        }
        if (coreRef.current) {
            coreRef.current.rotation.x = -state.clock.elapsedTime * 0.1;
            coreRef.current.rotation.y = -state.clock.elapsedTime * 0.15;
        }
        if (ringRef.current) {
            ringRef.current.rotation.z = state.clock.elapsedTime * 0.2;
            ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            {/* Outer Wireframe - Structure */}
            <mesh ref={meshRef} scale={2.4}>
                <icosahedronGeometry args={[1, 1]} />
                <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.08} />
            </mesh>

            {/* Inner Core - Identity */}
            <mesh ref={coreRef} scale={1.2}>
                <dodecahedronGeometry args={[1, 0]} />
                <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.4} />
            </mesh>

            {/* Orbiting Ring - Dynamics */}
            <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} scale={3.5}>
                <torusGeometry args={[1, 0.005, 16, 100]} />
                <meshBasicMaterial color="#a855f7" transparent opacity={0.2} />
            </mesh>

            <pointLight color="#6366f1" intensity={5} distance={20} decay={2} />
        </Float>
    );
};

const WireframeScene = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none">
            <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <Geometry />
                <Environment preset="city" />
                <fog attach="fog" args={['#050505', 5, 30]} />
            </Canvas>
        </div>
    );
};

export default WireframeScene;
