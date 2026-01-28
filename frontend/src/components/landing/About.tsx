import { Award, Briefcase, GraduationCap, Star } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { motion } from 'motion/react';
import { Reveal } from '@/components/common/Reveal';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { AboutBackground } from '@/components/backgrounds/AboutBackground';

// Фото разработчика: public/developer-photo.svg (при добавлении .png можно сменить на /developer-photo.png)
const developerPhoto = '/developer-photo.svg';

export function About() {
  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="about" className="relative py-20 lg:py-32 px-4 bg-gradient-to-b from-transparent to-background overflow-hidden">
      {/* Interactive Background */}
      <div className="absolute inset-0 -z-10">
        <AboutBackground />
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              О разработчике
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              20 лет опыта в создании современных веб-приложений
            </p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Photo */}
          <Reveal direction="left">
            <div className="flex justify-center">
              <div className="relative group">
                {/* Main photo container */}
                <motion.div
                  className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-2xl overflow-hidden glass-strong border border-border/50 group-hover:border-primary/30 transition-all duration-300"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-60 z-10" />
                  
                  {/* Photo: .png при наличии, иначе .svg плейсхолдер */}
                  <ImageWithFallback
                    src={developerPhoto}
                    fallbackSrc="/developer-photo.png"
                    alt="Евгений Пономарев - Fullstack Developer"
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                  />

                  {/* Animated border glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
                  
                  {/* Subtle shimmer effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity shimmer" />
                </motion.div>

                {/* Certification badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4 glass-strong px-5 py-3 rounded-xl border border-primary/30 shadow-lg shadow-primary/10"
                  initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                >
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-primary fill-primary" />
                    <span className="text-sm font-medium">Сертифицирован Яндекс</span>
                  </div>
                </motion.div>

                {/* Years badge */}
                <motion.div
                  className="absolute -top-4 -left-4 glass-strong px-5 py-3 rounded-xl border border-accent/30 shadow-lg shadow-accent/10"
                  initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.4, type: 'spring' }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-accent">20</span>
                    <span className="text-sm font-medium">лет опыта</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </Reveal>

          {/* Right: Content */}
          <Reveal direction="right">
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold mb-2">Евгений Пономарев</h3>
                <p className="text-xl text-primary font-medium">
                  Fullstack Developer / Software Architect
                </p>
              </div>

              <div className="space-y-4">
                <motion.div
                  className="flex items-start gap-4 p-4 rounded-xl glass hover:glass-strong transition-all duration-300 group"
                  whileHover={prefersReducedMotion ? {} : { x: 4 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">20 лет опыта в разработке</h4>
                    <p className="text-foreground/70 text-sm">
                      30+ проектов в продакшен за последние 4 года
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 p-4 rounded-xl glass hover:glass-strong transition-all duration-300 group"
                  whileHover={prefersReducedMotion ? {} : { x: 4 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                    <GraduationCap className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Высшее техническое образование</h4>
                    <p className="text-foreground/70 text-sm">
                      Прикладная информатика
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start gap-4 p-4 rounded-xl glass hover:glass-strong transition-all duration-300 group"
                  whileHover={prefersReducedMotion ? {} : { x: 4 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Сертификация Яндекс</h4>
                    <p className="text-foreground/70 text-sm">
                      Архитектор программного обеспечения (2026)
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={scrollToOrder}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity group"
                >
                  Обсудить проект
                  <motion.span
                    className="ml-2 inline-block"
                    animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}