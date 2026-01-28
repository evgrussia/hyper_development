import { useState, useEffect } from 'react';
import { Shield, X } from 'lucide-react';
import { Button } from '@/app/components/ui/button';

export function AdminHint() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('adminHintDismissed');
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('adminHintDismissed', 'true');
  };

  const handleOpenAdmin = () => {
    if (typeof window !== 'undefined' && (window as any).openAdmin) {
      (window as any).openAdmin();
    }
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 glass-strong rounded-xl border border-primary/20 p-4 max-w-sm shadow-lg animate-in fade-in slide-in-from-bottom-5">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <Shield className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold mb-1 text-sm">Демо режим</h4>
          <p className="text-xs text-foreground/70 mb-3">
            Нажмите <kbd className="px-1.5 py-0.5 text-xs bg-muted rounded">Ctrl+Shift+A</kbd> для доступа к админке
          </p>
          <Button
            onClick={handleOpenAdmin}
            size="sm"
            variant="outline"
            className="w-full text-xs border-primary/30 hover:bg-primary/10"
          >
            Открыть админку
          </Button>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-foreground/50" />
        </button>
      </div>
    </div>
  );
}
