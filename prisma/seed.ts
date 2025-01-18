/* eslint-disable @typescript-eslint/no-unused-vars */
import { signUp } from "@/services/server/auth.server.service";
import { TTraineeMetricsDto } from "@/types/trainee.type";
import { TUserCreateDto } from "@/types/user.type";
import * as fs from "fs";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";
import { AppError } from "@/utils/server/Error.util";

export async function seed() {
  try {
    console.info("Seeding start");
    const saltRounds = 10;

    await seedUsers();

    console.info("Seeding complete");
  } catch (error) {
    const err = AppError.create(`${error}`, 401, false);
    console.error(err);
  }
}

const FIRST_NAMES = [
  "John",
  "Doe",
  "Jane",
  "Smith",
  "Alice",
  "Wonderland",
  "Bob",
  "Marley",
  "Charlie",
  "Brown",
];

const LAST_NAMES = [
  "Johnson",
  "Doe",
  "Smith",
  "Wonderland",
  "Marley",
  "Brown",
  "White",
  "Black",
  "Green",
  "Blue",
];

const TRAININGS = [
  "Push-ups",
  "Squats",
  "Lunges",
  "Plank",
  "Dead-lifts",
  "Bench Press",
  "Pull-ups",
  "Bicep Curls",
  "Tricep Dips",
  "Shoulder Press",
  "Lateral Raises",
  "Mountain Climbers",
  "Jumping Jacks",
  "Russian Twists",
  "Bicycle Crunches",
  "Side Plank",
  "Hip Thrusts",
  "Leg Press",
  "Calf Raises",
  "Chest Fly",
  "Kettle-bell Swings",
  "Dumbbell Rows",
  "Hammer Curls",
  "Reverse Lunges",
  "Glute Bridges",
  "Box Jumps",
  "Medicine Ball Slams",
  "Wall Sit",
];

const TRAINER_ID = "a9fa7ea2-824f-49f4-b75a-8bcd9e33795d";

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const saveToJson = (data: unknown, fileName: string) => {
  fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
};
const loadFromJson = (fileName: string) => {
  const data = fs.readFileSync(fileName, "utf-8");
  return JSON.parse(data);
};

const seedUsers = async () => {
  console.info("Seeding users");
  const saltRounds = 10;
  for (let i = 0; i < FIRST_NAMES.length; i++) {
    const dto = createUser(FIRST_NAMES[i], LAST_NAMES[i]);
    const passwordHash = (await bcrypt.hash(
      dto.password!,
      saltRounds
    )) as string;

    delete dto?.password;

    const user = await prisma.user.create({
      data: { ...dto, passwordHash },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        imgUrl: true,
      },
    });
    console.log("user:", user);
  }
  console.info("Seeding users complete");
};
const generatePassword = (length: number): string => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
};

const generateRandomPhone = (): string => {
  return Math.floor(Math.random() * 1000000000).toString();
};

const createUser = (firstName: string, lastName: string): TUserCreateDto => {
  return {
    email: `${firstName}@${lastName}.com`.toLowerCase(),
    firstName,
    lastName,
    phone: generateRandomPhone(),
    password: generatePassword(24),
  };
};

const createMetrics = (): TTraineeMetricsDto => {
  return {
    weight: getRandomNumber(50, 100),
    height: getRandomNumber(150, 200),
    age: getRandomNumber(18, 60),
    heartRate: getRandomNumber(60, 100),
    bloodPressureSystole: getRandomNumber(100, 140),
    bloodPressureDiastole: getRandomNumber(60, 90),
  };
};

seed().then(() => {
  console.info("Seed complete");
  process.exit(0);
});
