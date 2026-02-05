import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { TrendingUp, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/common/Reveal';

interface InvestorCTAProps {
  slug: string;
  projectTitle: string;
}

export function InvestorCTA({ slug, projectTitle }: InvestorCTAProps) {
  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl p-[1px]">
              <div className="w-full h-full bg-background rounded-2xl" />
            </div>

            <div className="relative glass-strong rounded-2xl p-8 lg:p-12 border border-primary/20">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-10 h-10 text-primary" />
                </div>

                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <h2 className="text-2xl lg:text-3xl font-bold mb-3">
                    Инвестируйте в {projectTitle}
                  </h2>
                  <p className="text-foreground/60 text-lg max-w-2xl">
                    Готовый стартап с проработанной документацией, бизнес-планом и технической архитектурой.
                    Узнайте подробности инвестиционного предложения.
                  </p>
                </div>

                {/* CTA */}
                <Link to={`/portfolio/${slug}/investor`}>
                  <motion.button
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-lg hover:opacity-90 transition-opacity whitespace-nowrap"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Бизнес-план
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
