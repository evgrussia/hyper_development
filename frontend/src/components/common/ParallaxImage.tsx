import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
}

export function ParallaxImage({ src, alt, className = '', strength = 20 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div ref={ref} className={`${className} overflow-hidden`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-full object-cover scale-110"
      />
    </div>
  );
}
