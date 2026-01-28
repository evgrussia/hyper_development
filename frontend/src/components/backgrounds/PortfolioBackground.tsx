import { motion, useScroll, useTransform } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

export function PortfolioBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/10 to-cyan-950/10" />
    );
  }

  return (
    <>
      {/* Floating glass cards */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-[10%] w-64 h-40 rounded-2xl border border-white/10 backdrop-blur-sm bg-gradient-to-br from-violet-500/10 to-purple-500/5 rotate-12"
      />
      
      <motion.div
        style={{ y: y2 }}
        className="absolute top-40 right-[15%] w-48 h-48 rounded-3xl border border-white/10 backdrop-blur-sm bg-gradient-to-br from-cyan-500/10 to-blue-500/5 -rotate-6"
      />
      
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-20 left-[20%] w-56 h-32 rounded-xl border border-white/10 backdrop-blur-sm bg-gradient-to-br from-purple-500/10 to-pink-500/5 -rotate-12"
      />

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </>
  );
}
