import { useState, lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { DataProvider, useData } from '@/contexts/DataContext';
import { Toaster } from 'sonner';

// Common components (loaded immediately)
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { ScrollToTop } from '@/components/common/ScrollToTop';

// Landing components
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { ValueProposition } from '@/components/landing/ValueProposition';
import { AIConceptModule } from '@/components/landing/AIConceptModule';
import { Services } from '@/components/landing/Services';
import { Portfolio } from '@/components/landing/Portfolio';
import { About } from '@/components/landing/About';
import { Personas } from '@/components/landing/Personas';
import { TechStack } from '@/components/landing/TechStack';
import { OrderForm } from '@/components/landing/OrderForm';
import { Footer } from '@/components/landing/Footer';
import { AgentSystemLanding } from '@/pages/AgentSystemLanding';
import { PageLoader } from '@/components/common/PageLoader';

// Portfolio sub-pages (lazy loaded)
const ProjectDetailPage = lazy(() => import('@/pages/ProjectDetailPage'));
const InvestorPage = lazy(() => import('@/pages/InvestorPage'));

// Admin components (lazy loaded)
const Login = lazy(() => import('@/components/admin/Login').then(m => ({ default: m.Login })));
const AdminLayout = lazy(() => import('@/components/admin/AdminLayout').then(m => ({ default: m.AdminLayout })));
const PortfolioList = lazy(() => import('@/components/admin/PortfolioList').then(m => ({ default: m.PortfolioList })));
const ServicesList = lazy(() => import('@/components/admin/ServicesList').then(m => ({ default: m.ServicesList })));
const ModulesList = lazy(() => import('@/components/admin/ModulesList').then(m => ({ default: m.ModulesList })));
const LandingSections = lazy(() => import('@/components/admin/LandingSections').then(m => ({ default: m.LandingSections })));
const OrdersList = lazy(() => import('@/components/admin/OrdersList').then(m => ({ default: m.OrdersList })));

type View = 'landing' | 'admin';
type AdminPage = 'portfolio' | 'services' | 'modules' | 'sections' | 'orders';

function MainLandingContent() {
  const { landingSections } = useData();
  const location = useLocation();
  const showAIConcept = landingSections.some(s => s.key === 'ai_concept' && s.isActive);

  // Прокрутка к якорю при переходе с /ai-concept на /#section
  useEffect(() => {
    const hash = location.hash?.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <ValueProposition />
        {showAIConcept && <AIConceptModule />}
        <Services />
        <Portfolio />
        <About />
        <Personas />
        <TechStack />
        <OrderForm />
      </main>
      <Footer />
      <ScrollToTop />
      <button
        onClick={() => (window as any).openAdmin?.()}
        className="fixed bottom-4 right-4 w-3 h-3 opacity-0 hover:opacity-10 transition-opacity"
        aria-label="Admin"
      />
    </>
  );
}

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPage, setAdminPage] = useState<AdminPage>('portfolio');

  // Admin link trigger (for demo purposes)
  const handleAdminAccess = () => {
    setView('admin');
  };

  // Check for admin access via URL or keyboard
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).openAdmin = handleAdminAccess;

      // Ctrl+Shift+A to open admin
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
          e.preventDefault();
          handleAdminAccess();
        }
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, []);

  const renderRoutes = () => (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/ai-concept" element={<AgentSystemLanding />} />
        <Route path="/portfolio/:slug/investor" element={<InvestorPage />} />
        <Route path="/portfolio/:slug" element={<ProjectDetailPage />} />
        <Route path="/*" element={<MainLandingContent />} />
      </Routes>
    </Suspense>
  );

  const renderAdmin = () => {
    if (!isAdminAuthenticated) {
      return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          <Login onLogin={() => setIsAdminAuthenticated(true)} />
        </Suspense>
      );
    }

    const renderAdminPage = () => {
      switch (adminPage) {
        case 'portfolio':
          return <PortfolioList />;
        case 'services':
          return <ServicesList />;
        case 'modules':
          return <ModulesList />;
        case 'sections':
          return <LandingSections />;
        case 'orders':
          return <OrdersList />;
        default:
          return <PortfolioList />;
      }
    };

    return (
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <AdminLayout
          currentPage={adminPage}
          onNavigate={(page) => setAdminPage(page as AdminPage)}
          onLogout={() => {
            setIsAdminAuthenticated(false);
            setView('landing');
          }}
        >
          <Suspense fallback={<div>Loading page...</div>}>
            {renderAdminPage()}
          </Suspense>
        </AdminLayout>
      </Suspense>
    );
  };

  return (
    <DataProvider>
      <div className="min-h-screen text-foreground">
        {view === 'landing' ? renderRoutes() : renderAdmin()}
        <Toaster />
      </div>
    </DataProvider>
  );
}