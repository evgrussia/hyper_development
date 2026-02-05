import type { ProjectDetail, InvestorData } from '@/types';

export const projectDetail: ProjectDetail = {
  slug: 'biomax-ai',
  title: 'BIOMAX AI',
  subtitle: 'Персональная операционная система здоровья',
  description: 'BIOMAX AI — это мультиагентная платформа для комплексного управления здоровьем, объединяющая 15 специализированных AI-агентов. Система анализирует данные сна, питания, тренировок, анализов крови и генетических тестов, предоставляя персонализированные рекомендации на основе научных протоколов.\n\nПлатформа интегрируется с более чем 100 источниками данных: от фитнес-трекеров и умных весов до лабораторий и геномных сервисов. Custom RAG-система позволяет загружать собственные протоколы и исследования, а система полностью соответствует требованиям 152-ФЗ.\n\nМультиплатформенное решение включает мобильное приложение (Flutter), веб-интерфейс (Next.js), Telegram-бота и голосовой интерфейс для максимальной доступности.',
  siteUrl: 'https://biomax-ai.ru',
  githubUrl: 'https://github.com/evgrussia/biomax_ai',
  screenshots: ['/portfolio/biomax-ai/hero.svg'],
  heroImage: '/portfolio/biomax-ai/hero.svg',
  techStack: [
    { category: 'Backend', items: ['FastAPI', 'Kong API Gateway', 'PostgreSQL', 'ClickHouse', 'Qdrant', 'Neo4j'] },
    { category: 'Frontend', items: ['Flutter (iOS/Android)', 'Next.js', 'Tailwind CSS'] },
    { category: 'AI/ML', items: ['LangGraph', 'CrewAI', 'LlamaIndex RAG', 'GPT-4o', 'Claude', 'GigaChat', 'YandexGPT'] },
    { category: 'Infrastructure', items: ['Docker', 'Kubernetes', 'Whisper TTS', 'aiogram 3.x'] },
  ],
  features: [
    { icon: 'Brain', title: '15 AI-агентов', description: 'Специализированные агенты для сна, питания, тренировок, лонжевити, ментального здоровья, анализов крови и геномики' },
    { icon: 'Activity', title: '100+ интеграций', description: 'Wearables, лаборатории, геномные сервисы, микробиом-анализ и другие источники данных о здоровье' },
    { icon: 'BookOpen', title: 'Custom RAG', description: 'Загрузка собственных протоколов и научных исследований для персонализированных рекомендаций' },
    { icon: 'Shield', title: '152-ФЗ', description: 'Полное соответствие российскому законодательству о защите персональных данных' },
    { icon: 'Smartphone', title: 'Мультиплатформа', description: 'Flutter мобильное приложение, Next.js веб, Telegram-бот и голосовой интерфейс' },
    { icon: 'Dna', title: 'Геномика', description: 'Анализ генетических данных для персонализации рекомендаций по здоровью и долголетию' },
  ],
  highlights: [
    { value: '15+', label: 'AI-агентов' },
    { value: '100+', label: 'Интеграций' },
    { value: '24/7', label: 'Мониторинг' },
    { value: '152-ФЗ', label: 'Соответствие' },
  ],
  category: 'HealthTech',
  badges: ['AI', 'HealthTech', 'RAG', 'LangGraph'],
  status: 'concept',
};

export const investorData: InvestorData = {
  slug: 'biomax-ai',
  projectTitle: 'BIOMAX AI',
  tagline: 'Персональная операционная система здоровья на базе 15 AI-агентов',
  problem: 'Более 60% россиян не ведут системный мониторинг здоровья. Данные с фитнес-трекеров, анализов крови и генетических тестов разрознены по десяткам приложений. Люди не могут получить целостную картину своего здоровья и персонализированные рекомендации на основе научных протоколов.',
  solution: 'BIOMAX AI объединяет все данные о здоровье в единой платформе с 15 специализированными AI-агентами. Каждый агент отвечает за свою область — от анализа сна до интерпретации генетических данных. Custom RAG-система позволяет учитывать индивидуальные протоколы, а мультиплатформенность обеспечивает доступ 24/7.',
  targetAudience: [
    { segment: 'Биохакеры', size: '2M+', description: 'Люди, активно оптимизирующие здоровье через технологии и данные' },
    { segment: 'Оптимизаторы здоровья', size: '8M+', description: 'Пользователи фитнес-трекеров, ищущие глубокий анализ данных' },
    { segment: 'Longevity-энтузиасты', size: '3M+', description: 'Сторонники научного подхода к долголетию' },
  ],
  marketSize: {
    tam: '₽180 млрд',
    sam: '₽45 млрд',
    som: '₽4.5 млрд',
    description: 'Рынок Digital Health в России растёт на 25% ежегодно. Сегмент персонализированного здоровья — один из самых быстрорастущих.',
  },
  monetization: [
    { model: 'Подписка Free', description: 'Базовый мониторинг, 3 агента, ограниченные интеграции', price: '₽0/мес' },
    { model: 'Подписка Pro', description: 'Все 15 агентов, 50+ интеграций, RAG', price: '₽1,490/мес' },
    { model: 'Подписка Premium', description: 'Полный доступ, геномика, приоритетная поддержка', price: '₽4,990/мес' },
    { model: 'Longevity Elite', description: 'Консьерж-сервис, личный консультант, эксклюзивные протоколы', price: '₽14,990/мес' },
  ],
  competitiveAdvantages: [
    'Единственная платформа с 15 специализированными AI-агентами для здоровья в России',
    'Custom RAG — возможность загрузки собственных протоколов и исследований',
    '100+ интеграций с wearables, лабораториями и геномными сервисами',
    'Полное соответствие 152-ФЗ — данные хранятся в РФ',
    'Мультиплатформенность: мобильное приложение, веб, Telegram, голос',
    'Использование как международных (GPT-4o, Claude), так и российских LLM (GigaChat, YandexGPT)',
  ],
  financialProjections: [
    { period: 'Месяц 6', revenue: '₽2.5M MRR', users: '2,000', note: 'Запуск Pro-подписки' },
    { period: 'Месяц 12', revenue: '₽15M MRR', users: '10,000', note: 'Полный набор агентов' },
    { period: 'Месяц 24', revenue: '₽60M MRR', users: '35,000', note: 'B2B-партнёрства с клиниками' },
  ],
  investmentAsk: {
    amount: '₽25M',
    equity: '15%',
    useOfFunds: [
      'Разработка MVP и интеграции с wearables — 40%',
      'AI/ML research и обучение агентов — 25%',
      'Маркетинг и привлечение первых пользователей — 20%',
      'Операционные расходы и сертификация — 15%',
    ],
    contactCta: 'Обсудить инвестиции в BIOMAX AI',
  },
  teamHighlights: [
    'Fullstack-разработчик с опытом в AI/ML и мультиагентных системах',
    'Экспертиза в LangChain/LangGraph, RAG-системах и российских LLM',
    'Опыт разработки HealthTech-решений с соответствием 152-ФЗ',
  ],
};
