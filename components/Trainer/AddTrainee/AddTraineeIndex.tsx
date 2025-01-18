import Button from "@/components/UI/Button";
import Input from "@/components/UI/Form/Input";
import { TUser } from "@/types/user.type";
import Form from "next/form";

interface Props {
  trainees?: TUser[];
}
export default function AddTraineeIndex({ trainees }: Props) {
  return (
    <div>
      <Form action="" className="flex items-center justify-center gap-2">
        <div className="grid grid-cols-2 gap-2">
          <Input name="firstName" placeholder="First name" />
          <Input name="lastName" placeholder="Last Name" />
          <Input name="email" placeholder="Email" />
          <Input name="phone" placeholder="Phone" />
        </div>
        <Button
          type="submit"
          styleMode="none"
          styleSize="none"
          className="border border-white p-2 rounded"
        >
          Search
        </Button>
      </Form>
    </div>
  );
}
