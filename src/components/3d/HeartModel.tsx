import { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Sphere, Box } from '@react-three/drei';
import * as THREE from 'three';

interface HeartModelProps {
  crossSection: number;
  visibleLayers: {
    exterior: boolean;
    muscles: boolean;
    chambers: boolean;
    vessels: boolean;
  };
  onStructureClick: (structure: string) => void;
}

// Simplified anatomical heart components
function HeartExterior({ visible, crossSection, onClick }: { visible: boolean; crossSection: number; onClick: (name: string) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  if (!visible) return null;

  return (
    <group>
      {/* Main heart shape */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onClick={() => onClick('Heart Exterior')}
        scale={[1.2, 1.5, 1]}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#8B4513"
          roughness={0.3}
          metalness={0.1}
          transparent
          opacity={crossSection > 0.1 ? 0.8 : 1}
        />
      </mesh>
      
      {/* Aorta */}
      <mesh position={[0, 1.2, 0]} onClick={() => onClick('Aorta')}>
        <cylinderGeometry args={[0.2, 0.15, 0.8, 16]} />
        <meshStandardMaterial color="#DC143C" />
      </mesh>
    </group>
  );
}

function HeartChambers({ visible, onClick }: { visible: boolean; onClick: (name: string) => void }) {
  if (!visible) return null;

  return (
    <group>
      {/* Left Ventricle */}
      <mesh position={[-0.3, -0.2, 0]} onClick={() => onClick('Left Ventricle')}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#FF6347" transparent opacity={0.7} />
      </mesh>
      
      {/* Right Ventricle */}
      <mesh position={[0.3, -0.2, 0]} onClick={() => onClick('Right Ventricle')}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#FF4500" transparent opacity={0.7} />
      </mesh>
      
      {/* Left Atrium */}
      <mesh position={[-0.2, 0.3, 0]} onClick={() => onClick('Left Atrium')}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#FFA07A" transparent opacity={0.7} />
      </mesh>
      
      {/* Right Atrium */}
      <mesh position={[0.2, 0.3, 0]} onClick={() => onClick('Right Atrium')}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#FF7F50" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function HeartVessels({ visible, onClick }: { visible: boolean; onClick: (name: string) => void }) {
  if (!visible) return null;

  return (
    <group>
      {/* Coronary arteries */}
      <mesh position={[0, 0, 0.8]} onClick={() => onClick('Coronary Arteries')}>
        <torusGeometry args={[0.8, 0.05, 8, 32]} />
        <meshStandardMaterial color="#B22222" />
      </mesh>
      
      {/* Pulmonary artery */}
      <mesh position={[0.3, 0.8, 0]} onClick={() => onClick('Pulmonary Artery')}>
        <cylinderGeometry args={[0.1, 0.1, 0.6, 12]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>
    </group>
  );
}

function HeartScene({ crossSection, visibleLayers, onStructureClick }: HeartModelProps) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <HeartExterior 
        visible={visibleLayers.exterior} 
        crossSection={crossSection}
        onClick={onStructureClick}
      />
      <HeartChambers visible={visibleLayers.chambers} onClick={onStructureClick} />
      <HeartVessels visible={visibleLayers.vessels} onClick={onStructureClick} />
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={10}
      />
    </>
  );
}

export default function HeartModel(props: HeartModelProps) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <HeartScene {...props} />
      </Canvas>
    </div>
  );
}