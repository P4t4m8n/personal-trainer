import TraineeProgramsList from "@/components/Trainee/TraineeDetails/TraineePrograms/TraineeProgramsList";
import { getPrograms } from "@/services/server/program.server";

export default async function TraineeProgramsPage({
  params,
}: {
  params: Promise<{ traineeId: string }>;
}) {
  const { traineeId } = await params;

  const programs = await getPrograms({ traineeId });

  return <TraineeProgramsList programs={programs} />;
}
