import type { ProjectDetail, InvestorData } from '@/types';

export const projectDetail: ProjectDetail = {
  slug: 'telemed-pitomec',
  title: 'Телемед-Питомец',
  subtitle: 'Телеветеринария с AI-диагностикой',
  description: 'Телемед-Питомец — Telegram WebApp для ухода за здоровьем домашних животных, объединяющий AI-диагностику по фото с доступом к лицензированным ветеринарам 24/7. Computer vision анализирует симптомы по фотографиям, а видеоконсультации позволяют получить профессиональную помощь.\n\nПлатформа включает дневник здоровья питомца с отслеживанием веса, питания и активности, автоматические напоминания о прививках и интегрированный маркетплейс кормов и лекарств.\n\nБэкенд на Django с REST Framework, фронтенд на React с Telegram WebApp SDK. Видеозвонки через WebRTC, PostgreSQL для хранения данных.',
  siteUrl: 'https://telemed-pitomec.ru',
  githubUrl: 'https://github.com/evgrussia/telemed-pitomec',
  screenshots: ['/portfolio/telemed-pitomec/hero.svg'],
  heroImage: '/portfolio/telemed-pitomec/hero.svg',
  techStack: [
    { category: 'Backend', items: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'Redis'] },
    { category: 'Frontend', items: ['React', 'TypeScript', 'Telegram WebApp SDK', 'Tailwind CSS'] },
    { category: 'AI/ML', items: ['Computer Vision', 'Symptom Analysis', 'Photo Diagnostics'] },
    { category: 'Infrastructure', items: ['Docker', 'WebRTC', 'Telegram Bot API', 'Nginx'] },
  ],
  features: [
    { icon: 'Camera', title: 'AI-диагностика по фото', description: 'Загрузите фото симптомов — AI проанализирует и предложит предварительный диагноз' },
    { icon: 'Video', title: 'Видеоконсультации 24/7', description: 'Связь с лицензированными ветеринарами через видеозвонок в любое время' },
    { icon: 'Heart', title: 'Дневник здоровья', description: 'Отслеживание веса, питания, активности и медицинской истории питомца' },
    { icon: 'Bell', title: 'Напоминания о прививках', description: 'Автоматический календарь вакцинации и профилактических процедур' },
    { icon: 'ShoppingBag', title: 'Маркетплейс', description: 'Интегрированный магазин кормов, лекарств и аксессуаров с доставкой' },
    { icon: 'Stethoscope', title: 'История болезни', description: 'Полная медицинская карта питомца — всегда под рукой для ветеринара' },
  ],
  highlights: [
    { value: '24/7', label: 'Ветеринар онлайн' },
    { value: '40M+', label: 'Владельцев питомцев' },
    { value: 'AI', label: 'Фото-диагностика' },
    { value: 'WebRTC', label: 'Видеосвязь' },
  ],
  category: 'PetTech',
  badges: ['AI', 'PetTech', 'Video', 'Telegram'],
  status: 'concept',
};

export const investorData: InvestorData = {
  slug: 'telemed-pitomec',
  projectTitle: 'Телемед-Питомец',
  tagline: 'Ветеринар 24/7 в Telegram с AI-диагностикой по фото',
  problem: 'В России 40M+ владельцев домашних животных. 60% не могут получить ветеринарную помощь в нерабочее время. Средняя стоимость визита к ветеринару — ₽2,000-5,000, при этом 70% обращений можно решить дистанционно. В малых городах ветклиник критически мало.',
  solution: 'Телемед-Питомец даёт доступ к ветеринарной помощи 24/7 через Telegram. AI по фото оценивает симптомы и степень срочности, видеоконсультация с врачом решает вопрос дистанционно. Маркетплейс с доставкой обеспечивает лекарства и корма. Дневник здоровья хранит всю историю.',
  targetAudience: [
    { segment: 'Владельцы собак', size: '20M+', description: 'Наиболее частые обращения к ветеринару, высокая готовность платить' },
    { segment: 'Владельцы кошек', size: '15M+', description: 'Сложно доставить к ветеринару, предпочитают дистанционные консультации' },
    { segment: 'Владельцы в регионах', size: '10M+', description: 'Ограниченный доступ к ветклиникам, острая потребность в телемедицине' },
  ],
  marketSize: {
    tam: '₽250 млрд',
    sam: '₽50 млрд',
    som: '₽2.5 млрд',
    description: 'Ветеринарный рынок России — ₽250 млрд с ростом 15% в год. Телеветеринария — формирующийся сегмент с минимальной конкуренцией.',
  },
  monetization: [
    { model: 'Бесплатно', description: 'AI-диагностика по фото, базовый дневник здоровья', price: '₽0/мес' },
    { model: 'Подписка Забота', description: 'Безлимитный AI, 2 видеоконсультации, расширенный дневник', price: '₽590/мес' },
    { model: 'Подписка Премиум', description: 'Безлимит AI + видео, маркетплейс скидки, приоритет', price: '₽1,490/мес' },
    { model: 'Маркетплейс', description: 'Комиссия с продаж кормов и лекарств', price: '10-15%' },
  ],
  competitiveAdvantages: [
    'AI-диагностика по фото — мгновенная оценка симптомов',
    'Видеоконсультации 24/7 — ветеринар всегда доступен',
    'Telegram-native — 80M+ аудитория, нулевой порог входа',
    'Маркетплейс кормов и лекарств — дополнительная монетизация',
    'Дневник здоровья — полная медкарта питомца',
    'Партнёрства с ветклиниками — направления на очные приёмы',
  ],
  financialProjections: [
    { period: 'Месяц 6', revenue: '₽1.2M MRR', users: '3,000', note: 'Запуск подписки и маркетплейса' },
    { period: 'Месяц 12', revenue: '₽7M MRR', users: '15,000', note: 'Партнёрства с ветклиниками' },
    { period: 'Месяц 24', revenue: '₽30M MRR', users: '50,000', note: 'Расширение маркетплейса' },
  ],
  investmentAsk: {
    amount: '₽15M',
    equity: '15%',
    useOfFunds: [
      'Разработка AI-диагностики и WebRTC видеосвязи — 35%',
      'Привлечение и оплата ветеринаров — 20%',
      'Маркетинг и привлечение владельцев питомцев — 25%',
      'Маркетплейс и партнёрства — 10%',
      'Операционные расходы — 10%',
    ],
    contactCta: 'Обсудить инвестиции в Телемед-Питомец',
  },
  teamHighlights: [
    'Fullstack-разработчик с экспертизой в телемедицине и Computer Vision',
    'Опыт интеграции WebRTC для видеоконсультаций',
    'Консультации с практикующими ветеринарами',
  ],
};
