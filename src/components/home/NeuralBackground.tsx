'use client';

import { useEffect, useRef, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulsePhase: number;
  pulseSpeed: number;
  hue: number;
  // Each node has its own orbit parameters for organic movement
  orbitRadius: number;
  orbitSpeed: number;
  orbitPhase: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.parentElement?.clientWidth || window.innerWidth;
    const h = canvas.parentElement?.clientHeight || window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    const isDark = document.documentElement.classList.contains('dark');

    // Create nodes with individual orbit behaviors
    const nodeCount = Math.max(50, Math.floor((w * h) / 22000));
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const baseRadius = 1.5 + Math.random() * 2;
      // Each node orbits around its own center point spread across the canvas
      const orbitCX = Math.random() * w;
      const orbitCY = Math.random() * h;

      nodes.push({
        x: orbitCX + (Math.random() - 0.5) * 100,
        y: orbitCY + (Math.random() - 0.5) * 100,
        vx: 0,
        vy: 0,
        radius: baseRadius,
        baseRadius,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.025,
        hue: 220 + Math.random() * 80, // blue → purple → pink
        orbitRadius: 30 + Math.random() * 80,
        orbitSpeed: 0.002 + Math.random() * 0.006,
        orbitPhase: Math.random() * Math.PI * 2,
      });
    }

    // Particles — more of them, more visible
    const particles: Particle[] = [];
    const maxParticles = 40;

    function spawnParticle() {
      if (particles.length >= maxParticles) return;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.05 + Math.random() * 0.15;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 400 + Math.random() * 800,
        size: 0.8 + Math.random() * 2,
        hue: 220 + Math.random() * 80,
      });
    }

    const connectionDist = Math.min(w, h) * 0.18;
    let time = 0;

    function draw() {
      if (!ctx) return;
      time += 1;
      const dark = document.documentElement.classList.contains('dark');

      ctx.clearRect(0, 0, w, h);

      // Background glow orbs — slow, subtle drift
      // In light mode: very dim, only visible as soft color hints
      // In dark mode: more visible purple/blue glows
      const orbAlpha = dark ? 1 : 0.3;
      const drawOrb = (ox: number, oy: number, r: number, hue: number, alpha: number) => {
        const driftX = Math.sin(time * 0.002 + ox * 0.0005) * 40;
        const driftY = Math.cos(time * 0.003 + oy * 0.0005) * 30;
        const gradient = ctx!.createRadialGradient(
          ox + driftX, oy + driftY, 0,
          ox + driftX, oy + driftY, r
        );
        gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, ${alpha * orbAlpha})`);
        gradient.addColorStop(0.5, `hsla(${hue}, 60%, 50%, ${alpha * 0.3 * orbAlpha})`);
        gradient.addColorStop(1, `hsla(${hue}, 50%, 40%, 0)`);
        ctx!.fillStyle = gradient;
        ctx!.fillRect(ox + driftX - r, oy + driftY - r, r * 2, r * 2);
      };

      drawOrb(w * 0.2, h * 0.3, w * 0.5, 250, dark ? 0.18 : 0.06);
      drawOrb(w * 0.8, h * 0.6, w * 0.45, 220, dark ? 0.14 : 0.05);
      drawOrb(w * 0.5, h * 0.8, w * 0.35, 280, dark ? 0.1 : 0.03);

      // Mouse-reactive subtle glow
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      if (mouseActive) {
        const spotR = Math.min(w, h) * 0.35;
        const spot = ctx.createRadialGradient(mx, my, 0, mx, my, spotR);
        spot.addColorStop(0, `hsla(250, 70%, 65%, ${dark ? 0.06 : 0.03})`);
        spot.addColorStop(0.5, `hsla(240, 60%, 55%, ${dark ? 0.03 : 0.015})`);
        spot.addColorStop(1, `hsla(230, 50%, 50%, 0)`);
        ctx.fillStyle = spot;
        ctx.fillRect(mx - spotR, my - spotR, spotR * 2, spotR * 2);
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = 1 - dist / connectionDist;
            const wave = Math.sin(time * 0.008 + dist * 0.003) * 0.5 + 0.5;
            const lineAlpha = alpha * (dark ? 0.2 : 0.1) * (wave * 0.3 + 0.7);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);

            const midX = (a.x + b.x) / 2 + Math.sin(time * 0.005 + i) * 6;
            const midY = (a.y + b.y) / 2 + Math.cos(time * 0.005 + j) * 6;
            ctx.quadraticCurveTo(midX, midY, b.x, b.y);

            const avgHue = (a.hue + b.hue) / 2;
            ctx.strokeStyle = `hsla(${avgHue}, 55%, ${dark ? 65 : 50}%, ${lineAlpha})`;
            ctx.lineWidth = dark ? 0.6 : 0.4;
            ctx.stroke();

            // Traveling pulse
            if (wave > 0.9) {
              const t = (wave - 0.9) / 0.1;
              const px = a.x + (b.x - a.x) * t;
              const py = a.y + (b.y - a.y) * t;
              ctx.beginPath();
              ctx.arc(px, py, 1.2, 0, Math.PI * 2);
              ctx.fillStyle = `hsla(${avgHue}, 65%, ${dark ? 75 : 60}%, ${alpha * 0.5})`;
              ctx.fill();
            }
          }
        }
      }

      // Update and draw nodes
      for (const node of nodes) {
        node.pulsePhase += node.pulseSpeed;
        node.radius = node.baseRadius + Math.sin(node.pulsePhase) * 0.8;

        // Each node orbits around a center point that itself drifts slowly
        const nodeOrbitCX = (w * 0.5) + Math.sin(time * 0.001 + node.orbitPhase) * w * 0.25;
        const nodeOrbitCY = (h * 0.5) + Math.cos(time * 0.0012 + node.orbitPhase) * h * 0.25;

        // Orbital motion — keeps nodes moving in a flowing pattern
        node.orbitPhase += node.orbitSpeed;
        const targetX = nodeOrbitCX + Math.cos(node.orbitPhase) * node.orbitRadius;
        const targetY = nodeOrbitCY + Math.sin(node.orbitPhase * 0.7 + node.orbitPhase) * node.orbitRadius;

        // Gentle pull toward orbit position
        node.vx += (targetX - node.x) * 0.003;
        node.vy += (targetY - node.y) * 0.003;

        // Mouse interaction — gentle nudge (not strong repulsion)
        if (mouseActive) {
          const mdx = node.x - mx;
          const mdy = node.y - my;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 200 && mDist > 0) {
            // Soft nudge — nodes gently move away but orbit pulls them back
            const force = (200 - mDist) / 200 * 0.15;
            node.vx += (mdx / mDist) * force;
            node.vy += (mdy / mDist) * force;
          }
        }

        // Strong damping so nodes don't fly away
        node.vx *= 0.96;
        node.vy *= 0.96;

        node.x += node.vx;
        node.y += node.vy;

        // Very soft edge push
        const margin = 20;
        if (node.x < margin) node.vx += 0.08;
        if (node.x > w - margin) node.vx -= 0.08;
        if (node.y < margin) node.vy += 0.08;
        if (node.y > h - margin) node.vy -= 0.08;

        // Draw node glow — in light mode, keep it subtle
        const glowR = node.radius * (dark ? 8 : 5);
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
        glow.addColorStop(0, `hsla(${node.hue}, 65%, ${dark ? 70 : 60}%, ${dark ? 0.25 : 0.08})`);
        glow.addColorStop(0.5, `hsla(${node.hue}, 55%, ${dark ? 60 : 50}%, ${dark ? 0.08 : 0.03})`);
        glow.addColorStop(1, `hsla(${node.hue}, 45%, 50%, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Draw node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${node.hue}, 60%, ${dark ? 75 : 50}%, ${dark ? 0.8 : 0.35})`;
        ctx.fill();
      }

      // Spawn particles regularly
      if (time % 15 === 0) spawnParticle();

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        const lifeRatio = p.life / p.maxLife;
        const fadeIn = Math.min(lifeRatio * 4, 1);
        const fadeOut = Math.max(1 - (lifeRatio - 0.65) / 0.35, 0);
        const alpha = fadeIn * Math.min(1, fadeOut) * (dark ? 0.45 : 0.18);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 60%, ${dark ? 72 : 55}%, ${alpha})`;
        ctx.fill();
      }

      // Vignette only in dark mode
      if (dark) {
        const vigGrad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.65);
        vigGrad.addColorStop(0, 'rgba(0,0,0,0)');
        vigGrad.addColorStop(1, 'rgba(0,0,0,0.3)');
        ctx.fillStyle = vigGrad;
        ctx.fillRect(0, 0, w, h);
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, active: false };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const cleanup = initCanvas();

    const handleResize = () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      cleanup?.();
      initCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
      cleanup?.();
    };
  }, [initCanvas]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
