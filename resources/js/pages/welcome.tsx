import { type SharedData } from '@/types';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import React from 'react';



export default function Welcome() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const { props } = usePage();
const successMessage = (props as any)?.flash?.success;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/contact');
  };
  return (
    <>
      <Head title="GestAgenda" />
    <div className="bg-[#4D73A1] text-white min-h-screen">
      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#4D73A1] flex justify-between items-center px-8 py-6 mx-auto">
        <div className="flex items-center gap-3">
          <img src="/images/logo.svg" alt="Logo" className="h-10" />
          <h1
            className="text-[48px] tracking-[5%]"
            style={{ fontFamily: 'Guttman Logo 1' }}
          >
            GestAgenda
          </h1>
        </div>
        <nav className="flex flex-wrap gap-4 font-light text-white text-[24px] justify-end">
          <a href="#produto" className={`${location.hash === '#produto' ? 'text-[#C4C4C4] text-[28px] font-medium' : 'text-white text-[24px]'}`}>Produto</a>
          <Link
            href="/#planos"
            className={`${
              window.location.hash === '#planos'
                ? 'text-[#C4C4C4] text-[28px] font-medium'
                : 'text-white text-[24px]'
            }`}
          >Planos</Link>
          <Link
            href="/#contacto"
            className={`${
              window.location.hash === '#contacto'
                ? 'text-[#C4C4C4] text-[28px] font-medium'
                : 'text-white text-[24px]'
            }`}
          >Contacto</Link>
          <Link
            href="/login"
            className={`${
              route().current('login')
                ? 'text-[#C4C4C4] text-[28px] font-medium'
                : 'text-white text-[24px]'
            }`}
          >Login</Link>
          <Link
            href="/register"
            className={`${
              route().current('register')
                ? 'text-[#C4C4C4] text-[28px] font-medium'
                : 'text-white text-[24px]'
            }`}
          >Registo</Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="mt-28 px-8 py-20 flex flex-col lg:flex-row items-center justify-between max-w-[96%] mx-auto">
        <div className="max-w-xl mb-12 lg:mb-0 text-white">
          <h2 className="text-4xl font-bold mb-6">Sua agenda. Seu tempo. Sua liberdade.</h2>
          <p className="text-lg leading-relaxed">
            O GestAgenda é a plataforma ideal para profissionais e clientes que valorizam praticidade.
            <br />
            Se você é profissional, organize sua agenda, serviços e atendimentos em poucos cliques.
            <br />
            Se você é cliente, encontre, agende e gerencie sessões com facilidade e total autonomia. Tudo online, tudo no seu tempo.
            <br />
            <strong>GestAgenda: conectando horários e facilitando vidas.</strong>
          </p>
        </div>
        <img
          src="/images/agenda_img1_lphome.svg"
          alt="Ilustração do Produto"
          className="w-full max-w-md"
        />
      </section>

      {/* Planos */}
      <section id="planos" className="bg-gray-100 text-black py-16 max-w-[96%] mx-auto">
        <h3 className="text-[36px] font-medium text-[#4E76AB] mb-12 text-center">Conheça nossos Planos</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Plano Free */}
          <div className="bg-white p-6 rounded shadow text-center">
            <img
              src="/images/plan_basico_lphome.svg"
              alt="Ilustração do Plano Basico"
              className="w-full max-w-md mx-auto"
            />
            <h4 className="text-xl font-semibold mb-4">Free Básico</h4>
            <p className="mb-4 text-sm">
              Ideal pra começar sem pagar nada!
              <br />
              Você tem acesso à agenda Interna*, pode cadastrar seus serviços, Página Pública Personalizada, Histórico de marcações dos clientes.
              <br />
              *Agenda interna: visível apenas para você
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Adesão</button>
          </div>

          {/* Plano Profissional */}
          <div className="bg-white p-6 rounded shadow text-center">
            <img
              src="/images/plan_profissional_lphome.svg"
              alt="Ilustração do Plano Profissional"
              className="w-full max-w-md mx-auto"
            />
            <h4 className="text-xl font-semibold mb-4">Profissional</h4>
            <p className="mb-4 text-sm">
              Destaque-se com sua Agenda Pública* 
              <br />
              Mostre seus horários disponíveis para seus clientes com praticidade.
              <br />
              Relatórios inteligentes e Regras avançadas para personalizar marcações pelo cliente.
              <br />
              *Agenda pública: seus horários disponíveis visíveis para os clientes
            </p>
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Disponível em Breve</button>
          </div>

          {/* Plano Premium */}
          <div className="bg-white p-6 rounded shadow text-center">
            <img
              src="/images/plan_Premium_lphome.svg"
              alt="Ilustração do Plano Premium"
              className="w-full max-w-md mx-auto"
            />
            <h4 className="text-xl font-semibold mb-4">Premium</h4>
            <p className="mb-4 text-sm">
              Leve sua gestão ao próximo nível com integração ao WhatsApp e redes sociais.
              <br />
              Receba e envie notificações automáticas, reduza faltas e aumente o engajamento.
              <br />
              Tenha seu negócio em app móvel.
              <br />
              Tudo o que você precisa, na palma da sua mão!
            </p>
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Disponível em Breve</button>
          </div>
        </div>
      </section>

      {/* Sessão destaque dupla */}
      <section className="bg-white py-16 px-8 max-w-[96%] mx-auto space-y-20">
        {/* Linha 1: Imagem esquerda */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <img src="/images/sejaprofissional_lphome.svg" alt="Profissional" className="w-full md:w-1/2" />
          <div className="text-black md:w-1/2">
            <p className="text-lg mb-4">
              Transforme sua rotina com uma plataforma feita pra quem vive de atender.
              <br />
              Com o GestAgenda, você atrai novos clientes com sua página personalizada, organiza sua agenda de forma inteligente e profissionaliza seus serviços com praticidade.
              <br />
              Menos burocracia, mais resultados.
            </p>
            <Link href="/register" className="inline-block bg-[#4E76AB] text-white px-4 py-2 rounded">Seja um Profissional GestAgenda</Link>
          </div>
        </div>

        {/* Linha 2: Imagem direita */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <img src="/images/sejacliente_lphome.svg" alt="Cliente" className="w-full md:w-1/2" />
          <div className="text-black md:w-1/2">
            <p className="text-lg mb-4">
              Chega de perder tempo com mensagens, esperas e desencontros!
              <br />
              No GestAgenda, você encontra o profissional ideal, marca seus atendimentos em poucos cliques e acompanha tudo de forma simples e segura.
              <br />
              Sua rotina fica mais prática, com tudo organizado num só lugar.
            </p>
            <Link href="/register" className="inline-block bg-[#4E76AB] text-white px-4 py-2 rounded">Seja um Cliente GestAgenda</Link>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="bg-gray-100 py-16 px-8 text-center max-w-[96%] mx-auto">
        <h3 className="text-[36px] font-medium text-[#4E76AB] mb-12 text-center">Contacto</h3>
        <p className="mb-6 text-black">Se quiser mais informações entre em contacto no formulário abaixo:</p>
        <form  onSubmit={handleSubmit}  className="max-w-3xl mx-auto space-y-4 text-left">
          <div className="flex gap-4">
            <input type="text" placeholder="Nome" value={data.name}
  onChange={e => setData('name', e.target.value)} className="w-full border border-[#4E76AB] p-2 placeholder-[#C4C4C4] text-black" />
            <input type="email" placeholder="Email" value={data.email}
  onChange={e => setData('email', e.target.value)} className="w-full border border-[#4E76AB] p-2 placeholder-[#C4C4C4] text-black" />
          </div>
          <input type="text" placeholder="Assunto" value={data.subject}
  onChange={e => setData('subject', e.target.value)} className="w-full border border-[#4E76AB] p-2 placeholder-[#C4C4C4] text-black" />
          <textarea placeholder="Descrição" value={data.message}
  onChange={e => setData('message', e.target.value)} className="w-full border border-[#4E76AB] p-2 h-32 placeholder-[#C4C4C4] text-black" ></textarea>
          <button type="submit" className="bg-[#4E76AB] text-white px-6 py-2 rounded">Enviar</button>
        </form>
        {successMessage && (
        <div className="text-green-600 text-center mt-4">
          {successMessage}
        </div>
      )}
      
      </section>
      
    </div>
    
    </>
  );
}
