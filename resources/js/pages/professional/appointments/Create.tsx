import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import CustomerSearch from '@/components/ui/CustomerSearch';

type Service = {
  idServices: number;
  nameServices: string;
};

type Customer = {
  idCustomers: number;
  nameCustomers: string;
};

export default function CreateAppointment({ services, customers }:{services:Service[]; customers:Customer[]}) {
  const { data, setData, post, processing, errors } = useForm<{
    idCustomers: string | number;
    idServices: string;
    startDatetimeAppointments: string;
    endDatetimeAppointments: string;
    notesAppointments: string;
  }>({
    idCustomers: '',
    idServices: '',
    startDatetimeAppointments: '',
    endDatetimeAppointments: '',
    notesAppointments: '',
  });

    const [search, setSearch] = useState('');
  const [showList, setShowList] = useState(false);

  const filtered = customers.filter((c) =>
    c.nameCustomers.toLowerCase().includes(search.toLowerCase())
  );

  const submit = (e: any) => {
    e.preventDefault();
    post(route('professional.appointments.store'));
  };

  return (
    <AppLayout>
      <Head title="Nova Marcação" />
      <form onSubmit={submit} className="max-w-xl mx-auto space-y-6 p-8">
        {/* Cliente */}
        <div>
          <Label htmlFor="idCustomers">Cliente</Label>
            <CustomerSearch customers={customers} onSelect={cliente => setData('idCustomers', cliente.idCustomers)} />
          <InputError message={errors.idCustomers} />
        </div>

        {/* Serviço */}
        <div>
          <Label htmlFor="idServices">Serviço</Label>
          <select
            id="idServices"
            value={data.idServices}
            onChange={e => setData('idServices', e.target.value)}
            className="w-full border rounded p-2 mt-1"
            required
          >
            <option value="">Selecione um serviço</option>
            {services.map((service) => (
              <option key={service.idServices} value={service.idServices}>
                {service.nameServices}
              </option>
            ))}
          </select>
          <InputError message={errors.idServices} />
        </div>

        {/* Data e hora início */}
        <div>
          <Label htmlFor="startDatetimeAppointments">Início</Label>
          <Input
            id="startDatetimeAppointments"
            type="datetime-local"
            value={data.startDatetimeAppointments}
            onChange={e => setData('startDatetimeAppointments', e.target.value)}
            required
          />
          <InputError message={errors.startDatetimeAppointments} />
        </div>

        {/* Data e hora fim */}
        <div>
          <Label htmlFor="endDatetimeAppointments">Fim</Label>
          <Input
            id="endDatetimeAppointments"
            type="datetime-local"
            value={data.endDatetimeAppointments}
            onChange={e => setData('endDatetimeAppointments', e.target.value)}
            required
          />
          <InputError message={errors.endDatetimeAppointments} />
        </div>

        {/* Notas */}
        <div>
          <Label htmlFor="notesAppointments">Notas</Label>
          <textarea
            id="notesAppointments"
            value={data.notesAppointments}
            onChange={e => setData('notesAppointments', e.target.value)}
            className="w-full border rounded p-2 mt-1"
            rows={4}
          />
          <InputError message={errors.notesAppointments} />
        </div>

        <div>
          <Button type="submit" disabled={processing}>
            Criar Marcação
          </Button>
        </div>

        <div>
          <Link href={route('professional.appointments.index')} className="text-blue-600 hover:underline">
            Voltar para lista
          </Link>
        </div>
      </form>
    </AppLayout>
  );
}
