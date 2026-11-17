import type {
  Demanda,
  ProcessTemplate,
  ProcessTimelineItem,
  Stage,
} from "./types";

/**
 * Registry of process templates.
 * Each template is fully customizable: stages, timeline copy, waiting-on, client texts.
 */
export const templates: ProcessTemplate[] = [
  {
    id: "tpl-byd-faturamento",
    name: "BYD — Faturamento",
    description:
      "Espelho da planilha 10 OUTUBRO - BYD: Previsão → abas-fonte (PI/AP, lib. p/ faturamento, NF) → Consolidado Fase 1 ou Fase 2 → Link COMPROVANTE (dia 05) → aprovação China → pagamento veículos. Tudo personalizável por processo.",
    customizable: true,
    stages: [
      {
        id: "s1",
        order: 1,
        nameInternal: "Autorização / Código BYD",
        nameClientSafe: "Autorização registrada",
        defaultRole: "Account / mídia",
        slaLabel: "2 dias úteis",
        visibleToClient: true,
        timelineTitleInternal: "Autorização / Código BYD",
        timelineTitleClientSafe: "Autorização registrada",
        timelineDetailInternal:
          "Aba Previsão · Código BYD (STAT_0284/0285/0287/0293 ou PO SAP).",
        timelineDetailClientSafe: "Autorização do investimento registrada.",
      },
      {
        id: "s2",
        order: 2,
        nameInternal: "Documento origem (PI/AP)",
        nameClientSafe: "Documentação de origem",
        defaultRole: "Operações",
        slaLabel: "3 dias úteis",
        visibleToClient: true,
        timelineTitleInternal: "Documento origem (PI/AP)",
        timelineTitleClientSafe: "Documentação de origem",
        timelineDetailInternal:
          "Coluna PI (mídia) ou AP (produção/envios) na aba-fonte + PDF no Drive.",
        timelineDetailClientSafe: "Documentação de origem concluída.",
      },
      {
        id: "s3",
        order: 3,
        nameInternal: "Aba-fonte · lib. p/ faturamento",
        nameClientSafe: "Em preparação para faturamento",
        defaultRole: "Operações",
        slaLabel: "Até corte 15 ou 30",
        visibleToClient: true,
        timelineTitleInternal: "Aba-fonte · lib. p/ faturamento",
        timelineTitleClientSafe: "Em preparação para faturamento",
        timelineDetailInternal:
          "Linha na aba-fonte (Digital/Globo/Off/Envios/Produção) · STATUS lib. p/ faturamento · sem NF.",
        timelineDetailClientSafe: "Em preparação para faturamento.",
      },
      {
        id: "s4",
        order: 4,
        nameInternal: "NF emitida · FATURADO",
        nameClientSafe: "Nota fiscal emitida",
        defaultRole: "Veículo / fornecedor",
        slaLabel: "Conforme vencimento da NF",
        visibleToClient: true,
        timelineTitleInternal: "NF emitida · FATURADO",
        timelineTitleClientSafe: "Nota fiscal emitida",
        timelineDetailInternal:
          "Coluna NF preenchida · STATUS FATURADO (ainda pode estar só na aba-fonte).",
        timelineDetailClientSafe: "Nota fiscal emitida pelo fornecedor.",
      },
      {
        id: "s5",
        order: 5,
        nameInternal: "No consolidado (Fase 1 ou 2)",
        nameClientSafe: "Incluído no fechamento",
        defaultRole: "Financeiro WE",
        slaLabel: "Corte da fase (15/30)",
        visibleToClient: true,
        timelineTitleInternal: "No consolidado (Fase 1 ou 2)",
        timelineTitleClientSafe: "Incluído no fechamento",
        timelineDetailInternal:
          "Linha na aba Consolidado ou Consolidado-Fase 2 (fases = fechamentos distintos, não etapas sequenciais).",
        timelineDetailClientSafe: "Incluído no fechamento da fase.",
      },
      {
        id: "s6",
        order: 6,
        nameInternal: "Link de comprovação (dia 05)",
        nameClientSafe: "Comprovação em andamento",
        defaultRole: "Operações",
        slaLabel: "Dia 05 do mês seguinte",
        visibleToClient: true,
        timelineTitleInternal: "Link de comprovação (dia 05)",
        timelineTitleClientSafe: "Comprovação em andamento",
        timelineDetailInternal:
          "Coluna LINK DE COMPROVAÇÃO = COMPROVANTE · hard deadline dia 05 (muitas linhas FATURADO out/26 ainda sem link).",
        timelineDetailClientSafe: "Comprovação da veiculação em andamento.",
      },
      {
        id: "s7",
        order: 7,
        nameInternal: "Aprovação BYD (China / pedido de compra)",
        nameClientSafe: "Em aprovação do cliente",
        defaultRole: "BYD China",
        slaLabel: "Ciclo longo — fora da planilha",
        visibleToClient: true,
        timelineTitleInternal: "Aprovação BYD (China / pedido de compra)",
        timelineTitleClientSafe: "Em aprovação do cliente",
        timelineDetailInternal:
          "Fora da planilha · pedido de compra na China · WE não paga veículos até liberação.",
        timelineDetailClientSafe:
          "Em aprovação interna do cliente (pedido de compra).",
      },
      {
        id: "s8",
        order: 8,
        nameInternal: "Liberação e pagamento WE → veículos",
        nameClientSafe: "Liberação e pagamento",
        defaultRole: "Financeiro WE",
        slaLabel: "3–5 du pós-liberação",
        visibleToClient: true,
        timelineTitleInternal: "Liberação e pagamento WE → veículos",
        timelineTitleClientSafe: "Liberação e pagamento",
        timelineDetailInternal:
          "Fora da planilha · BYD libera de uma vez · WE quita (juros/BV/cartas só internos).",
        timelineDetailClientSafe: "Pagamento em processamento / concluído.",
      },
    ],
    waitingOnSuggestions: [
      {
        reason: "Sem PI/AP na aba-fonte",
        reasonClientSafe: "Aguardando documentação de origem",
        slaAnchor: "PI/AP",
      },
      {
        reason: "Aguardando NF · ainda lib. p/ faturamento",
        reasonClientSafe: "Aguardando emissão da nota fiscal",
        slaAnchor: "NF / vencimento",
      },
      {
        reason: "Aguardando corte consolidado — dia 15",
        reasonClientSafe: "Aguardando fechamento da quinzena",
        slaAnchor: "Dia 15",
      },
      {
        reason: "Aguardando corte consolidado — dia 30",
        reasonClientSafe: "Aguardando fechamento do mês",
        slaAnchor: "Dia 30",
      },
      {
        reason: "FATURADO sem link COMPROVANTE",
        reasonClientSafe: "Aguardando comprovação da veiculação",
        slaAnchor: "Dia 05",
      },
      {
        reason: "Aguardando aprovação BYD (China)",
        reasonClientSafe: "Em aprovação interna do cliente",
        slaAnchor: "Pedido de compra / China",
      },
      {
        reason: "Aguardando liberação financeira BYD",
        reasonClientSafe: "Aguardando liberação financeira",
        slaAnchor: "Pós-China",
      },
      {
        reason: "Aguardando pagamento aos veículos",
        reasonClientSafe: "Pagamento em processamento",
        slaAnchor: "3–5 du",
      },
    ],
  },
];

