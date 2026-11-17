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
  const nextAction = demanda.waitingOn
    ? `Confirmar retorno: ${demanda.waitingOn.reason}`
    : "Avançar estágio";

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
            <h2 className="brand-mark text-[2rem] sm:text-[2.3rem]">{demanda.code}</h2>
            <DemandaStatusBadge status={demanda.status} />
            <PrazoBadge status={demanda.prazoStatus} />
          </div>
          <p className="mt-1 text-lg text-[color:var(--ink-soft)]">{demanda.title}</p>
          <p className="mt-2 text-sm text-[color:var(--muted)]">
            {demanda.processType} · {demanda.category} · {demanda.fase} ·{" "}
            {demanda.amountLabel}
          </p>
        </div>
        <Link href={`/demandas/${demanda.id}/cliente`} className="btn-ghost">
          Ver como cliente vê
        </Link>
      </div>

      <div className="meta-grid fade-up">
        <div className="meta-card">
          <p className="label">Responsável</p>
          <p className="value">{demanda.owner}</p>
        </div>
        <div className="meta-card">
          <p className="label">Cliente-facing</p>
          <p className="value">{demanda.clientFacing}</p>
        </div>
        <div className="meta-card">
          <p className="label">Prazo</p>
          <p className="value">{formatDate(demanda.prazo)}</p>
        </div>
      </div>

      <AgoraCard
        waitingOn={demanda.waitingOn}
        actions={
          <>
            <button type="button" className="btn-primary">
              Lembrar
            </button>
            <button type="button" className="btn-ghost">
              Registrar retorno
            </button>
          </>
        }
      />

      <button type="button" className="cta-soft">
        {nextAction}
      </button>

      <p className="text-sm font-medium text-[color:var(--ink-soft)]">
        Estágio atual: <span className="text-[color:var(--ink)]">{stage?.nameInternal}</span>
      </p>

      <Stepper stages={bydTemplate.stages} currentStageId={demanda.stageId} />
      <Timeline events={demanda.timeline} />
    </div>
  );
}
