import { TUser } from "@/types/user.type";

interface Props {
  user?: TUser;
}
export default function TraineeInfo({ user }: Props) {
  return <div className="w-full h-full border p-2 rounded borer-white truncate">{JSON.stringify(user)}</div>;
}
