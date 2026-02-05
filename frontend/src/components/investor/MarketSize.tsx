import { BarChart3 } from 'lucide-react';
import { Reveal } from '@/components/common/Reveal';
import type { MarketSizeData } from '@/types';

interface MarketSizeProps {
  market: MarketSizeData;
}

export function MarketSize({ market }: MarketSizeProps) {
  const segments = [
    { label: 'TAM', value: market.tam, desc: 'Total Addressable Market', width: '100%' },
    { label: 'SAM', value: market.sam, desc: 'Serviceable Addressable Market', width: '60%' },
    { label: 'SOM', value: market.som, desc: 'Serviceable Obtainable Market', width: '30%' },
  ];

  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h2 className="text-2xl lg:text-3xl font-bold">Размер рынка</h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass rounded-2xl p-8 border border-border/50">
            <div className="space-y-6 mb-8">
              {segments.map((seg, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-primary uppercase">{seg.label}</span>
                      <span className="text-xs text-foreground/40">{seg.desc}</span>
                    </div>
                    <span className="text-lg font-bold">{seg.value}</span>
                  </div>
                  <div className="w-full bg-foreground/5 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                      style={{ width: seg.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-foreground/60 leading-relaxed">{market.description}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
