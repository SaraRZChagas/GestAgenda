import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

type Appointment = {
  idAppointments: number;
  startDatetimeAppointments: string;
  endDatetimeAppointments: string;
  professional: { nameBusinessProfessionals: string };
  service: { nameServices: string };
  statusAppointments: string;
  notesAppointments?: string;
};

interface Props {
  appointments: Appointment[];
}

export default function Future({ appointments }: Props) {
  return (
    <AppLayout>
      <Head title="Próximas Marcações" />
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Próximas Marcações</h1>
        {appointments.length === 0 ? (
          <p>Nenhuma marcação futura encontrada.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map(app => (
              <div key={app.idAppointments} className="border rounded p-4 bg-gray-50">
                <p><strong>Profissional:</strong> {app.professional?.nameBusinessProfessionals ?? '-'}</p>
                <p><strong>Serviço:</strong> {app.service?.nameServices ?? '-'}</p>
                <p><strong>Início:</strong> {new Date(app.startDatetimeAppointments).toLocaleString()}</p>
                <p><strong>Status:</strong> {app.statusAppointments}</p>
                <p><strong>Notas:</strong> {app.notesAppointments || '-'}</p>
              </div>
            ))}
          </div>
        )}
        <Link href={route('client.dashboard')} className="text-blue-600 hover:underline mt-6 inline-block">
          ← Voltar ao painel
        </Link>
      </div>
    </AppLayout>
  );
}
