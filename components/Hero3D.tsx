import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshWobbleMaterial, Html } from '@react-three/drei';
import { Vector3 } from 'three';

function FloatingGeometry(){
  const ref = useRef<any>();
  useFrame((state, delta) => {
    if(ref.current){
      ref.current.rotation.x += delta * 0.15;
      ref.current.rotation.y -= delta * 0.12;
    }
  });

  return (
    <group ref={ref} position={[0, -0.5, 0]}>
      <mesh position={[0, 0.0, 0]}>
        <icosahedronGeometry args={[1.6, 2]} />
        <MeshWobbleMaterial factor={0.8} speed={1.2} color="#7c3aed" envMapIntensity={0.8} clearcoat={0.3} />
      </mesh>
      <mesh position={[2.6, -0.3, -1.2]} scale={0.8}>
        <torusKnotGeometry args={[0.45, 0.15, 128, 32]} />
        <MeshWobbleMaterial factor={0.5} speed={1.5} color="#06b6d4" metalness={0.6} />
      </mesh>
    </group>
  );
}

const Hero3D: React.FC = () => {
  return (
    <div className="hero-3d-wrap">
      <Canvas className="hero-canvas" camera={{ position: new Vector3(0, 0, 6) }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} />
        <Suspense fallback={null}>
          <FloatingGeometry />
        </Suspense>
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default Hero3D;
