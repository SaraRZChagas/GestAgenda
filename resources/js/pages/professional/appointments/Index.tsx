import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

type Appointment = {
  idAppointments: number;
  customer?: { nameCustomers: string };
  service?: { nameServices: string };
  startDatetimeAppointments: string;
  endDatetimeAppointments: string;
  statusAppointments: string;
  notesAppointments?: string;
};

interface AppointmentIndexProps {
  appointments: Appointment[];
}

export default function AppointmentIndex({ appointments }: AppointmentIndexProps) {
  return (
    <AppLayout>
      <Head title="Minhas Marcações" />

      <div className="max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-6">Minhas Marcações</h1>

        {appointments.length === 0 ? (
          <p className="text-gray-600 text-center">Você não tem marcações agendadas.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((app) => (
              <div
                key={app.idAppointments}
                className="border rounded-lg shadow p-4 hover:shadow-lg transition-shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                role="listitem"
              >
                <div className="flex flex-col sm:flex-row sm:gap-6 grow">
                  <div>
                    <p className="text-lg font-medium">{app.customer?.nameCustomers ?? 'Cliente não informado'}</p>
                    <p className="text-sm text-gray-600">Cliente</p>
                  </div>
                  <div>
                    <p className="text-lg font-medium">{app.service?.nameServices ?? 'Serviço não informado'}</p>
                    <p className="text-sm text-gray-600">Serviço</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-6 text-gray-700 text-sm whitespace-nowrap min-w-[280px]">
                  <div>
                    <span className="font-semibold">Início: </span>
                    {new Date(app.startDatetimeAppointments).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-semibold">Fim: </span>
                    {new Date(app.endDatetimeAppointments).toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:gap-6 text-sm text-gray-700 whitespace-nowrap min-w-[200px]">
                  <div>
                    <span className="font-semibold">Status: </span>
                    <span className={`capitalize ${
                      app.statusAppointments === 'scheduled'
                        ? 'text-green-600'
                        : app.statusAppointments === 'cancelled'
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}>
                      {app.statusAppointments}
                    </span>
                  </div>
                  <div className="truncate max-w-xs" title={app.notesAppointments}>
                    <span className="font-semibold">Notas: </span>
                    {app.notesAppointments || 'Nenhuma'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href={route('professional.appointments.create')}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition"
          >
            Nova Marcação
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}