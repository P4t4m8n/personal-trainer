import SearchForm from "@/components/UI/Form/Search";
import { TTrainee } from "@/types/trainee.type";
import TraineePreview from "./TraineePreview";

interface Props {
  trainees: TTrainee[];
}
export default function TrainerTrainees({ trainees }: Props) {
  return (
    <div className="grid gap-8">
      <SearchForm items={SEARCH_ITEMS}></SearchForm>
      <ul className="flex flex-col gap-2 w-full">
        <li className="grid grid-cols-6 w-full items-center place-items-center border-b">
          <h3></h3>
          <h3>First Name</h3>
          <h3>Last Name</h3>
          <h3>Email</h3>
          <h3>Phone</h3>
          <h3>Actions</h3>
        </li>
        {trainees.map((trainee) => (
          <TraineePreview key={trainee.id} trainee={trainee} />
        ))}
      </ul>
    </div>
  );
}

const SEARCH_ITEMS: {
  name: string;
  placeHolder?: string;
  type?: string;
  divStyle?: string;
  id?: string;
  label?: string;
}[] = [
  {
    name: "firstName",
    placeHolder: "Search by first name",
    type: "text",
  },
  {
    name: "lastName",
    placeHolder: "Search by last name",
    type: "text",
  },
  {
    name: "email",
    placeHolder: "Search by email",
    type: "email",
  },
  {
    name: "phone",
    placeHolder: "Search by phone",
    type: "tel",
  },
];
