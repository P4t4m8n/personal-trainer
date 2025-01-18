"use client";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Form/Input";
import { useUser } from "@/hooks/useUser";
import { createTrainee } from "@/services/server/trainee.server.service";
import { useActionState } from "react";
interface Props {
  userId: string;
}

export default function AddTraineeButton({ userId }: Props) {
  const { user } = useUser();
  const [, formAction, isPending] = useActionState(createTrainee, null);
  return (
    <form action={formAction}>
      <Input
        name="userId"
        type="hidden"
        defaultValue={userId}
        className="hidden"
        divStyle="hidden"
      />
      <Input
        name="trainerId"
        type="hidden"
        defaultValue={user?.trainer?.id}
        className="hidden"
        divStyle="hidden"
      />
      <Button
        styleMode="none"
        styleSize="none"
        className="border border-white p-2 rounded"
        disabled={isPending}
      >
        Add
      </Button>
    </form>
  );
}
