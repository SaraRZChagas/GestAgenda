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
  type?: ScheduleBlockType;
}

interface ScheduleBlocksPageProps {
  blocks: ScheduleBlock[];
  types: ScheduleBlockType[];
}

export default function ScheduleBlocksPage({ blocks, types }: ScheduleBlocksPageProps) {
  const { data, setData, post, processing, reset } = useForm({
    startDatetimeScheduleBlocks: '',
    endDatetimeScheduleBlocks: '',
    idScheduleBlocksTypes: '',
    descriptionScheduleBlocks: '',
  });

  const [localTypes, setLocalTypes] = useState<ScheduleBlockType[]>(types);
  const [showModal, setShowModal] = useState(false);

  // Tipagem do evento de submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('professional.schedule-blocks.store'), { onSuccess: () => reset() });
  };

  // Tipagem do novo tipo criado
  const handleTypeCreated = (newType: ScheduleBlockType) => {
    setLocalTypes([...localTypes, newType]);
    setData('idScheduleBlocksTypes', String(newType.idScheduleBlocksTypes));
  };

  return (
    <AppLayout>
      <Head title="Bloqueios de Agenda" />

      <h2 className="text-xl font-bold mb-4">Cadastrar Bloqueio</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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

      <NewTypeModal open={showModal} onClose={() => setShowModal(false)} onCreated={handleTypeCreated} />
    </AppLayout>
  );
}
