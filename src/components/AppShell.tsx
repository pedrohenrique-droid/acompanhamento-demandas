"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function BrandBlock({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="group flex min-w-0 items-center gap-3">
      <Image
        src="/we-logo.png"
        alt="we"
        width={48}
        height={48}
        className="h-11 w-11 shrink-0 rounded-[10px] shadow-sm"
        priority
      />
      <div className="min-w-0">
        <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[color:var(--brand)]">
          we · Beta
        </p>
        <h1 className="brand-mark mt-0.5 truncate text-[1.35rem] text-[color:var(--ink)] sm:text-[1.65rem]">
          Acompanhamento de Demandas
        </h1>
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
          <BrandBlock href={`/demandas/${pathname?.split("/")[2] ?? ""}`} />
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
