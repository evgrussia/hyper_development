import { TrendingUp, Eye, Clock, Target } from 'lucide-react';
import { MetricsBackground } from '@/components/backgrounds/MetricsBackground';

const metrics = [
  {
    icon: TrendingUp,
    label: 'Конверсия в заказ',
    value: '~15%',
    description: 'От просмотра до отправки формы',
  },
  {
    icon: Eye,
    label: 'Просмотры секций',
    value: '85%',
    description: 'Услуги и Портфолио',
  },
  {
    icon: Clock,
    label: 'Время ответа',
    value: '<2ч',
    description: 'Первый ответ в Telegram',
  },
  {
    icon: Target,
    label: 'North Star',
    value: '10+',
    description: 'Квалифицированных заказов в месяц',
  },
];

export function Metrics() {
  return (
    <section id="metrics" className="relative py-20 lg:py-32 px-4 bg-gradient-to-b from-background to-transparent overflow-hidden">
      {/* Interactive Background */}
      <div className="absolute inset-0 -z-10">
        <MetricsBackground />
      </div>
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Метрики успеха
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Измеряем то, что важно
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="glass p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 text-center group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <metric.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {metric.value}
              </div>
              <div className="font-semibold mb-2">{metric.label}</div>
              <p className="text-sm text-foreground/60">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}