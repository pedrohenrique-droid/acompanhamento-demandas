import { prazoLabel, statusLabel } from "@/lib/format";
import type { PrazoStatus } from "@/lib/types";

export function PrazoBadge({ status }: { status: PrazoStatus }) {
  const cls =
    status === "atrasado"
      ? "badge-danger"
      : status === "em_risco"
        ? "badge-warn"
        : "badge-ok";
  return <span className={`badge ${cls}`}>{prazoLabel(status)}</span>;
}

export function DemandaStatusBadge({ status }: { status: string }) {
  const cls =
    status === "aguardando"
      ? "badge-wait"
      : status === "em_andamento"
        ? "badge-process"
        : "badge-neutral";
  return <span className={`badge ${cls}`}>{statusLabel(status)}</span>;
}
