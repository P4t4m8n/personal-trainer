import TraineeMetricsIndex from "@/components/Trainee/TraineeDetails/TraineeMetrics/TraineeMetricsIndex";
import { getMetrics } from "@/services/server/metrics.server.service";

export default async function TraineeMetricsPage({
  params,
}: {
  params: Promise<{ traineeId: string }>;
}) {
  const { traineeId } = await params;

  const metrics = await getMetrics({ traineeId });

  return <TraineeMetricsIndex metricsProps={metrics} traineeId={traineeId} />;
}
