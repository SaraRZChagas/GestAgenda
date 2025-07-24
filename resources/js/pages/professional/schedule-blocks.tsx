import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import NewTypeModal from '@/components/CreateScheduleBlockTypeModal';

interface ScheduleBlockType {
  idScheduleBlocksTypes: number;
  nameScheduleBlocksTypes: string;
  colorScheduleBlocksTypes?: string;
}

interface ScheduleBlock {
  idScheduleBlocks: number;
  startDatetimeScheduleBlocks: string;
  endDatetimeScheduleBlocks: string;
  descriptionScheduleBlocks?: string;
  idScheduleBlocksTypes: number;
  block_type?: ScheduleBlockType;
}

interface ScheduleBlocksPageProps {
  blocks: ScheduleBlock[];
  types: ScheduleBlockType[];
}

const formatDateTime = (datetime: string) => {
  const date = new Date(datetime);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export default function ScheduleBlocksPage({ blocks, types }: ScheduleBlocksPageProps) {
  const { data, setData, post, processing, reset } = useForm({
    startDatetimeScheduleBlocks: '',
    endDatetimeScheduleBlocks: '',
    idScheduleBlocksTypes: '',
    descriptionScheduleBlocks: '',
  });

  

  const [localTypes, setLocalTypes] = useState<ScheduleBlockType[]>(types);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('professional.schedule-blocks.store'), { onSuccess: () => reset() });
  };

  const handleTypeCreated = (newType: ScheduleBlockType) => {
    setLocalTypes([...localTypes, newType]);
    setData('idScheduleBlocksTypes', String(newType.idScheduleBlocksTypes));
  };

  return (
    <AppLayout>
      <Head title="Bloqueios de Agenda" />

      {/* Wrapper com padding maior */}
      <div className="p-6 lg:p-10 space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Cadastrar Bloqueio</h2>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
            <div>
              <Label>Data início</Label>
              <Input
                type="datetime-local"
                value={data.startDatetimeScheduleBlocks}
                onChange={(e) => setData('startDatetimeScheduleBlocks', e.target.value)}
              />
            </div>
            <div>
              <Label>Data fim</Label>
              <Input
                type="datetime-local"
                value={data.endDatetimeScheduleBlocks}
                onChange={(e) => setData('endDatetimeScheduleBlocks', e.target.value)}
              />
            </div>
            <div>
              <Label>Tipo de bloqueio</Label>
              <p className="text-sm text-gray-500 mb-1">Para ter categorias nos relatórios de sistemas.</p>
              <select
                value={data.idScheduleBlocksTypes}
                onChange={(e) => setData('idScheduleBlocksTypes', e.target.value)}
                className="border rounded px-2 py-1 w-full"
              >
                <option value="">Selecione</option>
                {localTypes.map((t) => (
                  <option key={t.idScheduleBlocksTypes} value={t.idScheduleBlocksTypes}>
                    {t.nameScheduleBlocksTypes}
                  </option>
                ))}
              </select>
              <Button type="button" onClick={() => setShowModal(true)} className="mt-2">
                Novo Tipo
              </Button>
            </div>
            <div>
              <Label>Descrição</Label>
              <Input
                value={data.descriptionScheduleBlocks}
                onChange={(e) => setData('descriptionScheduleBlocks', e.target.value)}
              />
            </div>
            <Button type="submit" disabled={processing}>
              Salvar Bloqueio
            </Button>
          </form>
        </div>

        {/* Tabela com padding interno */}
        <div className="bg-white rounded-md shadow p-4 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border text-left">Início</th>
                <th className="p-3 border text-left">Fim</th>
                <th className="p-3 border text-left">Tipo</th>
                <th className="p-3 border text-left">Descrição</th>
                <th className="p-3 border text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((h) => (
                <tr key={h.idScheduleBlocks} className="hover:bg-gray-50">
                  <td className="p-3 border">{formatDateTime(h.startDatetimeScheduleBlocks)}</td>
                  <td className="p-3 border">{formatDateTime(h.endDatetimeScheduleBlocks)}</td>
                  <td className="p-3 border">{h.block_type?.nameScheduleBlocksTypes}</td>
                  <td className="p-3 border">{h.descriptionScheduleBlocks}</td>
                  <td className="p-3 border flex gap-2">
                    <Button size="sm" onClick={() => {}}>
                      Editar
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => {}}>
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <NewTypeModal open={showModal} onClose={() => setShowModal(false)} onCreated={handleTypeCreated} />
    </AppLayout>
  );
}
