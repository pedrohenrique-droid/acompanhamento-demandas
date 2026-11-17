import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="fade-up">
      <section className="panel relative overflow-hidden px-7 py-12 sm:px-10 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(520px 280px at 85% 0%, rgba(227,30,36,0.18), transparent 60%)",
          }}
        />
        <div className="relative max-w-3xl">
          <div className="mb-6 flex items-center gap-2">
            <Image
              src="/we-logo.png"
              alt="we"
              width={56}
              height={56}
              className="h-12 w-12 rounded-[6px]"
              priority
            />
            <span className="text-xl font-semibold text-[color:var(--muted)]">·</span>
            <Image
              src="/byd-logo.png"
              alt="BYD"
              width={56}
              height={56}
              className="h-12 w-12 rounded-[6px]"
              priority
            />
          </div>

          <p className="text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[color:var(--brand-glow)]">
            we · BYD · novembro/2026
          </p>

          <h2 className="brand-mark mt-4 text-[2.5rem] leading-[1.02] text-[color:var(--ink)] sm:text-[3.4rem]">
            Status, bloqueio e{" "}
            <span className="text-[color:var(--brand)]">aprovação.</span>
          </h2>

          <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-[color:var(--ink-soft)]">
            Piloto interno we para destravar o gargalo de faturamento / aprovação
            BYD — China, comprovação e cortes 15/30/05 em linguagem de tracking.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/demandas" className="btn-primary">
              Ver demandas →
            </Link>
            <Link href="/admin/templates/byd" className="btn-ghost">
              Template BYD
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-[color:var(--line)] pt-5 text-sm">
            <div>
              <p className="text-[1.4rem] font-bold text-[color:var(--ink)]">5</p>
              <p className="text-[color:var(--muted)]">demandas piloto</p>
            </div>
            <div>
              <p className="text-[1.4rem] font-bold text-[color:var(--ink)]">8</p>
              <p className="text-[color:var(--muted)]">estágios BYD</p>
            </div>
            <div>
              <p className="text-[1.4rem] font-bold text-[color:var(--ink)]">1</p>
              <p className="text-[color:var(--muted)]">gargalo China</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
