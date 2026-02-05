import type { ProjectDetail, InvestorData } from '@/types';

export const projectDetail: ProjectDetail = {
  slug: 'neuro-psychologist',
  title: 'Нейро-Психолог 24/7',
  subtitle: 'AI-платформа психологической поддержки',
  description: 'Нейро-Психолог 24/7 — круглосуточная AI-платформа психологической поддержки, работающая через Telegram WebApp. Система использует российскую языковую модель GigaChat и методы когнитивно-поведенческой терапии (КПТ) для оказания доступной психологической помощи.\n\nПлатформа включает дневник эмоций с аналитикой настроения, детектор кризисных состояний с автоматическим подключением специалиста, интеграцию с wearables для мониторинга физиологических показателей стресса.\n\nВсе данные обрабатываются в соответствии с 152-ФЗ, а система прозрачно разграничивает AI-поддержку и профессиональную психологическую помощь.',
  siteUrl: 'https://balance-space.ru',
  githubUrl: 'https://github.com/evgrussia/emotional-balance',
  screenshots: ['/portfolio/neuro-psychologist/hero.svg'],
  heroImage: '/portfolio/neuro-psychologist/hero.svg',
  techStack: [
    { category: 'Backend', items: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'Redis'] },
    { category: 'Frontend', items: ['TypeScript', 'React', 'Telegram WebApp SDK', 'Tailwind CSS'] },
    { category: 'AI/ML', items: ['GigaChat', 'КПТ-промпты', 'Sentiment Analysis', 'Crisis Detection'] },
    { category: 'Infrastructure', items: ['Docker', 'Nginx', 'VPS Ubuntu 24.04', 'SSL/TLS'] },
  ],
  features: [
    { icon: 'MessageCircle', title: 'КПТ-терапия', description: 'AI-консультации на основе методов когнитивно-поведенческой терапии, адаптированные под пользователя' },
    { icon: 'BookHeart', title: 'Дневник эмоций', description: 'Ежедневное отслеживание настроения с аналитикой трендов и триггеров' },
    { icon: 'ShieldAlert', title: 'Детектор кризисов', description: 'Автоматическое определение кризисных состояний и подключение живого специалиста' },
    { icon: 'Watch', title: 'Wearables-мониторинг', description: 'Интеграция с фитнес-трекерами для анализа физиологических показателей стресса' },
    { icon: 'Clock', title: '24/7 доступ', description: 'Круглосуточная поддержка без записи и ожидания — помощь когда она нужна' },
    { icon: 'Lock', title: 'Конфиденциальность', description: 'Полное соответствие 152-ФЗ, анонимность и безопасность личных данных' },
  ],
  highlights: [
    { value: '24/7', label: 'Доступность' },
    { value: '15M+', label: 'Целевой рынок' },
    { value: 'КПТ', label: 'Методология' },
    { value: '152-ФЗ', label: 'Соответствие' },
  ],
  category: 'HealthTech',
  badges: ['AI', 'GigaChat', 'HealthTech', 'Telegram'],
  status: 'concept',
};

export const investorData: InvestorData = {
  slug: 'neuro-psychologist',
  projectTitle: 'Нейро-Психолог 24/7',
  tagline: 'Доступная психологическая поддержка 24/7 через AI в Telegram',
  problem: 'В России более 15 миллионов человек нуждаются в психологической помощи, но только 3% обращаются к специалистам. Основные барьеры: стоимость (средняя консультация ₽3,000-5,000), стигматизация, длительное ожидание записи и отсутствие специалистов в малых городах.',
  solution: 'Нейро-Психолог 24/7 делает психологическую поддержку доступной через привычный мессенджер Telegram. AI на базе GigaChat использует проверенные методы КПТ, работает круглосуточно и стоит в 10 раз меньше живого специалиста. Детектор кризисов обеспечивает безопасность, переключая на живого психолога при необходимости.',
  targetAudience: [
    { segment: 'Молодые профессионалы 25-40', size: '8M+', description: 'Высокий уровень стресса, привыкли к цифровым решениям, готовы платить за удобство' },
    { segment: 'Жители малых городов', size: '5M+', description: 'Ограниченный доступ к квалифицированным психологам, нуждаются в удалённой помощи' },
    { segment: 'Студенты', size: '4M+', description: 'Высокая тревожность, ограниченный бюджет, активные пользователи Telegram' },
  ],
  marketSize: {
    tam: '₽120 млрд',
    sam: '₽30 млрд',
    som: '₽3 млрд',
    description: 'Рынок онлайн-психотерапии в России растёт на 40% ежегодно. Telegram — самый популярный мессенджер с 80M+ пользователей в РФ.',
  },
  monetization: [
    { model: 'Бесплатный уровень', description: '3 сессии в неделю, базовый дневник эмоций', price: '₽0/мес' },
    { model: 'Стандарт', description: 'Безлимитные сессии, полная аналитика, wearables', price: '₽490/мес' },
    { model: 'Премиум', description: 'AI + живые консультации, приоритетная кризисная помощь', price: '₽1,990/мес' },
    { model: 'B2B Corporate', description: 'Корпоративная подписка для сотрудников компаний', price: 'от ₽299/сотрудник' },
  ],
  competitiveAdvantages: [
    'Единственная AI-платформа психологической поддержки на русском языке с GigaChat',
    'Детектор кризисных состояний — безопасность на уровне клинических стандартов',
    'Методология КПТ — золотой стандарт доказательной психотерапии',
    'Telegram-native — нулевой порог входа, 80M+ аудитория',
    'B2B-модель для корпоративного wellness — масштабируемый канал роста',
  ],
  financialProjections: [
    { period: 'Месяц 6', revenue: '₽1.5M MRR', users: '5,000', note: 'Запуск Стандарт-подписки' },
    { period: 'Месяц 12', revenue: '₽8M MRR', users: '25,000', note: 'Первые B2B-контракты' },
    { period: 'Месяц 24', revenue: '₽35M MRR', users: '80,000', note: 'Масштабирование B2B' },
  ],
  investmentAsk: {
    amount: '₽15M',
    equity: '15%',
    useOfFunds: [
      'Разработка MVP и AI-модели — 35%',
      'Клинические консультации и валидация КПТ-протоколов — 20%',
      'Маркетинг и привлечение пользователей — 25%',
      'Операционные расходы и лицензирование — 20%',
    ],
    contactCta: 'Обсудить инвестиции в Нейро-Психолог 24/7',
  },
  teamHighlights: [
    'Fullstack-разработчик с опытом в AI и Telegram WebApp',
    'Экспертиза в GigaChat, NLP и sentiment analysis',
    'Консультации с практикующими психотерапевтами по КПТ-методологии',
  ],
};
