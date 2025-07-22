import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const sampleAppointments = [
  { client: 'João Silva', service: 'Consulta Inicial', date: '2025-07-18', time: '10:00', status: 'Concluído' },
  { client: 'Maria Souza', service: 'Massagem', date: '2025-07-19', time: '14:30', status: 'Agendado' },
];

export default function AppointmentHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Atendimentos</CardTitle>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleAppointments.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.client}</TableCell>
                <TableCell>{item.service}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
