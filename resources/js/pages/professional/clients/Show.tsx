import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

type Appointment = {
  idAppointments: number;
  startDatetimeAppointments: string;
  endDatetimeAppointments: string;
  statusAppointments: string;
  notesAppointments?: string;
  service: { nameServices: string };
};

type Customer = {
  idCustomers: number;
  nameCustomers: string;
  phoneCustomers: string;
  addressCustomers: string;
};

interface Props {
  customer: Customer;
  appointments: Appointment[];
}

export default function Show({ customer, appointments }: Props) {
    console.log(appointments);
  return (
    <AppLayout>
      <Head title={`Cliente: ${customer.nameCustomers}`} />
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Cliente: {customer.nameCustomers}</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Dados do Cliente</h2>
          <p><strong>Telefone:</strong> {customer.phoneCustomers || '-'}</p>
          <p><strong>Endereço:</strong> {customer.addressCustomers || '-'}</p>
        </section>

        <Link href={route('professional.clients.search')} className="text-blue-600 hover:underline mb-6 inline-block">
          ← Voltar para busca
        </Link>

        {appointments.length === 0 ? (
          <p>Este cliente não possui marcações.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map(app => (
              <div
                key={app.idAppointments}
                className="border rounded p-4 shadow-sm bg-white"
              >
                <p><strong>Serviço:</strong> {app.service.nameServices}</p>
                <p><strong>Início:</strong> {new Date(app.startDatetimeAppointments).toLocaleString()}</p>
                <p><strong>Fim:</strong> {new Date(app.endDatetimeAppointments).toLocaleString()}</p>
                <p><strong>Status:</strong> {app.statusAppointments}</p>
                <p><strong>Notas:</strong> {app.notesAppointments ?? '-'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
