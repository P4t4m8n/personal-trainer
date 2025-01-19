import TrainerTrainees from "@/components/Trainer/Trainees/TrainerTrainees";
import { getSessionUser } from "@/services/server/auth.server.service";
import { getTrainees } from "@/services/server/trainee.server.service";
import { TTraineeFilter } from "@/types/trainee.type";
import { redirect } from "next/navigation";
import React from "react";

export default async function TrainerTraineesPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key in keyof TTraineeFilter]: string | undefined;
  }>;
}) {
  const user = await getSessionUser();
  if (!user) {
    redirect("/signin");
  }

  const filter = await searchParams;
  const fixedFilter: TTraineeFilter = {
    ...filter,
    trainerId: user?.trainer?.id,
    skip: +(filter?.skip || 0),
    take: +(filter?.take || 10),
  };

  const trainees = await getTrainees(fixedFilter);

  return <TrainerTrainees trainees={trainees} />;
}
