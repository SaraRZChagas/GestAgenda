import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { BreadcrumbItem } from '@/types';
import { route } from 'ziggy-js';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: route('professional.dashboard') },
  { title: 'Serviços', href: route('professional.services.index') },
];

type Service = {
  id: number;
  name: string;
  description: string;
  duration: number; // em minutos
  price: number;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [newService, setNewService] = useState<Partial<Service>>({});

  const handleAdd = () => {
    if (!newService.name || !newService.duration || !newService.price) return;

    const newEntry: Service = {
      id: Date.now(), // só para teste (depois virá do backend)
      name: newService.name,
      description: newService.description || '',
      duration: Number(newService.duration),
      price: Number(newService.price),
    };

    setServices([...services, newEntry]);
    setNewService({});
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Serviços" />
      <div className="space-y-6 p-4">
        <h2 className="text-xl font-semibold">Gerenciar Serviços</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <Input
            placeholder="Nome do serviço"
            value={newService.name || ''}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          />
          <Input
            placeholder="Duração (em minutos)"
            type="number"
            value={newService.duration || ''}
            onChange={(e) => setNewService({ ...newService, duration: Number(e.target.value) })}
          />
          <Input
            placeholder="Preço"
            type="number"
            value={newService.price || ''}
            onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
          />
          <Textarea
            placeholder="Descrição"
            value={newService.description || ''}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          />
        </div>

        <Button onClick={handleAdd}>Adicionar Serviço</Button>

        <div className="mt-6 border-t pt-4">
          {services.length === 0 ? (
            <p className="text-gray-500">Nenhum serviço cadastrado.</p>
          ) : (
            <ul className="space-y-3">
              {services.map((service) => (
                <li
                  key={service.id}
                  className="border p-4 rounded-md shadow-sm space-y-1"
                >
                  <h4 className="font-semibold">{service.name}</h4>
                  <p className="text-sm">{service.description}</p>
                  <p className="text-sm text-gray-500">
                    {service.duration} min - R${service.price.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
