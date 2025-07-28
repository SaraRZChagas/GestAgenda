import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

type Service = {
  name: string;
  description: string;
  duration: number;
  price: number;
};

export default function ServiceManager() {
  const [services, setServices] = useState<Service[]>([]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestão de Serviços</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Nome do serviço</Label>
            <Input id="name" />
          </div>
          <div>
            <Label htmlFor="duration">Duração (min)</Label>
            <Input id="duration" type="number" />
          </div>
          <div>
            <Label htmlFor="price">Preço (€)</Label>
            <Input id="price" type="number" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" />
          </div>
        </div>

        <Button className="mt-2">Adicionar Serviço</Button>

        {/* Lista simulada de serviços */}
        <div className="pt-4">
          <h3 className="font-semibold">Serviços cadastrados</h3>
          {services.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum serviço cadastrado ainda frontpage.</p>
          ) : (
            <ul className="list-disc pl-6 mt-2">
              {services.map((s, i) => (
                <li key={i}>
                  {s.name} - {s.duration}min - €{s.price}
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
