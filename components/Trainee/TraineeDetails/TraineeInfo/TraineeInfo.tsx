import { TUser } from "@/types/user.type";
import Image from "next/image";

interface Props {
  user?: TUser | null;
}
export default function TraineeInfo({ user }: Props) {
  //TODO handle user undefined
  const { firstName, lastName, email, phone } = user!;
  //TODO handle user without imgUrl
  const imgUrl =
    user?.imgUrl ||
    "https://res.cloudinary.com/dyzqa6uuu/image/upload/v1733829566/framer/avatar-default-svgrepo-com_dict7t.svg";
  return (
    <div className="w-full h-full border p-2 rounded borer-white flex items-center justify-center gap-8">
      <Image
        priority={true}
        src={imgUrl}
        alt="user image"
        width={144}
        height={144}
        className="h-36 aspect-square border rounded-full p-4"
      />
      <div>
        <h2 className="text-lg font-bold">
          {firstName} {lastName}
        </h2>
        <p className="text-sm">{email}</p>
        <p className="text-sm">{phone}</p>
      </div>
    </div>
  );
}
