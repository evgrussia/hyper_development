import { CheckSquare, Clock } from 'lucide-react';
import { RoadmapBackground } from '@/components/backgrounds/RoadmapBackground';

const roadmapItems = [
  'Мультиязычность (EN)',
  'Платёжная система на сайте',
  'Личный кабинет заказчика',
  'Интеграция с CRM (кроме Telegram)',
];

export function Roadmap() {
  return (
    <section className="relative py-20 lg:py-32 px-4 overflow-hidden">
      {/* Interactive Background */}
      <div className="absolute inset-0 -z-10">
        <RoadmapBackground />
      </div>
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            В планах
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Развитие платформы и новые возможности
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto">
          {roadmapItems.map((item, index) => (
            <div
              key={index}
              className="glass p-6 rounded-xl border border-border/50 hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-foreground/40" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground/70">{item}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 glass-strong p-6 rounded-xl border border-border/50 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-2">
            <CheckSquare className="w-5 h-5 text-primary" />
            <p className="font-semibold">Текущий фокус</p>
          </div>
          <p className="text-sm text-foreground/70">
            Сейчас основной приоритет — качественная разработка MVP и документация за 24 часа.
            Дополнительные функции будут добавлены после стабилизации ядра продукта.
          </p>
        </div>
      </div>
    </section>
  );
}