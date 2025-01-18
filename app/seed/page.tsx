import { seed } from "@/prisma/seed";
import React from "react";

export default async function Seed() {
  await seed();
  return <div>Seed</div>;
}
