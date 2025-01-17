import ItemList from "@/components/UI/ItemList";
import { TPersonalTraining } from "@/types/personal-training.type";
import TraineePersonalTrainingsPreview from "./TraineePersonalTrainingsPreview";

interface Props {
  personalTrainings: TPersonalTraining[];
}
export default function TraineePersonalTrainingsList({
  personalTrainings,
}: Props) {
  return (
    <ItemList
      listStyle="w-full h-full border p-2 rounded borer-white"
      items={personalTrainings}
      renderItem={(personalTrainings) => (
        <TraineePersonalTrainingsPreview personalTraining={personalTrainings} />
      )}
    />
  );
}
