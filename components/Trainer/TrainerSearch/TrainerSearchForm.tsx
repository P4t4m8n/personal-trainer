import Button from "@/components/UI/Button";
import Input from "@/components/UI/Form/Input";
import Form from "next/form";
import React from "react";

export default function TrainerSearchForm() {
  return (
    <Form action="" className="flex items-center justify-center gap-2">
      <div className="grid grid-cols-2 gap-2">
        <Input name="firstName" placeholder="First name" />
        <Input name="lastName" placeholder="Last Name" />
        <Input name="email" placeholder="Email" />
        <Input name="phone" placeholder="Phone" />
        <Input
          name="includeTrainers"
          type="checkbox"
          divStyle="border border-white p-2 rounded flex"
        >
          Trainer
        </Input>
        <Input
          name="includeTrainees"
          type="checkbox"
          divStyle="border border-white p-2 rounded flex"
        >
          Trainee
        </Input>
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
  );
}
