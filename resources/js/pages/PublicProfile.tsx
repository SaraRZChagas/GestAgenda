import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import ProfessionalCalendar, { ScheduleBlock, WorkingHour }  from '@/components/ProfessionalCalendar';

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
interface PublicProfileProps {
  profile: {
    name: string;
    description: string;
    address: string;
    profile_photo:string;
    workingHours: string;
    contacts: string[];
    services: {
      id: number;
      name: string;
      description: string;
      price: string;
      duration: string;
      image: string;
    }[];
    blocks?: RawScheduleBlock[];           
    workingHoursArray?: RawWorkingHour[];
  };
}

export default function PublicProfile({ profile }: PublicProfileProps) {

  const { auth } = usePage<SharedData>().props;

  console.log(profile);
    // Adaptação rápida inline
    const blocks: ScheduleBlock[] = profile.blocks?.map((b) => ({
      ...b,
      blockType: {
        name: b.block_type.name,
        colorScheduleBlocksTypes: b.block_type.colorScheduleBlocksTypes,
      },
    }))??[];

      const workingHours: WorkingHour[] = profile.workingHoursArray?.map((w) => ({
      idWorkingHours: w.idWorkingHours,
      dayOfWeek: w.weekdayWorkingHours,
      startTime: w.startTimeWorkingHours,
      endTime: w.endTimeWorkingHours,
    }))??[];
  return (
    <>
      <Head title={`GestAgenda - ${profile.name}`} />
      <div className="bg-[#4D73A1] text-white min-h-screen">
        {/* Header com menu responsivo e condicional */}
        <header className="fixed top-0 left-0 w-full z-50 bg-[#4D73A1] px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4 shadow">
          <div className="flex items-center gap-3 flex-shrink-0">
            <img src="/images/logo.svg" alt="Logo" className="h-10" />
            <h1 className="text-3xl sm:text-4xl md:text-[48px]" style={{ fontFamily: 'Guttman Logo 1' }}>GestAgenda</h1>
          </div>
          <nav className="flex flex-wrap gap-4 text-lg sm:text-[24px] font-light w-full sm:w-auto">
            <a href="#quem" className="text-white hover:text[#C4C4C4]">Quem sou</a>
            <a href="#servicos" className="text-white hover:text[#C4C4C4]">Serviços</a>
            <a href="#agenda" className="text-white hover:text[#C4C4C4]">Agenda</a>

            {auth?.user ? (
              <>
                <Link
                  href="/logout"
                  method="post"
                  as="button"
                  className="text-white cursor-pointer bg-transparent border-none p-0 hover:text[#C4C4C4]"
                >
                  Logout
                </Link>
                <Link
                  href={auth.user.role === 'professional' ? '/professional/dashboard' : '/client/dashboard'}
                  className="text-white hover:text[#C4C4C4]"
                >
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-white hover:text[#C4C4C4]">Login</Link>
                <Link href="/register" className="text-white hover:text[#C4C4C4]">Registo</Link>
              </>
            )}
          </nav>
        </header>

        {/* Compensando o header fijo */}
        <main className="pt-32">
          {/* DESCRIÇÃO */}
        {/* Perfil Profissional */}
        <section id="quem" className="py-16 px-8 flex flex-col lg:flex-row justify-between  max-w-[90%] mx-auto  text-white">
            <div className='max-w-xl mb-12 lg:mb-0'>
              <h2 className="text-xl text-[#FFD700] font-bold mb-4">{profile.name}</h2>
              <p className="mb-4 max-w-2xl">{profile.description}</p>
              <p className="mt-4">
                <strong className="text-[#FFD700]">Endereço:</strong>
                <br />
                {profile.address}
              </p>
              <p className="mt-4">
                <strong className="text-[#FFD700]">Horário de Trabalho:</strong>
                <br />
                {profile.workingHours}
              </p>
              <p className="mt-4">
                <strong className="text-[#FFD700]">Contactos:</strong>
                <br />{' '}
                {profile.contacts.map((c, i) => (
                  <span key={i} className="block">
                    {c}
                  </span>
                ))}
              </p>
            </div>
            <div className="relative overflow-hidden w-48 h-64">
              <img src={profile.profile_photo.replace("8000","8082")} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            
        </section>

        {/* SERVIÇOS */}
          <section id="servicos" className="bg-gray-100 text-black py-16 max-w-[90%] mx-auto">
            <h3 className="text-[36px] font-medium text-[#4E76AB] mb-12 text-center">Serviços disponíveis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {profile.services.map((service) => (
                <div key={service.id} className="bg-white p-6 rounded shadow text-center">
                  <img src={service.image} alt={service.name} className="w-full h-48 object-cover mb-4" />
                  <h4 className="text-lg font-medium">{service.name}</h4>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  <p>
                    <strong>Preço:</strong>
                    <br />
                    {service.price}
                  </p>
                  <p>
                    <strong>Tempo estimado do serviço:</strong>
                    <br />
                    {service.duration}
                  </p>
                </div>
              ))}
            </div>
          </section>

        {/* Agenda */}
        <section id="agenda" className="bg-white py-16 px-8 max-w-[90%] mx-auto text-center">
          <h3 className="text-[28px] text-[#4E76AB] font-semibold mb-6">Agenda</h3>
          <p className="text-gray-700">Veja as datas disponíveis e entre em contato conosco.</p>
          {/* Aqui entra o componente de calendário futuramente */}

            <ProfessionalCalendar blocks={blocks} workingHours={workingHours} />

        </section>
        </main>
      </div>
    </>
  );
}
