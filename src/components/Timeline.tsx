import { formatDateTime } from "@/lib/format";
import type { ProcessTimelineItem } from "@/lib/types";

type Props = {
  items: ProcessTimelineItem[];
  templateName: string;
  clientSafe?: boolean;
};

export function Timeline({ items, templateName, clientSafe = false }: Props) {
  return (
    <section className="panel p-5 fade-up" style={{ animationDelay: "140ms" }}>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[color:var(--brand)]">
            Timeline do processo
          </p>
          <p className="mt-1 text-sm text-[color:var(--ink-soft)]">
            Estágios do template <span className="font-semibold text-[color:var(--ink)]">{templateName}</span>
            {clientSafe ? " · textos cliente-safe" : " · personalizável por processo"}
          </p>
        </div>
        <span className="badge badge-neutral">{items.length} etapas</span>
      </div>
      <ol className="timeline-rail mt-4">
        {items.map((item) => (
          <li
            key={item.stageId}
            className={`timeline-item ${item.state === "current" ? "current" : ""} ${
              item.state === "upcoming" ? "opacity-55" : ""
            }`}
          >
            <div className="timeline-card">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-[0.08em] text-[color:var(--muted)]">
                  Etapa {item.order}
                </span>
                {item.state === "done" ? (
                  <span className="badge badge-ok">Concluído</span>
                ) : null}
                {item.state === "current" ? (
                  <span className="badge badge-wait">Atual</span>
                ) : null}
                {item.state === "upcoming" ? (
                  <span className="badge badge-neutral">Próximo</span>
                ) : null}
              </div>
              <p className="mt-1.5 text-[0.98rem] font-semibold leading-snug">{item.title}</p>
              <p className="mt-1 text-sm text-[color:var(--ink-soft)]">{item.detail}</p>
              <p className="mt-2 text-xs text-[color:var(--muted)]">
                {item.at ? formatDateTime(item.at) : "Aguardando etapa anterior"}
                {!clientSafe && item.actor ? ` · ${item.actor}` : ""}
                {!clientSafe ? ` · ${item.role}` : ""}
                {` · SLA ${item.slaLabel}`}
              </p>
              {item.state === "current" ? (
                <div className="working">
                  <span className="working-dot" aria-hidden />
                  Em andamento…
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
