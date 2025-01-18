import NavLinks from "@/components/UI/NavLinks";

export default function trainerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavLinks
        navStyle="flex w-full justify-center gap-8 h-12 items-center text-sm font-semibold mb-4"
        itemStyle="px-2 border items-center flex h-full rounded bg-black text-white  hover:bg-white hover:text-black transition-colors duration-300"
        navLinks={NAV_LINKS}
      />
      {children}
    </>
  );
}
const NAV_LINKS = [
  {
    href: "trainees",
    text: "Trainees",
  },
  {
    href: "training",
    text: "training",
  },
  {
    href: "trainees/create",
    text: "Create Trainee",
  },
  {
    href: "trainer/add-trainee",
    text: "Add Training",
  },
];
