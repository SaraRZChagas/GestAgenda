import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';

interface ScheduleBlockType {
  idScheduleBlocksTypes: number;
  nameScheduleBlocksTypes: string;
  colorScheduleBlocksTypes?: string;
}

interface CreateScheduleBlockTypeModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (newType: ScheduleBlockType) => void;
}

export default function CreateScheduleBlockTypeModal({
  open,
  onClose,
  onCreated,
}: CreateScheduleBlockTypeModalProps) {
  const { data, setData, post, processing, reset } = useForm({
    nameScheduleBlocksTypes: '',
    colorScheduleBlocksTypes: '',
  });

  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setError(null);

  try {
    const response = await axios.post(route('professional.schedule-blocks.storeType'), data);
    if (response.data?.success) {
      onCreated(response.data.type);
      reset();
      onClose();
    }
  } catch (err) {
    setError('Erro ao criar o tipo');
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Novo Tipo de Bloqueio</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nameScheduleBlocksTypes">Nome do Tipo</Label>
            <Input
              id="nameScheduleBlocksTypes"
              value={data.nameScheduleBlocksTypes}
              onChange={(e) => setData('nameScheduleBlocksTypes', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="colorScheduleBlocksTypes">Cor (hex opcional)</Label>
            <Input
              id="colorScheduleBlocksTypes"
              placeholder="#FF0000"
              value={data.colorScheduleBlocksTypes}
              onChange={(e) => setData('colorScheduleBlocksTypes', e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onClose} variant="secondary">
              Cancelar
            </Button>
            <Button type="submit" disabled={processing}>
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

