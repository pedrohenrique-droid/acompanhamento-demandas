import Link from "next/link";
import { bydTemplate } from "@/lib/seed";

export default function BydTemplateAdminPage() {
  return (
    <div className="fade-up space-y-5">
      <div>
        <Link
          href="/demandas"
          className="text-sm font-semibold text-[color:var(--brand)] hover:underline"
        >
          ← Demandas
        </Link>
        <p className="mt-2 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[color:var(--brand-glow)]">
          Admin · templates personalizáveis
        </p>
        <h2 className="brand-mark mt-1 text-[2rem] sm:text-[2.35rem]">{bydTemplate.name}</h2>
        <p className="mt-2 max-w-3xl text-[color:var(--ink-soft)]">
          {bydTemplate.description}
        </p>
      </div>

      <section className="panel p-5">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[color:var(--brand)]">
          Personalização por processo
        </p>
        <ul className="mt-3 space-y-2 text-sm text-[color:var(--ink-soft)]">
          <li>
            · <strong className="text-[color:var(--ink)]">Estágios</strong> — ordem, nomes internos e
            rótulos cliente-safe
          </li>
          <li>
            · <strong className="text-[color:var(--ink)]">Timeline</strong> — títulos e detalhes por
            estágio (a timeline da demanda é gerada deste template)
          </li>
          <li>
            · <strong className="text-[color:var(--ink)]">Waiting-on</strong> — motivos internos +
            textos cliente + âncora de SLA
          </li>
          <li>
            · <strong className="text-[color:var(--ink)]">Visibilidade</strong> — o que aparece no
            portal cliente
          </li>
        </ul>
        <p className="mt-3 text-sm text-[color:var(--muted)]">
          Flag <code className="text-[color:var(--brand-glow)]">customizable: true</code> no data
          model · novos templates = novas timelines automaticamente.
        </p>
      </section>

      <section className="panel overflow-hidden">
        <div className="table-head border-b border-[color:var(--line)] px-4 py-3">
          <h3 className="font-semibold">Estágios + eventos de timeline</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="text-[0.7rem] uppercase tracking-[0.06em] text-[color:var(--ink-soft)]">
              <tr>
                <th className="px-4 py-3 font-bold">#</th>
                <th className="px-4 py-3 font-bold">Interno / Timeline</th>
                <th className="px-4 py-3 font-bold">Cliente-safe</th>
                <th className="px-4 py-3 font-bold">Papel</th>
                <th className="px-4 py-3 font-bold">SLA</th>
                <th className="px-4 py-3 font-bold">Cliente</th>
              </tr>
            </thead>
            <tbody>
              {bydTemplate.stages.map((s) => (
                <tr key={s.id} className="border-t border-[color:var(--line)] align-top">
                  <td className="px-4 py-3 font-semibold text-[color:var(--brand)]">
                    {s.order}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium">{s.nameInternal}</p>
                    <p className="mt-1 text-xs text-[color:var(--muted)]">
                      {s.timelineDetailInternal}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-[color:var(--ink-soft)]">
                    <p>{s.nameClientSafe}</p>
                    <p className="mt-1 text-xs text-[color:var(--muted)]">
                      {s.timelineDetailClientSafe}
                    </p>
                  </td>
                  <td className="px-4 py-3">{s.defaultRole}</td>
                  <td className="px-4 py-3">{s.slaLabel}</td>
                  <td className="px-4 py-3">
                    {s.visibleToClient ? (
                      <span className="badge badge-ok">Visível</span>
                    ) : (
                      <span className="badge badge-neutral">Oculto</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel p-5">
        <h3 className="font-semibold">Motivos de waiting-on sugeridos</h3>
        <ul className="mt-4 space-y-3">
          {bydTemplate.waitingOnSuggestions.map((w) => (
            <li
              key={w.reason}
              className="panel-tight grid gap-1 px-4 py-3 sm:grid-cols-[1.2fr_1.2fr_0.7fr]"
            >
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[color:var(--muted)]">
                  Interno
                </p>
                <p className="font-medium">{w.reason}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[color:var(--muted)]">
                  Cliente-safe
                </p>
                <p>{w.reasonClientSafe}</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[color:var(--muted)]">
                  Âncora SLA
                </p>
                <p className="font-semibold text-[color:var(--brand)]">{w.slaAnchor}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