export const bydTemplate = templates[0];

export const demandas: Demanda[] = [
  {
    id: "dem-041",
    code: "DEM-BYD-041",
    title: "Digital — Consolidado Fase 1 (out/26)",
    titlePublic: "Faturamento Digital — Fechamento Fase 1",
    templateId: "tpl-byd-faturamento",
    processType: "BYD — Faturamento",
    category: "Digital",
    fase: "Fase 1",
    stageId: "s7",
    status: "aguardando",
    owner: "Ana (operações)",
    clientFacing: "Carlos (account)",
    prazo: "2026-11-20",
    prazoStatus: "em_risco",
    amountLabel: "R$ 3.880.670,72",
    waitingOn: {
      who: "BYD China — pedido de compra",
      whoClientSafe: "Equipe de aprovação do cliente",
      reason: "Aguardando aprovação BYD (China)",
      reasonClientSafe: "Em aprovação interna do cliente (pedido de compra)",
      since: "2026-11-08T10:15:00-03:00",
      slaLabel: "Fora da planilha · ciclo longo",
      prazoStatus: "em_risco",
    },
    stageLog: [
      { stageId: "s1", at: "2026-10-12T09:00:00-03:00", actor: "Carlos", noteInternal: "STAT_0285 · aba Previsão" },
      { stageId: "s2", at: "2026-10-14T11:20:00-03:00", actor: "Ana", noteInternal: "PIs na aba VALORES-DIGITAL" },
      { stageId: "s3", at: "2026-10-18T16:40:00-03:00", actor: "Ana", noteInternal: "lib. p/ faturamento" },
      { stageId: "s4", at: "2026-10-28T14:05:00-03:00", actor: "Ana", noteInternal: "NFs · FATURADO" },
      { stageId: "s5", at: "2026-10-28T14:10:00-03:00", actor: "Ana", noteInternal: "Aba Consolidado Fase 1 · ~R$ 3,88M" },
      { stageId: "s6", at: "2026-11-04T09:30:00-03:00", actor: "Ana", noteInternal: "LINKs COMPROVANTE ok antes do dia 05" },
      {
        stageId: "s7",
        at: "2026-11-08T10:15:00-03:00",
        actor: "Carlos",
        noteInternal: "Enviado à China · waiting-on pedido de compra",
        noteClientSafe: "Encaminhado para aprovação do cliente",
      },
    ],
  },
  {
    id: "dem-042",
    code: "DEM-BYD-042",
    title: "Offline — FATURADO sem COMPROVANTE (Fase 1)",
    titlePublic: "Faturamento Offline — Comprovação",
    templateId: "tpl-byd-faturamento",
    processType: "BYD — Faturamento",
    category: "Offline",
    fase: "Fase 1",
    stageId: "s6",
    status: "aguardando",
    owner: "Beatriz (operações)",
    clientFacing: "Carlos (account)",
    prazo: "2026-11-05",
    prazoStatus: "atrasado",
    amountLabel: "R$ 3.251.611,32",
    waitingOn: {
      who: "Operações WE — coluna LINK DE COMPROVAÇÃO",
      whoClientSafe: "Equipe de operações",
      reason: "FATURADO sem link COMPROVANTE",
      reasonClientSafe: "Aguardando comprovação da veiculação",
      since: "2026-11-01T08:00:00-03:00",
      slaLabel: "Hard deadline dia 05 · ~78 linhas Fase 1 sem link",
      prazoStatus: "atrasado",
    },
    stageLog: [
      { stageId: "s1", at: "2026-10-10T10:00:00-03:00", actor: "Carlos", noteInternal: "STAT_0287 Offline" },
      { stageId: "s2", at: "2026-10-12T11:00:00-03:00", actor: "Beatriz", noteInternal: "PIs .pdf na aba Mídia Off" },
      { stageId: "s3", at: "2026-10-16T14:00:00-03:00", actor: "Beatriz" },
      { stageId: "s4", at: "2026-10-22T15:00:00-03:00", actor: "Beatriz", noteInternal: "NFs 42914–42919 · FATURADO" },
      { stageId: "s5", at: "2026-10-22T15:10:00-03:00", actor: "Beatriz", noteInternal: "Consolidado Fase 1 · Demais emissoras" },
      {
        stageId: "s6",
        at: "2026-11-01T08:00:00-03:00",
        actor: "Beatriz",
        noteInternal: "Ex.: RECORD/BANDEIRANTES/SBT linhas 25–28 e 37–41 sem COMPROVANTE",
        noteClientSafe: "Comprovação com pendências de link",
      },
    ],
  },
  {
    id: "dem-043",
    code: "DEM-BYD-043",
    title: "Produção — Fase 2 aguardando NF",
    titlePublic: "Faturamento Produção — Fase 2",
    templateId: "tpl-byd-faturamento",
    processType: "BYD — Faturamento",
    category: "Produção",
    fase: "Fase 2",
    stageId: "s3",
    status: "aguardando",
    owner: "Diego (operações)",
    clientFacing: "Marina (account)",
    prazo: "2026-11-30",
    prazoStatus: "no_prazo",
    amountLabel: "R$ 2.877.920,63",
    waitingOn: {
      who: "Fornecedor / veículo (produção)",
      whoClientSafe: "Fornecedor",
      reason: "Aguardando NF · ainda lib. p/ faturamento",
      reasonClientSafe: "Aguardando emissão da nota fiscal",
      since: "2026-11-12T13:45:00-03:00",
      slaLabel: "Corte Fase 2 · NFs ~43095+",
      prazoStatus: "no_prazo",
    },
    stageLog: [
      { stageId: "s1", at: "2026-11-02T11:00:00-03:00", actor: "Marina", noteInternal: "STAT_0293" },
      { stageId: "s2", at: "2026-11-03T10:00:00-03:00", actor: "Diego", noteInternal: "AP na aba Produção-Gráfica / Envios" },
      {
        stageId: "s3",
        at: "2026-11-12T13:45:00-03:00",
        actor: "Diego",
        noteInternal: "STATUS lib. p/ faturamento · só sobe ao Consolidado-Fase 2 após NF",
        noteClientSafe: "Em preparação para faturamento",
      },
    ],
  },
  {
    id: "dem-044",
    code: "DEM-BYD-044",
    title: "Globo — Liberação e pagamento veículos",
    titlePublic: "Faturamento Globo — Pagamento",
    templateId: "tpl-byd-faturamento",
    processType: "BYD — Faturamento",
    category: "Globo",
    fase: "Fase 1",
    stageId: "s8",
    status: "aguardando",
    owner: "Financeiro WE",
    clientFacing: "Carlos (account)",
    prazo: "2026-11-18",
    prazoStatus: "em_risco",
    amountLabel: "R$ 1.080.325,77",
    waitingOn: {
      who: "Financeiro WE → veículos",
      whoClientSafe: "Financeiro",
      reason: "Aguardando pagamento aos veículos",
      reasonClientSafe: "Pagamento em processamento",
      since: "2026-11-14T17:00:00-03:00",
      slaLabel: "3–5 du pós-liberação BYD",
      prazoStatus: "em_risco",
    },
    stageLog: [
      { stageId: "s1", at: "2026-10-08T09:30:00-03:00", actor: "Carlos", noteInternal: "STAT_0284 · PO SAP 9900018409" },
      { stageId: "s2", at: "2026-10-10T10:00:00-03:00", actor: "Ana", noteInternal: "PIs Globo 120488/120559.pdf" },
      { stageId: "s3", at: "2026-10-15T11:00:00-03:00", actor: "Ana" },
      { stageId: "s4", at: "2026-10-20T12:00:00-03:00", actor: "Ana", noteInternal: "NFs 40960/40961 FATURADO" },
      { stageId: "s5", at: "2026-10-22T12:00:00-03:00", actor: "Ana", noteInternal: "Consolidado Fase 1 · Total Mídia Globo" },
      { stageId: "s6", at: "2026-10-25T12:00:00-03:00", actor: "Ana", noteInternal: "COMPROVANTE ok" },
      { stageId: "s7", at: "2026-11-10T11:00:00-03:00", actor: "Carlos", noteInternal: "China aprovou · BYD liberou" },
      {
        stageId: "s8",
        at: "2026-11-14T17:00:00-03:00",
        actor: "Financeiro WE",
        noteInternal: "Waiting-on pagamento (juros internos — não expor)",
        noteClientSafe: "Pagamento aos veículos em processamento",
      },
    ],
  },
  {
    id: "dem-045",
    code: "DEM-BYD-045",
    title: "Produção — linha PENDENTE no Consolidado",
    titlePublic: "Faturamento Produção — Pendência",
    templateId: "tpl-byd-faturamento",
    processType: "BYD — Faturamento",
    category: "Produção",
    fase: "Fase 1",
    stageId: "s4",
    status: "aguardando",
    owner: "Diego (operações)",
    clientFacing: "Marina (account)",
    prazo: "2026-11-15",
    prazoStatus: "atrasado",
    amountLabel: "R$ 3.498,54",
    waitingOn: {
      who: "Fornecedor · AP 33584",
      whoClientSafe: "Fornecedor",
      reason: "Aguardando NF · ainda lib. p/ faturamento",
      reasonClientSafe: "Aguardando emissão da nota fiscal",
      since: "2026-10-30T09:00:00-03:00",
      slaLabel: "Única PENDENTE do Consolidado Fase 1 out/26",
      prazoStatus: "atrasado",
    },
    stageLog: [
      { stageId: "s1", at: "2026-10-05T10:00:00-03:00", actor: "Marina", noteInternal: "STAT_0293" },
      { stageId: "s2", at: "2026-10-08T11:00:00-03:00", actor: "Diego", noteInternal: "AP 33584.pdf · Aeroporto SSA adesivos" },
      { stageId: "s3", at: "2026-10-20T14:00:00-03:00", actor: "Diego", noteInternal: "Na aba Produção / consolidado com STATUS PENDENTE" },
      {
        stageId: "s4",
        at: "2026-10-30T09:00:00-03:00",
        actor: "Diego",
        noteInternal: "Consolidado linha PENDENTE · NF/Código/Link ainda PENDENTE",
        noteClientSafe: "Aguardando nota fiscal do fornecedor",
      },
    ],
  },
];

