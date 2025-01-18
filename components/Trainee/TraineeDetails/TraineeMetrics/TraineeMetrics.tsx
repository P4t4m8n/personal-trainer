import { TTraineeMetrics } from "@/types/trainee.type";

interface Props {
  metrics?: TTraineeMetrics[];
}

export default function TraineeMetrics({ metrics }: Props) {
  return <div className="w-full h-full border p-2 rounded borer-white">{JSON.stringify(metrics)}</div>;
}
