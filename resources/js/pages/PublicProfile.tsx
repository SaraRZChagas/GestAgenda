import React from 'react';
import { Head } from '@inertiajs/react';

interface PublicProfileProps {
  profile: {
    name: string;
    description: string;
    address: string;
    profile_photo:string;
    postalCode: string;
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
  };
}

export default function PublicProfile({ profile }: PublicProfileProps) {

  console.log(profile);
  return (
    <>
      <Head title={`GestAgenda - ${profile.name}`} />
      <div className="bg-[#4D73A1] text-white min-h-screen">
        <header className="w-full bg-[#4D73A1] px-8 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/images/logo.svg" alt="Logo" className="h-10" />
            <h1 className="text-[48px]" style={{ fontFamily: 'Guttman Logo 1' }}>GestAgenda</h1>
          </div>
          <nav className="flex gap-6 text-[24px] font-light">
            <a href="#quem" className="text-white">Quem sou</a>
            <a href="#servicos" className="text-white">Serviços</a>
            <a href="#agenda" className="text-white">Agenda</a>
            <a href="/login" className="text-white">Login</a>
            <a href="/register" className="text-white">Registo</a>
          </nav>
        </header>

        {/* Perfil Profissional */}
        <section id="quem" className="py-16 px-8 flex flex-col lg:flex-row justify-between  max-w-[90%] mx-auto  text-white">
            <div className='max-w-xl mb-12 lg:mb-0'>
              <h2 className="text-xl text-[#FFD700] font-bold mb-4">{profile.name}</h2>
              <p className="mb-4 max-w-2xl">{profile.description}</p>
              <p className="mt-4"><strong className="text-[#FFD700]">Endereço:</strong><br />{profile.address}</p>
              <p className="mt-4"><strong className="text-[#FFD700]">Horário de Trabalho:</strong><br />{profile.workingHours}</p>
              <p className="mt-4"><strong className="text-[#FFD700]">Contactos:</strong><br /> {profile.contacts.map((c, i) => (    <span key={i} className="block">{c}</span>  ))}
              </p>
            </div>
            <div className="relative overflow-hidden w-48 h-64">
              <img src={profile.profile_photo.replace('8000','8082')} className="absolute inset-0 w-full h-full object-cover"/>
            </div>
            
        </section>

        {/* Serviços */}
        <section id="servicos" className="bg-gray-100 text-black py-16 max-w-[90%] mx-auto">
          <h3 className="text-[36px] font-medium text-[#4E76AB] mb-12 text-center">Serviços disponíveis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {profile.services.map(service => (
              <div key={service.id} className="bg-white p-6 rounded shadow text-center">
                <img src={service.image} alt={service.name} className="w-full h-48 object-cover mb-4" />
                <h4 className="text-lg font-medium">{service.name}</h4>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <p><strong>Preço:</strong><br />{service.price}</p>
                <p><strong>Tempo estimado do serviço:</strong><br />{service.duration}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Agenda */}
        <section id="agenda" className="bg-white py-16 px-8 max-w-[90%] mx-auto text-center">
          <h3 className="text-[28px] text-[#4E76AB] font-semibold mb-6">Agenda</h3>
          <p className="text-gray-700">Veja as datas disponíveis e entre em contato conosco.</p>
          {/* Aqui entra o componente de calendário futuramente */}
        </section>
      </div>
    </>
  );
}
