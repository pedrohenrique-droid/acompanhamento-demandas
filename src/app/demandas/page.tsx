import Link from "next/link";
import { DemandaStatusBadge, PrazoBadge } from "@/components/StatusBadge";
import { formatDate } from "@/lib/format";
import { bydTemplate, demandas, getStage } from "@/lib/seed";

export default function DemandasPage() {
  return (
    <div className="fade-up space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-[color:var(--brand)]">
            Lista interna
          </p>
          <h2 className="brand-mark mt-1 text-3xl">Demandas</h2>
          <p className="mt-1 text-[color:var(--ink-soft)]">
            O que está parado e com quem — piloto {bydTemplate.name}.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="badge badge-neutral">Tipo: BYD</span>
          <span className="badge badge-wait">Aguardando: {demandas.filter((d) => d.waitingOn).length}</span>
        </div>
      </div>

      <div className="panel overflow-hidden">
        <div className="hidden grid-cols-[1.2fr_0.7fr_1fr_1.3fr_0.7fr] gap-3 border-b border-[color:var(--line)] px-4 py-3 text-[0.72rem] font-bold uppercase tracking-[0.08em] text-[color:var(--ink-soft)] md:grid">
          <span># / Título</span>
          <span>Tipo</span>
          <span>Estágio</span>
          <span>Bloqueio</span>
          <span>Prazo</span>
        </div>
        <ul>
          {demandas.map((d) => {
            const stage = getStage(d.stageId);
            return (
              <li key={d.id}>
                <Link
                  href={`/demandas/${d.id}`}
                  className="row-link grid gap-2 border-b border-[color:var(--line)] px-4 py-4 last:border-b-0 md:grid-cols-[1.2fr_0.7fr_1fr_1.3fr_0.7fr] md:items-center md:gap-3"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{d.code}</span>
                      <DemandaStatusBadge status={d.status} />
                    </div>
                    <p className="mt-1 text-sm text-[color:var(--ink-soft)]">{d.title}</p>
                    <p className="mt-1 text-xs text-[color:var(--ink-soft)] md:hidden">
                      {d.category} · {d.fase} · {d.amountLabel}
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">{d.category}</p>
                    <p className="text-[color:var(--ink-soft)]">{d.fase}</p>
                  </div>
                  <div className="text-sm font-medium leading-snug">
                    {stage?.nameInternal}
                  </div>
                  <div className="text-sm">
                    {d.waitingOn ? (
                      <>
                        <p className="font-semibold text-[#8a4b0f]">
                          ⏳ {d.waitingOn.who}
                        </p>
                        <p className="text-[color:var(--ink-soft)]">{d.waitingOn.reason}</p>
                      </>
                    ) : (
                      <span className="text-[color:var(--ink-soft)]">—</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span>{formatDate(d.prazo)}</span>
                    <PrazoBadge status={d.prazoStatus} />
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
