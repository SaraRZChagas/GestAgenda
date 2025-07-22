import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

// Ensure BreadcrumbItem includes 'name' property in its definition
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: route('professional.dashboard') },
  { title: 'Histórico de Atendimentos' , href: route('professional.appointments.history')},
];


type Appointment = {
  id: number;
  client_name: string;
  service: string;
  date: string;
  time: string;
  status: 'Concluído' | 'Cancelado' | 'Não compareceu';
};

const mockAppointments: Appointment[] = [
  {
    id: 1,
    client_name: 'João Silva',
    service: 'Consulta',
    date: '2025-07-20',
    time: '14:00',
    status: 'Concluído',
  },
  {
    id: 2,
    client_name: 'Maria Santos',
    service: 'Massagem Terapêutica',
    date: '2025-07-18',
    time: '09:30',
    status: 'Cancelado',
  },
  {
    id: 3,
    client_name: 'Carlos Oliveira', 
    service: 'Aula de Yoga',
    date: '2025-07-17',
    time: '17:00',
    status: 'Não compareceu',
  },
];

export default function AppointmentsHistory() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Histórico de Atendimentos" />
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Histórico de Atendimentos</h2>
        <div className="overflow-x-auto border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Serviço</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Hora</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.client_name}</TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        appointment.status === 'Concluído'
                          ? 'bg-green-100 text-green-800'
                          : appointment.status === 'Cancelado'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AppLayout>
  );
}
