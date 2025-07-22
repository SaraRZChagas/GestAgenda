import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';

interface Props {
  breadcrumbs: BreadcrumbItem[];
}

export default function SchedulingRules({ breadcrumbs }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Regras de Agendamento" />
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Definir Regras de Agendamento</h1>
        <p className="mt-2 text-gray-600">Em breve: configurações de horários disponíveis, cancelamento e limites por dia.</p>
      </div>
    </AppLayout>
  );
}
