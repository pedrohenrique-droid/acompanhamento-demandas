import type { Stage } from "@/lib/types";

type Props = {
  stages: Stage[];
  currentStageId: string;
  clientSafe?: boolean;
};

export function Stepper({ stages, currentStageId, clientSafe = false }: Props) {
  const visible = clientSafe ? stages.filter((s) => s.visibleToClient) : stages;
  const currentOrder = stages.find((s) => s.id === currentStageId)?.order ?? 1;

  return (
    <section className="panel p-5 fade-up" style={{ animationDelay: "80ms" }}>
      <p className="text-[0.72rem] font-bold uppercase tracking-[0.14em] text-[color:var(--brand)]">
        Processo
      </p>
      <div className="stepper mt-4">
        {visible.map((stage) => {
          const state =
            stage.order < currentOrder
              ? "done"
              : stage.order === currentOrder
                ? "current"
                : "";
          const label = clientSafe ? stage.nameClientSafe : stage.nameInternal;
          return (
            <div key={stage.id} className={`step ${state}`} title={label}>
              {label}
            </div>
          );
        })}
      </div>
    </section>
  );
}