export function getTemplate(templateId: string): ProcessTemplate | undefined {
  return templates.find((t) => t.id === templateId);
}

export function getDemanda(id: string): Demanda | undefined {
  return demandas.find((d) => d.id === id || d.code === id);
}

export function getStage(templateId: string, stageId: string): Stage | undefined {
  return getTemplate(templateId)?.stages.find((s) => s.id === stageId);
}

/** Timeline = template stages + demanda.stageLog (not a freeform event list). */
export function buildProcessTimeline(
  demanda: Demanda,
  clientSafe = false
): ProcessTimelineItem[] {
  const template = getTemplate(demanda.templateId);
  if (!template) return [];

  const currentOrder =
    template.stages.find((s) => s.id === demanda.stageId)?.order ?? 1;
  const logByStage = new Map(demanda.stageLog.map((e) => [e.stageId, e]));

  return template.stages
    .slice()
    .sort((a, b) => a.order - b.order)
    .filter((s) => (clientSafe ? s.visibleToClient : true))
    .map((stage) => {
      const log = logByStage.get(stage.id);
      const state: ProcessTimelineItem["state"] =
        stage.order < currentOrder
          ? "done"
          : stage.order === currentOrder
            ? "current"
            : "upcoming";

      const title = clientSafe
        ? stage.timelineTitleClientSafe
        : stage.timelineTitleInternal;
      const baseDetail = clientSafe
        ? stage.timelineDetailClientSafe
        : stage.timelineDetailInternal;
      const note = clientSafe ? log?.noteClientSafe : log?.noteInternal;
      const detail =
        state === "upcoming"
          ? `Próximo · ${stage.slaLabel}`
          : note
            ? `${baseDetail} · ${note}`
            : baseDetail;

      return {
        stageId: stage.id,
        order: stage.order,
        state,
        title,
        detail,
        role: stage.defaultRole,
        slaLabel: stage.slaLabel,
        at: log?.at,
        actor: log?.actor,
        visibleToClient: stage.visibleToClient,
      };
    });
}
