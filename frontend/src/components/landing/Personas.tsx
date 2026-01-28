import { Rocket, Building2, TrendingUp } from 'lucide-react';
import { PersonasBackground } from '@/components/backgrounds/PersonasBackground';

const personas = [
  {
    icon: Rocket,
    title: 'Заказчик MVP',
    goal: 'Быстрый MVP с выбором модулей',
    description: 'Нужен прототип для проверки идеи или получения гранта. Важна скорость и возможность выбрать только нужные функции.',
    needs: ['Просмотр кейсов', 'Выбор модулей', 'Быстрая разработка'],
  },
  {
    icon: Building2,
    title: 'Бизнес-заказчик',
    goal: 'Рефакторинг и интеграции',
    description: 'Есть продукт, нужно обновить стек, добавить функции или интегрировать с другими системами.',
    needs: ['Понять услуги', 'Оценить опыт', 'Оставить заявку'],
  },
  {
    icon: TrendingUp,
    title: 'Грантодержатель',
    goal: 'Документация и реализация под грант',
    description: 'Получен грант, нужна документация и техническая реализация в срок. Важна экспертиза и поддержка.',
    needs: ['24ч документы', 'Грантовое сопровождение', 'Соблюдение сроков'],
  },
];

export function Personas() {
  return (
    <section id="personas" className="relative py-20 lg:py-32 px-4 overflow-hidden">
      {/* Interactive Background */}
      <div className="absolute inset-0 -z-10">
        <PersonasBackground />
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Для кого
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Мы работаем с разными типами заказчиков
          </p>
        </div>

        {/* Personas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {personas.map((persona, index) => (
            <div
              key={index}
              className="glass p-8 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <persona.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mb-2">{persona.title}</h3>

              {/* Goal */}
              <p className="text-primary font-medium mb-4">{persona.goal}</p>

              {/* Description */}
              <p className="text-foreground/70 mb-6 leading-relaxed">
                {persona.description}
              </p>

              {/* Needs */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground/60 uppercase tracking-wide">
                  Потребности:
                </p>
                <ul className="space-y-2">
                  {persona.needs.map((need, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground/70">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                      {need}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}