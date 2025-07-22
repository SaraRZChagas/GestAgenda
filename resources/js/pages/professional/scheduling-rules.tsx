import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { route } from 'ziggy-js';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: route('professional.dashboard') },
  { title: 'Regras de Agendamento', href: route('professional.scheduling-rules.index') },
];

type DayRule = {
  day: string;
  active: boolean;
  startTime: string;
  endTime: string;
};

const defaultRules: DayRule[] = [
  { day: 'Segunda-feira', active: true, startTime: '09:00', endTime: '18:00' },
  { day: 'Terça-feira', active: true, startTime: '09:00', endTime: '18:00' },
  { day: 'Quarta-feira', active: true, startTime: '09:00', endTime: '18:00' },
  { day: 'Quinta-feira', active: true, startTime: '09:00', endTime: '18:00' },
  { day: 'Sexta-feira', active: true, startTime: '09:00', endTime: '18:00' },
  { day: 'Sábado', active: false, startTime: '09:00', endTime: '13:00' },
  { day: 'Domingo', active: false, startTime: '09:00', endTime: '13:00' },
];

export default function SchedulingRulesPage() {
  const [rules, setRules] = useState<DayRule[]>(defaultRules);

  const handleToggle = (index: number) => {
    const updated = [...rules];
    updated[index].active = !updated[index].active;
    setRules(updated);
  };

  const handleChangeTime = (index: number, field: 'startTime' | 'endTime', value: string) => {
    const updated = [...rules];
    updated[index][field] = value;
    setRules(updated);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Regras de Agendamento" />
      <div className="space-y-6 p-4">
        <h2 className="text-xl font-semibold">Configurar Regras de Agendamento</h2>
        <div className="space-y-4">
          {rules.map((rule, i) => (
            <div
              key={rule.day}
              className="flex flex-col gap-2 border-b pb-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-center gap-4">
                <Switch checked={rule.active} onCheckedChange={() => handleToggle(i)} />
                <span className="font-medium">{rule.day}</span>
              </div>
              {rule.active && (
                <div className="flex gap-2">
                  <div>
                    <Label>Início</Label>
                    <Input
                      type="time"
                      value={rule.startTime}
                      onChange={(e) => handleChangeTime(i, 'startTime', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Fim</Label>
                    <Input
                      type="time"
                      value={rule.endTime}
                      onChange={(e) => handleChangeTime(i, 'endTime', e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <Button onClick={() => console.log('Salvar futuramente...')}>
          Salvar Regras
        </Button>
      </div>
    </AppLayout>
  );
}
