import type { ProjectDetail, InvestorData } from '@/types';

export const projectDetail: ProjectDetail = {
  slug: 'arenda-sosedi',
  title: 'Арендо-Соседи',
  subtitle: 'P2P-аренда вещей между соседями',
  description: 'Арендо-Соседи — гиперлокальная P2P-платформа для аренды вещей между соседями в жилых комплексах. Telegram WebApp позволяет за минуту найти и арендовать инструменты, спортивный инвентарь, технику и другие вещи у соседей.\n\nПлатформа обеспечивает безопасность через депозитную систему, страхование от повреждений и систему рейтингов. Модерация и арбитраж решают спорные ситуации.\n\nСистема работает на уровне конкретного ЖК или района, создавая локальные сообщества взаимопомощи и рационального потребления.',
  siteUrl: 'https://arenda-sosedi.ru',
  githubUrl: 'https://github.com/evgrussia/arenda-sosedi',
  screenshots: ['/portfolio/arenda-sosedi/hero.svg'],
  heroImage: '/portfolio/arenda-sosedi/hero.svg',
  techStack: [
    { category: 'Backend', items: ['Python', 'Django', 'PostgreSQL', 'Redis'] },
    { category: 'Frontend', items: ['TypeScript', 'React', 'Telegram WebApp SDK', 'Tailwind CSS'] },
    { category: 'Payments', items: ['YooKassa', 'Депозитная система', 'Страхование'] },
    { category: 'Infrastructure', items: ['Docker', 'Nginx', 'VPS Ubuntu 24.04'] },
  ],
  features: [
    { icon: 'MapPin', title: 'Гиперлокальность', description: 'Аренда вещей в рамках вашего ЖК или района — забирайте у соседа за 5 минут' },
    { icon: 'Shield', title: 'Депозит и страхование', description: 'Автоматический депозит и страховка от повреждений для спокойствия обеих сторон' },
    { icon: 'Star', title: 'Рейтинги и отзывы', description: 'Система репутации для надёжных арендных отношений между соседями' },
    { icon: 'Gavel', title: 'Арбитраж', description: 'Модерация и решение спорных ситуаций командой платформы' },
    { icon: 'Wrench', title: 'Каталог вещей', description: 'Инструменты, спортинвентарь, техника, outdoor-оборудование и другие категории' },
    { icon: 'MessageCircle', title: 'Чат соседей', description: 'Встроенный мессенджер для обсуждения деталей аренды' },
  ],
  highlights: [
    { value: '50M+', label: 'Жители МКД' },
    { value: '5 мин', label: 'До соседа' },
    { value: 'P2P', label: 'Модель' },
    { value: '0%', label: 'Простой вещей' },
  ],
  category: 'Sharing Economy',
  badges: ['P2P', 'Sharing', 'Local', 'Telegram'],
  status: 'concept',
};

export const investorData: InvestorData = {
  slug: 'arenda-sosedi',
  projectTitle: 'Арендо-Соседи',
  tagline: 'P2P-аренда вещей у соседей через Telegram',
  problem: 'У среднего россиянина дома лежат вещи на ₽200K+, которые используются менее 10% времени: дрели, велосипеды, палатки, проекторы. При этом 50M+ человек живут в многоквартирных домах и регулярно нуждаются в таких вещах. Существующие сервисы аренды не работают на уровне дома или ЖК.',
  solution: 'Арендо-Соседи создаёт микро-рынок аренды внутри каждого ЖК. Сосед из 5-й квартиры сдаёт дрель соседу из 12-й — за 5 минут, с депозитом и страховкой через Telegram. Гиперлокальность обеспечивает мгновенный обмен, а платформа — безопасность и удобство.',
  targetAudience: [
    { segment: 'Жители новостроек', size: '15M+', description: 'Молодые семьи в новых ЖК, активно обустраивают квартиры' },
    { segment: 'Арендаторы квартир', size: '20M+', description: 'Не готовы покупать инструменты и технику для временного жилья' },
    { segment: 'Экологически сознательные', size: '10M+', description: 'Сторонники рационального потребления и шеринг-экономики' },
  ],
  marketSize: {
    tam: '₽200 млрд',
    sam: '₽40 млрд',
    som: '₽2 млрд',
    description: 'Sharing economy в России растёт на 30%+ в год. Сегмент P2P-аренды вещей практически свободен.',
  },
  monetization: [
    { model: 'Комиссия с аренды', description: 'Процент с каждой сделки аренды', price: '15-20%' },
    { model: 'Страхование', description: 'Опциональная страховка от повреждений', price: '5-10% от стоимости' },
    { model: 'Продвижение ЖК', description: 'Подключение управляющих компаний и застройщиков', price: 'от ₽10K/мес' },
  ],
  competitiveAdvantages: [
    'Единственный P2P-сервис аренды на уровне ЖК в России',
    'Telegram-native — мгновенный запуск без скачивания приложения',
    'Гиперлокальность — обмен за 5 минут пешком',
    'Депозит + страхование — полная защита обеих сторон',
    'Вирусный рост через соседские чаты и управляющие компании',
  ],
  financialProjections: [
    { period: 'Месяц 6', revenue: '₽500K MRR', users: '50 ЖК', note: 'Пилот в Москве' },
    { period: 'Месяц 12', revenue: '₽3M MRR', users: '300 ЖК', note: '5 городов' },
    { period: 'Месяц 24', revenue: '₽15M MRR', users: '2,000 ЖК', note: 'Все миллионники' },
  ],
  investmentAsk: {
    amount: '₽8M',
    equity: '15%',
    useOfFunds: [
      'Разработка MVP и депозитной системы — 35%',
      'Маркетинг и подключение первых ЖК — 35%',
      'Страховые партнёрства — 10%',
      'Операционные расходы — 20%',
    ],
    contactCta: 'Обсудить инвестиции в Арендо-Соседи',
  },
  teamHighlights: [
    'Fullstack-разработчик с опытом в P2P-платформах и Telegram WebApp',
    'Экспертиза в платёжных системах и депозитных механизмах',
    'Понимание sharing economy и гиперлокальных рынков',
  ],
};
