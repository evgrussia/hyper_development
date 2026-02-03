import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

export function PersonasBackground() {
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

    // Network nodes representing personas
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      connections: number[];
    }> = [];

    const numNodes = 15;

    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 4 + 2,
        connections: [],
      });
    }

    let animationFrame: number = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Move node
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Draw connections
        node.connections = [];
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dx = other.x - node.x;
          const dy = other.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            node.connections.push(j);
            const opacity = (1 - distance / 200) * 0.3;

            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw node with glow
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.radius * 4
        );

        gradient.addColorStop(0, 'rgba(6, 182, 212, 0.8)');
        gradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.4)');
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
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
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/10 via-background to-indigo-950/10" />
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
