import TrainerNav from "@/components/Trainer/TrainerNav";

export default function trainerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TrainerNav />
      {children}
    </>
  );
}
