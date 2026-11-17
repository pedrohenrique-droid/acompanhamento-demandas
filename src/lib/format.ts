import type { PrazoStatus } from "./types";

const dateFmt = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const dateTimeFmt = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDate(iso: string) {
  return dateFmt.format(new Date(iso));
}

export function formatDateTime(iso: string) {
  return dateTimeFmt.format(new Date(iso));
}

export function daysSince(iso: string) {
  const ms = Date.now() - new Date(iso).getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

export function prazoLabel(status: PrazoStatus) {
  switch (status) {
    case "no_prazo":
      return "No prazo";
    case "em_risco":
      return "Em risco";
    case "atrasado":
      return "Atrasado";
  }
}

export function statusLabel(status: string) {
  switch (status) {
    case "aberta":
      return "Aberta";
    case "em_andamento":
      return "Em andamento";
    case "aguardando":
      return "Aguardando";
    case "concluida":
      return "Concluída";
    default:
      return status;
  }
}
