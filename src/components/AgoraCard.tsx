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
      <section className="panel agora p-5 fade-up">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[color:var(--brand)]">
          Situação atual
        </p>
        <h2 className="brand-mark mt-2 text-2xl">Sem bloqueio ativo</h2>
        <p className="mt-1 text-[color:var(--ink-soft)]">
          A demanda segue no estágio atual — nada pendente de terceiros.
        </p>
        <div className="working mt-3">
          <span className="working-dot" aria-hidden />
          Em andamento…
        </div>
      </section>
    );
  }

  const who = clientSafe ? waitingOn.whoClientSafe : waitingOn.who;
  const reason = clientSafe ? waitingOn.reasonClientSafe : waitingOn.reason;
  const sinceDays = daysSince(waitingOn.since);

  return (
    <section className="panel agora p-5 fade-up">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[color:var(--brand)]">
            Agora
          </p>
          <h2 className="brand-mark mt-2 text-[1.45rem] leading-tight sm:text-[1.7rem]">
            Aguardando: {who}
          </h2>
          <p className="mt-2 max-w-2xl text-[0.98rem] text-[color:var(--ink-soft)]">
            {reason}
          </p>
        </div>
        <PrazoBadge status={waitingOn.prazoStatus} />
      </div>

      <div className="missing-box mt-4 px-4 py-3">
        <p className="text-sm font-semibold text-[color:var(--warn)]">
          Pendente: {reason}
        </p>
        <p className="mt-1 text-sm text-[color:var(--ink-soft)]">
          desde {formatDateTime(waitingOn.since)}
          {sinceDays > 0 ? ` · ${sinceDays}d` : ""}
          {waitingOn.slaLabel ? ` · SLA: ${waitingOn.slaLabel}` : ""}
        </p>
      </div>

      <div className="working mt-3">
        <span className="working-dot" aria-hidden />
        Em andamento…
      </div>

      {actions ? <div className="mt-4 flex flex-wrap gap-2">{actions}</div> : null}
    </section>
  );
}
