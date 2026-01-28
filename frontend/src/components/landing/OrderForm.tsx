import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Label } from '@/app/components/ui/label';
import { CheckCircle2, Send } from 'lucide-react';
import { Confetti } from '@/components/common/Confetti';
import { OrderFormBackground } from '@/components/backgrounds/OrderFormBackground';

export function OrderForm() {
  const { orderModules, addOrder } = useData();
  const activeModules = orderModules
    .filter(m => m.isActive)
    .sort((a, b) => a.order - b.order);

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    description: '',
    selectedModules: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleModuleToggle = (moduleId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedModules: prev.selectedModules.includes(moduleId)
        ? prev.selectedModules.filter(id => id !== moduleId)
        : [...prev.selectedModules, moduleId],
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Укажите ваше имя';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Укажите контакт для связи';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    const orderPayload = {
      name: formData.name,
      contact: formData.contact,
      description: formData.description,
      modules: formData.selectedModules,
      moduleNames: formData.selectedModules
        .map((id) => activeModules.find((m) => m.id === id)?.name)
        .filter(Boolean) as string[],
    };

    const apiUrl = import.meta.env.VITE_ORDER_API_URL || '/api/send-order';
    if (apiUrl) {
      setIsSending(true);
      try {
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          setSubmitError(err?.error || 'Не удалось отправить. Напишите в Telegram @evgrussia');
          setIsSending(false);
          return;
        }
      } catch {
        setSubmitError('Не удалось отправить. Напишите в Telegram @evgrussia');
        setIsSending(false);
        return;
      }
      setIsSending(false);
    }

    addOrder({
      name: formData.name,
      contact: formData.contact,
      description: formData.description,
      modules: formData.selectedModules,
      status: 'new',
    });

    setIsSubmitted(true);
    setFormData({
      name: '',
      contact: '',
      description: '',
      selectedModules: [],
    });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  if (isSubmitted) {
    return (
      <section id="order" className="py-20 lg:py-32 px-4">
        <Confetti trigger={isSubmitted} />
        <div className="container mx-auto max-w-2xl">
          <div className="glass-strong p-12 rounded-2xl border border-primary/30 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Заявка отправлена!</h3>
            <p className="text-foreground/70">
              Мы свяжемся с вами в Telegram в ближайшее время
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="order" className="relative py-20 lg:py-32 px-4 overflow-hidden">
      {/* Interactive Background */}
      <div className="absolute inset-0 -z-10">
        <OrderFormBackground />
      </div>

      <div className="container mx-auto max-w-2xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Оставить заявку
          </h2>
          <p className="text-lg text-foreground/70">
            Заполните форму, и мы свяжемся с вами в Telegram
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="glass-strong p-8 rounded-2xl border border-border/50 space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Имя <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Ваше имя"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              className={`bg-input-background border-border/50 focus:border-primary ${
                errors.name ? 'border-destructive' : ''
              }`}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <Label htmlFor="contact">
              Контакт <span className="text-destructive">*</span>
            </Label>
            <Input
              id="contact"
              type="text"
              placeholder="Например: @username или t.me/username"
              value={formData.contact}
              onChange={(e) => {
                setFormData({ ...formData, contact: e.target.value });
                if (errors.contact) setErrors({ ...errors, contact: '' });
              }}
              className={`bg-input-background border-border/50 focus:border-primary ${
                errors.contact ? 'border-destructive' : ''
              }`}
            />
            {errors.contact && (
              <p className="text-sm text-destructive">{errors.contact}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Описание проекта (опционально)</Label>
            <Textarea
              id="description"
              placeholder="Расскажите о вашем проекте..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-input-background border-border/50 focus:border-primary min-h-[120px]"
            />
          </div>

          {/* Modules */}
          {activeModules.length > 0 && (
            <div className="space-y-4">
              <Label>Модули проекта</Label>
              <div className="space-y-3">
                {activeModules.map((module) => (
                  <div key={module.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={`module-${module.id}`}
                      checked={formData.selectedModules.includes(module.id)}
                      onCheckedChange={() => handleModuleToggle(module.id)}
                    />
                    <Label
                      htmlFor={`module-${module.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {module.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          {submitError && (
            <p className="text-sm text-destructive text-center">{submitError}</p>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={isSending}
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity group"
          >
            {isSending ? 'Отправка...' : 'Отправить заявку'}
            <Send className="ml-2 w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </Button>

          <p className="text-xs text-center text-foreground/50">
            Отправляя заявку, вы соглашаетесь на обработку персональных данных
          </p>
        </form>
      </div>
    </section>
  );
}