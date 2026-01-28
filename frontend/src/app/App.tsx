import { useState, lazy, Suspense } from 'react';
import { DataProvider } from '@/contexts/DataContext';
import { useEffect } from 'react';
import { Toaster } from 'sonner';

// Common components (loaded immediately)
import { ScrollProgress } from '@/components/common/ScrollProgress';
import { ScrollToTop } from '@/components/common/ScrollToTop';

// Landing components
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { ValueProposition } from '@/components/landing/ValueProposition';
import { Services } from '@/components/landing/Services';
import { Portfolio } from '@/components/landing/Portfolio';
import { About } from '@/components/landing/About';
import { Personas } from '@/components/landing/Personas';
import { TechStack } from '@/components/landing/TechStack';
import { OrderForm } from '@/components/landing/OrderForm';
import { Metrics } from '@/components/landing/Metrics';
import { Roadmap } from '@/components/landing/Roadmap';
import { Footer } from '@/components/landing/Footer';
import { AdminHint } from '@/components/landing/AdminHint';

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

  const renderLanding = () => (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <ValueProposition />
        <Services />
        <Portfolio />
        <About />
        <Personas />
        <TechStack />
        <OrderForm />
        <Metrics />
        <Roadmap />
      </main>
      <Footer />
      <ScrollToTop />
      
      {/* Hidden admin trigger */}
      <button
        onClick={handleAdminAccess}
        className="fixed bottom-4 right-4 w-3 h-3 opacity-0 hover:opacity-10 transition-opacity"
        aria-label="Admin"
      />
      <AdminHint />
    </>
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
        {view === 'landing' ? renderLanding() : renderAdmin()}
        <Toaster />
      </div>
    </DataProvider>
  );
}