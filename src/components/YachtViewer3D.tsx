import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Text, Box, Sphere } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RotateCcw, Move3D, ZoomIn, Palette } from "lucide-react";
import * as THREE from "three";

interface YachtViewerProps {
  configuration: {
    hullColor: string;
    deckMaterial: string;
    interiorStyle: string;
    modules: string[];
  };
  onConfigChange: (config: any) => void;
}

// Yacht Hull Component
const YachtHull = ({ color }: { color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -1, 0]} scale={[4, 1, 8]}>
      <boxGeometry args={[1, 0.5, 1]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
    </mesh>
  );
};

// Yacht Deck Component
const YachtDeck = ({ material }: { material: string }) => {
  const deckColor = material === "teak" ? "#8B4513" : material === "composite" ? "#F5F5DC" : "#DCDCDC";
  
  return (
    <mesh position={[0, -0.4, 0]} scale={[3.8, 0.1, 7.8]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={deckColor} roughness={0.6} />
    </mesh>
  );
};

// Yacht Superstructure
const YachtSuperstructure = () => {
  return (
    <group>
      {/* Main Cabin */}
      <mesh position={[0, 0.5, -1]} scale={[3, 1.5, 3]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.3} />
      </mesh>
      
      {/* Bridge */}
      <mesh position={[0, 1.8, -1]} scale={[2, 0.8, 1.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.3} />
      </mesh>
      
      {/* Windows */}
      {[-1, 0, 1].map((x, i) => (
        <mesh key={i} position={[x, 0.5, 0.6]} scale={[0.8, 0.6, 0.1]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
};

// Interior Modules
const InteriorModule = ({ position, type }: { position: [number, number, number]; type: string }) => {
  const moduleColor = type === "cabin" ? "#8B4513" : type === "salon" ? "#F5DEB3" : "#FFE4B5";
  
  return (
    <mesh position={position} scale={[1, 0.8, 1]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={moduleColor} />
      <Text
        position={[0, 0.6, 0]}
        fontSize={0.2}
        color="#000"
        anchorX="center"
        anchorY="middle"
      >
        {type.toUpperCase()}
      </Text>
    </mesh>
  );
};

// Main Yacht Model
const YachtModel = ({ configuration }: { configuration: YachtViewerProps["configuration"] }) => {
  return (
    <group>
      <YachtHull color={configuration.hullColor} />
      <YachtDeck material={configuration.deckMaterial} />
      <YachtSuperstructure />
      
      {/* Interior Modules */}
      {configuration.modules.map((module, index) => (
        <InteriorModule
          key={index}
          position={[
            (index % 3 - 1) * 1.5,
            0,
            Math.floor(index / 3) * 1.5 - 2
          ]}
          type={module}
        />
      ))}
    </group>
  );
};

// Scene Component
const Scene = ({ configuration }: { configuration: YachtViewerProps["configuration"] }) => {
  return (
    <>
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={20}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2}
      />
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      <YachtModel configuration={configuration} />
      
      <ContactShadows
        rotation-x={Math.PI / 2}
        position={[0, -2, 0]}
        opacity={0.4}
        width={20}
        height={20}
        blur={2}
        far={4}
      />
      
      <Environment preset="sunset" />
      
      {/* Ocean Surface */}
      <mesh position={[0, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[50, 50, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="#006994" transparent opacity={0.8} />
      </mesh>
    </>
  );
};

// Loading Component
const LoadingScreen = () => (
  <div className="flex items-center justify-center h-full bg-gradient-to-b from-ocean-light to-ocean-medium">
    <div className="text-center text-pearl">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pearl mx-auto mb-4"></div>
      <p className="text-lg">Caricamento modello 3D...</p>
    </div>
  </div>
);

// Main Component
const YachtViewer3D = ({ configuration, onConfigChange }: YachtViewerProps) => {
  const [viewMode, setViewMode] = useState<"exterior" | "interior">("exterior");

  const resetCamera = () => {
    // This would reset the OrbitControls camera position
    window.location.reload();
  };

  return (
    <div className="w-full h-full relative">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [8, 5, 8], fov: 60 }}
        shadows
        className="bg-gradient-to-b from-ocean-light to-ocean-medium"
      >
        <Suspense fallback={null}>
          <Scene configuration={configuration} />
        </Suspense>
      </Canvas>

      {/* Loading Overlay */}
      <Suspense fallback={<LoadingScreen />}>
        <div />
      </Suspense>

      {/* Control Panel */}
      <Card className="absolute top-4 left-4 p-4 bg-background/90 backdrop-blur">
        <div className="flex flex-col space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetCamera}
            className="flex items-center space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset Vista</span>
          </Button>
          
          <Button
            variant={viewMode === "exterior" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("exterior")}
            className="flex items-center space-x-2"
          >
            <Move3D className="h-4 w-4" />
            <span>Esterno</span>
          </Button>
          
          <Button
            variant={viewMode === "interior" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("interior")}
            className="flex items-center space-x-2"
          >
            <ZoomIn className="h-4 w-4" />
            <span>Interno</span>
          </Button>
        </div>
      </Card>

      {/* Info Panel */}
      <Card className="absolute bottom-4 left-4 p-4 bg-background/90 backdrop-blur">
        <div className="text-sm">
          <h3 className="font-semibold mb-2">Configurazione Attuale:</h3>
          <p><strong>Scafo:</strong> {configuration.hullColor}</p>
          <p><strong>Ponte:</strong> {configuration.deckMaterial}</p>
          <p><strong>Stile:</strong> {configuration.interiorStyle}</p>
          <p><strong>Moduli:</strong> {configuration.modules.length}</p>
        </div>
      </Card>

      {/* VR Button */}
      <Button
        className="absolute top-4 right-4 bg-luxury hover:bg-champagne text-foreground"
        onClick={() => {
          // Will implement WebXR integration
          console.log("Avvio modalità VR...");
        }}
      >
        <Palette className="h-4 w-4 mr-2" />
        Modalità VR
      </Button>
    </div>
  );
};

export default YachtViewer3D;