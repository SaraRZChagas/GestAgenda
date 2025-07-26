import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    userExtraData?: {
        phoneCustomers?: string;
        phoneProfessionals?: string;
        addressCustomers?: string;
        addressProfessionals?: string;
    };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Service {
  idServices: number;
  idProfessionals: number;
  idServicesTypes: number | null;
  nameServices: string;
  descriptionServices: string;
  priceServices: string;
  durationMinutesServices: number;
  isActiveServices: boolean;
  createdServices: string | null;
  updatedServices: string | null;
}

// Tipagem global de dados compartilhados via Inertia (ex: user)
export interface PageProps<T = Record<string, unknown>> {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
      type: 'client' | 'professional'; // ou outro se tiver
      // adicione mais campos se necessário
    };
  };
  // props específicos da página
  data?: T;
}
