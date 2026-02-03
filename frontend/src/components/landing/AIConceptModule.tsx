import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Reveal } from '@/components/common/Reveal';
import { ValuePropositionBackground } from '@/components/backgrounds/ValuePropositionBackground';

export function AIConceptModule() {
  return (
    <section id="ai-concept" className="relative py-20 lg:py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <ValuePropositionBackground />
      </div>
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="glass-strong p-8 sm:p-10 lg:p-12 rounded-2xl border border-primary/20 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/20 mb-4">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground/90">
                  AI-концепция 2026
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
                Современная AI концепция проектирования и разработки web-приложений
              </h2>
              <p className="text-foreground/70 text-lg max-w-xl">
                Реализую проекты с помощью агентской системы: за 24 часа — комплект
                архитектурной и бизнес-документации от сырой идеи + полный демо-прототип
                с финальным дизайном.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Link to="/ai-concept">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity text-base px-8 py-6 group"
                >
                  Подробнее об агентской системе
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform inline-block" />
                </Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
