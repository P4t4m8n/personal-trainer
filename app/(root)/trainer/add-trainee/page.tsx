import AddTraineeIndex from "@/components/Trainer/AddTrainee/AddTraineeIndex";
import { getUsers } from "@/services/server/user.server.service";
import { TUser, TUserFilter } from "@/types/user.type";
import React from "react";

export default async function AddTraineePage({
  searchParams,
}: {
  searchParams: Promise<{
    [key in keyof Omit<TUserFilter, "includeTrainers" | "includeTrainees">]:
      | string
      | undefined;
  }>;
}) {
  const filter = await searchParams;
  let trainees: TUser[] = [];
  if (Object.keys(filter).length > 0) {
    trainees = await getUsers(filter);
    console.log("trainees:", trainees)
  }
  return <AddTraineeIndex trainees={trainees} />;
}
