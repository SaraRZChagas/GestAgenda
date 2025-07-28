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
  blockType: {
    name: string;
    colorScheduleBlocksTypes?: string;
  };
}
interface WorkingHour {
  idWorkingHours: number;
  dayOfWeek: number; // 0=Domingo ... 6=Sábado
  startTime: string; // ex: "08:00"
  endTime: string;   // ex: "18:00"
}

interface Appointment {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  color?: string;
  customerName?: string;
}

interface ProfessionalCalendarProps {
  blocks: ScheduleBlock[];
  workingHours: WorkingHour[];
  appointments?: Appointment[];
}

export type { ScheduleBlock, WorkingHour, Appointment };
export default function ProfessionalCalendar({ blocks, workingHours, appointments = [] }: ProfessionalCalendarProps) {
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
    title: b.blockType?.name || 'Bloqueio',
    start: new Date(b.startDatetimeScheduleBlocks),
    end: new Date(b.endDatetimeScheduleBlocks),
    allDay: false,
    color: b.blockType?.colorScheduleBlocksTypes || '#f8d7da',
  }));
  

  // Criar eventos de horários fora da disponibilidade (vermelho claro)
  const generateUnavailableEvents = (start: Date, end: Date) => {
  const events = [];
  const current = new Date(start);

  while (current <= end) {
    const day = current.getDay(); // 0 = Domingo, 6 = Sábado
    const working = workingHoursMap.get(day);

    const dayStart = new Date(current);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(current);
    dayEnd.setHours(23, 59, 59, 999);

    if (!working) {
      //  Bloquear o dia todo
      events.push({
        id: `unavailable-all-${current.toDateString()}`,
        title: 'Fora do horário de trabalho',
        start: new Date(dayStart),
        end: new Date(dayEnd),
        color: '#F5F5F5',
        textColor: '#FF0000',
      });
    } else {
      const [startHour, startMinute] = working.start.split(':').map(Number);
      const [endHour, endMinute] = working.end.split(':').map(Number);

      const workStart = new Date(current);
      workStart.setHours(startHour, startMinute, 0, 0);

      const workEnd = new Date(current);
      workEnd.setHours(endHour, endMinute, 0, 0);

      // Bloquear antes do expediente
      if (dayStart < workStart) {
        events.push({
          id: `unavailable-before-${current.toDateString()}`,
          title: 'Fora do horário de trabalho',
          start: new Date(dayStart),
          end: new Date(workStart),
          color: '#F5F5F5',
          textColor: '#FF0000',
        });
      }

      // Bloquear depois do expediente
      if (workEnd < dayEnd) {
        events.push({
          id: `unavailable-after-${current.toDateString()}`,
          title: 'Fora do horário de trabalho',
          start: new Date(workEnd),
          end: new Date(dayEnd),
          color: '#F5F5F5',
          textColor: '#FF0000',
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

  //evento appointments
  const appointmentEvents = (appointments ?? []).map((a) => ({
    id: `appointment-${a.id}`,
    title: `${a.title} (${a.customerName ?? ''})`,
    start: new Date(a.start),
    end: new Date(a.end),
    allDay: a.allDay || false,
    color: a.color || '#4caf50',  // verde por padrão
  }));

  const allEvents = [...unavailableEvents, ...blockEvents, ...appointmentEvents];

  // Definir estilos
  const eventStyleGetter = (event: any) => {
  let backgroundColor = event.color || '#3174ad'; // Cor do evento (fundo)
  let color = '#000'; // SEMPRE preto

  return { style: { backgroundColor, color } };
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
