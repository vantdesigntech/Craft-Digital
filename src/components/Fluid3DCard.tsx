import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ArrowUpRight, Sparkles, RefreshCw, Eye } from 'lucide-react';

interface Fluid3DCardProps {
  onCornerClick?: () => void;
  className?: string;
}

export const Fluid3DCard: React.FC<Fluid3DCardProps> = ({ onCornerClick, className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const [isWireframe, setIsWireframe] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [paletteIndex, setPaletteIndex] = useState(0);

  // Palettes (Index 0 is the requested: Pastel Pink #f8b9d4, Soft Lilac #a29bfe, Baby Blue #81ecec)
  const palettes = [
    {
      name: 'Pastel Fluid',
      pink: new THREE.Color('#f8b9d4'),
      lilac: new THREE.Color('#a29bfe'),
      blue: new THREE.Color('#81ecec')
    },
    {
      name: 'Electric Acid',
      pink: new THREE.Color('#d8ff06'),
      lilac: new THREE.Color('#81ecec'),
      blue: new THREE.Color('#a29bfe')
    },
    {
      name: 'Liquid Chrome',
      pink: new THREE.Color('#ffffff'),
      lilac: new THREE.Color('#b0b7c6'),
      blue: new THREE.Color('#64748b')
    }
  ];

  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;

    // Detect software rendering guard
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene & Camera setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 1000;
    const height = container.clientHeight || 560;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.0); // Perfect comfortable framing with generous padding

    // WebGLRenderer with alpha: true for transparent canvas revealing the CSS gradient behind
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // Geometry: highly subdivided icosahedron geometry for fluid ripples
    const geometry = new THREE.IcosahedronGeometry(1.5, 64);

    // GLSL Shaders: 3D Simplex noise displacement + Fresnel iridescence
    const vertexShader = `
      uniform float u_time;
      uniform float u_frequency;
      uniform float u_amplitude;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec2 vUv;
      varying float vDisplacement;

      // 3D Simplex Noise by Ian McEwan, Stefan Gustavson (Ashima Arts)
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

      float snoise(vec3 v){
        const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
        const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

        vec3 i  = floor(v + dot(v, C.yyy) );
        vec3 x0 = v - i + dot(i, C.xxx) ;

        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min( g.xyz, l.zxy );
        vec3 i2 = max( g.xyz, l.zxy );

        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

        i = mod(i, 289.0 );
        vec4 p = permute( permute( permute(
                   i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                 + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                 + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

        float n_ = 0.142857142857;
        vec3  ns = n_ * D.wyz - D.xzx;

        vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_ );

        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);

        vec4 b0 = vec4( x.xy, y.xy );
        vec4 b1 = vec4( x.zw, y.zw );

        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));

        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

        vec3 p0 = vec3(a0.xy,h.x);
        vec3 p1 = vec3(a0.zw,h.y);
        vec3 p2 = vec3(a1.xy,h.z);
        vec3 p3 = vec3(a1.zw,h.w);

        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;

        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                      dot(p2,x2), dot(p3,x3) ) );
      }

      float getDisplacement(vec3 p) {
        float n1 = snoise(p * u_frequency + vec3(u_time * 0.28));
        float n2 = snoise(p * (u_frequency * 2.2) - vec3(u_time * 0.38)) * 0.42;
        float n3 = snoise(p * (u_frequency * 4.4) + vec3(u_time * 0.6)) * 0.16;
        return (n1 + n2 + n3) * u_amplitude;
      }

      void main() {
        vUv = uv;
        vec3 pos = position;
        float disp = getDisplacement(pos);
        vDisplacement = disp;

        // Displace vertex along original normal
        vec3 displaced = pos + normal * disp;

        // Analytical normal reconstruction via orthogonal sampling
        float eps = 0.015;
        vec3 tangent = normalize(cross(normal, vec3(0.0, 1.0, 0.0)));
        if (length(tangent) < 0.01) {
          tangent = normalize(cross(normal, vec3(1.0, 0.0, 0.0)));
        }
        vec3 bitangent = normalize(cross(normal, tangent));

        vec3 pA = pos + tangent * eps;
        vec3 pB = pos + bitangent * eps;
        pA += normal * getDisplacement(pA);
        pB += normal * getDisplacement(pB);

        vec3 newNormal = normalize(cross(pA - displaced, pB - displaced));
        vNormal = normalize(normalMatrix * newNormal);

        vWorldPosition = (modelMatrix * vec4(displaced, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float u_time;
      uniform vec3 u_colorPink;
      uniform vec3 u_colorLilac;
      uniform vec3 u_colorBlue;
      varying vec3 vNormal;
      varying vec3 vWorldPosition;
      varying vec2 vUv;
      varying float vDisplacement;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(cameraPosition - vWorldPosition);

        // Holographic Fresnel edge reflection
        float fresnel = pow(1.0 - max(0.0, dot(viewDir, normal)), 2.8);

        // Organic color gradient across fluid ripples
        float blendFactor = clamp((vDisplacement * 1.8 + normal.y * 0.4 + 0.5), 0.0, 1.0);
        vec3 base = mix(u_colorPink, u_colorLilac, blendFactor);

        // Add soft baby blue on light crests & glancing curvature
        float blueCrest = smoothstep(0.2, 0.85, normal.x * 0.5 + 0.5 + vDisplacement * 0.6);
        vec3 bodyColor = mix(base, u_colorBlue, blueCrest * 0.7);

        // Iridescent reflection highlight
        vec3 iridHue = mix(u_colorLilac, u_colorBlue, sin(fresnel * 6.28 + u_time * 0.6) * 0.5 + 0.5);
        vec3 finalColor = mix(bodyColor, iridHue, fresnel * 0.85);

        // Key Light specular highlight (smooth plastic / liquid chrome finish)
        vec3 lightDir = normalize(vec3(1.2, 2.2, 2.5));
        vec3 halfVec = normalize(lightDir + viewDir);
        float spec = pow(max(0.0, dot(normal, halfVec)), 46.0) * 0.7;

        // Soft secondary rim specular
        vec3 rimDir = normalize(vec3(-1.4, -0.6, -1.0));
        vec3 rimHalf = normalize(rimDir + viewDir);
        float rimSpec = pow(max(0.0, dot(normal, rimHalf)), 26.0) * 0.35;

        finalColor += vec3(spec) + vec3(rimSpec) * u_colorBlue;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_frequency: { value: 0.85 },
        u_amplitude: { value: 0.38 },
        u_colorPink: { value: palettes[paletteIndex].pink },
        u_colorLilac: { value: palettes[paletteIndex].lilac },
        u_colorBlue: { value: palettes[paletteIndex].blue }
      },
      wireframe: isWireframe,
      transparent: false,
      depthTest: true,
      depthWrite: true
    });

    materialRef.current = material;

    // Group to hold the mesh so we can rotate both organically and via GSAP parallax
    const meshGroup = new THREE.Group();
    const mesh = new THREE.Mesh(geometry, material);
    meshGroup.add(mesh);
    scene.add(meshGroup);

    // GSAP parallax mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      gsap.to(targetRotation.current, {
        x: y * 0.45,
        y: x * 0.65,
        duration: 1.2,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(targetRotation.current, {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: 'power2.out'
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (!container || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      if (newW === 0 || newH === 0) return;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    });
    resizeObserver.observe(container);

    // Animation loop: slow organic auto-rotation + breathing time
    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime() * speedMultiplier;
      material.uniforms.u_time.value = elapsedTime;

      // Slow organic rotation
      mesh.rotation.y += 0.0035 * speedMultiplier;
      mesh.rotation.x += 0.0018 * speedMultiplier;

      // Smooth interpolation with GSAP target
      meshGroup.rotation.x = THREE.MathUtils.lerp(meshGroup.rotation.x, targetRotation.current.x, 0.06);
      meshGroup.rotation.y = THREE.MathUtils.lerp(meshGroup.rotation.y, targetRotation.current.y, 0.06);

      renderer?.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer?.dispose();
    };
  }, [speedMultiplier, paletteIndex]);

  // Handle wireframe toggle dynamically
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.wireframe = isWireframe;
      materialRef.current.needsUpdate = true;
    }
  }, [isWireframe]);

  return (
    <div
      ref={containerRef}
      style={{
        background: 'linear-gradient(135deg, #fbcfe8 0%, #c7d2fe 50%, #bae6fd 100%)',
        borderRadius: '24px',
        maxWidth: '1100px',
        width: '100%',
        minHeight: '400px',
        overflow: 'hidden'
      }}
      className={`relative aspect-[16/9] sm:aspect-[21/9] max-h-[580px] shadow-2xl border-2 border-black/10 group cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      {/* Three.js Transparent Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none"
        style={{ background: 'transparent' }}
      />

      {/* Top Left Spec Badge */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-white text-[11px] font-mono pointer-events-none">
        <Sparkles size={12} className="text-[#d8ff06]" />
        <span>3D SIMPLEX SHADER // GSAP PARALLAX</span>
      </div>

      {/* Top Right Corner Arrow Button (overlaps top right corner, matching Section 1 spec) */}
      <button
        type="button"
        onClick={onCornerClick}
        className="absolute top-4 sm:top-7 right-4 sm:right-7 w-14 sm:w-18 h-14 sm:h-18 rounded-full bg-black text-[#d8ff06] flex items-center justify-center text-xl sm:text-2xl font-black shadow-2xl hover:bg-neutral-900 hover:rotate-45 hover:scale-110 transition-all border border-black cursor-pointer z-10"
        aria-label="Inspect 3D Fluid Sculpture Case Study"
        title="Inspect Case Study"
      >
        <ArrowUpRight size={28} />
      </button>

      {/* Bottom Compact Glassmorphic Control Dock (Ergonomic, unobtrusive) */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 text-white text-xs font-mono shadow-2xl z-10">
        
        {/* Speed toggle */}
        <button
          onClick={() => setSpeedMultiplier((prev) => (prev === 1.0 ? 1.8 : prev === 1.8 ? 0.4 : 1.0))}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          title="Adjust animation speed"
        >
          <RefreshCw size={12} className={speedMultiplier > 1.0 ? 'text-[#d8ff06]' : 'text-white/70'} />
          <span>{speedMultiplier === 1.0 ? '1x Speed' : speedMultiplier === 1.8 ? '1.8x Fast' : '0.4x Slow'}</span>
        </button>

        {/* Wireframe toggle */}
        <button
          onClick={() => setIsWireframe((prev) => !prev)}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors ${
            isWireframe ? 'bg-[#d8ff06] text-black font-bold' : 'bg-white/10 text-white hover:bg-white/20'
          }`}
          title="Toggle mesh wireframe"
        >
          <Eye size={12} />
          <span>{isWireframe ? 'Wireframe ON' : 'Solid'}</span>
        </button>

        {/* Palette switch */}
        <button
          onClick={() => setPaletteIndex((prev) => (prev + 1) % palettes.length)}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          title="Cycle iridescent color palette"
        >
          <div className="flex gap-1 items-center">
            <span className="w-2 h-2 rounded-full" style={{ background: '#f8b9d4' }} />
            <span className="w-2 h-2 rounded-full" style={{ background: '#a29bfe' }} />
            <span className="w-2 h-2 rounded-full" style={{ background: '#81ecec' }} />
          </div>
          <span>{palettes[paletteIndex].name}</span>
        </button>

      </div>

    </div>
  );
};
