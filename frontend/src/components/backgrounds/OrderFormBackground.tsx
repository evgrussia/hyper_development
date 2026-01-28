import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

export function OrderFormBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-background to-violet-950/10" />
    );
  }

  const lines = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: i * 0.1,
    duration: 2 + Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Vertical lines */}
      {lines.map((line) => (
        <motion.div
          key={`v-${line.id}`}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-violet-500/30 to-transparent"
          style={{
            left: `${(line.id / lines.length) * 100}%`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{
            scaleY: [0, 1, 1, 0],
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: line.duration,
            delay: line.delay,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        />
      ))}

      {/* Horizontal lines */}
      {lines.slice(0, 10).map((line) => (
        <motion.div
          key={`h-${line.id}`}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
          style={{
            top: `${(line.id / 10) * 100}%`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: [0, 1, 1, 0],
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: line.duration + 1,
            delay: line.delay + 0.5,
            repeat: Infinity,
            repeatDelay: 4,
          }}
        />
      ))}

      {/* Subtle glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
