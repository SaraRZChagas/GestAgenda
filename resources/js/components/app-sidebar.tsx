import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';


const mainClientNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/client/dashboard',
        icon: LayoutGrid,
    },
];

const mainProfessionalNavItems: NavItem[] = [
     {
    title: 'Topo',
    href: '/professional/dashboard',
    icon: LayoutGrid,
  },
  {
    title: 'Regras de Agendamento',
    href: '/professional/dashboard#scheduling-rules',
    icon: BookOpen,
  },
  {
    title: 'Serviços Oferecidos',
    href: '/professional/dashboard#service-manager',
    icon: Folder,
  },
  {
    title: 'Histórico de Atendimentos',
    href: '/professional/dashboard#appointment-history',
    icon: LayoutGrid, // ou outro ícone como Clock, Calendar, etc.
  },
];



const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    const getRouteForRole = (route: string): string => {
        return `/${auth.user["role"]}${route}`;
    }
    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={getRouteForRole("/dashboard")} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={auth.user["role"] == "cliente" ? mainClientNavItems : mainProfessionalNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
