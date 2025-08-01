import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Clock, Calendar, Repeat, CalendarClock,CalendarX,BriefcaseBusiness,FileStack,ChartLine  } from 'lucide-react';
import { DynamicIcon } from 'lucide-react/dynamic';
import AppLogo from './app-logo';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const username = auth.user?.username;
    const role = auth.user?.role;

    const switchProfileNavItem: NavItem = {
        title: role === 'professional' ? 'Ir para Perfil Cliente' : 'Ir para Perfil Profissional',
        icon: Repeat,
        action: () => {
            router.post(route('profile.switch'), {}, {
                onError: (errors) => {
                    alert('Erro ao trocar perfil.');
                },
            });
        },
    };

    const mainClientNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/client/dashboard',
            icon: LayoutGrid,
        },

        {
            title: 'Próximas Marcações',
            href: route('client.appointments.future'),
            icon: Clock
        },

        {
            title: 'Histórico de Marcações',
            href: route('client.appointments.past'),
            icon: ChartLine
        },

    ];

    const mainProfessionalNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/professional/dashboard',
            icon: LayoutGrid,
        },

        {
            title: 'Marcações',
            href: route('professional.appointments.index'),
            icon: Clock,
        },

        {
            title: 'Horário de Trabalho',
            href: '/professional/working-hours',
            icon: CalendarClock,
        },
        {
            title: 'Bloqueios de Agenda',
            href: '/professional/schedule-blocks',
            icon: CalendarX,
        },
        {
            title: 'Serviços Oferecidos',
            href: '/professional/services',
            icon: BriefcaseBusiness,
        },

        {
            title: 'Cadastro Rápido de Cliente',
            href: '/professional/quick-client',
            icon: FileStack ,
        },

        {
            title: 'Buscar Cliente',
            href: route('professional.clients.search'),
            icon: Folder,
        },

        {
            title: 'Histórico de Atendimentos',
            href: '/professional/appointments/history',
            icon: ChartLine,
        },
    ];

    const footerNavItems: NavItem[] = [
            ...(role === 'professional'
                ? [{
                    title: 'Sua Página Pública',
                    href: `${window.location.origin}/profissional/${username}`,
                    icon: Folder,
                }]
                : []),

            switchProfileNavItem,

            {
                title: 'Home do GestAgenda',
                href: window.location.origin,
                icon: BookOpen,
            },
        ];

    const getRouteForRole = (route: string): string => `/${role}${route}`;

    

    return (
        <Sidebar collapsible="icon" variant="sidebar" className="[&_*]:text-[#4E76AB]">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={getRouteForRole('/dashboard')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={role === 'client' ? mainClientNavItems : mainProfessionalNavItems} />
                {/* Botão para troca de perfil logo abaixo da navegação principal */}
                
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
                
            </SidebarFooter>
        </Sidebar>
    );
}
