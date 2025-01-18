import TraineeDetailsIndex from "@/components/Trainee/TraineeDetails/TraineeDetailsIndex";
import { getTraineeById } from "@/services/server/trainee.server.service";
import { redirect } from "next/navigation";
import React from "react";

export default async function TrainerTraineeDetailsPage({
  params,
}: {
  params: Promise<{ traineeId: string }>;
}) {
  const { traineeId } = await params;
  if (!traineeId) {
    return redirect("/trainer/trainees");
  }
  const trainee = await getTraineeById(traineeId);
  console.log("trainee:", trainee);
  return <TraineeDetailsIndex trainee={trainee} />;
}
