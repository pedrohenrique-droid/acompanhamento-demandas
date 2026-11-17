import { daysSince, formatDateTime } from "@/lib/format";
import type { WaitingOn } from "@/lib/types";
import { PrazoBadge } from "./StatusBadge";

type Props = {
  waitingOn: WaitingOn | null;
  clientSafe?: boolean;
  actions?: React.ReactNode;
};

export function AgoraCard({ waitingOn, clientSafe = false, actions }: Props) {
  if (!waitingOn) {
    return (
      <section className="panel-tight agora p-5 fade-up">
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[color:var(--accent)]">
          Agora
        </p>
        <h2 className="brand-mark mt-2 text-2xl">Sem bloqueio ativo</h2>
        <p className="mt-1 text-[color:var(--ink-soft)]">
          A demanda está em andamento no estágio atual.
        </p>
      </section>
    );
  }

  const who = clientSafe ? waitingOn.whoClientSafe : waitingOn.who;
  const reason = clientSafe ? waitingOn.reasonClientSafe : waitingOn.reason;
  const sinceDays = daysSince(waitingOn.since);

  return (
    <section className="panel-tight agora p-5 fade-up">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[color:var(--accent)]">
            Agora
          </p>
          <h2 className="brand-mark mt-2 text-[1.55rem] leading-tight sm:text-2xl">
            Aguardando: {who}
          </h2>
          <p className="mt-2 max-w-2xl text-[1.02rem] text-[color:var(--ink-soft)]">
            {reason}
          </p>
        </div>
        <PrazoBadge status={waitingOn.prazoStatus} />
      </div>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[color:var(--ink-soft)]">
        <span>
          desde {formatDateTime(waitingOn.since)}
          {sinceDays > 0 ? ` · ${sinceDays}d` : ""}
        </span>
        {waitingOn.slaLabel ? <span>SLA: {waitingOn.slaLabel}</span> : null}
      </div>
      {actions ? <div className="mt-4 flex flex-wrap gap-2">{actions}</div> : null}
    </section>
  );
}
