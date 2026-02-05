import { Reveal } from '@/components/common/Reveal';
import { AnimatedCounter } from '@/components/common/AnimatedCounter';
import type { ProjectDetail } from '@/types';

interface ProjectOverviewProps {
  project: ProjectDetail;
}

export function ProjectOverview({ project }: ProjectOverviewProps) {
  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Description */}
          <Reveal>
            <div className="lg:col-span-2">
              <h2 className="text-2xl lg:text-3xl font-bold mb-6">О проекте</h2>
              <div className="space-y-4 text-foreground/70 leading-relaxed text-lg">
                {project.description.split('\n\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Tech Badges */}
              <div className="mt-8 flex flex-wrap gap-2">
                {project.badges.map((badge, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Highlights */}
          <Reveal delay={0.2}>
            <div className="glass rounded-2xl p-6 lg:p-8 border border-border/50">
              <h3 className="text-lg font-semibold mb-6 text-foreground/80">Ключевые метрики</h3>
              <div className="grid grid-cols-2 gap-6">
                {project.highlights.map((highlight, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                      {/^\d+/.test(highlight.value) ? (
                        <AnimatedCounter end={parseInt(highlight.value)} suffix={highlight.value.replace(/^\d+/, '')} />
                      ) : (
                        highlight.value
                      )}
                    </div>
                    <div className="text-xs text-foreground/50">{highlight.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
