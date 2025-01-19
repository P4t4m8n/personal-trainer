import TraineeProgramsIndex from "@/components/Trainee/TraineeDetails/TraineePrograms/TraineeProgramsIndex";
import { getPrograms } from "@/services/server/program.server";

export default async function TraineeProgramsPage({
  params,
}: {
  params: Promise<{ traineeId: string }>;
}) {
  const { traineeId } = await params;

  const programs = await getPrograms({ traineeId });

  return <TraineeProgramsIndex programs={programs} />;
}
