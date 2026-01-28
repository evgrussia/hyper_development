import { useData } from '@/contexts/DataContext';
import { Button } from '@/app/components/ui/button';
import { Label } from '@/app/components/ui/label';
import { ArrowLeft, Save } from 'lucide-react';
import { useState, useEffect } from 'react';

interface OrderDetailProps {
  orderId: string;
  onClose: () => void;
}

const statusOptions = [
  { value: 'new', label: 'Новый' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'completed', label: 'Выполнен' },
  { value: 'cancelled', label: 'Отменён' },
];

export function OrderDetail({ orderId, onClose }: OrderDetailProps) {
  const { orders, updateOrder, orderModules } = useData();
  const order = orders.find(o => o.id === orderId);
  const [status, setStatus] = useState(order?.status || 'new');

  useEffect(() => {
    if (order) setStatus(order.status);
  }, [order]);

  if (!order) {
    return <div>Заказ не найден</div>;
  }

  const handleSave = () => {
    updateOrder(orderId, { status });
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onClose}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-3xl font-bold">Заказ #{orderId}</h1>
      </div>

      <div className="max-w-3xl glass rounded-xl border border-border/50 p-8 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className="text-foreground/60 text-sm">Дата</Label>
            <p className="font-medium mt-1">
              {new Date(order.createdAt).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          <div>
            <Label className="text-foreground/60 text-sm">Имя</Label>
            <p className="font-medium mt-1">{order.name}</p>
          </div>
        </div>

        <div>
          <Label className="text-foreground/60 text-sm">Контакт</Label>
          <p className="font-medium mt-1">{order.contact}</p>
        </div>

        <div>
          <Label className="text-foreground/60 text-sm">Описание</Label>
          <p className="mt-1 text-foreground/80">
            {order.description || 'Не указано'}
          </p>
        </div>

        <div>
          <Label className="text-foreground/60 text-sm mb-2 block">Выбранные модули</Label>
          {order.modules.length > 0 ? (
            <ul className="space-y-2">
              {order.modules.map((moduleId) => {
                const module = orderModules.find(m => m.id === moduleId);
                return module ? (
                  <li key={moduleId} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>{module.name}</span>
                  </li>
                ) : null;
              })}
            </ul>
          ) : (
            <p className="text-foreground/50">Модули не выбраны</p>
          )}
        </div>

        <div>
          <Label className="text-foreground/60 text-sm mb-3 block">Статус</Label>
          <div className="grid grid-cols-2 gap-3">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setStatus(option.value as any)}
                className={`
                  p-3 rounded-lg border transition-all
                  ${
                    status === option.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border/50 hover:border-primary/30 hover:bg-white/5'
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button onClick={handleSave} className="bg-gradient-to-r from-primary to-accent">
            <Save className="mr-2 w-5 h-5" />
            Сохранить
          </Button>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
        </div>
      </div>
    </div>
  );
}
