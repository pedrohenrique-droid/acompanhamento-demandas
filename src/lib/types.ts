export type PrazoStatus = "no_prazo" | "em_risco" | "atrasado";

export type WaitingOn = {
  who: string;
  whoClientSafe: string;
  reason: string;
  reasonClientSafe: string;
  since: string;
  slaLabel?: string;
  prazoStatus: PrazoStatus;
};

/** Stage defined by the process template — also the timeline unit. */
export type Stage = {
  id: string;
  order: number;
  nameInternal: string;
  nameClientSafe: string;
  defaultRole: string;
  slaLabel: string;
  visibleToClient: boolean;
  timelineTitleInternal: string;
  timelineTitleClientSafe: string;
  timelineDetailInternal: string;
  timelineDetailClientSafe: string;
};

export type StageLogEntry = {
  stageId: string;
  at: string;
  actor: string;
  noteInternal?: string;
  noteClientSafe?: string;
};

export type Demanda = {
  id: string;
  code: string;
  title: string;
  titlePublic: string;
  /** Which process template drives stepper + timeline + client texts */
  templateId: string;
  processType: string;
  category: "Globo" | "Digital" | "Offline" | "Produção";
  fase: "Fase 1" | "Fase 2";
  stageId: string;
  status: "aberta" | "em_andamento" | "aguardando" | "concluida";
  owner: string;
  clientFacing: string;
  prazo: string;
  prazoStatus: PrazoStatus;
  waitingOn: WaitingOn | null;
  amountLabel: string;
  stageLog: StageLogEntry[];
};

/**
 * Process template is the customization unit:
 * stages, timeline copy, waiting-on reasons, and client-safe labels
 * are all per-template and editable in admin (beta: seed + admin view).
 */
export type ProcessTemplate = {
  id: string;
  name: string;
  description: string;
  /** Explicit flag for product copy: everything here is personalizable */
  customizable: boolean;
  stages: Stage[];
  waitingOnSuggestions: { reason: string; reasonClientSafe: string; slaAnchor: string }[];
};

export type ProcessTimelineItem = {
  stageId: string;
  order: number;
  state: "done" | "current" | "upcoming";
  title: string;
  detail: string;
  role: string;
  slaLabel: string;
  at?: string;
  actor?: string;
  visibleToClient: boolean;
};
