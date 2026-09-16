# Takeat Inside Sales Analysis

Dashboard em Next.js para análise do pipeline Inside Sales com visão de volume, conversão, SLA, atividade e leads perdidos.

## Status

- Projeto base validado com build estável
- Dashboard visual pronto
- Rotas de autenticação e sync preparadas
- Repositório publicado no GitHub

## Stack

- Next.js 16
- TypeScript
- Tailwind CSS
- Supabase
- HubSpot API
- Vercel

## Rodando localmente

```bash
npm install
npm run dev
```

Acesso:

```text
http://localhost:3000
```

## Variáveis de ambiente

Crie um arquivo `.env.local` com base no exemplo `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
HUBSPOT_ACCESS_TOKEN=your-hubspot-private-app-token
CRON_SECRET=change-me
```

## Rotas principais

- `/` — dashboard principal
- `/login` — login corporativo
- `/api/sync` — sincronização do HubSpot
- `/api/auth/login` — validação do e-mail corporativo

## Deploy na Vercel

1. Conecte o GitHub ao Vercel
2. Configure as variáveis de ambiente
3. Faça o deploy
4. Ative o cron com `vercel.json`

## Observação

A estrutura está pronta para receber os dados reais do HubSpot e do Supabase. Para funcionar em produção, basta inserir as credenciais reais do ambiente e rodar a sincronização inicial.
