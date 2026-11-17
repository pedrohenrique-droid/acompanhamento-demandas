import Link from "next/link";
import { notFound } from "next/navigation";
import { AgoraCard } from "@/components/AgoraCard";
import { Stepper } from "@/components/Stepper";
import { Timeline } from "@/components/Timeline";
import { formatDateTime } from "@/lib/format";
import { bydTemplate, getDemanda } from "@/lib/seed";

type Props = { params: Promise<{ id: string }> };

export default async function ClienteViewPage({ params }: Props) {
  const { id } = await params;
  const demanda = getDemanda(id);
  if (!demanda) notFound();

  const lastPublic = [...demanda.timeline]
    .filter((e) => e.visibleToClient)
    .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())[0];

  return (
    <div className="mx-auto min-h-screen w-full max-w-3xl px-5 py-8">
      <header className="fade-up mb-6">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[color:var(--brand)]">
          Portal do cliente · visão sanitizada
        </p>
        <h1 className="brand-mark mt-2 text-[2rem] leading-tight sm:text-[2.35rem]">
          Acompanhamento de Demandas
        </h1>
        <p className="mt-2 text-[color:var(--ink-soft)]">{demanda.titlePublic}</p>
        <p className="mt-1 text-sm text-[color:var(--muted)]">
          Ref. {demanda.code}
          {lastPublic ? ` · Atualizado em ${formatDateTime(lastPublic.at)}` : ""}
        </p>
      </header>

      <div className="space-y-4">
        <AgoraCard waitingOn={demanda.waitingOn} clientSafe />
        {demanda.waitingOn ? (
          <div className="cta-soft text-center">
            Situação atual: {demanda.waitingOn.reasonClientSafe}
          </div>
        ) : null}
        <Stepper
          stages={bydTemplate.stages}
          currentStageId={demanda.stageId}
          clientSafe
        />
        <Timeline events={demanda.timeline} clientSafe />
      </div>

      <p className="mt-8 text-center text-sm text-[color:var(--ink-soft)]">
        <Link
          href={`/demandas/${demanda.id}`}
          className="font-semibold text-[color:var(--brand)] hover:underline"
        >
          ← Voltar à vista interna
        </Link>
      </p>
    </div>
  );
}
