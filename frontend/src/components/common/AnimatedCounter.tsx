import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useSpring, useTransform } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ 
  from = 0, 
  to, 
  duration = 2, 
  suffix = '',
  className = '' 
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  
  const [isAnimating, setIsAnimating] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const spring = useSpring(from, {
    stiffness: 100,
    damping: 30,
    duration: prefersReducedMotion ? 0 : duration * 1000,
  });
  
  const display = useTransform(spring, (current) => Math.floor(current));

  useEffect(() => {
    if (inView && !isAnimating) {
      setIsAnimating(true);
      spring.set(to);
    }
  }, [inView, isAnimating, spring, to]);

  return (
    <span ref={ref} className={className}>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
