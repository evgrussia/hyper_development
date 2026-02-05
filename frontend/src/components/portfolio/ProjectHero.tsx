import { motion } from 'motion/react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { Reveal } from '@/components/common/Reveal';
import type { ProjectDetail } from '@/types';

interface ProjectHeroProps {
  project: ProjectDetail;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <section className="relative pt-24 lg:pt-32 pb-12 lg:pb-20 px-4 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden">
            {/* Hero Image */}
            <div className="aspect-[21/9] relative">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="eager"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) parent.classList.add('bg-gradient-to-br', 'from-primary/20', 'to-accent/20');
                }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {/* Category Badge */}
                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold border border-primary/30">
                  {project.category}
                </span>
                {/* Status Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  project.status === 'live'
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : project.status === 'mvp'
                    ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    : 'bg-accent/20 text-accent border-accent/30'
                }`}>
                  {project.status === 'live' ? 'Live' : project.status === 'mvp' ? 'MVP' : 'Concept'}
                </span>
                {/* AI Badge */}
                {project.badges.includes('AI') && (
                  <span className="px-3 py-1 rounded-full glass-strong text-primary text-xs font-semibold border border-primary/30 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    AI-Powered
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {project.title}
              </h1>
              <p className="text-lg lg:text-xl text-foreground/70 mb-6 max-w-2xl">
                {project.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href={project.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold hover:opacity-90 transition-opacity"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Открыть сайт
                </motion.a>
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-border/50 text-foreground/80 font-semibold hover:text-foreground hover:border-primary/30 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </motion.a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
