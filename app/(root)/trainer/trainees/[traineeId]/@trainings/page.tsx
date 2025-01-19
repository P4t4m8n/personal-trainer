import TraineePersonalTrainingsIndex from "@/components/Trainee/TraineeDetails/TraineePersonalTrainings/TraineePersonalTrainingsIndex";
import { getPersonalTrainings } from "@/services/server/personalTraining.server.service";

export default async function TraineeTrainingsPage({
  params,
}: {
  params: Promise<{ traineeId: string }>;
}) {
  const { traineeId } = await params;

  const personalTrainings = await getPersonalTrainings({ traineeId });

  return (
    <TraineePersonalTrainingsIndex personalTrainings={personalTrainings} />
  );
}
