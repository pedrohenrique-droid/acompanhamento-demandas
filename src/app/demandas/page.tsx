import Link from "next/link";
import { DemandaStatusBadge, PrazoBadge } from "@/components/StatusBadge";
import { formatDate } from "@/lib/format";
import { bydTemplate, demandas, getStage } from "@/lib/seed";

export default function DemandasPage() {
  const waitingCount = demandas.filter((d) => d.waitingOn).length;

  return (
    <div className="fade-up space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[color:var(--brand)]">
            Lista interna
          </p>
          <h2 className="brand-mark mt-1 text-[2rem] sm:text-[2.35rem]">Demandas</h2>
          <p className="mt-1 text-[color:var(--ink-soft)]">
            O que está parado e com quem — piloto {bydTemplate.name}.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="chip active">BYD</span>
          <span className="chip">Aguardando · {waitingCount}</span>
        </div>
      </div>

      <section className="panel p-4">
        <div className="filter-bar grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          <div className="filter-field">
            <label htmlFor="f-busca">Busca</label>
            <input id="f-busca" defaultValue="" placeholder="Código ou título" readOnly />
          </div>
          <div className="filter-field">
            <label htmlFor="f-tipo">Tipo</label>
            <select id="f-tipo" defaultValue="byd" disabled>
              <option value="byd">BYD — Faturamento</option>
            </select>
          </div>
          <div className="filter-field">
            <label htmlFor="f-fase">Fase</label>
            <select id="f-fase" defaultValue="todas" disabled>
              <option value="todas">Todas</option>
              <option value="1">Fase 1</option>
              <option value="2">Fase 2</option>
            </select>
          </div>
          <div className="filter-field">
            <label htmlFor="f-status">Situação</label>
            <select id="f-status" defaultValue="aguardando" disabled>
              <option value="todas">Todas</option>
              <option value="aguardando">Aguardando</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button type="button" className="btn-ghost">
              Limpar
            </button>
            <button type="button" className="btn-primary">
              Buscar
            </button>
          </div>
        </div>
      </section>

      <div className="panel overflow-hidden">
        <div className="table-head hidden grid-cols-[1.25fr_0.65fr_1fr_1.25fr_0.7fr] gap-3 border-b border-[color:var(--line)] px-4 py-3 text-[0.7rem] font-bold uppercase tracking-[0.06em] text-[color:var(--ink-soft)] md:grid">
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
                  className="row-link grid gap-2 border-b border-[color:var(--line)] px-4 py-4 last:border-b-0 md:grid-cols-[1.25fr_0.65fr_1fr_1.25fr_0.7fr] md:items-center md:gap-3"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold tracking-tight">{d.code}</span>
                      <DemandaStatusBadge status={d.status} />
                    </div>
                    <p className="mt-1 text-sm text-[color:var(--ink-soft)]">{d.title}</p>
                    <p className="mt-1 text-xs text-[color:var(--muted)] md:hidden">
                      {d.category} · {d.fase} · {d.amountLabel}
                    </p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium">{d.category}</p>
                    <p className="text-[color:var(--ink-soft)]">{d.fase}</p>
                  </div>
                  <div className="text-sm font-medium leading-snug text-[color:var(--ink)]">
                    {stage?.nameInternal}
                  </div>
                  <div className="text-sm">
                    {d.waitingOn ? (
                      <>
                        <p className="font-semibold text-[color:var(--brand-deep)]">
                          {d.waitingOn.who}
                        </p>
                        <p className="text-[color:var(--ink-soft)]">{d.waitingOn.reason}</p>
                      </>
                    ) : (
                      <span className="text-[color:var(--muted)]">—</span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <span className="font-medium">{formatDate(d.prazo)}</span>
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
