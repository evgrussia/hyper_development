import type { ProjectDetail, InvestorData } from '@/types';

export const projectDetail: ProjectDetail = {
  slug: 'kraft-market',
  title: 'Крафт-Маркет',
  subtitle: 'Гиперлокальный маркетплейс handmade',
  description: 'Крафт-Маркет — гиперлокальный маркетплейс для изделий ручной работы, реализованный как Telegram WebApp. Платформа объединяет мастеров и покупателей в рамках конкретного города или района, обеспечивая локальную доставку и живой контакт.\n\nСистема безопасных сделок через эскроу защищает обе стороны, а автоматическое формирование чеков обеспечивает соответствие 54-ФЗ. Каждый мастер получает персональную витрину с историей создания изделий и процессом работы.\n\nПлатформа фокусируется на handmade-категориях: керамика, авторская выпечка, украшения, текстиль, деревянные изделия. Геопривязка помогает покупателям находить мастеров рядом с домом.',
  siteUrl: 'https://kraft-market-city.ru',
  githubUrl: 'https://github.com/evgrussia/kraft-market',
  screenshots: ['/portfolio/kraft-market/hero.svg'],
  heroImage: '/portfolio/kraft-market/hero.svg',
  techStack: [
    { category: 'Backend', items: ['Python', 'Django', 'PostgreSQL', 'Redis'] },
    { category: 'Frontend', items: ['TypeScript', 'React', 'Telegram WebApp SDK', 'Tailwind CSS'] },
    { category: 'Payments', items: ['YooKassa', 'Эскроу-система', '54-ФЗ онлайн-чеки'] },
    { category: 'Infrastructure', items: ['Docker', 'Nginx', 'VPS', 'Геолокация API'] },
  ],
  features: [
    { icon: 'MapPin', title: 'Гиперлокальность', description: 'Поиск мастеров и товаров в вашем городе и районе с геопривязкой' },
    { icon: 'Shield', title: 'Эскроу-сделки', description: 'Безопасная оплата: деньги переводятся мастеру только после подтверждения получения' },
    { icon: 'Receipt', title: '54-ФЗ', description: 'Автоматическое формирование онлайн-чеков в соответствии с законодательством' },
    { icon: 'User', title: 'Витрина мастера', description: 'Персональная страница с историей, процессом создания и отзывами покупателей' },
    { icon: 'MessageCircle', title: 'Telegram-native', description: 'Полная интеграция с Telegram — покупки без установки отдельного приложения' },
    { icon: 'Truck', title: 'Локальная доставка', description: 'Курьерская доставка в пределах города или самовывоз от мастера' },
  ],
  highlights: [
    { value: '54-ФЗ', label: 'Онлайн-чеки' },
    { value: 'Эскроу', label: 'Безопасность' },
    { value: 'Гео', label: 'Локальность' },
    { value: '0 ₽', label: 'Старт для мастера' },
  ],
  category: 'Marketplace',
  badges: ['Marketplace', 'Geo', 'Local', 'Telegram'],
  status: 'concept',
};

export const investorData: InvestorData = {
  slug: 'kraft-market',
  projectTitle: 'Крафт-Маркет',
  tagline: 'Гиперлокальный маркетплейс handmade в Telegram',
  problem: 'Рынок handmade в России оценивается в ₽150+ млрд, но 80% мастеров продают через Instagram и Avito без защиты сделок, онлайн-касс и удобной витрины. Покупатели не могут найти качественные изделия рядом с домом, а мастера теряют до 30% выручки на комиссиях маркетплейсов.',
  solution: 'Крафт-Маркет — первый гиперлокальный маркетплейс в Telegram, специализированный на handmade. Эскроу защищает обе стороны, 54-ФЗ решён автоматически, геопривязка создаёт локальные сообщества мастеров и покупателей. Нулевой порог входа для мастеров.',
  targetAudience: [
    { segment: 'Мастера handmade', size: '2M+', description: 'Ремесленники, продающие керамику, выпечку, украшения, текстиль и декор' },
    { segment: 'Покупатели handmade', size: '15M+', description: 'Ценители уникальных изделий ручной работы, предпочитающие локальные покупки' },
    { segment: 'Подарочный сегмент', size: '10M+', description: 'Покупатели уникальных подарков: персонализация, авторские изделия' },
  ],
  marketSize: {
    tam: '₽150 млрд',
    sam: '₽30 млрд',
    som: '₽1.5 млрд',
    description: 'Рынок handmade растёт на 15-20% в год. Гиперлокальный сегмент практически не занят конкурентами.',
  },
  monetization: [
    { model: 'Комиссия с продаж', description: 'Процент с каждой успешной сделки через эскроу', price: '8-12%' },
    { model: 'Продвижение', description: 'Платное продвижение витрины мастера в ленте и поиске', price: 'от ₽299/нед' },
    { model: 'Premium-витрина', description: 'Расширенная витрина: видео, stories, аналитика продаж', price: '₽490/мес' },
  ],
  competitiveAdvantages: [
    'Единственный гиперлокальный маркетплейс handmade в Telegram',
    'Эскроу-сделки — защита мастера и покупателя',
    'Автоматическое соответствие 54-ФЗ — онлайн-чеки без забот',
    'Telegram-native — аудитория 80M+ без установки приложения',
    'Истории мастеров — эмоциональная связь с покупателем',
  ],
  financialProjections: [
    { period: 'Месяц 6', revenue: '₽800K MRR', users: '500 мастеров', note: 'Пилот в 3 городах' },
    { period: 'Месяц 12', revenue: '₽5M MRR', users: '3,000 мастеров', note: '10 городов' },
    { period: 'Месяц 24', revenue: '₽25M MRR', users: '15,000 мастеров', note: 'Все города-миллионники' },
  ],
  investmentAsk: {
    amount: '₽10M',
    equity: '15%',
    useOfFunds: [
      'Разработка платформы и эскроу-системы — 40%',
      'Маркетинг и привлечение мастеров — 30%',
      'Интеграция с платёжными системами и 54-ФЗ — 15%',
      'Операционные расходы — 15%',
    ],
    contactCta: 'Обсудить инвестиции в Крафт-Маркет',
  },
  teamHighlights: [
    'Fullstack-разработчик с опытом в маркетплейсах и платёжных интеграциях',
    'Экспертиза в Telegram WebApp и геолокационных сервисах',
    'Опыт работы с YooKassa и 54-ФЗ',
  ],
};
