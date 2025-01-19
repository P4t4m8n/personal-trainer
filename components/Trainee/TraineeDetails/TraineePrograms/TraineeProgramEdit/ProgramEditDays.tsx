import Input from "@/components/UI/Form/Input";
import Label from "@/components/UI/Form/Label";
import { DAYS_OF_WEEK } from "@/constant/consts";
import { DaysOfWeek } from "@prisma/client";

interface Props {
  days: DaysOfWeek[];
}
export default function ProgramEditDays({ days }: Props) {
  return (
    <ul className="flex flex-wrap gap-2 border rounded p-2">
      {DAYS_OF_WEEK.map((day) => (
        <li key={day}>
          <Label htmlFor={`day-${day}`}>{day}</Label>
          <Input
            type="checkbox"
            name={`days-${day}`}
            id={`day-${day}`}
            value={day}
            defaultChecked={days.includes(day)}
            className=" border-none"
          />
        </li>
      ))}
    </ul>
  );
}
