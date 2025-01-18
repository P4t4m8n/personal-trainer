import TraineeInfo from "@/components/Trainee/TraineeDetails/TraineeInfo/TraineeInfo";
import { getUserByTraineeId } from "@/services/server/user.server.service";
import React from "react";

export default async function TraineeInfoPage({
  params,
}: {
  params: Promise<{ traineeId: string }>;
}) {
  const { traineeId } = await params;

  const userInfo = await getUserByTraineeId(traineeId);

  return <TraineeInfo user={userInfo} />;
}
