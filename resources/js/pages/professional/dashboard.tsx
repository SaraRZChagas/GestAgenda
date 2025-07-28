import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import SchedulingRules from '@/pages/professional/components/scheduling-rules';
import ServiceManager from '@/pages/professional/components/service-manager';
import AppointmentHistory from '@/pages/professional/components/appointment-history';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import ProfessionalCalendar, { ScheduleBlock, WorkingHour, Appointment } from '@/components/ProfessionalCalendar';

interface BreadcrumbItem {
  title: string;
  href: string;
}

interface RawWorkingHour {
  idWorkingHours: number;
  weekdayWorkingHours: number;
  startTimeWorkingHours: string;
  endTimeWorkingHours: string;
  // outros campos omitidos
}
interface RawScheduleBlock {
  idScheduleBlocks: number;
  startDatetimeScheduleBlocks: string;
  endDatetimeScheduleBlocks: string;
  descriptionScheduleBlocks?: string;
  block_type: {
    name: string;
    colorScheduleBlocksTypes?: string;
  };
}

interface RawAppointments {
    idAppointments: number;
    startDatetimeAppointments: string;
    endDatetimeAppointments: string;
    service: any;
    customer: any;
  }



interface Props {
  breadcrumbs: { title: string; href: string }[];
  blocks: RawScheduleBlock[];
  workingHours: RawWorkingHour[];
  appointments: RawAppointments[];
}

export default function Dashboard({ workingHours:rawWorkingHours, blocks: rawBlocks, breadcrumbs, appointments:rawAppointments }: Props) {
  
  // Adaptação rápida inline
  const blocks: ScheduleBlock[] = rawBlocks.map((b) => ({
    ...b,
    blockType: {
      name: b.block_type.name,
      colorScheduleBlocksTypes: b.block_type.colorScheduleBlocksTypes,
    },
  }));

    const workingHours: WorkingHour[] = rawWorkingHours.map((w) => ({
    idWorkingHours: w.idWorkingHours,
    dayOfWeek: w.weekdayWorkingHours,
    startTime: w.startTimeWorkingHours,
    endTime: w.endTimeWorkingHours,
  }));

  const appointments: Appointment[] = rawAppointments.map((a) => ({
  id: a.idAppointments,
  title: a.service?.nameServices ?? 'Atendimento',
  start: new Date(a.startDatetimeAppointments),
  end: new Date(a.endDatetimeAppointments),
  allDay: false,
  color: '#4caf50', // cor verde para marcações, por exemplo
  customerName: a.customer?.nameCustomers ?? '',
}));

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard do Profissional" />

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {/* Card 1 - Gestão de Serviços */}
          <Link
            href={route('professional.services.index')}
            className="relative aspect-video overflow-hidden rounded-xl border border-gray-300 p-4 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
          >
            <h3 className="text-lg font-semibold">Serviços Oferecidos</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Cadastre e gerencie os serviços prestados com valores e duração.
            </p>
          </Link>

          {/* Card 2 - Cadastro de horas */}
          <Link
            href={route('professional.working-hours.index')}
            className="relative aspect-video overflow-hidden rounded-xl border border-gray-300 p-4 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
          >
            <h3 className="text-lg font-semibold">Horas de Trabalho</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Defina seus horários disponíveis para agendamento de clientes.
            </p>
          </Link>

          {/* Card 3 - Bloqueios de Agenda */}
          <Link
            href={route('professional.schedule-blocks.index')}
            className="relative aspect-video overflow-hidden rounded-xl border border-gray-300 p-4 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
          >
            <h3 className="text-lg font-semibold">Bloqueios de Agenda</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Gerencie seus bloqueios de horário para férias, folgas e eventos.
            </p>
          </Link>

          {/* Card 4 - Marcação de Agenda */}
          <Link
            href={route('professional.appointments.index')}
            className="relative aspect-video overflow-hidden rounded-xl border border-gray-300 p-4 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
          >
            <h3 className="text-lg font-semibold">Minhas Marcações</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Veja, edite ou agende atendimentos para seus clientes.
            </p>
          </Link>
          
          {/* Card 5 - Cadastro de Cliente */}
          <Link
            href={route('professional.quick-client.form')}
            className="relative aspect-video overflow-hidden rounded-xl border border-gray-300 p-4 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
          >
            <h3 className="text-lg font-semibold">Cadastro de Cliente</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Cadastre novos clientes rapidamente para agilizar seus atendimentos.
            </p>
          </Link>
          
          {/* Card 6 - Histórico de Atendimentos */}
          <Link
            href={route('professional.appointments.history')}
            className="relative aspect-video overflow-hidden rounded-xl border border-gray-300 p-4 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
          >
            <h3 className="text-lg font-semibold">Histórico de Atendimentos</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Consulte atendimentos realizados, cancelados e observações.
            </p>
          </Link>
        </div>

        {/* Placeholder de gráficos ou resumos */}
        <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
          <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </div>
      </div>

      <div className="flex flex-col gap-8 p-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Agenda do Profissional</h2>
          <ProfessionalCalendar blocks={blocks} workingHours={workingHours} appointments={appointments} />
        </div>
      </div>
    </AppLayout>
  );
}
