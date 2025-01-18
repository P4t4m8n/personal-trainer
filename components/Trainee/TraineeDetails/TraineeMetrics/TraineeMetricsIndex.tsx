"use client";
import { TTraineeMetrics } from "@/types/trainee.type";
import TraineeMetricsLatest from "./TraineeMetricsLatest";
import ItemList from "@/components/UI/ItemList";
import TraineeMetricsPreview from "./TraineeMetricsPreview";
import { useState } from "react";
import TraineeMetricsModel from "./TraineeMetricsModel";

interface Props {
  metricsProps?: TTraineeMetrics[];
  traineeId: string;
}

export default function TraineeMetricsIndex({
  metricsProps,
  traineeId,
}: Props) {
  const [metrics, setMetrics] = useState<TTraineeMetrics[]>(metricsProps || []);


  return (
    <div className="w-full h-full border p-2 rounded borer-white">
      <TraineeMetricsLatest metrics={metrics?.[0]} />
      <TraineeMetricsModel traineeId={traineeId} setMetrics={setMetrics} />
      <ItemList
        items={metrics?.slice(1) || []}
        renderItem={(metric) => <TraineeMetricsPreview metric={metric} />}
      />
    </div>
  );
}
