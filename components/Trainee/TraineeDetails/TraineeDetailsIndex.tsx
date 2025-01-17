import { TTrainee } from "@/types/trainee.type";
import TraineeInfo from "./TraineeInfo/TraineeInfo";
import TraineeMetricsIndex from "./TraineeMetrics/TraineeMetricsIndex";
import TraineePersonalTrainingsList from "./TraineePersonalTrainings/TraineePersonalTrainingsList";
import TraineeProgramsList from "./TraineePrograms/TraineeProgramsList";

interface Props {
  trainee: TTrainee;
}
export default function TraineeDetailsIndex({ trainee }: Props) {
  const { user, metrics, programs, trainings,id } = trainee;
  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full h-nested gap-4 ">
      <TraineeInfo user={user} />
      <TraineeMetricsIndex metricsProps={metrics} traineeId={id!} />
      <TraineePersonalTrainingsList personalTrainings={trainings || []} />
      <TraineeProgramsList programs={programs || []} />
    </div>
  );
}
