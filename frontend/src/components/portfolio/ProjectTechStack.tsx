import { motion } from 'motion/react';
import { Reveal } from '@/components/common/Reveal';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import type { TechStackItem } from '@/types';

interface ProjectTechStackProps {
  techStack: TechStackItem[];
}

export function ProjectTechStack({ techStack }: ProjectTechStackProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <Reveal>
          <h2 className="text-2xl lg:text-3xl font-bold mb-8">Технологический стек</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((category, catIndex) => (
            <Reveal key={catIndex} delay={prefersReducedMotion ? 0 : catIndex * 0.1}>
              <div className="glass rounded-xl p-6 border border-border/50 h-full">
                <h3 className="text-sm font-semibold text-primary mb-4 uppercase tracking-wider">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, itemIndex) => (
                    <motion.span
                      key={itemIndex}
                      className="px-3 py-1.5 rounded-lg bg-foreground/5 text-foreground/70 text-sm border border-border/30 hover:border-primary/30 hover:text-primary transition-colors"
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: catIndex * 0.1 + itemIndex * 0.05 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
