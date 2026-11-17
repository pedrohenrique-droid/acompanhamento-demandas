import Link from "next/link";

export default function HomePage() {
  return (
    <div className="fade-up">
      <section className="panel relative overflow-hidden px-7 py-10 sm:px-10 sm:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(600px 280px at 85% 20%, rgba(13,92,86,0.16), transparent 60%), radial-gradient(420px 240px at 10% 80%, rgba(201,120,32,0.12), transparent 55%)",
          }}
        />
        <div className="relative max-w-2xl">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[color:var(--brand)]">
            Piloto BYD · Faturamento
          </p>
          <h2 className="brand-mark mt-3 text-[2.4rem] leading-[1.05] text-[color:var(--ink)] sm:text-[3.1rem]">
            Acompanhamento de Demandas
          </h2>
          <p className="mt-4 max-w-xl text-[1.08rem] leading-relaxed text-[color:var(--ink-soft)]">
            Transparência de status com o bloqueio atual em primeiro plano — quem
            segura a bola, por quê e até quando. Beta seedado com o processo real
            de faturamento BYD.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/demandas"
              className="rounded-full bg-[color:var(--brand)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[color:var(--brand-deep)]"
            >
              Ver demandas
            </Link>
            <Link
              href="/admin/templates/byd"
              className="rounded-full border border-[color:var(--line)] bg-white/70 px-5 py-2.5 text-sm font-semibold text-[color:var(--ink)] transition hover:border-[color:var(--brand)]"
            >
              Template BYD
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
