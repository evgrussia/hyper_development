import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              Hyper-Development
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('services')}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Услуги
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Портфолио
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              О разработчике
            </button>
            <button
              onClick={() => scrollToSection('tech')}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              Стек
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button
              onClick={() => scrollToSection('order')}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              Заказать проект
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden glass-strong border-t border-border">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-white/5 transition-colors"
            >
              Услуги
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="block w-full text-left px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-white/5 transition-colors"
            >
              Портфолио
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-white/5 transition-colors"
            >
              О разработчике
            </button>
            <button
              onClick={() => scrollToSection('tech')}
              className="block w-full text-left px-4 py-2 rounded-lg text-foreground/80 hover:text-foreground hover:bg-white/5 transition-colors"
            >
              Стек
            </button>
            <Button
              onClick={() => scrollToSection('order')}
              className="w-full bg-gradient-to-r from-primary to-accent"
            >
              Заказать проект
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
