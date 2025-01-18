import { TTraineeMetrics } from "@/types/trainee.type";
import { dateUtil } from "@/utils/client/date.util";

interface Props {
  metrics?: TTraineeMetrics;
}
export default function TraineeMetricsLatest({ metrics }: Props) {
  const date = dateUtil.formatDateForPreview(metrics?.date);
  delete metrics?.id;
  delete metrics?.date;
  return metrics ? (
    <ul>
      {Object.entries(metrics).map(([key, value]) => (
        <li key={key}>
          <span>{key}</span>
          <span>{value?.toString()}</span>
        </li>
      ))}
      <li>
        <span>Date</span>
        <span>{date}</span>
      </li>
    </ul>
  ) : (
    <div>No metrics</div>
  );
}
