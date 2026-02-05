import { Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Reveal } from '@/components/common/Reveal';
import type { InvestmentAsk as InvestmentAskType } from '@/types';

interface InvestmentAskProps {
  investment: InvestmentAskType;
}

export function InvestmentAsk({ investment }: InvestmentAskProps) {
  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-2xl" />
            <div className="relative m-[1px] rounded-2xl bg-background/95 backdrop-blur-sm p-8 lg:p-12">
              <div className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium">
                  <Rocket className="w-4 h-4" />
                  Инвестиционный запрос
                </div>

                <div className="space-y-2">
                  <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {investment.amount}
                  </h2>
                  {investment.equity && (
                    <p className="text-foreground/60">{investment.equity}</p>
                  )}
                </div>

                <div className="space-y-3 text-left max-w-md mx-auto">
                  <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider text-center">
                    Использование средств
                  </h3>
                  {investment.useOfFunds.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-foreground/80 text-sm">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    to="/#order"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-lg hover:opacity-90 transition-opacity"
                  >
                    {investment.contactCta}
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
