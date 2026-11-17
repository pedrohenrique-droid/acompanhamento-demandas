import { formatDateTime } from "@/lib/format";
import type { TimelineEvent } from "@/lib/types";

type Props = {
  events: TimelineEvent[];
  clientSafe?: boolean;
  showWorking?: boolean;
};

export function Timeline({ events, clientSafe = false, showWorking = true }: Props) {
  const list = [...events]
    .filter((e) => (clientSafe ? e.visibleToClient : true))
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());

  return (
    <section className="panel p-5 fade-up" style={{ animationDelay: "140ms" }}>
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[color:var(--brand)]">
        Timeline
      </p>
      <ol className="timeline-rail mt-4">
        {list.map((event, index) => {
          const isCurrent = index === 0;
          return (
            <li
              key={event.id}
              className={`timeline-item ${isCurrent ? "current" : ""}`}
            >
              <div className="timeline-card">
                <p className="text-xs font-semibold text-[color:var(--muted)]">
                  {formatDateTime(event.at)}
                  {!clientSafe ? ` · ${event.actor}` : ""}
                </p>
                <p className="mt-1.5 text-[0.97rem] font-semibold leading-snug">
                  {clientSafe ? event.textClientSafe : event.textInternal}
                </p>
                {isCurrent && showWorking && event.kind === "waiting" ? (
                  <div className="working">
                    <span className="working-dot" aria-hidden />
                    Em andamento…
                  </div>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
