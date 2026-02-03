import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

const PARTICLE_COUNT = 26;

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      hue: number;
    }> = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 3 + 1,
        hue: Math.random() * 60 + 260,
      });
    }

    let animationFrame: number = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const animate = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += (dx / distance) * force * 0.1;
          particle.vy += (dy / distance) * force * 0.1;
        }

        particle.vx *= 0.98;
        particle.vy *= 0.98;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius * 4
        );
        gradient.addColorStop(0, `hsla(${particle.hue}, 80%, 60%, 0.8)`);
        gradient.addColorStop(1, `hsla(${particle.hue}, 80%, 60%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const odx = other.x - particle.x;
          const ody = other.y - particle.y;
          const od = Math.sqrt(odx * odx + ody * ody);
          if (od < 120) {
            const opacity = (1 - od / 120) * 0.3;
            ctx.strokeStyle = `hsla(${(particle.hue + other.hue) / 2}, 70%, 60%, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    const startWhenIdle = () => {
      animate();
    };

    const id = typeof requestIdleCallback !== 'undefined'
      ? requestIdleCallback(startWhenIdle, { timeout: 300 })
      : window.setTimeout(startWhenIdle, 0);

    return () => {
      if (typeof cancelIdleCallback !== 'undefined') {
        cancelIdleCallback(id as number);
      } else {
        clearTimeout(id);
      }
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-background to-cyan-900/20" />
    );
  }

  return (
    <>
      <div
        className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full blur-3xl hero-blob-1 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[700px] h-[700px] rounded-full blur-3xl hero-blob-2 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.4) 0%, transparent 70%)',
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
    </>
  );
}
