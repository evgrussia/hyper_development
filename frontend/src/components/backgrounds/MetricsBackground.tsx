import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

export function MetricsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref: inViewRef, inView } = useInView({ threshold: 0, rootMargin: '80px' });

  useEffect(() => {
    if (prefersReducedMotion || !inView) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const circles: Array<{
      x: number;
      y: number;
      maxRadius: number;
      radius: number;
      speed: number;
      hue: number;
    }> = [];

    // Create pulsing circles
    for (let i = 0; i < 5; i++) {
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        maxRadius: Math.random() * 100 + 50,
        radius: 0,
        speed: Math.random() * 0.5 + 0.3,
        hue: Math.random() * 60 + 260,
      });
    }

    let animationFrame: number = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      circles.forEach((circle) => {
        circle.radius += circle.speed;

        if (circle.radius > circle.maxRadius) {
          circle.radius = 0;
          circle.x = Math.random() * canvas.width;
          circle.y = Math.random() * canvas.height;
        }

        const opacity = 1 - circle.radius / circle.maxRadius;

        // Draw multiple rings
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(
            circle.x,
            circle.y,
            circle.radius + i * 10,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = `hsla(${circle.hue}, 80%, 60%, ${opacity * 0.3})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Glow effect
        const gradient = ctx.createRadialGradient(
          circle.x,
          circle.y,
          0,
          circle.x,
          circle.y,
          circle.radius
        );

        gradient.addColorStop(0, `hsla(${circle.hue}, 80%, 60%, ${opacity * 0.2})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [prefersReducedMotion, inView]);

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-950/10 via-background to-cyan-950/10" />
    );
  }

  return (
    <div ref={inViewRef} className="absolute inset-0 w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}
