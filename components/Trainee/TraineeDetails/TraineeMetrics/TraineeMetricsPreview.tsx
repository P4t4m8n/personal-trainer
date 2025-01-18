import { TTraineeMetrics } from "@/types/trainee.type";
import { dateUtil } from "@/utils/client/date.util";

interface Props {
  metric: TTraineeMetrics;
}
export default function TraineeMetricsPreview({ metric }: Props) {
  const date = dateUtil.formatDateForPreview(metric.date);
  return <li>{date}</li>;
}
