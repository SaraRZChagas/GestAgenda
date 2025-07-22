import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';



export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: '/dashboard' }]}>
            <Head title="Dashboard Profissional" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                {/* Gestão de Serviços */}
                <Card>
                    <CardHeader>
                        <CardTitle>Serviços</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                            Gerencie os serviços oferecidos, valores e duração.
                        </p>
                        <Button asChild>
                            <a href="/professional/services">Gerenciar Serviços</a>
                        </Button>
                    </CardContent>
                </Card>

                {/* Regras de Agendamento */}
                <Card>
                    <CardHeader>
                        <CardTitle>Regras de Agendamento</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                            Defina horários de trabalho, bloqueios e regras de cancelamento.
                        </p>
                        <Button asChild>
                            <a href="/professional/scheduling-rules">Configurar Regras</a>
                        </Button>
                    </CardContent>
                </Card>

                {/* Histórico de Atendimentos */}
                <Card>
                    <CardHeader>
                        <CardTitle>Histórico de Atendimentos</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">
                            Veja os atendimentos anteriores e acompanhe os status.
                        </p>
                        <Button asChild>
                            <a href="/professional/appointments/history">Ver Histórico</a>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

