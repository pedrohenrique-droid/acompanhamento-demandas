import Link from "next/link";

export default function HomePage() {
  return (
    <div className="fade-up">
      <section className="panel relative overflow-hidden px-7 py-10 sm:px-10 sm:py-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(520px 260px at 90% 10%, rgba(227,30,36,0.12), transparent 60%), radial-gradient(360px 200px at 0% 90%, rgba(0,0,0,0.04), transparent 55%)",
          }}
        />
        <div className="relative max-w-2xl">
          <p className="text-[0.72rem] font-bold uppercase tracking-[0.18em] text-[color:var(--brand)]">
            we.com.br · Piloto BYD
          </p>
          <h2 className="brand-mark mt-3 text-[2.35rem] leading-[1.05] text-[color:var(--ink)] sm:text-[3rem]">
            Acompanhamento de Demandas
          </h2>
          <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-[color:var(--ink-soft)]">
            Transparência de status com o bloqueio atual em primeiro plano — quem
            segura a bola, por quê e até quando. Beta seedado com o processo real
            de faturamento BYD.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/demandas" className="btn-primary">
              Ver demandas
            </Link>
            <Link href="/admin/templates/byd" className="btn-ghost">
              Template BYD
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
