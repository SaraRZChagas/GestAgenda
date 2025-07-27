import React, { useState } from 'react';

type Customer = {
  idCustomers: number | string;
  nameCustomers: string;
};

interface CustomerSearchProps {
  customers: Customer[];
  onSelect: (customer: Customer) => void;
}

export default function CustomerSearch({ customers, onSelect }: CustomerSearchProps) {
  const [search, setSearch] = useState('');
  const [showList, setShowList] = useState(false);

  const filtered = customers.filter((c) =>
    c.nameCustomers.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative max-w-md">
      <input
        type="text"
        className="w-full border rounded p-2"
        placeholder="Buscar cliente..."
        value={search}
        onChange={e => {
          setSearch(e.target.value);
          setShowList(true);
        }}
        onFocus={() => setShowList(true)}
        onBlur={() => setTimeout(() => setShowList(false), 150)} // aguarda select
      />
      {showList && (
        <ul className="absolute z-10 bg-white border border-gray-200 rounded w-full mt-1 max-h-56 overflow-auto shadow">
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-gray-400">Nenhum cliente encontrado</li>
          ) : (
            filtered.map((c) => (
              <li key={c.idCustomers}>
                <button
                  type="button"
                  className="w-full text-left px-3 py-2 hover:bg-blue-100"
                  onClick={() => {
                    onSelect(c);
                    setSearch(c.nameCustomers);
                    setShowList(false);
                  }}
                >
                  {c.nameCustomers}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
