import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function SchedulingRules() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Regras de Agendamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="start_time">Horário de início</Label>
            <Input id="start_time" type="time" />
          </div>
          <div>
            <Label htmlFor="end_time">Horário de término</Label>
            <Input id="end_time" type="time" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Label>Dias úteis apenas</Label>
          <Switch id="weekdays_only" />
        </div>

        <div>
          <Label htmlFor="max_per_day">Máx. atendimentos por dia</Label>
          <Input id="max_per_day" type="number" min={1} />
        </div>

        <Button className="mt-2">Salvar Regras</Button>
      </CardContent>
    </Card>
  );
}
