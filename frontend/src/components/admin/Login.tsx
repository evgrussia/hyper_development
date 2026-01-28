import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { LogIn } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo credentials
    if (email === 'admin@hyper-development.ru' && password === 'admin') {
      onLogin();
    } else {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="glass-strong p-8 rounded-2xl border border-border/50">
          <div className="text-center mb-8">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Hyper-Development
            </div>
            <h2 className="text-xl font-semibold">Вход в админку</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email или логин</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                className="bg-input-background border-border/50 focus:border-primary"
                placeholder="admin@hyper-development.ru"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="bg-input-background border-border/50 focus:border-primary"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
              size="lg"
            >
              <LogIn className="mr-2 w-5 h-5" />
              Войти
            </Button>
          </form>

          <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-xs text-foreground/60 text-center">
              <strong>Demo:</strong> admin@hyper-development.ru / admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
