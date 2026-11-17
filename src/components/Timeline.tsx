import { formatDateTime } from "@/lib/format";
import type { TimelineEvent } from "@/lib/types";

type Props = {
  events: TimelineEvent[];
  clientSafe?: boolean;
};

export function Timeline({ events, clientSafe = false }: Props) {
  const list = [...events]
    .filter((e) => (clientSafe ? e.visibleToClient : true))
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());

  return (
    <section className="panel p-5 fade-up" style={{ animationDelay: "140ms" }}>
      <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[color:var(--brand)]">
        Timeline
      </p>
      <ol className="mt-4">
        {list.map((event) => (
          <li key={event.id} className="timeline-item">
            <p className="text-xs font-semibold text-[color:var(--ink-soft)]">
              {formatDateTime(event.at)}
              {!clientSafe ? ` · ${event.actor}` : ""}
            </p>
            <p className="mt-1 text-[0.98rem] leading-snug">
              {clientSafe ? event.textClientSafe : event.textInternal}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
