'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// A procedural blueprint-grid shader with a thin skyline horizon etched
// into it — morphing between Melbourne (Eureka Tower, Rialto) and Ho Chi
// Minh City (Landmark 81, Bitexco), the two cities closest to home. Drawn
// as a single-weight outline in the same ink/accent palette as the grid
// itself, so it reads as one more line in the blueprint rather than a
// separate illustration pasted on top. Warps toward the cursor and pulses
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
  uniform float uCityMix;

  // Rough silhouette of a single building, antialiased at its edges.
  float building(float x, float center, float halfWidth, float height) {
    float edge = smoothstep(halfWidth, halfWidth - 0.003, abs(x - center));
    return edge * height;
  }

  // Melbourne CBD skyline, left to right: low-rise, Rialto twins,
  // Eureka Tower's spike, then the riverside cluster. Narrow bars with
  // real gaps between them, like a horizon sketch rather than solid mass.
  float skylineMelbourne(float x) {
    float h = 0.0;
    h = max(h, building(x, 0.08, 0.018, 0.20));
    h = max(h, building(x, 0.15, 0.014, 0.32));
    h = max(h, building(x, 0.21, 0.012, 0.44));
    h = max(h, building(x, 0.26, 0.010, 0.48));
    h = max(h, building(x, 0.35, 0.016, 0.36));
    h = max(h, building(x, 0.46, 0.014, 0.90));
    h = max(h, building(x, 0.57, 0.014, 0.40));
    h = max(h, building(x, 0.66, 0.016, 0.52));
    h = max(h, building(x, 0.76, 0.012, 0.28));
    h = max(h, building(x, 0.87, 0.014, 0.18));
    return h;
  }

  // Ho Chi Minh City skyline: low-rise, Bitexco's mass, Landmark 81's
  // needle-thin record-height spike, District 1 cluster.
  float skylineHCMC(float x) {
    float h = 0.0;
    h = max(h, building(x, 0.07, 0.016, 0.16));
    h = max(h, building(x, 0.14, 0.014, 0.30));
    h = max(h, building(x, 0.22, 0.016, 0.42));
    h = max(h, building(x, 0.31, 0.014, 0.58));
    h = max(h, building(x, 0.44, 0.008, 0.94));
    h = max(h, building(x, 0.53, 0.014, 0.34));
    h = max(h, building(x, 0.62, 0.016, 0.48));
    h = max(h, building(x, 0.72, 0.012, 0.24));
    h = max(h, building(x, 0.80, 0.010, 0.36));
    h = max(h, building(x, 0.89, 0.014, 0.16));
    return h;
  }

  void main() {
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 st = vUv * aspect;
    vec2 mouse = uMouse * aspect;

    float dist = length(st - mouse);
    // Inverse-square falloff, like real gravity, instead of a flat radial
    // gradient — the pull is sharp and strong right at the cursor and
    // drops off fast, rather than a gentle even dome.
    float push = clamp(0.014 / (dist * dist + 0.012), 0.0, 0.22);
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

    // Skyline: a low, thin horizon line — same ink/accent palette as the
    // grid — that morphs its silhouette between the two cities. Kept
    // short so it never competes with the wordmark or menu above it.
    float skylineBand = 0.16;
    float mixedHeight = mix(skylineMelbourne(warped.x / aspect.x), skylineHCMC(warped.x / aspect.x), uCityMix);
    float hasBuilding = step(0.001, mixedHeight);
    float skylineTop = mixedHeight * skylineBand;

    float outline = hasBuilding * smoothstep(0.007, 0.0, abs(vUv.y - skylineTop));
    float ground = hasBuilding * step(vUv.y, skylineTop) * mix(0.10, 0.02, vUv.y / max(skylineTop, 0.0001));

    vec3 finalColor = mix(color, mix(inkColor, accentColor, glow), outline);
    float finalAlpha = max(alpha, max(outline * 0.8, ground));

    gl_FragColor = vec4(finalColor, finalAlpha);
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

    // The warp point chases the cursor as a damped spring rather than a
    // flat lerp, so it has real momentum — it overshoots and wobbles
    // before settling, like something with mass caught in the gravity
    // well instead of teleporting straight to the pointer.
    const mouseVelocity = new THREE.Vector2(0, 0);
    const springStiffness = 90;
    const springDamping = 9;
    let lastElapsed = 0;

    let rafId = 0;
    let running = false;
    const clock = new THREE.Clock();

    const tick = () => {
      if (!running) return;
      const elapsed = clock.getElapsedTime();
      const dt = Math.min(elapsed - lastElapsed, 1 / 30);
      lastElapsed = elapsed;
      uniforms.uTime.value = elapsed;

      const mouse = uniforms.uMouse.value;
      const toTarget = targetMouse.clone().sub(mouse);
      const accel = toTarget.multiplyScalar(springStiffness).sub(mouseVelocity.clone().multiplyScalar(springDamping));
      mouseVelocity.addScaledVector(accel, dt);
      mouse.addScaledVector(mouseVelocity, dt);

      setCityMix(0.5 + 0.5 * Math.sin(elapsed * 0.05));
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      clock.start();
      lastElapsed = 0;
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
