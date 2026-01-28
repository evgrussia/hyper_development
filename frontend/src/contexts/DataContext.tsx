import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { initialPortfolio as defaultPortfolio } from '@/data/initialPortfolio';
import type { Service, PortfolioItem, OrderModule, Order, LandingSection } from '@/types';

// Re-export types for convenience
export type { Service, PortfolioItem, OrderModule, Order, LandingSection };

interface DataContextType {
  services: Service[];
  portfolio: PortfolioItem[];
  orderModules: OrderModule[];
  orders: Order[];
  landingSections: LandingSection[];
  addService: (service: Omit<Service, 'id'>) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  addPortfolio: (item: Omit<PortfolioItem, 'id'>) => void;
  updatePortfolio: (id: string, item: Partial<PortfolioItem>) => void;
  deletePortfolio: (id: string) => void;
  addOrderModule: (module: Omit<OrderModule, 'id'>) => void;
  updateOrderModule: (id: string, module: Partial<OrderModule>) => void;
  deleteOrderModule: (id: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void;
  updateOrder: (id: string, order: Partial<Order>) => void;
  updateLandingSection: (key: string, section: Partial<LandingSection>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialServices: Service[] = [
  {
    id: '1',
    title: 'Проработка идеи и документация',
    description: 'Полный комплект документов: Продукт, Архитектура, Бизнес, Дизайн, Маркетинг, Исследования',
    order: 1,
    isActive: true,
  },
  {
    id: '2',
    title: 'За 24 часа',
    description: 'Комплект документов + промо-сайт + демо со всеми экранами за 24 часа',
    order: 2,
    isActive: true,
  },
  {
    id: '3',
    title: 'Разработка под ключ',
    description: 'От идеи до MVP и продакшен. Полный цикл разработки',
    order: 3,
    isActive: true,
  },
  {
    id: '4',
    title: 'MVP и грантовое сопровождение',
    description: 'MVP-разработка с подготовкой документации для грантов',
    order: 4,
    isActive: true,
  },
  {
    id: '5',
    title: 'Рефакторинг и миграция',
    description: 'Обновление стека, интеграции, переход с монолита на микросервисы',
    order: 5,
    isActive: true,
  },
  {
    id: '6',
    title: 'Telegram webapp и масштабирование',
    description: 'Подготовка к нагрузке: облако, Helm, Kong, Kafka, Istio, CI/CD',
    order: 6,
    isActive: true,
  },
  {
    id: '7',
    title: 'Финтех и распределённые системы',
    description: 'Сложные распределённые системы с Saga, CQRS',
    order: 7,
    isActive: true,
  },
];

const initialOrderModules: OrderModule[] = [
  { id: '1', name: 'Документация', order: 1, isActive: true },
  { id: '2', name: 'Дизайн', order: 2, isActive: true },
  { id: '3', name: 'MVP разработка', order: 3, isActive: true },
  { id: '4', name: 'Поддержка', order: 4, isActive: true },
  { id: '5', name: 'Рефакторинг', order: 5, isActive: true },
  { id: '6', name: 'Грантовое сопровождение', order: 6, isActive: true },
];

const initialLandingSections: LandingSection[] = [
  { key: 'hero', name: 'Герой', isActive: true, order: 1 },
  { key: 'value', name: 'Ценность', isActive: true, order: 2 },
  { key: 'services', name: 'Услуги', isActive: true, order: 3 },
  { key: 'portfolio', name: 'Портфолио', isActive: true, order: 4 },
  { key: 'about', name: 'О разработчике', isActive: true, order: 5 },
  { key: 'personas', name: 'Для кого', isActive: true, order: 6 },
  { key: 'tech', name: 'Стек', isActive: true, order: 7 },
  { key: 'order', name: 'Форма заказа', isActive: true, order: 8 },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>(() => {
    const saved = localStorage.getItem('services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(() => {
    const saved = localStorage.getItem('portfolio');
    if (saved) {
      return JSON.parse(saved);
    }
    // Convert initial portfolio to include IDs
    return defaultPortfolio.map((item, index) => ({
      ...item,
      id: `portfolio-${index + 1}`,
    }));
  });

  const [orderModules, setOrderModules] = useState<OrderModule[]>(() => {
    const saved = localStorage.getItem('orderModules');
    return saved ? JSON.parse(saved) : initialOrderModules;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [landingSections, setLandingSections] = useState<LandingSection[]>(() => {
    const saved = localStorage.getItem('landingSections');
    return saved ? JSON.parse(saved) : initialLandingSections;
  });

  // Debounce values for localStorage
  const debouncedServices = useDebounce(services, 500);
  const debouncedPortfolio = useDebounce(portfolio, 500);
  const debouncedOrderModules = useDebounce(orderModules, 500);
  const debouncedOrders = useDebounce(orders, 500);
  const debouncedLandingSections = useDebounce(landingSections, 500);

  // Save to localStorage with debounce
  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(debouncedServices));
  }, [debouncedServices]);

  useEffect(() => {
    localStorage.setItem('portfolio', JSON.stringify(debouncedPortfolio));
  }, [debouncedPortfolio]);

  useEffect(() => {
    localStorage.setItem('orderModules', JSON.stringify(debouncedOrderModules));
  }, [debouncedOrderModules]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(debouncedOrders));
  }, [debouncedOrders]);

  useEffect(() => {
    localStorage.setItem('landingSections', JSON.stringify(debouncedLandingSections));
  }, [debouncedLandingSections]);

  // Memoized callbacks
  const addService = useCallback((service: Omit<Service, 'id'>) => {
    const newService = { ...service, id: Date.now().toString() };
    setServices(prev => [...prev, newService]);
  }, []);

  const updateService = useCallback((id: string, service: Partial<Service>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...service } : s));
  }, []);

  const deleteService = useCallback((id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  }, []);

  const addPortfolio = useCallback((item: Omit<PortfolioItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setPortfolio(prev => [...prev, newItem]);
  }, []);

  const updatePortfolio = useCallback((id: string, item: Partial<PortfolioItem>) => {
    setPortfolio(prev => prev.map(p => p.id === id ? { ...p, ...item } : p));
  }, []);

  const deletePortfolio = useCallback((id: string) => {
    setPortfolio(prev => prev.filter(p => p.id !== id));
  }, []);

  const addOrderModule = useCallback((module: Omit<OrderModule, 'id'>) => {
    const newModule = { ...module, id: Date.now().toString() };
    setOrderModules(prev => [...prev, newModule]);
  }, []);

  const updateOrderModule = useCallback((id: string, module: Partial<OrderModule>) => {
    setOrderModules(prev => prev.map(m => m.id === id ? { ...m, ...module } : m));
  }, []);

  const deleteOrderModule = useCallback((id: string) => {
    setOrderModules(prev => prev.filter(m => m.id !== id));
  }, []);

  const addOrder = useCallback((order: Omit<Order, 'id' | 'createdAt'>) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [...prev, newOrder]);
  }, []);

  const updateOrder = useCallback((id: string, order: Partial<Order>) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...order } : o));
  }, []);

  const updateLandingSection = useCallback((key: string, section: Partial<LandingSection>) => {
    setLandingSections(prev =>
      prev.map(s => s.key === key ? { ...s, ...section } : s)
    );
  }, []);

  // Memoize context value
  const value = useMemo(
    () => ({
      services,
      portfolio,
      orderModules,
      orders,
      landingSections,
      addService,
      updateService,
      deleteService,
      addPortfolio,
      updatePortfolio,
      deletePortfolio,
      addOrderModule,
      updateOrderModule,
      deleteOrderModule,
      addOrder,
      updateOrder,
      updateLandingSection,
    }),
    [
      services,
      portfolio,
      orderModules,
      orders,
      landingSections,
      addService,
      updateService,
      deleteService,
      addPortfolio,
      updatePortfolio,
      deletePortfolio,
      addOrderModule,
      updateOrderModule,
      deleteOrderModule,
      addOrder,
      updateOrder,
      updateLandingSection,
    ]
  );

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}