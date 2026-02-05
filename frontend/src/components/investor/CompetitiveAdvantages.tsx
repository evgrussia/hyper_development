import { Shield, Check } from 'lucide-react';
import { Reveal } from '@/components/common/Reveal';

interface CompetitiveAdvantagesProps {
  advantages: string[];
}

export function CompetitiveAdvantages({ advantages }: CompetitiveAdvantagesProps) {
  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-6 h-6 text-primary" />
            <h2 className="text-2xl lg:text-3xl font-bold">Конкурентные преимущества</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {advantages.map((advantage, index) => (
            <Reveal key={index} delay={index * 0.08}>
              <div className="glass rounded-xl p-5 border border-border/50 flex items-start gap-4 h-full">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed">{advantage}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
