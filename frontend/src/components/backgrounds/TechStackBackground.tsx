import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

export function TechStackBackground() {
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

    const characters = 'REACT•VITE•TS•NODE•NEXT•TAIL•CSS•JS•HTML•API•DB•UI•UX•DEV•WEB•APP•CODE•HYPER';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    let animationFrame: number = 0;

    const animate = () => {
      // Semi-transparent background for trail effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Gradient color based on position
        const gradient = ctx.createLinearGradient(x, y - fontSize * 10, x, y);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, 'rgba(139, 92, 246, 0.5)');
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0.8)');

        ctx.fillStyle = gradient;
        ctx.fillText(text, x, y);

        // Reset drop to top when it reaches bottom
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

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
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-950/10 to-violet-950/10" />
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
