import { motion } from 'motion/react';
import { ExternalLink, Github, FileText } from 'lucide-react';
import { Reveal } from '@/components/common/Reveal';
import type { ProjectDetail } from '@/types';

interface ProjectLinksProps {
  project: ProjectDetail;
}

export function ProjectLinks({ project }: ProjectLinksProps) {
  const links = [
    {
      icon: ExternalLink,
      label: 'Открыть сайт проекта',
      description: project.siteUrl.replace('https://', ''),
      href: project.siteUrl,
    },
    {
      icon: Github,
      label: 'Репозиторий на GitHub',
      description: 'Код и документация проекта',
      href: project.githubUrl,
    },
    {
      icon: FileText,
      label: 'Документация',
      description: 'PRD, Vision, архитектура',
      href: `${project.githubUrl}/tree/main/docs`,
    },
  ];

  return (
    <section className="py-16 lg:py-24 px-4">
      <div className="container mx-auto max-w-7xl">
        <Reveal>
          <h2 className="text-2xl lg:text-3xl font-bold mb-8">Ссылки</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <motion.a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-all group flex items-start gap-4"
                whileHover={{ y: -4 }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <link.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{link.label}</h3>
                  <p className="text-sm text-foreground/50 mt-1">{link.description}</p>
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
