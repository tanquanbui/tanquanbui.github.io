'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// A procedural blueprint-grid shader with a skyline horizon that eternally
// morphs between Melbourne (Eureka Tower, Rialto) and Ho Chi Minh City
// (Landmark 81, Bitexco) — the two cities closest to home. Warps toward
// the cursor and pulses an accent glow at the point of contact. Runs only
// while the hero is on-screen (IntersectionObserver) and pauses on
// prefers-reduced-motion.
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
  uniform float uCityMix;

  // Rough silhouette of a single building: 1.0 inside its footprint, else 0.
  float building(float x, float center, float halfWidth, float height) {
    float inside = step(abs(x - center), halfWidth);
    return inside * height;
  }

  // Melbourne CBD skyline, left to right: low-rise, Rialto twins,
  // Eureka Tower's gold-capped spike, then the riverside cluster.
  float skylineMelbourne(float x) {
    float h = 0.0;
    h = max(h, building(x, 0.09, 0.045, 0.26));
    h = max(h, building(x, 0.18, 0.05, 0.40));
    h = max(h, building(x, 0.27, 0.035, 0.56));
    h = max(h, building(x, 0.335, 0.03, 0.60));
    h = max(h, building(x, 0.44, 0.05, 0.48));
    h = max(h, building(x, 0.555, 0.045, 0.94));
    h = max(h, building(x, 0.655, 0.045, 0.44));
    h = max(h, building(x, 0.745, 0.05, 0.58));
    h = max(h, building(x, 0.85, 0.045, 0.33));
    return h;
  }

  // Ho Chi Minh City skyline: Times Square-ish low-rise, Bitexco's notch,
  // Landmark 81's needle-thin record-height spike, District 1 cluster.
  float skylineHCMC(float x) {
    float h = 0.0;
    h = max(h, building(x, 0.08, 0.04, 0.20));
    h = max(h, building(x, 0.165, 0.045, 0.36));
    h = max(h, building(x, 0.255, 0.05, 0.50));
    h = max(h, building(x, 0.365, 0.045, 0.66));
    h = max(h, building(x, 0.50, 0.03, 0.98));
    h = max(h, building(x, 0.60, 0.045, 0.40));
    h = max(h, building(x, 0.70, 0.05, 0.54));
    h = max(h, building(x, 0.80, 0.04, 0.28));
    h = max(h, building(x, 0.895, 0.045, 0.18));
    return h;
  }

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

    // Cool Melbourne dusk vs. warm Ho Chi Minh City tropical gold, blended
    // by the same slow-breathing mix that morphs the skyline below.
    vec3 melbourneColor = vec3(0.36, 0.47, 0.58);
    vec3 hcmcColor = vec3(0.98, 0.55, 0.16);
    vec3 cityColor = mix(melbourneColor, hcmcColor, uCityMix);

    vec3 inkColor = vec3(0.04, 0.04, 0.04);
    vec3 accentColor = vec3(1.0, 0.24, 0.10);
    vec3 color = mix(inkColor, accentColor, glow * pulse);

    float alpha = line * mix(0.16, 0.85, glow);

    // Skyline horizon: morphs between the two cities, warped by the same
    // cursor push so it feels part of the same fabric as the grid.
    float skylineBand = 0.6;
    float mixedHeight = mix(skylineMelbourne(warped.x / aspect.x), skylineHCMC(warped.x / aspect.x), uCityMix);
    float skylineTop = mixedHeight * skylineBand;
    if (vUv.y < skylineTop) {
      float shade = mix(0.35, 0.85, vUv.y / max(skylineTop, 0.0001));
      float windowNoise = fract(sin(dot(floor(warped * gridSize), vec2(12.9898, 78.233))) * 43758.5453);
      float windows = step(0.82, windowNoise) * step(vUv.y, skylineTop - 0.01);
      vec3 skylineFill = mix(inkColor, cityColor, shade * 0.6);
      skylineFill += windows * cityColor * (0.5 + 0.5 * glow);
      gl_FragColor = vec4(skylineFill, 0.92);
      return;
    }

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
      uCityMix: { value: 0.5 },
    };

    // A slow eternal breath between Melbourne (0) and Ho Chi Minh City (1),
    // ~125s per full cycle. Also flips a [data-city-dominant] attribute
    // (with hysteresis, so it doesn't chatter at the threshold) so DOM
    // text — see GameMenu's location label and app/globals.css — can
    // cross-fade discretely in step, without a React re-render every frame
    // and without two half-opacity strings overlapping mid-blend.
    let dominant: 'melbourne' | 'hcmc' = 'melbourne';
    document.documentElement.dataset.cityDominant = dominant;
    const setCityMix = (mix: number) => {
      uniforms.uCityMix.value = mix;
      const next = mix > 0.52 ? 'hcmc' : mix < 0.48 ? 'melbourne' : dominant;
      if (next !== dominant) {
        dominant = next;
        document.documentElement.dataset.cityDominant = dominant;
      }
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
      const elapsed = clock.getElapsedTime();
      uniforms.uTime.value = elapsed;
      uniforms.uMouse.value.lerp(targetMouse, 0.08);
      setCityMix(0.5 + 0.5 * Math.sin(elapsed * 0.05));
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
      // Render a single static frame, no rAF loop — freeze the blend
      // halfway between the two cities.
      setCityMix(0.5);
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
