interface Props {
  info: React.ReactNode;
  metrics: React.ReactNode;
  programs: React.ReactNode;
  trainings: React.ReactNode;
}
export default function TrainerTraineeLayout({
  info,
  metrics,
  programs,
  trainings,
}: Props) {
  return (
    <div className="grid grid-cols-2 grid-rows-2 w-full h-nested gap-4 ">
      {info}
      {metrics}
      {trainings}
      {programs}
    </div>
  );
}
