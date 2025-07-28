import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Pencil, Trash } from 'lucide-react';


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

      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-semibold mb-6 text-center">Minhas Marcações</h1>

        {appointments.length === 0 ? (
          <p className="text-gray-600 text-center">Você não tem marcações agendadas.</p>
        ) : (
          <div className="space-y-6">
            {appointments.map((app) => (
              <div
                key={app.idAppointments}
                className="border rounded-xl shadow-md p-4 bg-white flex flex-col gap-3"
                role="listitem"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-base text-gray-700 font-semibold">Cliente</span>
                  <span className="text-lg">{app.customer?.nameCustomers ?? 'Cliente não informado'}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-base text-gray-700 font-semibold">Serviço</span>
                  <span className="text-lg">{app.service?.nameServices ?? 'Serviço não informado'}</span>
                </div>

                <div className="flex flex-col gap-1 md:flex-row md:gap-8">
                  <div>
                    <span className="font-semibold">Início: </span>
                    {new Date(app.startDatetimeAppointments).toLocaleString()}
                  </div>
                  <div>
                    <span className="font-semibold">Fim: </span>
                    {new Date(app.endDatetimeAppointments).toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-col gap-1 md:flex-row md:gap-8">
                  <div>
                    <span className="font-semibold">Status: </span>
                    <span className={`capitalize ${app.statusAppointments === 'scheduled'
                        ? 'text-green-600'
                        : app.statusAppointments === 'cancelled'
                          ? 'text-red-600'
                          : 'text-gray-600'
                      }`}>
                      {app.statusAppointments}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Notas: </span>
                    {app.notesAppointments || 'Nenhuma'}
                  </div>
                  <div className="flex gap-2 mt-4 justify-end">
                    <Link href={route('professional.appointments.edit', app.idAppointments)} className="btn btn-sm btn-primary flex items-center gap-1">
                      <Pencil size={16} /> Editar
                    </Link>
                    <button
                      onClick={() => {
                        if(confirm('Tem certeza que deseja cancelar esta marcação?')) {
                          router.delete(route('professional.appointments.destroy', app.idAppointments));
                        }
                      }} 
                      className="btn btn-sm btn-danger flex items-center gap-1"
                    >
                      <Trash size={16} /> Cancelar
                    </button>
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
