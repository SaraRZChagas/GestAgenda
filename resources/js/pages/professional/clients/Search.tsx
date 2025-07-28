import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import CustomerSearch from '@/components/ui/CustomerSearch';
import AppLayout from '@/layouts/app-layout';

type Customer = {
  idCustomers: number | string;
  nameCustomers: string;
};

interface Props {
  customers: Customer[];
}

export default function Search({ customers }: Props) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
console.log(customers)
  function handleSelect(customer: Customer) {
    setSelectedCustomer(customer);
    router.visit(route('professional.clients.show', customer.idCustomers));
  }

  return (
    <AppLayout>
      <Head title="Buscar Cliente" />
      <div className="max-w-md mx-auto p-4">
        <h1 className="text-xl font-semibold mb-4">Buscar Cliente</h1>
        <CustomerSearch customers={customers} onSelect={handleSelect} />

        {selectedCustomer && (
          <div className="mt-6">
            <Link
              href={route('professional.clients.show', selectedCustomer.idCustomers)}
              className="text-blue-600 hover:underline"
            >
              Ver perfil de {selectedCustomer.nameCustomers}
            </Link>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
