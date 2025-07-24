# GestAgenda

GestAgenda é uma plataforma desenvolvida para conectar **profissionais** de serviços (personal trainers, manicures, esteticistas, entre outros) com seus **clientes**, oferecendo agendamento online, gerenciamento de horários, bloqueios, serviços e perfil público para cada profissional.

## 📌 Visão Geral

O **GestAgenda** é uma aplicação web que permite que profissionais como esteticistas, personal trainers, terapeutas e manicures gerenciem agendamentos, clientes, serviços, pagamentos e sua agenda de forma prática e eficiente.

O sistema foi desenvolvido como uma plataforma SaaS (Software como Serviço), permitindo múltiplos profissionais, com controle de acesso, planos de assinatura e relatórios.

---

## 🚀 Tecnologias Utilizadas

### **Backend**
- **PHP 8+**
- **Laravel 11** (Inertia.js)
- **MySQL 8** (migrations com relacionamentos e chaves estrangeiras)
- **Eloquent ORM**
- **Autenticação** (Laravel Breeze / Starter Kit React)

### **Frontend**
- **React 18 + Typescript**
- **Inertia.js**
- **Tailwind CSS**
- **Radix UI Components**
- **Lucide Icons**
- **Axios (Inertia Requests)**
- **React Calendar** (planejado para agenda pública)

### **Outros**
- **Node.js / NPM**
- **Vite** (build)
- **Git / GitHub**
- **Storage Local (Laravel)** para upload de imagens de perfil

---

## 🛠 Funcionalidades Implementadas

- **Registro de Usuário** com escolha de papel (**Cliente** ou **Profissional**)
  - Upload de **foto de perfil**
  - Criação de **username** único (URL pública)
- **Login e Autenticação**
- **Página pública do profissional**:
  - Dados do profissional
  - Serviços oferecidos
  - Contatos
  - (Planejado) Agenda pública com horários disponíveis
- **Dashboard do Profissional**
  - Cadastro e gerenciamento de **Serviços**
  - Cadastro de **Bloqueios de Agenda** (férias, indisponibilidades)
    - Criação dinâmica de **Tipos de Bloqueio** via modal
  - Cadastro de **Horário de Trabalho**
- **Dashboard do Cliente** (estrutura inicial pronta)
- **Sidebar Dinâmica** de acordo com o papel do usuário
- **Padrão de navegação por seções** dentro do dashboard via hash (`#section`)

---

## 📦 Estrutura de Pastas

- **/app**
  - `Models` → `User`, `Professional`, `Customer`, `Service`, `ScheduleBlock`, `ScheduleBlockType`, `WorkingHour`
  - `Http/Controllers`
    - `Professional/ServiceController`
    - `Professional/ScheduleBlockController`
    - `Professional/WorkingHourController` (planejado)
- **/resources/js**
  - `Pages/`
    - `auth/register.tsx`
    - `professional/services.tsx`
    - `professional/schedule-blocks.tsx`
    - `professional/working-hours.tsx`
    - `PublicProfile.tsx`
  - `components/`
    - `CreateScheduleBlockTypeModal.tsx`
    - `ui/` (botões, inputs, labels, etc.)
- **/public**
  - `images/profissional_img/` (fotos de profissionais)
  - `images/cliente_img/` (fotos de clientes)

---

## 🔗 Rotas Importantes

- `/register` → Cadastro de usuário com foto e username
- `/login` → Autenticação
- `/profissional/{username}` → Página pública do profissional
- `/professional/dashboard` → Dashboard do profissional
- `/professional/services` → Gerenciamento de serviços
- `/professional/schedule-blocks` → Gerenciamento de bloqueios
- `/professional/working-hours` → Cadastro de horário de trabalho

---

## ⚠ Próximos Passos

- Implementar **agenda pública** com seleção de horários livres
- Integração de mensagens e notificações
- Melhorar validações de formulários (frontend/backend)
- Implementar testes (PHPUnit e React Testing Library)

---

## Como Executar

```bash
# Clonar projeto
git clone https://github.com/seuusuario/gestagenda.git
cd gestagenda

# Instalar dependências Laravel
composer install
cp .env.example .env
php artisan key:generate

# Instalar dependências Frontend
npm install

# Migrar banco
php artisan migrate

# Criar link de storage para fotos
php artisan storage:link

# Iniciar servidor
php artisan serve
npm run dev

