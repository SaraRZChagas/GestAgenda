import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">

                {/* Link para histórico */}
                <Link
                    href={route('client.appointments.past')}
                    className="relative aspect-video overflow-hidden rounded-xl border border-gray-300 p-4 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
                >
                    <h3 className="text-lg font-semibold">Histórico de Marcações</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                    Veja todas as suas marcações passadas.
                    </p>
                </Link>

                {/* Link para futuras */}
                <Link
                    href={route('client.appointments.future')}
                    className="relative aspect-video overflow-hidden rounded-xl border border-gray-300 p-4 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-dark transition-colors"
                >
                    <h3 className="text-lg font-semibold">Próximas Marcações</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                    Veja suas marcações futuras e agende novos atendimentos.
                    </p>
                </Link>
                </div>

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
            </div>
            </div>
        </AppLayout>
    );
}
