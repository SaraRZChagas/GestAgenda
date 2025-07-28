import { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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
  status: string;
  notes?: string;
};


interface EditProps  {
  appointment: Appointment;
  services: Service[];
  customers: Customer[];
}

export default function Edit({ appointment, services, customers }: EditProps) {
  const { data, setData, put, processing, errors } = useForm({
    idCustomers: appointment.customer?.idCustomers ?? '',
    idServices: appointment.service?.idServices ?? '',
    startDatetimeAppointments: appointment.startDatetimeAppointments.slice(0, 16), // datetime-local needs this format
    endDatetimeAppointments: appointment.endDatetimeAppointments.slice(0, 16),
    status: appointment.status || 'scheduled',
    notes: appointment.notes || '',
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    put(route('professional.appointments.update', appointment.idAppointments));
  }

  return (
    <AppLayout>
      <Head title="Editar Marcação" />
      <form onSubmit={submit} className="max-w-xl mx-auto space-y-6 p-8">
        <div>
          <Label htmlFor="idCustomers">Cliente</Label>
          <select
            id="idCustomers"
            value={data.idCustomers}
            onChange={e => setData('idCustomers', e.target.value)}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Selecione Cliente</option>
            {customers.map(c => (
              <option key={c.idCustomers} value={c.idCustomers}>{c.nameCustomers}</option>
            ))}
          </select>
          <InputError message={errors.idCustomers} />
        </div>

        <div>
          <Label htmlFor="idServices">Serviço</Label>
          <select
            id="idServices"
            value={data.idServices}
            onChange={e => setData('idServices', e.target.value)}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Selecione Serviço</option>
            {services.map(s => (
              <option key={s.idServices} value={s.idServices}>{s.nameServices}</option>
            ))}
          </select>
          <InputError message={errors.idServices} />
        </div>

        <div>
          <Label htmlFor="startDatetimeAppointments">Início</Label>
          <input
            type="datetime-local"
            id="startDatetimeAppointments"
            value={data.startDatetimeAppointments}
            onChange={e => setData('startDatetimeAppointments', e.target.value)}
            required
            className="w-full border rounded p-2"
          />
          <InputError message={errors.startDatetimeAppointments} />
        </div>

        <div>
          <Label htmlFor="endDatetimeAppointments">Fim</Label>
          <input
            type="datetime-local"
            id="endDatetimeAppointments"
            value={data.endDatetimeAppointments}
            onChange={e => setData('endDatetimeAppointments', e.target.value)}
            required
            className="w-full border rounded p-2"
          />
          <InputError message={errors.endDatetimeAppointments} />
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            value={data.status}
            onChange={e => setData('status', e.target.value)}
            className="w-full border rounded p-2"
            required
          >
            <option value="scheduled">Agendado</option>
            <option value="cancelled">Cancelado</option>
            <option value="completed">Concluído</option>
            <option value="no_show">Não compareceu</option>
          </select>
          <InputError message={errors.status} />
        </div>

        <div>
          <Label htmlFor="notes">Notas</Label>
          <textarea
            id="notes"
            value={data.notes}
            onChange={e => setData('notes', e.target.value)}
            className="w-full border rounded p-2"
            rows={4}
          />
          <InputError message={errors.notes} />
        </div>

        <div className="flex justify-between items-center">
          <Button type="submit" disabled={processing}>Salvar</Button>
          <Link href={route('professional.appointments.index')} className="text-blue-600 underline">Cancelar</Link>
        </div>
      </form>
    </AppLayout>
  );
}
