import { useState } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/app/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { ServicesForm } from './ServicesForm';

export function ServicesList() {
  const { services, deleteService } = useData();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const sortedServices = [...services].sort((a, b) => a.order - b.order);

  if (isFormOpen) {
    return <ServicesForm editId={editingId} onClose={() => { setIsFormOpen(false); setEditingId(null); }} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Услуги</h1>
        <Button onClick={() => setIsFormOpen(true)} className="bg-gradient-to-r from-primary to-accent">
          <Plus className="mr-2 w-5 h-5" />Добавить
        </Button>
      </div>

      {sortedServices.length > 0 ? (
        <div className="glass rounded-xl border border-border/50 overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/30 border-b border-border/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Название</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Порядок</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Активен</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {sortedServices.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-foreground/60 line-clamp-1">{item.description}</div>
                  </td>
                  <td className="px-6 py-4 text-foreground/70">{item.order}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${item.isActive ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {item.isActive ? 'Да' : 'Нет'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => { setEditingId(item.id); setIsFormOpen(true); }}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteService(item.id)} className="text-destructive">
                        <Trash2 className="w-4 h-4" />
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
          <p className="text-foreground/50">Добавьте первую запись</p>
        </div>
      )}
    </div>
  );
}
