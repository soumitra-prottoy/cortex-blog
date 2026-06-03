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
  const nodesRef = useRef<Node[]>([]);

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

    // Create neural nodes — MORE of them
    const nodeCount = Math.max(60, Math.floor((w * h) / 18000));
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const baseRadius = 2 + Math.random() * 2.5;
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: baseRadius,
        baseRadius,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.008 + Math.random() * 0.02,
        hue: 240 + Math.random() * 60, // blue to purple range
      });
    }
    nodesRef.current = nodes;

    // Floating particles
    const particles: Particle[] = [];
    const maxParticles = Math.floor(nodeCount * 1.2);

    function spawnParticle() {
      if (particles.length >= maxParticles) return;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.03 + Math.random() * 0.08;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 600 + Math.random() * 1000,
        size: 0.8 + Math.random() * 2,
        hue: 220 + Math.random() * 80,
      });
    }

    const connectionDist = Math.min(w, h) * 0.2;
    let time = 0;

    function draw() {
      if (!ctx) return;
      time += 1;
      const dark = document.documentElement.classList.contains('dark');

      ctx.clearRect(0, 0, w, h);

      // Background glow orbs — slowly drifting
      const drawOrb = (ox: number, oy: number, r: number, hue: number, alpha: number) => {
        const driftX = Math.sin(time * 0.003 + ox * 0.001) * 30;
        const driftY = Math.cos(time * 0.004 + oy * 0.001) * 20;
        const flicker = Math.sin(time * 0.01 + ox * 0.01) * 0.15;
        const gradient = ctx!.createRadialGradient(
          ox + driftX, oy + driftY, 0,
          ox + driftX, oy + driftY, r
        );
        gradient.addColorStop(0, `hsla(${hue}, 70%, 60%, ${(alpha + flicker) * (dark ? 1 : 0.5)})`);
        gradient.addColorStop(0.5, `hsla(${hue}, 60%, 50%, ${(alpha + flicker) * 0.4 * (dark ? 1 : 0.4)})`);
        gradient.addColorStop(1, `hsla(${hue}, 50%, 40%, 0)`);
        ctx!.fillStyle = gradient;
        ctx!.fillRect(ox + driftX - r, oy + driftY - r, r * 2, r * 2);
      };

      drawOrb(w * 0.15, h * 0.25, w * 0.55, 260, dark ? 0.15 : 0.06);
      drawOrb(w * 0.85, h * 0.65, w * 0.5, 220, dark ? 0.12 : 0.05);
      drawOrb(w * 0.5, h * 0.85, w * 0.4, 280, dark ? 0.1 : 0.04);
      drawOrb(w * 0.6, h * 0.15, w * 0.35, 240, dark ? 0.08 : 0.03);

      // Mouse-reactive spotlight — soft glow follows cursor
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      if (mouseActive && mx > 0 && my > 0) {
        const spotR = Math.min(w, h) * 0.4;
        const spotAlpha = dark ? 0.1 : 0.05;
        const spot = ctx.createRadialGradient(mx, my, 0, mx, my, spotR);
        spot.addColorStop(0, `hsla(250, 80%, 70%, ${spotAlpha})`);
        spot.addColorStop(0.4, `hsla(240, 70%, 60%, ${spotAlpha * 0.5})`);
        spot.addColorStop(1, `hsla(230, 60%, 50%, 0)`);
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
            const alpha = (1 - dist / connectionDist);
            const wave = Math.sin(time * 0.012 + dist * 0.004) * 0.5 + 0.5;
            const lineAlpha = alpha * (dark ? 0.25 : 0.14) * (wave * 0.4 + 0.6);

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);

            // Curved connections
            const midX = (a.x + b.x) / 2 + Math.sin(time * 0.006 + i * 0.5) * 12;
            const midY = (a.y + b.y) / 2 + Math.cos(time * 0.006 + j * 0.5) * 12;
            ctx.quadraticCurveTo(midX, midY, b.x, b.y);

            const avgHue = (a.hue + b.hue) / 2;
            ctx.strokeStyle = `hsla(${avgHue}, 60%, ${dark ? 70 : 55}%, ${lineAlpha})`;
            ctx.lineWidth = dark ? 0.7 : 0.5;
            ctx.stroke();

            // Traveling pulse along connection
            if (wave > 0.88) {
              const t = (wave - 0.88) / 0.12;
              const px = a.x + (b.x - a.x) * t;
              const py = a.y + (b.y - a.y) * t;
              ctx.beginPath();
              ctx.arc(px, py, 1.5, 0, Math.PI * 2);
              ctx.fillStyle = `hsla(${avgHue}, 70%, ${dark ? 80 : 65}%, ${alpha * 0.6})`;
              ctx.fill();
            }
          }
        }
      }

      // Update and draw nodes
      for (const node of nodes) {
        node.pulsePhase += node.pulseSpeed;
        node.radius = node.baseRadius + Math.sin(node.pulsePhase) * 1;

        // Mouse interaction — gentle repulsion with return force
        if (mouseActive) {
          const mdx = node.x - mx;
          const mdy = node.y - my;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 250 && mDist > 0) {
            const force = (250 - mDist) / 250 * 0.4;
            node.vx += (mdx / mDist) * force;
            node.vy += (mdy / mDist) * force;
          }
        }

        // Return-to-center force (keeps nodes from drifting away)
        const cx = w / 2;
        const cy = h / 2;
        const toCenterX = cx - node.x;
        const toCenterY = cy - node.y;
        const centerDist = Math.sqrt(toCenterX * toCenterX + toCenterY * toCenterY);
        const maxDist = Math.min(w, h) * 0.45;
        if (centerDist > maxDist) {
          const pull = (centerDist - maxDist) / maxDist * 0.003;
          node.vx += (toCenterX / centerDist) * pull;
          node.vy += (toCenterY / centerDist) * pull;
        }

        // Gentle random drift
        node.vx += (Math.random() - 0.5) * 0.01;
        node.vy += (Math.random() - 0.5) * 0.01;

        // Damping — stronger damping so they settle back
        node.vx *= 0.985;
        node.vy *= 0.985;

        node.x += node.vx;
        node.y += node.vy;

        // Soft boundary — push back from edges
        const margin = 30;
        if (node.x < margin) node.vx += 0.05;
        if (node.x > w - margin) node.vx -= 0.05;
        if (node.y < margin) node.vy += 0.05;
        if (node.y > h - margin) node.vy -= 0.05;

        // Draw node glow
        const glowR = node.radius * (dark ? 10 : 7);
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
        glow.addColorStop(0, `hsla(${node.hue}, 70%, ${dark ? 75 : 60}%, ${dark ? 0.3 : 0.15})`);
        glow.addColorStop(0.4, `hsla(${node.hue}, 60%, ${dark ? 65 : 50}%, ${dark ? 0.1 : 0.06})`);
        glow.addColorStop(1, `hsla(${node.hue}, 50%, 50%, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Draw node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${node.hue}, 65%, ${dark ? 80 : 55}%, ${dark ? 0.85 : 0.5})`;
        ctx.fill();
      }

      // Spawn particles more frequently
      if (time % 20 === 0) spawnParticle();
      if (time % 60 === 0) spawnParticle();

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
        const fadeIn = Math.min(lifeRatio * 5, 1);
        const fadeOut = Math.max(1 - (lifeRatio - 0.7) / 0.3, 0);
        const alpha = fadeIn * Math.min(1, fadeOut) * (dark ? 0.5 : 0.25);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 65%, ${dark ? 75 : 60}%, ${alpha})`;
        ctx.fill();
      }

      // Subtle vignette
      if (dark) {
        const vigGrad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.25, w / 2, h / 2, Math.max(w, h) * 0.7);
        vigGrad.addColorStop(0, 'rgba(0,0,0,0)');
        vigGrad.addColorStop(1, 'rgba(0,0,0,0.35)');
        ctx.fillStyle = vigGrad;
        ctx.fillRect(0, 0, w, h);
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    // Mouse tracking — relative to canvas
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
