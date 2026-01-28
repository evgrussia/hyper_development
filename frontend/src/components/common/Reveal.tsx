import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function Reveal({ children, delay = 0, direction = 'up', className = '' }: RevealProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const prefersReducedMotion = usePrefersReducedMotion();

  const directions = {
    up: { y: 50 },
    down: { y: -50 },
    left: { x: 50 },
    right: { x: -50 },
  };

  const initial = prefersReducedMotion
    ? {}
    : {
        opacity: 0,
        ...directions[direction],
      };

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? animate : initial}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
