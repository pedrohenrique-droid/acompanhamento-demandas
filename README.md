# Acompanhamento de Demandas (BETA)

Piloto WE Agência — processo **BYD faturamento**.

## Como rodar

```bash
cd acompanhamento-demandas
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Telas

- `/` — home
- `/demandas` — lista interna
- `/demandas/[id]` — detalhe (AGORA + stepper + timeline)
- `/demandas/[id]/cliente` — vista cliente-safe
- `/admin/templates/byd` — template e waiting-on

## Stack

Next.js 15 · TypeScript · Tailwind · seed local (sem auth / integrações).
