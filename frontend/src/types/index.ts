// Types for the application

export interface Service {
  id: string;
  title: string;
  description: string;
  order: number;
  isActive: boolean;
}

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  link: string;
  image?: string;
  order: number;
  isActive: boolean;
}

export interface OrderModule {
  id: string;
  name: string;
  order: number;
  isActive: boolean;
}

export interface Order {
  id: string;
  name: string;
  contact: string;
  description: string;
  modules: string[];
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface LandingSection {
  key: string;
  name: string;
  isActive: boolean;
  order: number;
}

// ── Project Detail Types ──

export interface TechStackItem {
  category: string;
  items: string[];
}

export interface ProjectFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ProjectHighlight {
  value: string;
  label: string;
}

export interface ProjectDetail {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  siteUrl: string;
  githubUrl: string;
  screenshots: string[];
  heroImage: string;
  techStack: TechStackItem[];
  features: ProjectFeature[];
  highlights: ProjectHighlight[];
  category: string;
  badges: string[];
  status: 'live' | 'mvp' | 'concept';
}

// ── Investor Page Types ──

export interface TargetAudienceItem {
  segment: string;
  size: string;
  description: string;
}

export interface MarketSizeData {
  tam: string;
  sam: string;
  som: string;
  description: string;
}

export interface MonetizationModel {
  model: string;
  description: string;
  price?: string;
}

export interface FinancialProjection {
  period: string;
  revenue: string;
  users: string;
  note?: string;
}

export interface InvestmentAsk {
  amount: string;
  equity?: string;
  useOfFunds: string[];
  contactCta: string;
}

export interface InvestorData {
  slug: string;
  projectTitle: string;
  tagline: string;
  problem: string;
  solution: string;
  targetAudience: TargetAudienceItem[];
  marketSize: MarketSizeData;
  monetization: MonetizationModel[];
  competitiveAdvantages: string[];
  financialProjections: FinancialProjection[];
  investmentAsk: InvestmentAsk;
  teamHighlights: string[];
}
