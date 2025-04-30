"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface BackgroundShaderProps {
  seed: number
  colorScheme: {
    background: string
    text: string
    accent: string
  }
}

export function BackgroundShader({ seed, colorScheme }: BackgroundShaderProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  // Convert hex colors to THREE.Color
  const bgColor = useMemo(() => new THREE.Color(colorScheme.background), [colorScheme.background])
  const accentColor = useMemo(() => new THREE.Color(colorScheme.accent), [colorScheme.accent])

  // Create shader material with dynamic colors
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSeed: { value: seed },
        uColorA: { value: bgColor },
        uColorB: { value: accentColor },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
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
        uniform float uSeed;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform vec2 uResolution;
        varying vec2 vUv;
        
        // Simplex noise function
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
        
        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                             -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v -   i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                                dot(x12.zw, x12.zw)), 0.0);
          m = m*m;
          m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x = a0.x * x0.x + h.x * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }
        
        void main() {
          vec2 uv = vUv;
          float aspect = uResolution.x / uResolution.y;
          uv.x *= aspect;
          
          // Create slow-moving noise based on time and seed
          float n1 = snoise(uv * 0.5 + uTime * 0.05 + uSeed) * 0.5 + 0.5;
          float n2 = snoise(uv * 0.7 - uTime * 0.03 + uSeed * 2.0) * 0.5 + 0.5;
          
          // Create gradient based on noise
          float gradient = mix(n1, n2, 0.5);
          
          // Mix colors based on gradient
          vec3 color = mix(uColorA, uColorB, gradient * 0.3);
          
          // Add subtle vignette
          float vignette = smoothstep(0.5, 0.0, length(vUv - 0.5) - 0.2);
          color = mix(color * 0.8, color, vignette);
          
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    })
  }, [seed, bgColor, accentColor])

  // Update time uniform
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -1]}>
      <planeGeometry args={[10, 10]} /> {/* Increased size to ensure full coverage */}
      <primitive object={shaderMaterial} attach="material" />
    </mesh>
  )
}
