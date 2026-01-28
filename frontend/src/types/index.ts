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
