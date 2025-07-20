# GestAgenda

Sistema de gestão de agendamentos para profissionais autônomos da área da beleza, saúde e bem-estar.

## 📌 Visão Geral

O **GestAgenda** é uma aplicação web que permite que profissionais como esteticistas, personal trainers, terapeutas e manicures gerenciem agendamentos, clientes, serviços, pagamentos e sua agenda de forma prática e eficiente.

O sistema foi desenvolvido como uma plataforma SaaS (Software como Serviço), permitindo múltiplos profissionais, com controle de acesso, planos de assinatura e relatórios.

---

## 🚀 Tecnologias Utilizadas

- **Backend:** Laravel 11
- **Frontend:** React.js (via starter kit Laravel + React)
- **Autenticação:** Laravel Breeze
- **Banco de Dados:** MySQL
- **ORM:** Eloquent
- **Design e Prototipação:** Figma
- **Controle de Versão:** Git + GitHub
- **Gestão de Tarefas:** Trello
- **Outros:** Chart.js, Google Forms (para levantamento de requisitos)

---

## 🛠️ Funcionalidades Principais

- Cadastro e autenticação de usuários
- Perfil do profissional com dados do negócio
- Cadastro de clientes e serviços
- Agendamento e bloqueio de horários
- Definição de regras de agendamento
- Controle de métodos de pagamento
- Notificações internas
- Assinaturas com planos e pagamentos
- Relatórios gráficos

---

## 🗂️ Estrutura do Banco de Dados

Tabelas principais:

- `users`
- `professionals`
- `customers`
- `contacts`, `contacts_types`
- `services`, `services_types`
- `appointments`
- `schedule_blocks`, `schedule_blocks_types`
- `working_hours`
- `subscription_plans`, `subscriptions`, `payments`, `payment_methods`
- `scheduling_rules`
- `notifications`
- `documents`
- `appointment_notes`
- `password_reset_tokens`, `sessions`

---

## 📁 Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seuusuario/gestagenda.git
