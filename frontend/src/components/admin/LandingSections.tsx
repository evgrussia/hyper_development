import { useData } from '@/contexts/DataContext';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';

export function LandingSections() {
  const { landingSections, updateLandingSection } = useData();
  const sortedSections = [...landingSections].sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Секции лендинга</h1>

      <div className="glass rounded-xl border border-border/50 p-6 space-y-4">
        {sortedSections.map((section) => (
          <div
            key={section.key}
            className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div>
              <h3 className="font-medium">{section.name}</h3>
              <p className="text-sm text-foreground/60">Порядок: {section.order}</p>
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor={`section-${section.key}`} className="text-sm">
                {section.isActive ? 'Включено' : 'Выключено'}
              </Label>
              <Switch
                id={`section-${section.key}`}
                checked={section.isActive}
                onCheckedChange={(checked) =>
                  updateLandingSection(section.key, { isActive: checked })
                }
              />
            </div>
          </div>
        ))}
      </div>

      <div className="glass-strong p-4 rounded-lg border border-primary/20">
        <p className="text-sm text-foreground/70">
          💡 Здесь вы можете управлять видимостью секций на главной странице
        </p>
      </div>
    </div>
  );
}
