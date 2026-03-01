"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, shaderMaterial } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useRef, useMemo, useState } from "react";
import { motion } from "framer-motion";

/* ================= GPU PARTICLE SHADER ================= */

const ParticleMaterial = shaderMaterial(
  { time: 0, blackhole: 0 },
  `
  uniform float time;
  uniform float blackhole;
  attribute float scale;
  varying float vScale;

  void main() {
    vScale = scale;
    vec3 pos = position;

    float dist = length(pos);

    // floating movement
    pos.x += sin(time + pos.y) * 0.2;
    pos.y += cos(time + pos.x) * 0.2;

    // blackhole pull
    if (blackhole > 0.5) {
      pos -= normalize(pos) * 0.5;
    }

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
    gl_PointSize = scale * 4.0;
  }
  `,
  `
  varying float vScale;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    gl_FragColor = vec4(0.6,0.3,1.0,1.0 - d*2.0);
  }
  `
);

function ParticleUniverse({ blackhole }) {
  const ref = useRef();
  const count = 100000;

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      scales[i] = Math.random();
    }

    return { positions, scales };
  }, []);

  useFrame((state) => {
    ref.current.material.time = state.clock.elapsedTime;
    ref.current.material.blackhole = blackhole ? 1 : 0;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={particles.positions}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          array={particles.scales}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <particleMaterial transparent depthWrite={false} />
    </points>
  );
}

/* ================= BLACKHOLE RING ================= */

function Blackhole({ active }) {
  const mesh = useRef();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.z += 0.01;
      mesh.current.scale.x = mesh.current.scale.y = active ? 2 : 1;
    }
  });

  return (
    <mesh ref={mesh}>
      <ringGeometry args={[1.5, 2, 64]} />
      <meshBasicMaterial color="#8b5cf6" transparent opacity={0.6} />
    </mesh>
  );
}

/* ================= MAIN ================= */

export default function GodModeLogin() {
  const [blackhole, setBlackhole] = useState(false);

  const trigger = () => {
    setBlackhole(true);
    setTimeout(() => setBlackhole(false), 4000);
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden">

      <Canvas camera={{ position: [0, 0, 15] }}>
        <ParticleUniverse blackhole={blackhole} />
        <Blackhole active={blackhole} />

        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
      </Canvas>

      {/* GLASS UI */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[420px] p-10 rounded-3xl 
                        bg-white/5 backdrop-blur-3xl 
                        border border-white/10 
                        shadow-[0_0_150px_rgba(139,92,246,0.5)]">

          <h2 className="text-3xl text-white mb-8 font-light tracking-wide">
            Singularity Access
          </h2>

          <input
            placeholder="Email"
            className="w-full mb-5 px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white"
          />

          <input
            placeholder="Password"
            type="password"
            className="w-full mb-8 px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white"
          />

          <motion.button
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            onClick={trigger}
            className="w-full py-3 rounded-xl 
                       bg-gradient-to-r from-purple-600 to-indigo-600 
                       text-white font-medium"
          >
            Collapse Into Singularity
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}