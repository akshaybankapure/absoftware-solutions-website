import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

interface TechSceneProps {
    theme: 'dark' | 'light';
}

const GeometricCore = ({ theme }: { theme: 'dark' | 'light' }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
        }
        if (groupRef.current) {
            // Subtle floating movement
            groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;

            // Mouse parallax
            const { x, y } = state.pointer;
            groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, y * 0.2, 0.1);
            groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.2, 0.1);
        }
    });

    const mainColor = theme === 'dark' ? "#6366f1" : "#2563eb"; // Indigo / Blue
    const wireframeColor = theme === 'dark' ? "#a855f7" : "#1e40af"; // Purple / Dark Blue

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                <mesh ref={meshRef} scale={1.8}>
                    <icosahedronGeometry args={[1, 1]} /> {/* Detailed geometric shape */}
                    {/* Wireframe Look */}
                    <meshBasicMaterial
                        color={wireframeColor}
                        wireframe
                        transparent
                        opacity={0.3}
                    />
                </mesh>

                {/* Inner Solid Core for depth */}
                <mesh scale={1.75}>
                    <icosahedronGeometry args={[1, 1]} />
                    <meshPhysicalMaterial
                        color={mainColor}
                        roughness={0.2}
                        metalness={0.8}
                        transmission={0.2} // Glass-like
                        thickness={1}
                        clearcoat={1}
                        transparent
                        opacity={0.1}
                    />
                </mesh>
            </Float>

            {/* Orbiting rings or electrons to make it look "engineered" */}
            <Ring radius={2.5} speed={0.5} color={theme === 'dark' ? '#38bdf8' : '#0ea5e9'} />
            <Ring radius={3.2} speed={0.3} axis="x" color={theme === 'dark' ? '#f472b6' : '#db2777'} />
        </group>
    );
};

const Ring = ({ radius, speed, axis = 'y', color }: { radius: number, speed: number, axis?: 'x' | 'y', color: string }) => {
    const ref = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (ref.current) {
            if (axis === 'y') ref.current.rotation.z += 0.005 * speed;
            else ref.current.rotation.x += 0.005 * speed;
            ref.current.rotation.y += 0.01 * speed;
        }
    });

    return (
        <mesh ref={ref}>
            <torusGeometry args={[radius, 0.02, 16, 100]} />
            <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
    );
}

const TechScene: React.FC<TechSceneProps> = ({ theme }) => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} />

                <ambientLight intensity={theme === 'dark' ? 0.5 : 1} />
                <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff0000" />

                <Environment preset="city" />

                <group position={[3, 0, 0]}> {/* Positioned to the right to balance text on left */}
                    <GeometricCore theme={theme} />
                </group>

                {theme === 'dark' && (
                    <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
                )}
            </Canvas>
        </div>
    );
};

export default TechScene;
