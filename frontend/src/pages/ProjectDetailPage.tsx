import { useParams, Navigate } from 'react-router-dom';
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { Breadcrumb } from '@/components/portfolio/Breadcrumb';
import { ProjectHero } from '@/components/portfolio/ProjectHero';
import { ProjectOverview } from '@/components/portfolio/ProjectOverview';
import { ProjectScreenshots } from '@/components/portfolio/ProjectScreenshots';
import { ProjectTechStack } from '@/components/portfolio/ProjectTechStack';
import { ProjectFeatures } from '@/components/portfolio/ProjectFeatures';
import { ProjectLinks } from '@/components/portfolio/ProjectLinks';
import { InvestorCTA } from '@/components/portfolio/InvestorCTA';
import { ProjectDetailBackground } from '@/components/backgrounds/ProjectDetailBackground';
import { getProjectBySlug } from '@/data/projects';

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const projectData = slug ? getProjectBySlug(slug) : null;

  if (!projectData) {
    return <Navigate to="/" replace />;
  }

  const { detail } = projectData;

  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="relative">
        <div className="absolute inset-0 -z-10">
          <ProjectDetailBackground />
        </div>

        {/* Breadcrumb */}
        <div className="container mx-auto max-w-7xl px-4 pt-24 lg:pt-28">
          <Breadcrumb
            items={[
              { label: 'Портфолио', href: '/#portfolio' },
              { label: detail.title },
            ]}
          />
        </div>

        <ProjectHero project={detail} />
        <ProjectOverview project={detail} />
        <ProjectFeatures features={detail.features} />
        <ProjectTechStack techStack={detail.techStack} />
        <ProjectScreenshots screenshots={detail.screenshots} title={detail.title} />
        <ProjectLinks project={detail} />
        <InvestorCTA slug={detail.slug} projectTitle={detail.title} />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
