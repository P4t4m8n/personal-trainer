import { seed } from "@/prisma/seed";
import React from "react";

export default async function Seed() {
  await seed();
console.log("seed")
  return <div>Seed</div>;
}
