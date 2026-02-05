import type { ProjectDetail, InvestorData } from '@/types';

export const projectDetail: ProjectDetail = {
  slug: 'vkus-robot',
  title: 'Вкус-Робот',
  subtitle: 'AI-повар с распознаванием продуктов',
  description: 'Вкус-Робот — AI-ассистент в Telegram, который генерирует персонализированные рецепты на основе фото содержимого холодильника. Computer vision распознаёт ингредиенты, а LLM создаёт пошаговые инструкции с таймерами.\n\nСистема адаптируется под диетические ограничения пользователя, рассчитывает КБЖУ каждого рецепта и поддерживает голосовое управление для удобства на кухне. Интеграция с сервисами доставки позволяет заказать недостающие продукты.\n\nFrontend реализован на React с Tailwind CSS, бэкенд развёрнут на VPS с Docker. Платежи через YooKassa с поддержкой TON blockchain.',
  siteUrl: 'https://vkus-robot.ru',
  githubUrl: 'https://github.com/evgrussia/vkus-robot',
  screenshots: ['/portfolio/vkus-robot/hero.svg'],
  heroImage: '/portfolio/vkus-robot/hero.svg',
  techStack: [
    { category: 'Backend', items: ['Python', 'FastAPI', 'PostgreSQL', 'Redis'] },
    { category: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Telegram WebApp SDK'] },
    { category: 'AI/ML', items: ['Computer Vision', 'LLM (GPT-4o)', 'Whisper STT', 'TTS'] },
    { category: 'Infrastructure', items: ['Docker', 'Nginx', 'VPS Ubuntu 24.04', 'YooKassa', 'TON'] },
  ],
  features: [
    { icon: 'Camera', title: 'Фото → Рецепт', description: 'Сфотографируйте холодильник — AI распознает продукты и предложит рецепты' },
    { icon: 'Timer', title: 'Пошаговые инструкции', description: 'Детальные шаги приготовления с таймерами для каждого этапа' },
    { icon: 'Apple', title: 'КБЖУ и диеты', description: 'Автоматический расчёт калорий и нутриентов, адаптация под диетические ограничения' },
    { icon: 'Mic', title: 'Голосовое управление', description: 'Hands-free взаимодействие на кухне — спрашивайте и управляйте голосом' },
    { icon: 'ShoppingCart', title: 'Заказ продуктов', description: 'Интеграция с доставкой — закажите недостающие ингредиенты в один клик' },
    { icon: 'Heart', title: 'Персонализация', description: 'Система учится на ваших предпочтениях и предлагает всё более точные рецепты' },
  ],
  highlights: [
    { value: 'CV', label: 'Распознавание' },
    { value: 'КБЖУ', label: 'Расчёт' },
    { value: 'Голос', label: 'Управление' },
    { value: '50M+', label: 'Потенциал рынка' },
  ],
  category: 'FoodTech',
  badges: ['AI', 'FoodTech', 'Voice', 'Telegram'],
  status: 'concept',
};

export const investorData: InvestorData = {
  slug: 'vkus-robot',
  projectTitle: 'Вкус-Робот',
  tagline: 'AI-повар: рецепты из фото холодильника за секунды',
  problem: '80% людей ежедневно задают себе вопрос «Что приготовить?». При этом 30% купленных продуктов выбрасываются из-за того, что люди не знают, как их использовать. Существующие кулинарные приложения предлагают рецепты без учёта реальных продуктов дома.',
  solution: 'Вкус-Робот переворачивает подход: сначала продукты, потом рецепт. Фото холодильника → AI распознаёт ингредиенты → генерирует персонализированный рецепт с КБЖУ. Голосовое управление на кухне, интеграция с доставкой недостающих продуктов.',
  targetAudience: [
    { segment: 'Здоровьесознательные', size: '20M+', description: 'Считают калории, соблюдают диеты, ищут сбалансированные рецепты' },
    { segment: 'Занятые профессионалы', size: '15M+', description: 'Хотят быстро и вкусно готовить, не тратя время на поиск рецептов' },
    { segment: 'Кулинарные энтузиасты', size: '10M+', description: 'Любят готовить, ищут вдохновение и новые идеи из доступных продуктов' },
  ],
  marketSize: {
    tam: '₽100 млрд',
    sam: '₽25 млрд',
    som: '₽1.5 млрд',
    description: 'Рынок кулинарных приложений растёт на 20% ежегодно. AI-powered рецепты — новый и быстрорастущий сегмент.',
  },
  monetization: [
    { model: 'Freemium', description: '3 рецепта в день бесплатно, без КБЖУ', price: '₽0/мес' },
    { model: 'Подписка Pro', description: 'Безлимитные рецепты, КБЖУ, голос, персонализация', price: '₽290/мес' },
    { model: 'Партнёрства с доставкой', description: 'Комиссия за заказы продуктов через платформу', price: '5-10% с заказа' },
    { model: 'B2B для брендов', description: 'Рецепты с использованием продуктов партнёров', price: 'от ₽50K/кампания' },
  ],
  competitiveAdvantages: [
    'Computer vision + LLM — рецепт за секунды из фото реальных продуктов',
    'Голосовое управление — hands-free на кухне',
    'КБЖУ расчёт — автоматическая диетологическая поддержка',
    'Telegram-native — 80M+ пользователей без скачивания',
    'Интеграция с доставкой — полный цикл от рецепта до продуктов',
  ],
  financialProjections: [
    { period: 'Месяц 6', revenue: '₽800K MRR', users: '5,000', note: 'Запуск Pro-подписки' },
    { period: 'Месяц 12', revenue: '₽5M MRR', users: '30,000', note: 'Партнёрства с доставкой' },
    { period: 'Месяц 24', revenue: '₽20M MRR', users: '100,000', note: 'B2B-кампании' },
  ],
  investmentAsk: {
    amount: '₽10M',
    equity: '15%',
    useOfFunds: [
      'Разработка CV-модели и AI-движка рецептов — 35%',
      'Голосовой интерфейс и UX — 15%',
      'Маркетинг и привлечение пользователей — 30%',
      'Интеграция с доставкой и операционные расходы — 20%',
    ],
    contactCta: 'Обсудить инвестиции в Вкус-Робот',
  },
  teamHighlights: [
    'Fullstack-разработчик с экспертизой в Computer Vision и NLP',
    'Опыт интеграции с YooKassa и TON blockchain',
    'Экспертиза в голосовых интерфейсах (Whisper, TTS)',
  ],
};
