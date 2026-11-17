import Link from "next/link";
import { notFound } from "next/navigation";
import { AgoraCard } from "@/components/AgoraCard";
import { DemandaStatusBadge, PrazoBadge } from "@/components/StatusBadge";
import { Stepper } from "@/components/Stepper";
import { Timeline } from "@/components/Timeline";
import { formatDate } from "@/lib/format";
import { bydTemplate, getDemanda, getStage } from "@/lib/seed";

type Props = { params: Promise<{ id: string }> };

export default async function DemandaDetailPage({ params }: Props) {
  const { id } = await params;
  const demanda = getDemanda(id);
  if (!demanda) notFound();

  const stage = getStage(demanda.stageId);

  return (
    <div className="space-y-4">
      <div className="fade-up flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/demandas"
            className="text-sm font-semibold text-[color:var(--brand)] hover:underline"
          >
            ← Demandas
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <h2 className="brand-mark text-3xl">{demanda.code}</h2>
            <DemandaStatusBadge status={demanda.status} />
            <PrazoBadge status={demanda.prazoStatus} />
          </div>
          <p className="mt-1 text-lg text-[color:var(--ink-soft)]">{demanda.title}</p>
          <p className="mt-2 text-sm text-[color:var(--ink-soft)]">
            {demanda.processType} · {demanda.category} · {demanda.fase} ·{" "}
            {demanda.amountLabel}
          </p>
          <p className="mt-1 text-sm text-[color:var(--ink-soft)]">
            Responsável: {demanda.owner} · Cliente-facing: {demanda.clientFacing} ·
            Prazo {formatDate(demanda.prazo)}
          </p>
          <p className="mt-1 text-sm font-medium">Estágio atual: {stage?.nameInternal}</p>
        </div>
        <Link
          href={`/demandas/${demanda.id}/cliente`}
          className="rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2 text-sm font-semibold transition hover:border-[color:var(--brand)]"
        >
          Ver como cliente vê
        </Link>
      </div>

      <AgoraCard
        waitingOn={demanda.waitingOn}
        actions={
          <>
            <button
              type="button"
              className="rounded-full bg-[color:var(--brand)] px-4 py-2 text-sm font-semibold text-white opacity-90"
            >
              Lembrar
            </button>
            <button
              type="button"
              className="rounded-full border border-[color:var(--line)] bg-white/80 px-4 py-2 text-sm font-semibold"
            >
              Registrar retorno
            </button>
          </>
        }
      />

      <Stepper stages={bydTemplate.stages} currentStageId={demanda.stageId} />
      <Timeline events={demanda.timeline} />
    </div>
  );
}
