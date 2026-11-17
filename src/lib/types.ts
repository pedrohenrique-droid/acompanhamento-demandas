export type PrazoStatus = "no_prazo" | "em_risco" | "atrasado";

export type WaitingOn = {
  who: string;
  whoClientSafe: string;
  reason: string;
  reasonClientSafe: string;
  since: string; // ISO
  slaLabel?: string;
  prazoStatus: PrazoStatus;
};

export type Stage = {
  id: string;
  order: number;
  nameInternal: string;
  nameClientSafe: string;
  defaultRole: string;
  slaLabel: string;
  visibleToClient: boolean;
};

export type TimelineEvent = {
  id: string;
  at: string; // ISO
  textInternal: string;
  textClientSafe: string;
  actor: string;
  visibleToClient: boolean;
  kind: "created" | "stage" | "waiting" | "note" | "done";
};

export type Demanda = {
  id: string;
  code: string;
  title: string;
  titlePublic: string;
  processType: string;
  category: "Globo" | "Digital" | "Offline" | "Produção";
  fase: "Fase 1" | "Fase 2";
  stageId: string;
  status: "aberta" | "em_andamento" | "aguardando" | "concluida";
  owner: string;
  clientFacing: string;
  prazo: string; // ISO date
  prazoStatus: PrazoStatus;
  waitingOn: WaitingOn | null;
  amountLabel: string;
  timeline: TimelineEvent[];
};

export type ProcessTemplate = {
  id: string;
  name: string;
  description: string;
  stages: Stage[];
  waitingOnSuggestions: { reason: string; reasonClientSafe: string; slaAnchor: string }[];
};
