'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// A procedural blueprint-grid shader: warps toward the cursor and pulses
// an accent glow at the point of contact. Runs only while the hero is
// on-screen (IntersectionObserver) and pauses on prefers-reduced-motion.
const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uTime;

  void main() {
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 st = vUv * aspect;
    vec2 mouse = uMouse * aspect;

    float dist = length(st - mouse);
    float push = smoothstep(0.55, 0.0, dist) * 0.10;
    vec2 dir = (st - mouse) / (dist + 0.0001);
    vec2 warped = st + dir * push;

    float gridSize = 26.0;
    vec2 cell = fract(warped * gridSize) - 0.5;
    float lineW = 0.045;
    float lineX = smoothstep(0.5 - lineW, 0.5, abs(cell.x));
    float lineY = smoothstep(0.5 - lineW, 0.5, abs(cell.y));
    float line = max(lineX, lineY);

    float glow = smoothstep(0.55, 0.0, dist);
    float pulse = 0.85 + 0.15 * sin(uTime * 0.6);
    vec3 inkColor = vec3(0.04, 0.04, 0.04);
    vec3 accentColor = vec3(1.0, 0.24, 0.10);
    vec3 color = mix(inkColor, accentColor, glow * pulse);

    float alpha = line * mix(0.16, 0.85, glow);
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function WebGLGrid() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // No antialias: this is a flat grid, MSAA buys nothing here but costs
    // a full supersampled pass every frame.
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1));
    mount.appendChild(renderer.domElement);

    // Software-rendered WebGL (common on VMs, some sandboxed browsers,
    // older/integrated GPUs with hardware accel disabled) chokes on a
    // 60fps full-viewport shader loop. Detect it and fall back to a
    // single static frame instead of animating.
    const gl = renderer.getContext();
    const dbgInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const rendererStr = dbgInfo ? String(gl.getParameter(dbgInfo.UNMASKED_RENDERER_WEBGL)) : '';
    const isSoftwareRenderer = /swiftshader|llvmpipe|software|microsoft basic render/i.test(rendererStr);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms,
      transparent: true,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const onMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      targetMouse.set(
        (e.clientX - rect.left) / rect.width,
        1 - (e.clientY - rect.top) / rect.height
      );
    };
    window.addEventListener('mousemove', onMove);

    let rafId = 0;
    let running = false;
    const clock = new THREE.Clock();

    const tick = () => {
      if (!running) return;
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uMouse.value.lerp(targetMouse, 0.08);
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      clock.start();
      rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    if (reduceMotion || isSoftwareRenderer) {
      // Render a single static frame, no rAF loop.
      resize();
      renderer.render(scene, camera);
    } else {
      const io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { threshold: 0 }
      );
      io.observe(mount);

      return () => {
        io.disconnect();
        stop();
        window.removeEventListener('mousemove', onMove);
        ro.disconnect();
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        mount.removeChild(renderer.domElement);
      };
    }

    return () => {
      window.removeEventListener('mousemove', onMove);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
