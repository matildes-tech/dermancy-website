'use client';

import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Html } from '@react-three/drei';
import { treatmentZones } from '@/lib/treatmentZones';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

export function BodyViewer() {
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const router = useRouter();
  const locale = useLocale();
  const prefix = `/${locale}`;

  return (
    <div className="aspect-[3/4] rounded-section border border-border overflow-hidden bg-gradient-to-b from-surface to-background relative">
      <Canvas camera={{ position: [0, 1, 3], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <Suspense fallback={null}>
          {/* Placeholder body silhouette using simple shapes */}
          <group position={[0, -0.5, 0]}>
            {/* Head */}
            <mesh position={[0, 1.7, 0]}>
              <sphereGeometry args={[0.2, 32, 32]} />
              <meshStandardMaterial color="#d4c4b0" transparent opacity={0.6} />
            </mesh>
            {/* Neck */}
            <mesh position={[0, 1.4, 0]}>
              <cylinderGeometry args={[0.08, 0.1, 0.2, 16]} />
              <meshStandardMaterial color="#d4c4b0" transparent opacity={0.6} />
            </mesh>
            {/* Torso */}
            <mesh position={[0, 0.9, 0]}>
              <cylinderGeometry args={[0.25, 0.2, 0.8, 16]} />
              <meshStandardMaterial color="#d4c4b0" transparent opacity={0.6} />
            </mesh>
            {/* Lower body */}
            <mesh position={[0, 0.3, 0]}>
              <cylinderGeometry args={[0.22, 0.25, 0.5, 16]} />
              <meshStandardMaterial color="#d4c4b0" transparent opacity={0.6} />
            </mesh>

            {/* Treatment Zone Markers */}
            {treatmentZones.map((zone) => (
              <group
                key={zone.id}
                position={zone.position}
                onPointerOver={() => setHoveredZone(zone.id)}
                onPointerOut={() => setHoveredZone(null)}
                onClick={() => router.push(`${prefix}/treatments/${zone.treatmentSlug}`)}
              >
                <mesh>
                  <sphereGeometry args={[0.06, 16, 16]} />
                  <meshStandardMaterial
                    color={zone.highlightColor}
                    transparent
                    opacity={hoveredZone === zone.id ? 0.9 : 0.5}
                    emissive={zone.highlightColor}
                    emissiveIntensity={hoveredZone === zone.id ? 0.5 : 0.1}
                  />
                </mesh>
                {/* Pulsing ring */}
                <mesh>
                  <ringGeometry args={[0.07, 0.09, 32]} />
                  <meshBasicMaterial
                    color={zone.highlightColor}
                    transparent
                    opacity={0.3}
                    side={2}
                  />
                </mesh>
                {/* Label on hover */}
                {hoveredZone === zone.id && (
                  <Html center distanceFactor={3}>
                    <div className="bg-surface/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap pointer-events-none">
                      <p className="text-xs font-medium text-foreground">{zone.label}</p>
                      <p className="text-[10px] text-primary">Click to explore</p>
                    </div>
                  </Html>
                )}
              </group>
            ))}
          </group>

          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.3}
            scale={3}
            blur={2}
          />
          <Environment preset="studio" />
        </Suspense>
        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={5}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>

      {/* Legend */}
      <div className="absolute bottom-4 start-4 end-4 bg-surface/80 backdrop-blur-sm border border-border rounded-lg p-3">
        <div className="flex flex-wrap gap-2 justify-center">
          {treatmentZones.map((zone) => (
            <div
              key={zone.id}
              className="flex items-center gap-1.5 text-xs text-muted-foreground"
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: zone.highlightColor }}
              />
              <span>{zone.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
