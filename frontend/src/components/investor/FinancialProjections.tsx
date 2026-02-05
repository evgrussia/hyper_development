import { TrendingUp } from 'lucide-react';
import { Reveal } from '@/components/common/Reveal';
import type { FinancialProjection } from '@/types';

interface FinancialProjectionsProps {
  projections: FinancialProjection[];
}

export function FinancialProjections({ projections }: FinancialProjectionsProps) {
  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-2xl lg:text-3xl font-bold">Финансовые прогнозы</h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass rounded-xl border border-border/50 overflow-hidden">
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground/60">Период</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground/60">Выручка</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground/60">Пользователи</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-foreground/60">Примечание</th>
                  </tr>
                </thead>
                <tbody>
                  {projections.map((projection, index) => (
                    <tr
                      key={index}
                      className={index < projections.length - 1 ? 'border-b border-border/30' : ''}
                    >
                      <td className="px-6 py-4 font-medium">{projection.period}</td>
                      <td className="px-6 py-4 text-primary font-semibold">{projection.revenue}</td>
                      <td className="px-6 py-4 text-accent font-semibold">{projection.users}</td>
                      <td className="px-6 py-4 text-foreground/50 text-sm">{projection.note || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-border/30">
              {projections.map((projection, index) => (
                <div key={index} className="p-5 space-y-3">
                  <div className="font-semibold text-lg">{projection.period}</div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60 text-sm">Выручка</span>
                    <span className="text-primary font-semibold">{projection.revenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60 text-sm">Пользователи</span>
                    <span className="text-accent font-semibold">{projection.users}</span>
                  </div>
                  {projection.note && (
                    <p className="text-foreground/50 text-sm">{projection.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
