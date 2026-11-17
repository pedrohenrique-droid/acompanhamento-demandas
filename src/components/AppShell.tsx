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
          className="h-10 w-10 rounded-[9px] shadow-sm sm:h-11 sm:w-11"
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
          className="h-10 w-10 rounded-[9px] shadow-sm sm:h-11 sm:w-11"
          priority
        />
      </div>
      <div className="min-w-0">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[color:var(--brand)]">
          we · BYD · Beta
        </p>
        <h1
          className={`brand-mark mt-0.5 truncate text-[color:var(--ink)] ${
            compact ? "text-[1.2rem] sm:text-[1.4rem]" : "text-[1.3rem] sm:text-[1.6rem]"
          }`}
        >
          Acompanhamento de Demandas
        </h1>
        {!compact ? (
          <p className="mt-0.5 hidden text-[0.78rem] text-[color:var(--ink-soft)] sm:block">
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
        <header className="mx-auto flex w-full max-w-3xl items-center px-5 pb-2 pt-6">
          <BrandBlock
            href={`/demandas/${pathname?.split("/")[2] ?? ""}`}
            compact
          />
        </header>
        {children}
      </div>
    );
  }

  return (
    <div className="app-shell">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 pb-3 pt-6">
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
      </header>
      <main className="mx-auto w-full max-w-6xl px-5 pb-16 pt-2">{children}</main>
    </div>
  );
}
