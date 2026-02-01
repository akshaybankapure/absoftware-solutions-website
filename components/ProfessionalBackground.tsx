import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface ProfessionalBackgroundProps {
    theme: 'dark' | 'light';
}

const ParticleWave = ({ theme }: { theme: 'dark' | 'light' }) => {
    const count = 2000;
    const mesh = useRef<THREE.InstancedMesh>(null);
    const lightRef = useRef<THREE.PointLight>(null);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Generate random positions for a "field"
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 20; // Spread wide
            const z = (Math.random() - 0.5) * 20;
            const y = (Math.random() - 0.5) * 5;
            const t = Math.random() * 100; // Random time offset
            const factor = Math.random() * 10 + 5; // Differing speeds
            const speed = 0.01 + Math.random() / 200;
            temp.push({ t, factor, speed, x, y, z, mx: 0, my: 0 });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;

        const time = state.clock.getElapsedTime();

        // Mouse interaction target
        const targetX = (state.pointer.x * 4);
        const targetY = (state.pointer.y * 4);

        particles.forEach((particle, i) => {
            let { t, factor, speed, x, y, z } = particle;

            // Undulating wave motion
            const yOffset = Math.sin(t + time * speed) * (factor / 15) + Math.cos(t * 2 + time * speed) * (factor / 15);

            // Gentle rotation of the whole field
            const s = Math.cos(time * 0.1);
            const c = Math.sin(time * 0.1);

            // Rotate x, z around y-axis for slow spin
            const rx = x * c + z * s;
            const rz = x * -s + z * c;

            // Apply
            dummy.position.set(rx, y + yOffset, rz);

            // Scale based on "closeness" to center or camera for depth effect
            const scale = 1.0;
            dummy.scale.set(scale, scale, scale);

            dummy.updateMatrix();
            mesh.current.setMatrixAt(i, dummy.matrix);
        });

        mesh.current.instanceMatrix.needsUpdate = true;
    });

    const particleColor = theme === 'dark' ? '#6366f1' : '#2563eb';

    return (
        <>
            <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
                <dodecahedronGeometry args={[0.05, 0]} />
                <meshBasicMaterial
                    color={particleColor}
                    transparent
                    opacity={theme === 'dark' ? 0.4 : 0.2}
                />
            </instancedMesh>
        </>
    );
};

// A "Silk" like mesh that flows
const SilkMesh = ({ theme }: { theme: 'dark' | 'light' }) => {
    const mesh = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.x = -Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
            mesh.current.rotation.z = state.clock.elapsedTime * 0.05;
        }
    });

    const materialColor = theme === 'dark' ? "#312e81" : "#e0e7ff"; // deep indigo vs very light indigo
    const sheenColor = theme === 'dark' ? "#4338ca" : "#ffffff";

    return (
        <mesh ref={mesh} position={[5, -2, -5]} scale={3}>
            <planeGeometry args={[10, 10, 32, 32]} />
            <meshPhysicalMaterial
                color={materialColor}
                roughness={0.2}
                metalness={0.1}
                transmission={theme === 'dark' ? 0 : 0.2} // Slight glass in light mode
                transparent
                opacity={0.6}
                wireframe={true}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}


const ProfessionalBackground: React.FC<ProfessionalBackgroundProps> = ({ theme }) => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />

                {/* Subtle Ambient Lighting */}
                <ambientLight intensity={theme === 'dark' ? 0.3 : 0.8} />

                {/* Particle Field - The "Data" */}
                <ParticleWave theme={theme} />

                {/* Geometric Accent - The "Structure" */}
                {/* We keep this extremely subtle */}
                <group position={[4, 0, -2]}>
                    <SilkMesh theme={theme} />
                </group>

                <Environment preset="city" />

                {/* Fog to hide the edges and create depth */}
                <fog attach="fog" args={[theme === 'dark' ? '#050505' : '#ffffff', 5, 25]} />
            </Canvas>
        </div>
    );
};

export default ProfessionalBackground;
