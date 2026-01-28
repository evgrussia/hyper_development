import { useState, useEffect } from 'react';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { ArrowLeft, Save } from 'lucide-react';

interface ServicesFormProps {
  editId: string | null;
  onClose: () => void;
}

export function ServicesForm({ editId, onClose }: ServicesFormProps) {
  const { services, addService, updateService } = useData();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order: 1,
    isActive: true,
  });

  useEffect(() => {
    if (editId) {
      const item = services.find(s => s.id === editId);
      if (item) setFormData({ title: item.title, description: item.description, order: item.order, isActive: item.isActive });
    }
  }, [editId, services]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editId ? updateService(editId, formData) : addService(formData);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onClose}><ArrowLeft className="w-5 h-5" /></Button>
        <h1 className="text-3xl font-bold">{editId ? 'Редактирование услуги' : 'Новая услуга'}</h1>
      </div>
      <form onSubmit={handleSubmit} className="max-w-2xl glass rounded-xl border border-border/50 p-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Название</Label>
          <Input id="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="bg-input-background border-border/50 focus:border-primary" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Описание</Label>
          <Textarea id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="bg-input-background border-border/50 focus:border-primary min-h-[120px]" />
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
