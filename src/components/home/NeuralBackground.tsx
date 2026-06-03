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
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    const isDark = document.documentElement.classList.contains('dark');

    // Create neural nodes
    const nodeCount = Math.max(40, Math.floor((w * h) / 25000));
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const baseRadius = 1.5 + Math.random() * 2;
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: baseRadius,
        baseRadius,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.005 + Math.random() * 0.015,
      });
    }

    // Floating particles
    const particles: Particle[] = [];
    const maxParticles = Math.floor(nodeCount * 0.6);

    function spawnParticle() {
      if (particles.length >= maxParticles) return;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.02 + Math.random() * 0.05;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 0,
        maxLife: 800 + Math.random() * 1200,
        size: 0.5 + Math.random() * 1.5,
      });
    }

    // Connection distance
    const connectionDist = Math.min(w, h) * 0.18;

    // Color palettes
    const darkColors = {
      nodeGlow: '120, 80, 255',
      nodeCore: '160, 120, 255',
      connection: '100, 60, 200',
      particle: '140, 100, 255',
      orb1: '80, 40, 200',
      orb2: '40, 80, 220',
      orb3: '100, 40, 180',
    };

    const lightColors = {
      nodeGlow: '160, 140, 220',
      nodeCore: '140, 120, 200',
      connection: '180, 170, 210',
      particle: '150, 130, 210',
      orb1: '200, 180, 230',
      orb2: '180, 190, 230',
      orb3: '190, 170, 220',
    };

    const colors = isDark ? darkColors : lightColors;

    let time = 0;

    function draw() {
      if (!ctx) return;
      time += 1;
      const currentColors = document.documentElement.classList.contains('dark') ? darkColors : lightColors;

      ctx.clearRect(0, 0, w, h);

      // Draw background orbs (very subtle)
      const drawOrb = (x: number, y: number, r: number, color: string, alpha: number) => {
        const flicker = Math.sin(time * 0.008 + x * 0.01) * 0.3;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, `rgba(${color}, ${(alpha + flicker) * 0.6})`);
        gradient.addColorStop(0.5, `rgba(${color}, ${(alpha + flicker) * 0.2})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      };

      // Subtle background glow orbs
      drawOrb(w * 0.2, h * 0.3, w * 0.5, currentColors.orb1, isDark ? 0.12 : 0.06);
      drawOrb(w * 0.8, h * 0.6, w * 0.45, currentColors.orb2, isDark ? 0.1 : 0.05);
      drawOrb(w * 0.5, h * 0.8, w * 0.35, currentColors.orb3, isDark ? 0.08 : 0.04);

      // Mouse-reactive spotlight
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx > 0 && my > 0) {
        const spotR = Math.min(w, h) * 0.35;
        const spotAlpha = isDark ? 0.07 : 0.03;
        const spot = ctx.createRadialGradient(mx, my, 0, mx, my, spotR);
        spot.addColorStop(0, `rgba(${currentColors.orb1}, ${spotAlpha})`);
        spot.addColorStop(1, `rgba(${currentColors.orb1}, 0)`);
        ctx.fillStyle = spot;
        ctx.fillRect(mx - spotR, my - spotR, spotR * 2, spotR * 2);
      }

      // Update and draw connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * (isDark ? 0.2 : 0.12);
            const wave = Math.sin(time * 0.01 + dist * 0.005) * 0.5 + 0.5;

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);

            // Slight curve for organic feel
            const midX = (a.x + b.x) / 2 + Math.sin(time * 0.008 + i) * 8;
            const midY = (a.y + b.y) / 2 + Math.cos(time * 0.008 + j) * 8;
            ctx.quadraticCurveTo(midX, midY, b.x, b.y);

            ctx.strokeStyle = `rgba(${currentColors.connection}, ${alpha * (wave * 0.5 + 0.5)})`;
            ctx.lineWidth = isDark ? 0.6 : 0.4;
            ctx.stroke();

            // Traveling pulse along connection
            if (wave > 0.85) {
              const t = (wave - 0.85) / 0.15;
              const px = a.x + (b.x - a.x) * t;
              const py = a.y + (b.y - a.y) * t;
              ctx.beginPath();
              ctx.arc(px, py, 1.2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${currentColors.nodeCore}, ${alpha * 2})`;
              ctx.fill();
            }
          }
        }
      }

      // Update nodes
      for (const node of nodes) {
        node.pulsePhase += node.pulseSpeed;
        node.radius = node.baseRadius + Math.sin(node.pulsePhase) * 0.8;

        // Mouse repulsion
        const mdx = node.x - mx;
        const mdy = node.y - my;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 200 && mDist > 0) {
          const force = (200 - mDist) / 200 * 0.3;
          node.vx += (mdx / mDist) * force;
          node.vy += (mdy / mDist) * force;
        }

        // Damping
        node.vx *= 0.995;
        node.vy *= 0.995;

        node.x += node.vx;
        node.y += node.vy;

        // Wrap around
        if (node.x < -20) node.x = w + 20;
        if (node.x > w + 20) node.x = -20;
        if (node.y < -20) node.y = h + 20;
        if (node.y > h + 20) node.y = -20;

        // Draw node glow
        const glowR = node.radius * (isDark ? 8 : 6);
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowR);
        glow.addColorStop(0, `rgba(${currentColors.nodeGlow}, ${isDark ? 0.25 : 0.12})`);
        glow.addColorStop(0.5, `rgba(${currentColors.nodeGlow}, ${isDark ? 0.08 : 0.04})`);
        glow.addColorStop(1, `rgba(${currentColors.nodeGlow}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowR, 0, Math.PI * 2);
        ctx.fill();

        // Draw node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${currentColors.nodeCore}, ${isDark ? 0.7 : 0.4})`;
        ctx.fill();
      }

      // Spawn particles occasionally
      if (time % 30 === 0) spawnParticle();

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
        const alpha = fadeIn * Math.min(1, fadeOut) * (isDark ? 0.4 : 0.2);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${currentColors.particle}, ${alpha})`;
        ctx.fill();
      }

      // Vignette overlay
      if (isDark) {
        const vigGrad = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.2, w / 2, h / 2, Math.max(w, h) * 0.7);
        vigGrad.addColorStop(0, 'rgba(0,0,0,0)');
        vigGrad.addColorStop(1, 'rgba(0,0,0,0.4)');
        ctx.fillStyle = vigGrad;
        ctx.fillRect(0, 0, w, h);
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
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
