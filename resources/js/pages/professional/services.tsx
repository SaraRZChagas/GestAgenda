import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type PageProps, type Service } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
 
interface Props extends PageProps {
  services: Service[];
  breadcrumbs: { title: string; href?: string }[];
}
 
export default function ServicesPage({ services, breadcrumbs }: Props) {
  const { data, setData, post, processing, reset } = useForm<{
    nameServices: string;
    descriptionServices: string;
    priceServices: string;
    durationMinutesServices: string;
    isActiveServices: boolean;
  }>({
    nameServices: '',
    descriptionServices: '',
    priceServices: '',
    durationMinutesServices: '',
    isActiveServices: true,
  });
 
  // Ensure all breadcrumb items have href as string
  const normalizedBreadcrumbs = breadcrumbs.map(b => ({
    ...b,
    href: b.href ?? '',
  }));
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('professional.services.store'), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };
 
  return (
    <AppLayout breadcrumbs={normalizedBreadcrumbs}>
      <Head title="Serviços" />
 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
        {/* Formulário */}
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Novo Serviço</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nameServices">Nome</Label>
                <Input
                  id="nameServices"
                  value={data.nameServices}
                  onChange={(e) => setData('nameServices', e.target.value)}
                />
              </div>
 
              <div>
                <Label htmlFor="descriptionServices">Descrição</Label>
                <Input
                  id="descriptionServices"
                  value={data.descriptionServices}
                  onChange={(e) => setData('descriptionServices', e.target.value)}
                />
              </div>
 
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="priceServices">Preço (€)</Label>
                  <Input
                    id="priceServices"
                    type="number"
                    step="0.01"
                    value={data.priceServices}
                    onChange={(e) => setData('priceServices', e.target.value)}
                  />
                </div>
 
                <div className="flex-1">
                  <Label htmlFor="durationMinutesServices">Duração (min)</Label>
                  <Input
                    id="durationMinutesServices"
                    type="number"
                    value={data.durationMinutesServices}
                    onChange={(e) => setData('durationMinutesServices', e.target.value)}
                  />
                </div>
              </div>
 
              <div>
                <Label htmlFor="isActiveServices">Ativo?</Label>
                <select
                  id="isActiveServices"
                  value={data.isActiveServices ? '1' : '0'}
                  onChange={(e) => setData('isActiveServices', e.target.value === '1')}
                  className="mt-1 w-full rounded border px-2 py-1"
                >
                  <option value="1">Sim</option>
                  <option value="0">Não</option>
                </select>
              </div>
 
              <Button type="submit" disabled={processing}>
                Criar Serviço
              </Button>
            </form>
          </CardContent>
        </Card>
 
        {/* Lista de Serviços */}
        <Card>
          <CardHeader>
            <CardTitle>Serviços Cadastrados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {services.length === 0 && <p className="text-sm text-gray-500">Nenhum serviço encontrado.</p>}
 
            {services.map((service) => (
              <div key={service.idServices} className="border-b pb-2">
                <p className="font-medium">{service.nameServices}</p>
                <p className="text-sm text-muted-foreground">
                  {service.descriptionServices} | {service.durationMinutesServices} min | €{service.priceServices}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}