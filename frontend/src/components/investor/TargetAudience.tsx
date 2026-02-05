import { Users } from 'lucide-react';
import { Reveal } from '@/components/common/Reveal';
import type { TargetAudienceItem } from '@/types';

interface TargetAudienceProps {
  audience: TargetAudienceItem[];
}

export function TargetAudience({ audience }: TargetAudienceProps) {
  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-6 h-6 text-primary" />
            <h2 className="text-2xl lg:text-3xl font-bold">Целевая аудитория</h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {audience.map((item, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <div className="glass rounded-xl p-6 border border-border/50 h-full">
                <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {item.size}
                </div>
                <h3 className="text-lg font-semibold mb-3">{item.segment}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
