import { Send } from 'lucide-react';

export function Footer() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openAdmin = () => {
    if (typeof window !== 'undefined' && (window as any).openAdmin) {
      (window as any).openAdmin();
    }
  };

  return (
    <footer className="py-12 px-4 border-t border-border/50">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Hyper-Development
            </div>
            <p className="text-sm text-foreground/60">
              Разработка web-приложений под ключ
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection('services')}
                className="block text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Услуги
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="block text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Портфолио
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="block text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                О разработчике
              </button>
              <button
                onClick={() => scrollToSection('order')}
                className="block text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                Заказать
              </button>
            </div>
          </div>

          {/* Contact — только Telegram @evgrussia */}
          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-2">
              <a
                href="https://t.me/evgrussia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors"
              >
                <Send className="w-4 h-4" />
                Telegram @evgrussia
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-foreground/50">
            © 2026 Hyper-Development. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}