import Button from "@/components/UI/Button";
import Input from "@/components/UI/Form/Input";
import { usePrevious } from "@/hooks/usePrevious";
import { saveMetrics } from "@/services/server/metrics.server.service";
import { TTraineeMetrics } from "@/types/trainee.type";
import { dateUtil } from "@/utils/client/date.util";
import { useActionState } from "react";

interface Props {
  metric?: TTraineeMetrics;
  traineeId: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMetrics: React.Dispatch<React.SetStateAction<TTraineeMetrics[]>>;
}
export default function TraineeMetricEdit({
  metric,
  setIsOpen,
  traineeId,
  setMetrics,
}: Props) {
  const [state, formAction, isPending] = useActionState(saveMetrics, null);
  const previousState = usePrevious(state);
  if (previousState !== state) {
    setMetrics((prev) => {
      const idx = prev.findIndex((m) => m.id === state?.id);
      if (idx === -1) {
        return [...prev, state!];
      }
      prev[idx] = state!;
      return prev;
    });
    setIsOpen(false);
  }
  const formattedDate = dateUtil.formatDateForInput(metric?.date);
  return (
    <form action={formAction} className="flex flex-col gap-2">
      <Input
        type="number"
        placeholder="Heart rate"
        defaultValue={metric?.heartRate || ""}
        name="heartRate"
      />
      <Input
        type="number"
        placeholder="weight"
        defaultValue={metric?.weight || ""}
        name="weight"
      />
      <Input
        type="number"
        placeholder="height"
        defaultValue={metric?.height || ""}
        name="height"
      />
      <Input
        type="number"
        placeholder="age"
        defaultValue={metric?.age || ""}
        name="age"
      />
      <div className="flex gap-1 items-center">
        <Input
          type="number"
          placeholder="bloodPressureSystole"
          defaultValue={metric?.bloodPressureSystole || ""}
          name="bloodPressureSystole"
          className=""
        />
        <p className="text-4xl">/</p>
        <Input
          type="number"
          placeholder="bloodPressureDiastole"
          defaultValue={metric?.bloodPressureDiastole || ""}
          name="bloodPressureDiastole"
        />
      </div>
      <Input
        type="date"
        placeholder="date"
        defaultValue={formattedDate}
        name="date"
      />
      <Input
        type="string"
        defaultValue={metric?.id || ""}
        name="id"
        divStyle="hidden"
      />
      <Input
        type="string"
        defaultValue={traineeId || ""}
        name="traineeId"
        divStyle="hidden"
      />
      <Button
        styleMode="none"
        styleSize="none"
        type="submit"
        className="p-2 border rounded"
        disabled={isPending}
      >
        Save
      </Button>
    </form>
  );
}
