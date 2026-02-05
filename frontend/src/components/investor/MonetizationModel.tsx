import { DollarSign } from 'lucide-react';
import { Reveal } from '@/components/common/Reveal';
import type { MonetizationModel as MonetizationModelType } from '@/types';

interface MonetizationModelProps {
  models: MonetizationModelType[];
}

export function MonetizationModel({ models }: MonetizationModelProps) {
  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <DollarSign className="w-6 h-6 text-primary" />
            <h2 className="text-2xl lg:text-3xl font-bold">Модель монетизации</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {models.map((model, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className="glass rounded-xl p-6 border border-border/50 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">{model.model}</h3>
                  {model.price && (
                    <span className="text-primary font-bold text-lg">{model.price}</span>
                  )}
                </div>
                <p className="text-foreground/60 text-sm leading-relaxed flex-1">{model.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
