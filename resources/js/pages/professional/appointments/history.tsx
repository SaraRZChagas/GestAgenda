import { useForm, Head, Link, router} from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Route, Router } from 'lucide-react';

type Service = {
  idServices: number;
  nameServices: string;
};

type Customer = {
  idCustomers: number;
  nameCustomers: string;
};

type Appointment = {
  idAppointments: number;
  idCustomers?: number;
  idServices?: number;
  customer?: { idCustomers: number; nameCustomers: string };
  service?: { idServices: number; nameServices: string };
  startDatetimeAppointments: string;
  endDatetimeAppointments: string;
  statusAppointments: string;
  notesAppointments?: string;
};

interface Filter {
  customer_id?: string;
}

interface HistProps  {
  appointments: {
    data: Appointment[];
    meta?: any;      // se quiser, para paginação
  };
  filters: Filter;
  customers: Customer[];
}


export default function History({ appointments, filters, customers }: HistProps) {
  const { data, setData } = useForm({ customer_id: filters.customer_id || '' });

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(route("professional.appointments.history"), data);
  };
  console.log(appointments);

  return (
    <AppLayout>
      <Head title="Histórico de Marcações" />

      <form onSubmit={handleFilter} className="max-w-xl mx-auto p-6 space-y-4">
        <label className="block">
          Cliente:
          <select
            value={data.customer_id}
            onChange={e => setData('customer_id', e.target.value)}
            className="mt-1 w-full border rounded p-2"
          >
            <option value="">Todos</option>
            {customers.map(c => (
              <option key={c.idCustomers} value={c.idCustomers}>{c.nameCustomers}</option>
            ))}
          </select>
          <InputError message={undefined} />
        </label>
        <Button type="submit">Filtrar</Button>
      </form>

      <div className="max-w-4xl mx-auto p-6 space-y-4">
        {appointments.data.length === 0 ? (
          <p>Nenhuma marcação encontrada.</p>
        ) : (
          <ul role="list" className="space-y-4">
            {appointments.data.map(app => (
              <li key={app.idAppointments} className="border rounded p-4 shadow">
                <p><strong>Cliente:</strong> {app.customer?.nameCustomers ?? 'N/D'}</p>
                <p><strong>Serviço:</strong> {app.service?.nameServices ?? 'N/D'}</p>
                <p><strong>Início:</strong> {new Date(app.startDatetimeAppointments).toLocaleString()}</p>
                <p><strong>Fim:</strong> {new Date(app.endDatetimeAppointments).toLocaleString()}</p>
                <p><strong>Status:</strong> {app.statusAppointments}</p>
                <p><strong>Notas:</strong> {app.notesAppointments || 'Nenhuma'}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AppLayout>
  );
}
