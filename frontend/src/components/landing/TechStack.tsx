import { Code2, Database, Server, Shield, Layers, MessageSquare } from 'lucide-react';
import { TechStackBackground } from '@/components/backgrounds/TechStackBackground';

const techCategories = [
  {
    icon: Code2,
    title: 'Frontend',
    items: ['Vite', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    icon: Server,
    title: 'Backend',
    items: ['Django', 'Python', 'REST API', 'DRF'],
  },
  {
    icon: Database,
    title: 'База данных',
    items: ['PostgreSQL', 'Redis', 'SQLite (MVP)'],
  },
  {
    icon: Shield,
    title: 'Инфраструктура',
    items: ['Nginx', 'VPS', 'SSL Let\'s Encrypt', 'Docker'],
  },
  {
    icon: Layers,
    title: 'Архитектура',
    items: ['DDD', 'Clean Architecture', 'SOLID', 'Модульный монолит'],
  },
  {
    icon: MessageSquare,
    title: 'Интеграции',
    items: ['Telegram Bot API', 'Webhook', 'REST', 'WebSocket'],
  },
];

export function TechStack() {
  return (
    <section id="tech" className="relative py-20 lg:py-32 px-4 bg-gradient-to-b from-transparent to-background overflow-hidden">
      {/* Interactive Background */}
      <div className="absolute inset-0 -z-10">
        <TechStackBackground />
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Стек и инфраструктура
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Современные технологии для надёжных решений
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((category, index) => (
            <div
              key={index}
              className="glass p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm bg-primary/10 hover:bg-primary/20 rounded-full text-foreground/80 transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional tech info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-xl border border-border/50">
            <h4 className="font-semibold mb-3 text-primary">Масштабирование</h4>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Облако, Kubernetes (Helm), Kong API Gateway, Kafka, Istio Service Mesh, CI/CD с автоматическим деплоем
            </p>
          </div>
          <div className="glass p-6 rounded-xl border border-border/50">
            <h4 className="font-semibold mb-3 text-accent">Сложные системы</h4>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Финтех, распределённые системы, Saga Pattern, CQRS, Event Sourcing, микросервисы
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}