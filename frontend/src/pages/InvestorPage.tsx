import { useParams, Navigate } from 'react-router-dom';
import { getProjectBySlug } from '@/data/projects';
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { Breadcrumb } from '@/components/portfolio/Breadcrumb';
import { InvestorBackground } from '@/components/backgrounds/InvestorBackground';
import { InvestorHero } from '@/components/investor/InvestorHero';
import { ProblemSolution } from '@/components/investor/ProblemSolution';
import { TargetAudience } from '@/components/investor/TargetAudience';
import { MarketSize } from '@/components/investor/MarketSize';
import { MonetizationModel } from '@/components/investor/MonetizationModel';
import { CompetitiveAdvantages } from '@/components/investor/CompetitiveAdvantages';
import { FinancialProjections } from '@/components/investor/FinancialProjections';
import { InvestmentAsk } from '@/components/investor/InvestmentAsk';

export default function InvestorPage() {
  const { slug } = useParams<{ slug: string }>();
  const projectData = slug ? getProjectBySlug(slug) : null;

  if (!projectData) {
    return <Navigate to="/" replace />;
  }

  const { investor, detail } = projectData;

  const breadcrumbItems = [
    { label: 'Портфолио', href: '/#portfolio' },
    { label: detail.title, href: `/portfolio/${slug}` },
    { label: 'Инвестору' },
  ];

  return (
    <>
      <ScrollProgress />
      <Header />
      <InvestorBackground />
      <main className="relative z-10">
        <div className="pt-20">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <InvestorHero
          projectTitle={investor.projectTitle}
          tagline={investor.tagline}
          amount={investor.investmentAsk.amount}
          equity={investor.investmentAsk.equity}
        />

        <ProblemSolution
          problem={investor.problem}
          solution={investor.solution}
        />

        <TargetAudience audience={investor.targetAudience} />

        <MarketSize market={investor.marketSize} />

        <MonetizationModel models={investor.monetization} />

        <CompetitiveAdvantages advantages={investor.competitiveAdvantages} />

        <FinancialProjections projections={investor.financialProjections} />

        <InvestmentAsk investment={investor.investmentAsk} />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
