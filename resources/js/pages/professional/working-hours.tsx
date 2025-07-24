import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const weekdays = [
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Segunda-feira' },
  { value: 2, label: 'Terça-feira' },
  { value: 3, label: 'Quarta-feira' },
  { value: 4, label: 'Quinta-feira' },
  { value: 5, label: 'Sexta-feira' },
  { value: 6, label: 'Sábado' },
];

interface WorkingHour {
  idWorkingHours: number;
  weekdayWorkingHours: number;
  startTimeWorkingHours: string;
  endTimeWorkingHours: string;
}

interface WorkingHoursProps {
  workingHours: WorkingHour[];
}

export default function WorkingHours({ workingHours }: WorkingHoursProps) {
  const { data, setData, post, put, delete: destroy, processing, reset } = useForm({
    selectedDays: [] as number[],
    startTimeWorkingHours: '',
    endTimeWorkingHours: '',
  });

  const [error, setError] = useState('');
  const [editId, setEditId] = useState<number | null>(null);

  const handleCheckbox = (dayValue: number) => {
    if (data.selectedDays.includes(dayValue)) {
      setData('selectedDays', data.selectedDays.filter((d) => d !== dayValue));
    } else {
      setData('selectedDays', [...data.selectedDays, dayValue]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log(data)
    console.log(editId)
    // Validação de horário no front-end
    if (data.endTimeWorkingHours <= data.startTimeWorkingHours) {
      setError('O horário final deve ser maior que o horário inicial.');
      return;
    }

    if (!editId) {
      // Adição
      const diasJaCadastrados = data.selectedDays.filter((d) =>
        workingHours.some((h) => h.weekdayWorkingHours === d)
      );
      if (diasJaCadastrados.length > 0) {
        const nomes = diasJaCadastrados
          .map((d) => weekdays.find((w) => w.value === d)?.label)
          .join(', ');
        setError(`Os seguintes dias já possuem horário: ${nomes}`);
        return;
      }

      post(route('professional.working-hours.store'), {
        onSuccess: () => reset(),
      });
    } else {
      // Edição
      put(route('professional.working-hours.update', editId), {
        onSuccess: () => {
          reset();
          setEditId(null);
        },
      });
    }
  };

  const handleEdit = (h: WorkingHour) => {
    setEditId(h.idWorkingHours);
    setData({
      selectedDays: [h.weekdayWorkingHours],
      startTimeWorkingHours: h.startTimeWorkingHours,
      endTimeWorkingHours: h.endTimeWorkingHours,
    });
  };

  const handleDelete = (id: number) => {
    if (confirm('Deseja realmente excluir este horário?')) {
      destroy(route('professional.working-hours.destroy', id));
    }
  };

  return (
    <AppLayout>
      <Head title="Horário de Trabalho" />

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Horário de Trabalho</h2>

        <form onSubmit={handleSubmit} className="grid gap-4 mb-8">
          {!editId && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {weekdays.map((d) => (
                <label key={d.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={data.selectedDays.includes(d.value)}
                    onChange={() => handleCheckbox(d.value)}
                  />
                  {d.label}
                </label>
              ))}
            </div>
          )}

          <div className="flex gap-4">
            <Input
              type="time"
              value={data.startTimeWorkingHours}
              onChange={(e) => setData('startTimeWorkingHours', e.target.value)}
              required
            />
            <Input
              type="time"
              value={data.endTimeWorkingHours}
              onChange={(e) => setData('endTimeWorkingHours', e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="flex gap-2">
            <Button type="submit" disabled={processing}>
              {editId ? 'Salvar Alterações' : 'Adicionar'}
            </Button>
            {editId && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  reset();
                  setEditId(null);
                }}
              >
                Cancelar
              </Button>
            )}
          </div>
        </form>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Dia</th>
              <th className="p-2 border">Início</th>
              <th className="p-2 border">Fim</th>
              <th className="p-2 border">Ações</th>
            </tr>
          </thead>
          <tbody>
            {workingHours.map((h) => (
              <tr key={h.idWorkingHours}>
                <td className="p-2 border">
                  {weekdays.find((w) => w.value === h.weekdayWorkingHours)?.label}
                </td>
                <td className="p-2 border">{h.startTimeWorkingHours}</td>
                <td className="p-2 border">{h.endTimeWorkingHours}</td>
                <td className="p-2 border flex gap-2">
                  <Button size="sm" onClick={() => handleEdit(h)}>
                    Editar
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(h.idWorkingHours)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppLayout>
  );
}
