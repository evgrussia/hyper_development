import { useData } from '@/contexts/DataContext';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/common/Reveal';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';
import { PortfolioBackground } from '@/components/backgrounds/PortfolioBackground';

// Technology badges mapping
const getTechBadges = (title: string): string[] => {
  const techMap: Record<string, string[]> = {
    'BIOMAX AI': ['AI', 'HealthTech', 'RAG'],
    'Нейро-Психолог 24/7': ['AI', 'GigaChat', 'HealthTech'],
    'Дарк-Шеф': ['AI', 'FoodTech', 'Marketplace'],
    'Телемед-Питомец': ['AI', 'PetTech', 'Video'],
    'Юрист-в-Кармане': ['AI', 'GigaChat', 'LegalTech'],
    'Крафт-Маркет': ['Marketplace', 'Geo', 'Local'],
    'Родитель-Про': ['AI', 'ParentTech', 'HealthTech'],
    'Арендо-Соседи': ['P2P', 'Sharing', 'Local'],
    'Авто-Шеринг-Сосед': ['P2P', 'Mobility', 'IoT'],
    'Вкус-Робот': ['AI', 'FoodTech', 'Voice'],
  };
  return techMap[title] || ['SaaS', 'Web', 'Mobile'];
};

export function Portfolio() {
  const { portfolio } = useData();
  const activePortfolio = portfolio
    .filter(p => p.isActive)
    .sort((a, b) => a.order - b.order);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="portfolio" className="relative py-20 lg:py-32 px-4 overflow-hidden">
      {/* Interactive Background */}
      <div className="absolute inset-0 -z-10">
        <PortfolioBackground />
      </div>
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <Reveal>
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                SaaS Идеи 2026
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Портфолио
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Инновационные проекты с AI, HealthTech, FoodTech и Sharing Economy
            </p>
          </div>
        </Reveal>

        {/* Portfolio Grid */}
        {activePortfolio.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {activePortfolio.map((item, index) => (
              <Reveal key={item.id} delay={prefersReducedMotion ? 0 : index * 0.1}>
                <Link to={`/portfolio/${item.slug}`} className="block h-full">
                  <motion.div
                    className="glass rounded-xl border border-border/50 overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group h-full flex flex-col cursor-pointer"
                    whileHover={prefersReducedMotion ? {} : { y: -8 }}
                  >
                    {/* Image */}
                    {item.image ? (
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden relative">
                        <motion.img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        {/* AI Badge */}
                        {getTechBadges(item.title).includes('AI') && (
                          <div className="absolute top-4 right-4 glass-strong px-3 py-1.5 rounded-full border border-primary/30 flex items-center gap-1.5 shadow-lg">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            <span className="text-xs font-semibold text-primary">AI</span>
                          </div>
                        )}

                        {/* Hover overlay with arrow */}
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                        <div className="text-foreground/30 text-4xl font-bold">
                          {item.title.charAt(0)}
                        </div>
                        {/* AI Badge */}
                        {getTechBadges(item.title).includes('AI') && (
                          <div className="absolute top-4 right-4 glass-strong px-3 py-1.5 rounded-full border border-primary/30 flex items-center gap-1.5 shadow-lg">
                            <Sparkles className="w-3.5 h-3.5 text-primary" />
                            <span className="text-xs font-semibold text-primary">AI</span>
                          </div>
                        )}
                        {/* Hover overlay with arrow */}
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                            <ArrowUpRight className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-foreground/30 group-hover:text-primary transition-colors shrink-0 ml-2" />
                      </div>
                      <p className="text-foreground/70 mb-4 line-clamp-2 flex-1">
                        {item.description}
                      </p>
                      {/* Technology badges */}
                      <div className="mt-auto flex flex-wrap gap-2">
                        {getTechBadges(item.title).map((tech, techIndex) => (
                          <motion.span
                            key={techIndex}
                            className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold border border-primary/20 hover:bg-primary/20 hover:border-primary/30 transition-colors cursor-default"
                            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                            whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="text-center py-20 glass rounded-xl border border-border/50">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 text-primary/50" />
                </div>
                <p className="text-lg text-foreground/50">
                  Скоро появятся новые проекты
                </p>
                <p className="text-sm text-foreground/40">
                  Мы работаем над обновлением портфолио
                </p>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
