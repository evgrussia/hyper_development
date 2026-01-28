import { useState, useEffect } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { ArrowLeft, Save } from 'lucide-react';

interface ModulesFormProps {
  editId: string | null;
  onClose: () => void;
}

export function ModulesForm({ editId, onClose }: ModulesFormProps) {
  const { orderModules, addOrderModule, updateOrderModule } = useData();
  const [formData, setFormData] = useState({ name: '', order: 1, isActive: true });

  useEffect(() => {
    if (editId) {
      const item = orderModules.find(m => m.id === editId);
      if (item) setFormData({ name: item.name, order: item.order, isActive: item.isActive });
    }
  }, [editId, orderModules]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editId ? updateOrderModule(editId, formData) : addOrderModule(formData);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onClose}><ArrowLeft className="w-5 h-5" /></Button>
        <h1 className="text-3xl font-bold">{editId ? 'Редактирование модуля' : 'Новый модуль'}</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-2xl glass rounded-xl border border-border/50 p-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Название</Label>
          <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="bg-input-background border-border/50 focus:border-primary" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="order">Порядок</Label>
          <Input id="order" type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} min={1} className="bg-input-background border-border/50 focus:border-primary" />
        </div>
        <div className="flex items-center justify-between glass-strong p-4 rounded-lg">
          <Label htmlFor="isActive">Активен</Label>
          <Switch id="isActive" checked={formData.isActive} onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })} />
        </div>
        <div className="flex gap-4 pt-4">
          <Button type="submit" className="bg-gradient-to-r from-primary to-accent"><Save className="mr-2 w-5 h-5" />Сохранить</Button>
          <Button type="button" variant="outline" onClick={onClose}>Отмена</Button>
        </div>
      </form>
    </div>
  );
}
