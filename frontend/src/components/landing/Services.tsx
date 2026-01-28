import { useData } from '@/contexts/DataContext';
import { FileText, Zap, Code2, Award, RefreshCw, Cloud, DollarSign } from 'lucide-react';
import { motion } from 'motion/react';
import { Reveal } from '@/components/common/Reveal';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { ServicesBackground } from '@/components/backgrounds/ServicesBackground';

const iconMap: Record<number, any> = {
  1: FileText,
  2: Zap,
  3: Code2,
  4: Award,
  5: RefreshCw,
  6: Cloud,
  7: DollarSign,
};

export function Services() {
  const { services } = useData();
  const activeServices = services
    .filter(s => s.isActive)
    .sort((a, b) => a.order - b.order);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="services" className="relative py-20 lg:py-32 px-4 bg-gradient-to-b from-transparent to-background overflow-hidden">
      {/* Interactive Background */}
      <div className="absolute inset-0 -z-10">
        <ServicesBackground />
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Услуги
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Полный спектр разработки — от идеи до продакшена
            </p>
          </div>
        </Reveal>

        {/* Services Grid with Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeServices.map((service, index) => {
            const Icon = iconMap[service.order] || Code2;
            return (
              <Reveal key={service.id} delay={prefersReducedMotion ? 0 : index * 0.1}>
                <motion.div
                  className="glass p-6 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group h-full"
                  whileHover={prefersReducedMotion ? {} : { 
                    y: -4,
                    boxShadow: '0 20px 40px -12px rgba(79, 70, 229, 0.15)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-5 h-5 text-primary" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Empty state */}
        {activeServices.length === 0 && (
          <div className="text-center py-16 glass rounded-xl">
            <p className="text-foreground/50">Скоро появятся новые услуги</p>
          </div>
        )}
      </div>
    </section>
  );
}