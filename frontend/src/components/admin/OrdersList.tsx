import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/app/components/ui/button';
import { Eye } from 'lucide-react';
import { OrderDetail } from './OrderDetail';

const statusFilters = [
  { value: 'all', label: 'Все' },
  { value: 'new', label: 'Новый' },
  { value: 'in_progress', label: 'В работе' },
  { value: 'completed', label: 'Выполнен' },
  { value: 'cancelled', label: 'Отменён' },
];

const statusLabels: Record<string, string> = {
  new: 'Новый',
  in_progress: 'В работе',
  completed: 'Выполнен',
  cancelled: 'Отменён',
};

const statusColors: Record<string, string> = {
  new: 'bg-primary/20 text-primary',
  in_progress: 'bg-accent/20 text-accent',
  completed: 'bg-green-500/20 text-green-400',
  cancelled: 'bg-destructive/20 text-destructive',
};

export function OrdersList() {
  const { orders, orderModules } = useData();
  const [filter, setFilter] = useState('all');
  const [viewingId, setViewingId] = useState<string | null>(null);

  const filteredOrders = orders.filter(order =>
    filter === 'all' ? true : order.status === filter
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (viewingId) {
    return <OrderDetail orderId={viewingId} onClose={() => setViewingId(null)} />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Заказы</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {statusFilters.map((sf) => (
          <Button
            key={sf.value}
            variant={filter === sf.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(sf.value)}
            className={filter === sf.value ? 'bg-gradient-to-r from-primary to-accent' : ''}
          >
            {sf.label}
          </Button>
        ))}
      </div>

      {/* Orders Table */}
      {filteredOrders.length > 0 ? (
        <div className="glass rounded-xl border border-border/50 overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Дата</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Контакт</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Модули</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Статус</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-foreground/70">
                    {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{order.name}</div>
                    <div className="text-sm text-foreground/60">{order.contact}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground/70">
                    {order.modules.length > 0
                      ? order.modules.slice(0, 2).map(moduleId => {
                          const module = orderModules.find(m => m.id === moduleId);
                          return module?.name;
                        }).filter(Boolean).join(', ') + (order.modules.length > 2 ? '...' : '')
                      : 'Не выбраны'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[order.status]}`}>
                      {statusLabels[order.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <Button variant="ghost" size="sm" onClick={() => setViewingId(order.id)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="glass rounded-xl border border-border/50 p-12 text-center">
          <p className="text-foreground/50">Заказов пока нет</p>
        </div>
      )}
    </div>
  );
}
