import type {
  Demanda,
  ProcessTemplate,
  ProcessTimelineItem,
  Stage,
} from "./types";

/**
 * Registry of process templates.
 * Each template is fully customizable: stages, timeline copy, waiting-on, client texts.
 *
 * Seed e textos de exemplo são 100% fictícios / anônimos — sem valores, NFs,
 * códigos ou nomes internos da planilha real.
 */
export const templates: ProcessTemplate[] = [
  {
    id: "tpl-byd-faturamento",
    name: "BYD — Faturamento",
    description:
      "Template piloto (fictício): autorização → documento de origem → preparação para faturamento → NF → consolidado (Fase 1 ou 2) → comprovação → aprovação do cliente → pagamento. Personalizável por processo.",
    customizable: true,
    stages: [
      {
        id: "s1",
        order: 1,
        nameInternal: "Autorização / código do cliente",
        nameClientSafe: "Autorização registrada",
        defaultRole: "Account / mídia",
        slaLabel: "2 dias úteis",
        visibleToClient: true,
        timelineTitleInternal: "Autorização / código do cliente",
        timelineTitleClientSafe: "Autorização registrada",
        timelineDetailInternal:
          "Registro de autorização e código de investimento (placeholder).",
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
          "Documento de origem (PI ou AP) anexado na aba-fonte (exemplo).",
        timelineDetailClientSafe: "Documentação de origem concluída.",
      },
      {
        id: "s3",
        order: 3,
        nameInternal: "Aba-fonte · liberado p/ faturamento",
        nameClientSafe: "Em preparação para faturamento",
        defaultRole: "Operações",
        slaLabel: "Até corte 15 ou 30",
        visibleToClient: true,
        timelineTitleInternal: "Aba-fonte · liberado p/ faturamento",
        timelineTitleClientSafe: "Em preparação para faturamento",
        timelineDetailInternal:
          "Linha na aba-fonte com status liberado p/ faturamento · ainda sem NF.",
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
          "NF de exemplo registrada · status FATURADO (ainda pode estar só na aba-fonte).",
        timelineDetailClientSafe: "Nota fiscal emitida pelo fornecedor.",
      },
      {
        id: "s5",
        order: 5,
        nameInternal: "No consolidado (Fase 1 ou 2)",
        nameClientSafe: "Incluído no fechamento",
        defaultRole: "Financeiro",
        slaLabel: "Corte da fase (15/30)",
        visibleToClient: true,
        timelineTitleInternal: "No consolidado (Fase 1 ou 2)",
        timelineTitleClientSafe: "Incluído no fechamento",
        timelineDetailInternal:
          "Linha no consolidado da fase (fases = fechamentos distintos, não etapas sequenciais).",
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
          "Link de comprovação preenchido · prazo de exemplo: dia 05.",
        timelineDetailClientSafe: "Comprovação da veiculação em andamento.",
      },
      {
        id: "s7",
        order: 7,
        nameInternal: "Aprovação do cliente (pedido de compra)",
        nameClientSafe: "Em aprovação do cliente",
        defaultRole: "Cliente",
        slaLabel: "Ciclo longo — fora da planilha",
        visibleToClient: true,
        timelineTitleInternal: "Aprovação do cliente (pedido de compra)",
        timelineTitleClientSafe: "Em aprovação do cliente",
        timelineDetailInternal:
          "Fora da planilha · pedido de compra do cliente · pagamento a veículos após liberação.",
        timelineDetailClientSafe:
          "Em aprovação interna do cliente (pedido de compra).",
      },
      {
        id: "s8",
        order: 8,
        nameInternal: "Liberação e pagamento → veículos",
        nameClientSafe: "Liberação e pagamento",
        defaultRole: "Financeiro",
        slaLabel: "3–5 du pós-liberação",
        visibleToClient: true,
        timelineTitleInternal: "Liberação e pagamento → veículos",
        timelineTitleClientSafe: "Liberação e pagamento",
        timelineDetailInternal:
          "Cliente liberou · financeiro processa pagamento aos veículos (detalhes internos não expostos).",
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
        reason: "Aguardando NF · ainda liberado p/ faturamento",
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
        reason: "FATURADO sem link de comprovação",
        reasonClientSafe: "Aguardando comprovação da veiculação",
        slaAnchor: "Dia 05",
      },
      {
        reason: "Aguardando aprovação do cliente",
        reasonClientSafe: "Em aprovação interna do cliente",
        slaAnchor: "Pedido de compra",
      },
      {
        reason: "Aguardando liberação financeira do cliente",
        reasonClientSafe: "Aguardando liberação financeira",
        slaAnchor: "Pós-aprovação",
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

/** Demandas de demonstração — nomes, valores e NFs fictícios. */
export const demandas: Demanda[] = [
  {
    id: "dem-ex-a",
    code: "DEM-EX-A",
    title: "Exemplo A — Digital · Fase 1 (aprovação)",
    titlePublic: "Exemplo A — Fechamento Fase 1",
    templateId: "tpl-byd-faturamento",
    processType: "BYD — Faturamento",
    category: "Digital",
    fase: "Fase 1",
    stageId: "s7",
    status: "aguardando",
    owner: "Operações (exemplo)",
    clientFacing: "Account (exemplo)",
    prazo: "2026-11-20",
    prazoStatus: "em_risco",
    amountLabel: "R$ 12.500,00",
    waitingOn: {
      who: "Cliente — pedido de compra (exemplo)",
      whoClientSafe: "Equipe de aprovação do cliente",
      reason: "Aguardando aprovação do cliente",
      reasonClientSafe: "Em aprovação interna do cliente (pedido de compra)",
      since: "2026-11-08T10:15:00-03:00",
      slaLabel: "Fora da planilha · ciclo longo (exemplo)",
      prazoStatus: "em_risco",
    },
    stageLog: [
      {
        stageId: "s1",
        at: "2026-10-12T09:00:00-03:00",
        actor: "Account",
        noteInternal: "Código placeholder COD-EX-1001",
      },
      {
        stageId: "s2",
        at: "2026-10-14T11:20:00-03:00",
        actor: "Operações",
        noteInternal: "PI exemplo anexada",
      },
      {
        stageId: "s3",
        at: "2026-10-18T16:40:00-03:00",
        actor: "Operações",
        noteInternal: "liberado p/ faturamento",
      },
      {
        stageId: "s4",
        at: "2026-10-28T14:05:00-03:00",
        actor: "Operações",
        noteInternal: "NF-EX-1001 · FATURADO",
      },
      {
        stageId: "s5",
        at: "2026-10-28T14:10:00-03:00",
        actor: "Operações",
        noteInternal: "Consolidado Fase 1 · valor placeholder",
      },
      {
        stageId: "s6",
        at: "2026-11-04T09:30:00-03:00",
        actor: "Operações",
        noteInternal: "Link de comprovação ok (exemplo)",
      },
      {
        stageId: "s7",
        at: "2026-11-08T10:15:00-03:00",
        actor: "Account",
        noteInternal: "Encaminhado ao cliente · waiting-on aprovação",
        noteClientSafe: "Encaminhado para aprovação do cliente",
      },
    ],
  },
  {
    id: "dem-ex-b",
    code: "DEM-EX-B",
    title: "Exemplo B — Offline · sem comprovação",
    titlePublic: "Exemplo B — Comprovação",
    templateId: "tpl-byd-faturamento",
    processType: "BYD — Faturamento",
    category: "Offline",
    fase: "Fase 1",
    stageId: "s6",
    status: "aguardando",
    owner: "Operações (exemplo)",
    clientFacing: "Account (exemplo)",
    prazo: "2026-11-05",
    prazoStatus: "atrasado",
    amountLabel: "R$ 8.900,00",
    waitingOn: {
      who: "Operações — link de comprovação (exemplo)",
      whoClientSafe: "Equipe de operações",
      reason: "FATURADO sem link de comprovação",
      reasonClientSafe: "Aguardando comprovação da veiculação",
      since: "2026-11-01T08:00:00-03:00",
      slaLabel: "Prazo exemplo · dia 05",
      prazoStatus: "atrasado",
    },
    stageLog: [
      {
        stageId: "s1",
        at: "2026-10-10T10:00:00-03:00",
        actor: "Account",
        noteInternal: "Código placeholder COD-EX-2002",
      },
      {
        stageId: "s2",
        at: "2026-10-12T11:00:00-03:00",
        actor: "Operações",
        noteInternal: "PI exemplo .pdf",
      },
      { stageId: "s3", at: "2026-10-16T14:00:00-03:00", actor: "Operações" },
      {
        stageId: "s4",
        at: "2026-10-22T15:00:00-03:00",
        actor: "Operações",
        noteInternal: "NF-EX-2002 · FATURADO",
      },
      {
        stageId: "s5",
        at: "2026-10-22T15:10:00-03:00",
        actor: "Operações",
        noteInternal: "Consolidado Fase 1 (exemplo)",
      },
      {
        stageId: "s6",
        at: "2026-11-01T08:00:00-03:00",
        actor: "Operações",
        noteInternal: "Linhas fictícias sem link de comprovação",
        noteClientSafe: "Comprovação com pendências de link",
      },
    ],
  },
  {
    id: "dem-ex-c",
    code: "DEM-EX-C",
    title: "Exemplo C — Produção · aguardando NF",
    titlePublic: "Exemplo C — Fase 2",
    templateId: "tpl-byd-faturamento",
    processType: "BYD — Faturamento",
    category: "Produção",
    fase: "Fase 2",
    stageId: "s3",
    status: "aguardando",
    owner: "Operações (exemplo)",
    clientFacing: "Account (exemplo)",
    prazo: "2026-11-30",
    prazoStatus: "no_prazo",
    amountLabel: "R$ 5.400,00",
    waitingOn: {
      who: "Fornecedor (exemplo)",
      whoClientSafe: "Fornecedor",
      reason: "Aguardando NF · ainda liberado p/ faturamento",
      reasonClientSafe: "Aguardando emissão da nota fiscal",
      since: "2026-11-12T13:45:00-03:00",
      slaLabel: "Corte Fase 2 (exemplo)",
      prazoStatus: "no_prazo",
    },
    stageLog: [
      {
        stageId: "s1",
        at: "2026-11-02T11:00:00-03:00",
        actor: "Account",
        noteInternal: "Código placeholder COD-EX-3003",
      },
      {
        stageId: "s2",
        at: "2026-11-03T10:00:00-03:00",
        actor: "Operações",
        noteInternal: "AP exemplo anexada",
      },
      {
        stageId: "s3",
        at: "2026-11-12T13:45:00-03:00",
        actor: "Operações",
        noteInternal: "liberado p/ faturamento · sobe ao consolidado após NF",
        noteClientSafe: "Em preparação para faturamento",
      },
    ],
  },
  {
    id: "dem-ex-d",
    code: "DEM-EX-D",
    title: "Exemplo D — Globo · pagamento veículos",
    titlePublic: "Exemplo D — Pagamento",
    templateId: "tpl-byd-faturamento",
    processType: "BYD — Faturamento",
    category: "Globo",
    fase: "Fase 1",
    stageId: "s8",
    status: "aguardando",
    owner: "Financeiro (exemplo)",
    clientFacing: "Account (exemplo)",
    prazo: "2026-11-18",
    prazoStatus: "em_risco",
    amountLabel: "R$ 15.000,00",
    waitingOn: {
      who: "Financeiro → veículos (exemplo)",
      whoClientSafe: "Financeiro",
      reason: "Aguardando pagamento aos veículos",
      reasonClientSafe: "Pagamento em processamento",
      since: "2026-11-14T17:00:00-03:00",
      slaLabel: "3–5 du pós-liberação (exemplo)",
      prazoStatus: "em_risco",
    },
    stageLog: [
      {
        stageId: "s1",
        at: "2026-10-08T09:30:00-03:00",
        actor: "Account",
        noteInternal: "Código placeholder COD-EX-4004",
      },
      {
        stageId: "s2",
        at: "2026-10-10T10:00:00-03:00",
        actor: "Operações",
        noteInternal: "PI exemplo",
      },
      { stageId: "s3", at: "2026-10-15T11:00:00-03:00", actor: "Operações" },
      {
        stageId: "s4",
        at: "2026-10-20T12:00:00-03:00",
        actor: "Operações",
        noteInternal: "NF-EX-4004 · FATURADO",
      },
      {
        stageId: "s5",
        at: "2026-10-22T12:00:00-03:00",
        actor: "Operações",
        noteInternal: "Consolidado Fase 1 (exemplo)",
      },
      {
        stageId: "s6",
        at: "2026-10-25T12:00:00-03:00",
        actor: "Operações",
        noteInternal: "Comprovação ok (exemplo)",
      },
      {
        stageId: "s7",
        at: "2026-11-10T11:00:00-03:00",
        actor: "Account",
        noteInternal: "Cliente aprovou · liberação (exemplo)",
      },
      {
        stageId: "s8",
        at: "2026-11-14T17:00:00-03:00",
        actor: "Financeiro",
        noteInternal: "Waiting-on pagamento (detalhe interno não expor)",
        noteClientSafe: "Pagamento aos veículos em processamento",
      },
    ],
  },
  {
    id: "dem-ex-e",
    code: "DEM-EX-E",
    title: "Exemplo E — Produção · pendência de NF",
    titlePublic: "Exemplo E — Pendência",
    templateId: "tpl-byd-faturamento",
    processType: "BYD — Faturamento",
    category: "Produção",
    fase: "Fase 1",
    stageId: "s4",
    status: "aguardando",
    owner: "Operações (exemplo)",
    clientFacing: "Account (exemplo)",
    prazo: "2026-11-15",
    prazoStatus: "atrasado",
    amountLabel: "R$ 1.250,00",
    waitingOn: {
      who: "Fornecedor · AP-EX-5005",
      whoClientSafe: "Fornecedor",
      reason: "Aguardando NF · ainda liberado p/ faturamento",
      reasonClientSafe: "Aguardando emissão da nota fiscal",
      since: "2026-10-30T09:00:00-03:00",
      slaLabel: "Pendência fictícia no consolidado",
      prazoStatus: "atrasado",
    },
    stageLog: [
      {
        stageId: "s1",
        at: "2026-10-05T10:00:00-03:00",
        actor: "Account",
        noteInternal: "Código placeholder COD-EX-5005",
      },
      {
        stageId: "s2",
        at: "2026-10-08T11:00:00-03:00",
        actor: "Operações",
        noteInternal: "AP-EX-5005.pdf (fictício)",
      },
      {
        stageId: "s3",
        at: "2026-10-20T14:00:00-03:00",
        actor: "Operações",
        noteInternal: "STATUS PENDENTE (exemplo)",
      },
      {
        stageId: "s4",
        at: "2026-10-30T09:00:00-03:00",
        actor: "Operações",
        noteInternal: "Aguardando NF · código/link ainda pendentes (exemplo)",
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
