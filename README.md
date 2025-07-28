# GestAgenda

GestAgenda é uma plataforma desenvolvida para conectar **profissionais** de serviços (personal trainers, manicures, esteticistas, entre outros) com seus **clientes**, oferecendo agendamento online, gerenciamento de horários, bloqueios, serviços e perfil público para cada profissional.

## 📌 Visão Geral

O **GestAgenda** é uma aplicação web que permite que profissionais como esteticistas, personal trainers, terapeutas e manicures gerenciem agendamentos, clientes, serviços, pagamentos e sua agenda de forma prática e eficiente.

O sistema foi desenvolvido como uma plataforma SaaS (Software como Serviço), permitindo múltiplos profissionais, com controle de acesso, planos de assinatura e relatórios.

---

## 📋 Checklist dos Requisitos Funcionais

| Código | Descrição | Status |
| :-- | :-- | :-- |
| RF01 | Registo e autenticação de profissionais e clientes | ✅ Implementado |
| RF02 | Página pública do profissional com foto, bio, serviços, preços e contactos | ✅ Implementado |
| RF03 | Visualização da agenda pública e marcação pelo cliente final | ✅ Agenda visível / ⏳ Marcação cliente (futuro) |
| RF04 | Área privada do profissional para gerir agendamentos | ✅ Implementado |
| RF05 | Criação, edição e remoção de serviços (nome, descrição, duração, preço) | ✅ Implementado |
| RF06 | Gestão de clientes com histórico de atendimentos | ✅ Implementado |
| RF07 | Cancelamento e remarcação com regras definidas | ✅ Parcial (sem regras) |
| RF08 | Geração de relatórios simples (frequência, receita, serviços mais pedidos) | ⏳ Futuro |
| RF09 | Definição de regras de agendamento (ex: cancelamento mínimo, reposição) | ⏳ Futuro |
| RF10 | Visibilidade de horários livres e bloqueios personalizados | ✅ Implementado |
| RF11 | Página perfil cliente com dados e histórico de atendimentos | ✅ Implementado |
| RF12 | Sistema de assinatura/validação de presença por cliente | ⏳ Futuro |
| RF13 | Envio de mensagens automáticas | ⏳ Futuro |

## 📌 Visão Geral do Sistema

- Foco em profissionais de estética, fitness, saúde, beleza, e atendimento sob agendamento.
- Plataforma multiusuário, com áreas separadas para cliente e profissional.
- Permite controle de serviços, horários, bloqueios, agenda e gestão básica de clientes.


## 🚀 Tecnologias Utilizadas

- **Backend:** PHP 8+, Laravel 11, MySQL, Eloquent, Auth via Breeze
- **Frontend:** React 18+ (TypeScript), Inertia.js, Tailwind CSS, Radix UI, Lucide Icons, React Big Calendar
- **Build/Infra:** Node.js, NPM, Vite, Git/GitHub, Storage Laravel


## ⚙️ Funcionalidades Atuais

- Registro e autenticação com foto e tipo de usuário
- Perfil público de profissional com serviços, preço e bio
- Agenda pública do profissional (+ bloqueios e horários visíveis)
- Dashboard do cliente: próximas marcações e histórico
- Dashboard do profissional: serviços, clientes, atendimentos, bloqueios e horários
- Cadastro, edição e remoção de serviços
- Histórico de atendimentos do cliente e área de busca de clientes
- Cancelamento e edição de marcação do lado do profissional
- Bloqueios personalizados e horários planejados na agenda (visibilidade clara)
- Sidebar dinâmica e navegação multi-seção
- Validação para evitar conflitos de horário e bloqueios


## ➕ Funcionalidades Futuras (Planejado)

- Marcação diretamente pela agenda pública do profissional pelo cliente
- Geração de relatórios (quantidade de atendimentos, receitas, tendências)
- Regras/limites para remarcação e cancelamento avançados
- Envio de mensagens automáticas e notificações por email/app
- Subsistema de assinatura e validação de presença do cliente
- Filtros avançados e relatórios customizáveis


## 📂 Estrutura de Projeto

- `/app/Models` – Models como User, Professional, Customer, Appointment, Service, WorkingHour, etc.
- `/app/Http/Controllers/Professional/` – Controladores das áreas profissionais
- `/app/Http/Controllers/Client/` – Controladores das áreas do cliente
- `/resources/js/Pages/` – Páginas React para cada área (profissional, cliente e público)
- `/resources/js/components/` – Componentes compartilhados entre dashboards e páginas públicas
- `/public/images/` – Fotos de perfil dos usuários


## 🔗 Rotas Principais

- `/register` – Cadastro de novo usuário
- `/login` – Login seguro
- `/profissional/{username}` – Perfil público do profissional
- `/professional/dashboard` – Dashboard do profissional
- `/professional/appointments` – Marcações do profissional (futuras)
- `/professional/appointments/history` – Histórico de marcações (passadas)
- `/client/dashboard` – Dashboard do cliente
- `/client/appointments/future` – Marcações futuras do cliente
- `/client/appointments/past` – Histórico de marcações do cliente


## ⚠️ Como Executar Localmente

```bash
git clone https://github.com/SaraRZChagas/GestAgenda.git
cd GestAgenda

# Backend
composer install
cp .env.example .env
php artisan key:generate

# Frontend
npm install

# Banco de Dados
php artisan migrate

# Link imagens
php artisan storage:link

# Iniciar servidores
php artisan serve
npm run dev
```


## 🙋♂️ Observações

- O MVP está pronto e operante, cobrindo os principais requisitos!
- As funcionalidades em aberto estão no roadmap e serão entregues nas próximas sprints/versões.
- O sistema foi pensado para facilitar consultas, economizar tempo e profissionalizar o contato com clientes de serviços.

