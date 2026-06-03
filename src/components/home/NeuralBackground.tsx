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

    const nodeCount = Math.max(55, Math.floor((w * h) / 20000));
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const baseRadius = 1.5 + Math.random() * 2;
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: baseRadius,
        baseRadius,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        hue: 220 + Math.random() * 80,
      });
    }

    const particles: Particle[] = [];
    const maxParticles = 35;

    function spawnParticle() {
      if (particles.length >= maxParticles) return;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.05 + Math.random() * 0.12;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 500 + Math.random() * 700,
        size: 0.8 + Math.random() * 1.8,
        hue: 220 + Math.random() * 80,
      });
    }

    const connectionDist = Math.min(w, h) * 0.16;
    let time = 0;

    function draw() {
      if (!ctx) return;
      time += 1;
      const dark = document.documentElement.classList.contains('dark');

      ctx.clearRect(0, 0, w, h);

      // Background glow orbs — slow drift, only visible in dark mode
      if (dark) {
        const drawOrb = (ox: number, oy: number, r: number, hue: number, alpha: number) => {
          const driftX = Math.sin(time * 0.002 + ox * 0.0003) * 50;
          const driftY = Math.cos(time * 0.0025 + oy * 0.0003) * 35;
          const gradient = ctx!.createRadialGradient(ox + driftX, oy + driftY, 0, ox + driftX, oy + driftY, r);
          gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, ${alpha})`);
          gradient.addColorStop(0.5, `hsla(${hue}, 60%, 50%, ${alpha * 0.3})`);
          gradient.addColorStop(1, `hsla(${hue}, 50%, 40%, 0)`);
          ctx!.fillStyle = gradient;
          ctx!.fillRect(ox + driftX - r, oy + driftY - r, r * 2, r * 2);
        };
        drawOrb(w * 0.2, h * 0.3, w * 0.5, 250, 0.15);
        drawOrb(w * 0.8, h * 0.6, w * 0.45, 220, 0.12);
        drawOrb(w * 0.5, h * 0.8, w * 0.35, 280, 0.08);
      }

      // Mouse glow — subtle in both modes
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
            const wave = Math.sin(time * 0.006 + dist * 0.002) * 0.5 + 0.5;
            const lineAlpha = alpha * (dark ? 0.18 : 0.1) * (wave * 0.3 + 0.7);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);

            const midX = (a.x + b.x) / 2 + Math.sin(time * 0.004 + i) * 5;
            const midY = (a.y + b.y) / 2 + Math.cos(time * 0.004 + j) * 5;
            ctx.quadraticCurveTo(midX, midY, b.x, b.y);

            const avgHue = (a.hue + b.hue) / 2;
            ctx.strokeStyle = `hsla(${avgHue}, 50%, ${dark ? 65 : 48}%, ${lineAlpha})`;
            ctx.lineWidth = dark ? 0.5 : 0.4;
            ctx.stroke();
          }
        }
      }

      // Update and draw nodes — random walk, no orbit
      for (const node of nodes) {
        node.pulsePhase += node.pulseSpeed;
        node.radius = node.baseRadius + Math.sin(node.pulsePhase) * 0.8;

        // Perlin-like random drift using sine waves at different frequencies
        // This gives smooth random-looking movement that covers the whole canvas
        const noiseX = Math.sin(time * 0.003 + node.pulsePhase * 7.3) * 0.15
                     + Math.sin(time * 0.007 + node.pulsePhase * 3.7) * 0.1;
        const noiseY = Math.cos(time * 0.004 + node.pulsePhase * 5.1) * 0.15
                     + Math.cos(time * 0.006 + node.pulsePhase * 2.3) * 0.1;

        node.vx += noiseX;
        node.vy += noiseY;

        // Mouse nudge — soft push away
        if (mouseActive) {
          const mdx = node.x - mx;
          const mdy = node.y - my;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 180 && mDist > 0) {
            const force = (180 - mDist) / 180 * 0.12;
            node.vx += (mdx / mDist) * force;
            node.vy += (mdy / mDist) * force;
          }
        }

        // Damping — keeps velocity bounded
        node.vx *= 0.97;
        node.vy *= 0.97;

        // Clamp max speed
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 1.5) {
          node.vx = (node.vx / speed) * 1.5;
          node.vy = (node.vy / speed) * 1.5;
        }

        node.x += node.vx;
        node.y += node.vy;

        // Wrap around edges — seamless, no hard boundaries
        if (node.x < -30) node.x = w + 25;
        if (node.x > w + 30) node.x = -25;
        if (node.y < -30) node.y = h + 25;
        if (node.y > h + 30) node.y = -25;

        // Draw glow
        const glowR = node.radius * (dark ? 8 : 5);
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
        glow.addColorStop(0, `hsla(${node.hue}, 60%, ${dark ? 68 : 52}%, ${dark ? 0.22 : 0.12})`);
        glow.addColorStop(0.5, `hsla(${node.hue}, 50%, ${dark ? 58 : 42}%, ${dark ? 0.07 : 0.04})`);
        glow.addColorStop(1, `hsla(${node.hue}, 40%, 50%, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${node.hue}, 55%, ${dark ? 72 : 45}%, ${dark ? 0.75 : 0.5})`;
        ctx.fill();
      }

      // Spawn particles
      if (time % 18 === 0) spawnParticle();

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
        const alpha = fadeIn * Math.min(1, fadeOut) * (dark ? 0.4 : 0.22);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 55%, ${dark ? 68 : 50}%, ${alpha})`;
        ctx.fill();
      }

      // Vignette only in dark mode
      if (dark) {
        const vigGrad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.3, w / 2, h / 2, Math.max(w, h) * 0.6);
        vigGrad.addColorStop(0, 'rgba(0,0,0,0)');
        vigGrad.addColorStop(1, 'rgba(0,0,0,0.25)');
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
      style={{ zIndex: 0, opacity: 1 }}
      aria-hidden="true"
    />
  );
}
