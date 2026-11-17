"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isClientView = pathname?.includes("/cliente");

  if (isClientView) {
    return <div className="app-shell">{children}</div>;
  }

  return (
    <div className="app-shell">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 pb-3 pt-6">
        <Link href="/" className="group min-w-0">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-[color:var(--brand)]">
            WE Agência · Beta
          </p>
          <h1 className="brand-mark mt-1 truncate text-[1.45rem] text-[color:var(--ink)] sm:text-[1.75rem]">
            Acompanhamento de Demandas
          </h1>
        </Link>
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
