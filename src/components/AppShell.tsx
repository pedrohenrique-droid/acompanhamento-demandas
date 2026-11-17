"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function BrandBlock({ href = "/", compact = false }: { href?: string; compact?: boolean }) {
  return (
    <Link href={href} className="group flex min-w-0 items-center gap-3">
      <div className="flex shrink-0 items-center gap-1.5">
        <Image
          src="/we-logo.png"
          alt="we"
          width={44}
          height={44}
          className="h-10 w-10 rounded-[6px] sm:h-11 sm:w-11"
          priority
        />
        <span className="text-lg font-semibold text-[color:var(--muted)]" aria-hidden>
          ·
        </span>
        <Image
          src="/byd-logo.png"
          alt="BYD"
          width={44}
          height={44}
          className="h-10 w-10 rounded-[6px] sm:h-11 sm:w-11"
          priority
        />
      </div>
      <div className="min-w-0">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[color:var(--brand-glow)]">
          we · BYD · Beta
        </p>
        <h1
          className={`brand-mark mt-0.5 truncate text-[color:var(--ink)] ${
            compact ? "text-[1.15rem] sm:text-[1.35rem]" : "text-[1.25rem] sm:text-[1.55rem]"
          }`}
        >
          Acompanhamento de Demandas
        </h1>
        {!compact ? (
          <p className="mt-0.5 hidden text-[0.76rem] text-[color:var(--muted)] sm:block">
            Piloto para destravar o gargalo de faturamento / aprovação
          </p>
        ) : null}
      </div>
    </Link>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isClientView = pathname?.includes("/cliente");

  if (isClientView) {
    return (
      <div className="app-shell">
        <header className="shell-header">
          <div className="mx-auto flex w-full max-w-3xl items-center px-5 py-4">
            <BrandBlock
              href={`/demandas/${pathname?.split("/")[2] ?? ""}`}
              compact
            />
          </div>
        </header>
        {children}
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="shell-header">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <BrandBlock />
          <nav className="flex flex-wrap items-center gap-1.5">
            <Link
              href="/demandas"
              className={`nav-link ${pathname?.startsWith("/demandas") ? "active" : ""}`}
            >
              Demandas
            </Link>
            <Link
              href="/admin/templates/byd"
              className={`nav-link ${pathname?.startsWith("/admin") ? "active" : ""}`}
            >
              Template BYD
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-5 pb-16 pt-6">{children}</main>
    </div>
  );
}
