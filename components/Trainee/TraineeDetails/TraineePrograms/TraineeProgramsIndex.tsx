import { TProgram } from "@/types/program.type";
import TraineeProgramsList from "./TraineeProgramsList";

interface Props {
  programs: TProgram[];
}
export default function TraineeProgramsIndex({ programs }: Props) {
  return (
    <div>
      <TraineeProgramsList programs={programs} />
    </div>
  );
}
