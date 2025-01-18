import { TProgram } from "@/types/program.type";

interface Props {
  program: TProgram;
}

export default function TraineeProgramPreview({ program }: Props) {
  return <li>{program.name}</li>;
}
