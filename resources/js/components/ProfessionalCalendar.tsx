import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

moment.locale('pt-br');
const localizer = momentLocalizer(moment);

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
  block_type?: ScheduleBlockType;
}

interface WorkingHour {
  dayOfWeek: number; // 0=Domingo ... 6=Sábado
  startTime: string; // ex: "08:00"
  endTime: string;   // ex: "18:00"
}

interface ProfessionalCalendarProps {
  blocks: ScheduleBlock[];
  workingHours: WorkingHour[];
}

export default function ProfessionalCalendar({ blocks, workingHours }: ProfessionalCalendarProps) {
  // Converter horários de trabalho em um map (para acesso rápido)
  const workingHoursMap = new Map<number, { start: string; end: string }>();
  workingHours.forEach((w) => {
    workingHoursMap.set(w.dayOfWeek, { start: w.startTime, end: w.endTime });
  });

  // Função para verificar se um horário está dentro do horário de trabalho
  const isInWorkingHours = (date: Date) => {
    const day = date.getDay();
    const working = workingHoursMap.get(day);
    if (!working) return false;
    const [startHour, startMinute] = working.start.split(':').map(Number);
    const [endHour, endMinute] = working.end.split(':').map(Number);
    const start = new Date(date);
    start.setHours(startHour, startMinute, 0, 0);
    const end = new Date(date);
    end.setHours(endHour, endMinute, 0, 0);
    return date >= start && date < end;
  };

  // Criar eventos de bloqueio manual
  const blockEvents = blocks.map((b) => ({
    id: `block-${b.idScheduleBlocks}`,
    title: b.block_type?.nameScheduleBlocksTypes || 'Bloqueio',
    start: new Date(b.startDatetimeScheduleBlocks),
    end: new Date(b.endDatetimeScheduleBlocks),
    allDay: false,
    color: b.block_type?.colorScheduleBlocksTypes || '#f8d7da',
  }));

  // Criar eventos de horários fora da disponibilidade (vermelho claro)
  const generateUnavailableEvents = (start: Date, end: Date) => {
    const events = [];
    const current = new Date(start);
    while (current < end) {
      const next = new Date(current);
      next.setDate(current.getDate() + 1);

      const working = workingHoursMap.get(current.getDay());
      if (!working) {
        // Dia inteiro bloqueado
        events.push({
          id: `unavailable-${current.toDateString()}`,
          title: 'Fora do horário de trabalho',
          start: new Date(current),
          end: new Date(next),
          allDay: false,
          color: '#f8d7da',
        });
      } else {
        // Antes do horário de trabalho
        const [startHour, startMinute] = working.start.split(':').map(Number);
        const [endHour, endMinute] = working.end.split(':').map(Number);
        const dayStart = new Date(current);
        dayStart.setHours(0, 0, 0, 0);
        const workStart = new Date(current);
        workStart.setHours(startHour, startMinute, 0, 0);
        const workEnd = new Date(current);
        workEnd.setHours(endHour, endMinute, 0, 0);
        const dayEnd = new Date(current);
        dayEnd.setHours(23, 59, 59, 999);

        if (dayStart < workStart) {
          events.push({
            id: `unavailable-am-${current.toDateString()}`,
            title: 'Fora do horário de trabalho',
            start: dayStart,
            end: workStart,
            color: '#f8d7da',
          });
        }
        if (workEnd < dayEnd) {
          events.push({
            id: `unavailable-pm-${current.toDateString()}`,
            title: 'Fora do horário de trabalho',
            start: workEnd,
            end: dayEnd,
            color: '#f8d7da',
          });
        }
      }
      current.setDate(current.getDate() + 1);
    }
    return events;
  };

  const startRange = moment().startOf('month').toDate();
  const endRange = moment().add(2, 'months').endOf('month').toDate();

  const unavailableEvents = generateUnavailableEvents(startRange, endRange);

  const allEvents = [...unavailableEvents, ...blockEvents];

  // Definir estilos
  const eventStyleGetter = (event: any) => {
    const backgroundColor = event.color || '#3174ad';
    return { style: { backgroundColor } };
  };

  return (
    <div className="h-[700px]">
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        views={['month', 'week', 'day']}
        step={30}
        timeslots={2}
        style={{ height: '100%' }}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
}
