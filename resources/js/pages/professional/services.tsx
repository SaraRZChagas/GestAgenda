import { Head, router, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type PageProps, type Service } from '@/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Router } from 'vendor/tightenco/ziggy/src/js';


interface Props extends PageProps {


  services: Service[];
  serviceTypes: ServiceType[]; // novo
  breadcrumbs: { title: string; href?: string }[];




}

interface ServiceType {
  idServicesTypes: number;
  nameServicesTypes: string;

}



export default function ServicesPage({ services, serviceTypes, breadcrumbs }: Props) {
  interface ServiceFormData {
    idServices?: number;
    [key: string]: string | boolean | File | null | undefined | number;
    nameServices: string;    
    descriptionServices: string;
    priceServices: string;
    durationMinutesServices: string;
    isActiveServices: boolean;
    idServicesTypes: string; // categoria
    profile_photo: File | null; // imagem
  }

  const { data, setData, post, processing, reset } = useForm<ServiceFormData>({
    nameServices: '',
    descriptionServices: '',
    priceServices: '',
    durationMinutesServices: '',
    isActiveServices: true,
    idServicesTypes: '',
    profile_photo: null,
  });



  // Ensure all breadcrumb items have href as string
  const normalizedBreadcrumbs = breadcrumbs.map(b => ({
    ...b,
    href: b.href ?? '',
  }));
  // Carregar os tipos de serviços

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (data.idServices) {
    // Use the put method from useForm, which expects a URL string
    // @ts-ignore
    put(route('professional.services.update', data.idServices), {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  } else {
    console.log('Categoria selecionada:', data.idServicesTypes);
    post(route('professional.services.store'), {
      preserveScroll: true,
      forceFormData: true, // importante para enviar arquivo
      onSuccess: () => reset(),
      onError: (errors) => {
    console.error('Erro na validação:', errors);
  }
    });
  }
};
  const handleEdit = (service: Service) => {
  setData({
    nameServices: service.nameServices,
    descriptionServices: service.descriptionServices,
    priceServices: String(service.priceServices),
    durationMinutesServices: String(service.durationMinutesServices),
    isActiveServices: service.isActiveServices,
    idServicesTypes: String(service.idServicesTypes),
    profile_photo: null, // Reset the file input
  });
};

const handleDelete = (id: number) => {
  if (confirm('Tem certeza que deseja deletar este serviço?')) {
    router.delete(route('professional.services.destroy', id), {
      preserveScroll: true,
    });
  }
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
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
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
                  value={data.isActiveServices ? 'true' : 'false'}
                  onChange={(e) => setData('isActiveServices', e.target.value === 'true')}
                  className="mt-1 w-full rounded border px-2 py-1"
                >
                  <option value="true">Sim</option>
                  <option value="false">Não</option>
                </select>
              </div>

              <div>
                <Label htmlFor="idServicesTypes">Categoria</Label>
                <select
                  id="idServicesTypes"
                  value={data.idServicesTypes}
                  onChange={(e) => setData('idServicesTypes', e.target.value)}
                  className="mt-1 w-full rounded border px-2 py-1"
                >
                  <option value="">Selecione uma categoria</option>
                  {(serviceTypes ?? []).map((type) => (
                    <option key={type.idServicesTypes} value={String(type.idServicesTypes)}>
                      {type.nameServicesTypes}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="profile_photo">Foto do Serviço</Label>
                <Input
                  id="profile_photo"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setData('profile_photo', e.target.files?.[0] ?? null)}
                />
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

            

            {(services ?? []).map((service) => (
              <div key={service.idServices} className="border-b pb-2 space-y-1">
                <p className="font-medium">{service.nameServices}</p>
                <p className="text-sm text-muted-foreground">
                  {service.descriptionServices} | {service.durationMinutesServices} min | €{service.priceServices} | {service.profile_photo && (
  <img
    src={`/storage/${service.profile_photo}`}
    alt={service.nameServices}
    className="w-20 h-20 object-cover rounded"
  />
)}
                </p>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(service)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(service.idServices)}
                  >
                    Deletar
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
// Removed custom put function; use the put method from useForm instead.
       
  );
}

