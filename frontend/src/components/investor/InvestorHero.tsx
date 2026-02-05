import { motion } from 'motion/react';
import { TrendingUp } from 'lucide-react';
import { Reveal } from '@/components/common/Reveal';

interface InvestorHeroProps {
  projectTitle: string;
  tagline: string;
  amount: string;
  equity?: string;
}

export function InvestorHero({ projectTitle, tagline, amount, equity }: InvestorHeroProps) {
  return (
    <section className="relative pt-8 pb-16 lg:pb-24 px-4 overflow-hidden">
      <div className="container mx-auto max-w-5xl text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20 mb-8">
            <TrendingUp className="w-4 h-4" />
            Инвестиционная возможность
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {projectTitle}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-xl lg:text-2xl text-foreground/60 max-w-3xl mx-auto mb-10 leading-relaxed">
            {tagline}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <motion.div
            className="inline-flex items-center gap-4 glass-strong rounded-2xl px-8 py-4 border border-primary/20"
            whileHover={{ scale: 1.02 }}
          >
            <span className="text-foreground/50 text-sm">Инвестиционный раунд</span>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {amount}
            </span>
            {equity && (
              <span className="text-foreground/50 text-sm">за {equity}</span>
            )}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
