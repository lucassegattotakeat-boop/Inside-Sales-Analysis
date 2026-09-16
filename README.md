# Takeat Inside Sales Analysis

Aplicação base em Next.js para dashboard de pipeline, conversão, SLA, atividades, tarefas atrasadas e leads perdidos.

## Tecnologias

- Next.js 16
- TypeScript
- Tailwind CSS
- Vercel
- Supabase
- HubSpot API

## Como rodar localmente

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

3. Acesse:

```text
http://localhost:3000
```

## Variáveis de ambiente

Crie um arquivo `.env.local` com isso:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
HUBSPOT_ACCESS_TOKEN=your_hubspot_token
CRON_SECRET=your_secret
```

## Deploy na Vercel

1. Conecte o repositório ao Vercel.
2. Configure as variáveis de ambiente.
3. Faça o deploy.
4. Ative o cron job com o arquivo `vercel.json`.

## Estrutura principal

- `app/page.tsx` — dashboard principal
- `app/api/sync/route.ts` — rota de sincronização
- `vercel.json` — agendamento de cron
- `README.md` — documentação

## Observação

Este projeto foi preparado como base funcional e visual para o painel solicitado. Para conectar com dados reais do HubSpot e Supabase, basta preencher as variáveis de ambiente e ajustar as integrações conforme a sua conta.
