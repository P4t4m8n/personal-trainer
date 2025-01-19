import LinkCmp from "@/components/UI/Link";
import { TTrainee } from "@/types/trainee.type";
import Image from "next/image";

interface Props {
  trainee: TTrainee;
}
export default function TraineePreview({ trainee }: Props) {
  const imgUrl = trainee.user?.imgUrl
    ? trainee.user?.imgUrl
    : process.env.DEFAULT_IMAGE!;
  return (
    <li className="grid grid-cols-6 w-full items-center place-items-center text-white">
      <Image src={imgUrl} alt="User Image" width={36} height={36} />
      <p>{trainee.user?.firstName}</p>
      <p>{trainee.user?.lastName}</p>
      <p>{trainee.user?.phone}</p>
      <p>{trainee.user?.email}</p>
      <div>
        <LinkCmp
          styleMode="none"
          styleSize="none"
          className="border rounded p-2"
          href={`/trainer/trainees/${trainee.id}`}
        >
          Details
        </LinkCmp>
      </div>
    </li>
  );
}
