import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Reveal } from '@/components/common/Reveal';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import { HeroBackground } from '@/components/backgrounds/HeroBackground';

export function Hero() {
  const scrollToOrder = () => {
    const element = document.getElementById('order');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-16 px-4 overflow-hidden">
      {/* Interactive Background */}
      <div className="absolute inset-0 -z-10">
        <HeroBackground />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center space-y-8">
          {/* Badge */}
          <Reveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground/90">
                AI-агентская разработка 2026
              </span>
            </div>
          </Reveal>

          {/* Main Headline */}
          <Reveal delay={0.2}>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
              Разработка web-приложений{' '}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                под ключ
              </span>
            </h1>
          </Reveal>

          {/* Subheadline */}
          <Reveal delay={0.3}>
            <p className="text-lg sm:text-xl lg:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              За 24 часа — комплект документов, промо-сайт и демо.
              <br />
              MVP в эксплуатацию через неделю. Модульный заказ с уведомлениями в Telegram.
            </p>
          </Reveal>

          {/* Key Features */}
          <Reveal delay={0.4}>
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base text-foreground/60">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                <span>DDD, Clean Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                <span>Telegram webapp</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                <span>20 лет опыта</span>
              </div>
            </div>
          </Reveal>

          {/* CTA Buttons */}
          <Reveal delay={0.5}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                onClick={scrollToOrder}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-base sm:text-lg px-8 py-6 group"
              >
                Заказать проект
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                size="lg"
                variant="outline"
                className="border-border/50 hover:bg-white/5 text-base sm:text-lg px-8 py-6"
              >
                Узнать больше
              </Button>
            </div>
          </Reveal>

          {/* Trust indicators with animated counters */}
          <Reveal delay={0.6}>
            <div className="pt-8 flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-foreground">
                  <AnimatedCounter to={30} suffix="+" />
                </div>
                <div className="text-sm text-foreground/60 mt-1">проектов в продакшен</div>
              </div>
              <div className="w-px bg-border"></div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-foreground">
                  <AnimatedCounter to={24} suffix="ч" />
                </div>
                <div className="text-sm text-foreground/60 mt-1">документы + демо</div>
              </div>
              <div className="w-px bg-border"></div>
              <div>
                <div className="text-3xl sm:text-4xl font-bold text-foreground">
                  <AnimatedCounter to={7} suffix=" дней" />
                </div>
                <div className="text-sm text-foreground/60 mt-1">MVP в эксплуатацию</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}