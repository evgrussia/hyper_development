import { AlertTriangle, Lightbulb } from 'lucide-react';
import { Reveal } from '@/components/common/Reveal';

interface ProblemSolutionProps {
  problem: string;
  solution: string;
}

export function ProblemSolution({ problem, solution }: ProblemSolutionProps) {
  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Problem */}
          <Reveal>
            <div className="glass rounded-2xl p-8 border border-destructive/20 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                </div>
                <h2 className="text-xl font-bold text-destructive">Проблема</h2>
              </div>
              <p className="text-foreground/70 leading-relaxed text-lg">{problem}</p>
            </div>
          </Reveal>

          {/* Solution */}
          <Reveal delay={0.15}>
            <div className="glass rounded-2xl p-8 border border-green-500/20 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-green-400" />
                </div>
                <h2 className="text-xl font-bold text-green-400">Решение</h2>
              </div>
              <p className="text-foreground/70 leading-relaxed text-lg">{solution}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
