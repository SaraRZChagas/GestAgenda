import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface Props {
  breadcrumbs: BreadcrumbItem[];
}

export default function Services({ breadcrumbs }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Serviços" />
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Gestão de Serviços</h1>
        <p className="mt-2 text-gray-600">Em breve: formulário para gerenciar serviços (nome, duração, preço...)</p>
      </div>
    </AppLayout>
  );
}