import { seed } from "@/prisma/seed";

export default async function Seed() {
  await seed();
  return <div>Seed</div>;
}
