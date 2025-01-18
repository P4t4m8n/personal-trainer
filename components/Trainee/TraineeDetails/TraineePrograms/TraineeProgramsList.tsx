import ItemList from "@/components/UI/ItemList";
import { TProgram } from "@/types/program.type";
import TraineeProgramPreview from "./TraineeProgramPreview";

interface Props {
  programs: TProgram[];
}

export default function TraineeProgramsList({ programs }: Props) {
  return (
    <ItemList
      listStyle="w-full h-full border p-2 rounded borer-white"
      items={programs}
      renderItem={(programs) => <TraineeProgramPreview program={programs} />}
    />
  );
}
