import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary origin-left z-50"
      style={{ scaleX: prefersReducedMotion ? 1 : scaleX }}
    />
  );
}
