import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Bot,
  FileStack,
  Layout,
  Sparkles,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Reveal } from '@/components/common/Reveal';
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { ValuePropositionBackground } from '@/components/backgrounds/ValuePropositionBackground';

const highlights = [
  {
    icon: Clock,
    title: 'За 24 часа',
    description: 'Комплект архитектурной и бизнес-документации от сырой идеи проекта',
  },
  {
    icon: Layout,
    title: 'Демо-прототип с финальным дизайном',
    description: 'Полноценный интерактивный прототип со всеми экранами и финальной визуальной подачей',
  },
  {
    icon: FileStack,
    title: 'Документация под ключ',
    description: 'PRD, Vision, архитектура, доменная модель, дизайн-система, user flows, аналитика',
  },
];

const howItWorks = [
  {
    step: 1,
    title: 'Идея и брифинг',
    text: 'Вы формулируете идею проекта. Система агентов декомпозирует задачу и выбирает роли: Product, Architect, UX/UI, Coder и др.',
  },
  {
    step: 2,
    title: 'Документация за часы',
    text: 'Product Agent — PRD и user stories. Architect — ADR и доменная модель. UX/UI — wireframes и дизайн-система. Всё по единым правилам и чекпоинтам.',
  },
  {
    step: 3,
    title: 'Демо-прототип',
    text: 'Coder Agent реализует фронт и бэкенд по спекам. За 24 часа вы получаете не только документы, но и работающий демо с финальным дизайном.',
  },
  {
    step: 4,
    title: 'MVP и продакшен',
    text: 'Дальше — итерации, доработки, деплой. Чистая архитектура и модульность позволяют масштабировать проект без переписывания.',
  },
];

const principles = [
  'Orchestrator координирует, не пишет код',
  'Специализированные агенты: Product, Architect, UX, Coder, QA, DevOps',
  'Quality gates и верификация по спецификациям',
  'Контекст-экономия: summaries и checkpoints вместо перегрузки',
  'Единый источник истины: SYSTEM.md, ARCHITECTURE.md, SKILL.md',
];

export function AgentSystemLanding() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        {/* Hero */}
        <section className="relative min-h-[80vh] flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <ValuePropositionBackground />
          </div>
          <div className="container mx-auto max-w-4xl text-center">
            <Reveal delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-6">
                <Bot className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground/90">
                  Агентская система разработки
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Как я реализую проекты с помощью{' '}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  агентской системы
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed mb-10">
                Современная AI-концепция проектирования и разработки web-приложений:
                от сырой идеи до полного комплекта документации и демо-прототипа за 24 часа.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <Link to="/#order">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-lg px-8 py-6 group"
                >
                  Заказать проект
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform inline-block" />
                </Button>
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Key theses — 24h */}
        <section className="relative py-20 lg:py-28 px-4 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-background" />
          <div className="container mx-auto max-w-6xl">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Главный тезис: за 24 часа
                </h2>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                  Комплект архитектурной и бизнес-документации от сырой идеи проекта +
                  полный демо-прототип с финальным дизайном
                </p>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal key={index} delay={index * 0.1}>
                    <div className="glass p-8 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-foreground/70 leading-relaxed flex-1">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="relative py-20 lg:py-28 px-4 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <ValuePropositionBackground />
          </div>
          <div className="container mx-auto max-w-4xl">
            <Reveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Как устроена агентская система
                </h2>
                <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                  Orchestrator декомпозирует задачу и делегирует специализированным агентам.
                  Каждый агент отвечает за свой артефакт и не подменяет другого.
                </p>
              </div>
            </Reveal>
            <div className="space-y-8">
              {howItWorks.map((item, index) => (
                <Reveal key={item.step} delay={index * 0.08}>
                  <div className="glass p-8 rounded-xl border border-border/50 flex gap-6 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center text-lg font-bold text-primary">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-foreground/70 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="relative py-20 lg:py-28 px-4 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent to-background" />
          <div className="container mx-auto max-w-3xl">
            <Reveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                  Принципы системы
                </h2>
                <p className="text-foreground/70">
                  Единые правила, контекст и качество на каждом шаге
                </p>
              </div>
            </Reveal>
            <ul className="space-y-4">
              {principles.map((principle, index) => (
                <Reveal key={index} delay={index * 0.05}>
                  <li className="flex items-start gap-3 glass p-4 rounded-lg border border-border/50">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{principle}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <ValuePropositionBackground />
          </div>
          <div className="container mx-auto max-w-2xl text-center">
            <Reveal>
              <div className="glass-strong p-10 rounded-2xl border border-primary/20">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Готовы от идеи к демо за 24 часа?
                </h2>
                <p className="text-foreground/70 mb-6">
                  Опишите задачу — получите документы и прототип в срок.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/#order">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
                    >
                      Заказать проект
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button size="lg" variant="outline" className="border-border/50">
                      На главную
                    </Button>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
