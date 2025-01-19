import TraineePersonalTrainingsList from "@/components/Trainee/TraineeDetails/TraineePersonalTrainings/TraineePersonalTrainingsList";
import { getPersonalTrainings } from "@/services/server/personalTraining.server.service";

export default async function TraineeTrainingsPage({
  params,
}: {
  params: Promise<{ traineeId: string }>;
}) {
  const { traineeId } = await params;

  const personalTrainings = await getPersonalTrainings({ traineeId });

  return <TraineePersonalTrainingsList personalTrainings={personalTrainings} />;
}
