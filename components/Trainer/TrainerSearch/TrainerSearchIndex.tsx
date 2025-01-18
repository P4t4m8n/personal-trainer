import { TUser } from "@/types/user.type";
import TrainerSearchForm from "./TrainerSearchForm";
import TrainerSearchUsers from "./TrainerSearchUsers";

//TODO add dynamic component based on the search params (users.trainees, trainers, etc) for different actions
interface Props {
  users?: TUser[];
}
export default function TrainerSearchIndex({ users }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <TrainerSearchForm />
      <TrainerSearchUsers users={users || []} />
    </div>
  );
}
