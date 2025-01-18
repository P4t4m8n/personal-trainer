import TrainerSearchIndex from "@/components/Trainer/TrainerSearch/TrainerSearchIndex";
import { getUsers } from "@/services/server/user.server.service";
import { TUser, TUserFilter } from "@/types/user.type";
import React from "react";

//TODO add filter based on trainer
//TODO add middleware to check if the user is a trainer
//TODO add search params sanitation and validation
export default async function TrainerSearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    [key in keyof TUserFilter]: string | undefined;
  }>;
}) {
  const filter = await searchParams;
  let users: TUser[] = [];
  if (Object.keys(filter).length > 0) {
    filter.includeTrainees = filter?.includeTrainees;
    filter.includeTrainers = filter?.includeTrainers;
    users = await getUsers(filter as TUserFilter);
  }
  return <TrainerSearchIndex users={users} />;
}
