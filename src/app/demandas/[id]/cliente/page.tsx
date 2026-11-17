import Link from "next/link";
import { notFound } from "next/navigation";
import { AgoraCard } from "@/components/AgoraCard";
import { Stepper } from "@/components/Stepper";
import { Timeline } from "@/components/Timeline";
import { formatDateTime } from "@/lib/format";
import {
  buildProcessTimeline,
  getDemanda,
  getTemplate,
} from "@/lib/seed";

type Props = { params: Promise<{ id: string }> };

export default async function ClienteViewPage({ params }: Props) {
  const { id } = await params;
  const demanda = getDemanda(id);
  if (!demanda) notFound();

  const template = getTemplate(demanda.templateId);
  if (!template) notFound();

  const timeline = buildProcessTimeline(demanda, true);
  const current = timeline.find((i) => i.state === "current");

  return (
    <div className="mx-auto w-full max-w-3xl px-5 pb-12 pt-2">
      <header className="fade-up mb-6">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.16em] text-[color:var(--brand)]">
          Portal do cliente · visão sanitizada
        </p>
        <p className="mt-2 text-lg font-semibold text-[color:var(--ink)]">
          {demanda.titlePublic}
        </p>
        <p className="mt-1 text-sm text-[color:var(--muted)]">
          Ref. {demanda.code}
          {current?.at ? ` · Atualizado em ${formatDateTime(current.at)}` : ""}
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
          stages={template.stages}
          currentStageId={demanda.stageId}
          clientSafe
        />
        <Timeline items={timeline} templateName={template.name} clientSafe />
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
