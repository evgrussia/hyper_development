import { Clock, Layers, MessageSquare, Rocket } from 'lucide-react';
import { ValuePropositionBackground } from '@/components/backgrounds/ValuePropositionBackground';

const values = [
  {
    icon: Clock,
    title: 'За 24 часа',
    description: 'Полный комплект документов (Продукт, Архитектура, Бизнес, Дизайн, Маркетинг, Исследования) + промо-сайт + демо со всеми экранами',
  },
  {
    icon: Layers,
    title: 'Модульный заказ',
    description: 'Выбирайте только нужные модули из каталога. Без лишних шагов и переплат. Гибкая комплектация под ваши задачи',
  },
  {
    icon: MessageSquare,
    title: 'Уведомления в Telegram',
    description: 'Получайте все обновления и заказы прямо в Telegram webapp. Быстрая коммуникация без email и звонков',
  },
  {
    icon: Rocket,
    title: 'MVP за неделю',
    description: 'MVP в эксплуатацию ~через неделю после согласования. DDD, Clean Architecture, готовность к масштабированию',
  },
];

export function ValueProposition() {
  return (
    <section id="value" className="relative py-20 lg:py-32 px-4 overflow-hidden">
      {/* Interactive Background */}
      <div className="absolute inset-0 -z-10">
        <ValuePropositionBackground />
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Как мы работаем
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Авторская AI-агентская система разработки. Максимум автоматизации, минимум времени
          </p>
        </div>

        {/* Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="glass p-8 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional highlight */}
        <div className="mt-12 glass-strong p-8 rounded-xl border border-primary/20 text-center">
          <p className="text-lg font-medium">
            <span className="text-primary">SOLID</span>, <span className="text-accent">DRY</span>, <span className="text-primary">KISS</span> —
            чистая архитектура, готовая к росту и изменениям
          </p>
        </div>
      </div>
    </section>
  );
}