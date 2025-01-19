"use server";
import { AppError } from "@/utils/server/Error.util";
import { getSessionUser } from "./auth.server.service";
import { prisma } from "@/prisma/prisma";
import { redirect } from "next/navigation";
import { TTrainee, TTraineeFilter } from "@/types/trainee.type";
import { USER_TRAINEE_INFO_SELECT } from "./select";

export const createTrainee = async (_: unknown, formData: FormData) => {
  //TODO build a master trainer and move credentials into env. this ID is temporary
  const masterTrainer = "f12614e1-98c9-4e54-97e0-0d58c331b450";
  //Redirect throw error so handled with string
  let redirectUrl = "";
  try {
    const userId = formData.get("userId");
    const trainerId = formData.get("trainerId");
    const user = await getSessionUser();

    if (!userId || !user?.id) {
      redirectUrl = "/signin";
      throw AppError.create("Missing credentials", 400, true);
    }

    if (user?.trainer?.id !== trainerId && user.id !== userId) {
      redirectUrl = "/signin";
      throw AppError.create("Unauthorized", 401, true);
    }

    const { id } = await prisma.trainee.create({
      data: {
        userId: userId as string,
        trainerId: trainerId ? (trainerId as string) : masterTrainer,
      },
      select: {
        id: true,
      },
    });

    redirectUrl = trainerId ? `/trainer/trainees/${id}` : `/trainee`;
  } catch (error) {
    if (!redirectUrl) {
      redirectUrl = "/error";
      AppError.create(`${error}`, 401, false);
    }
  }
  redirect(redirectUrl);
};

export const getTraineeById = async (traineeId: string): Promise<TTrainee> => {
  try {
    const user = await getSessionUser();
    if (!user || !user.trainer?.id) {
      throw AppError.create("Unauthorized", 401, true);
    }

    const trainee = await prisma.trainee.findUniqueOrThrow({
      relationLoadStrategy: "join",
      where: {
        trainerId: user.trainer.id,
        id: traineeId,
      },
      include: {
        user: {
          select: {
            ...USER_TRAINEE_INFO_SELECT,
          },
        },
        metrics: true,
        programs: true,
        trainings: true,
      },
    });

    return trainee;
  } catch (error) {
    throw AppError.create(`${error}`, 500, false);
  }
};

export const getTrainees = async (
  filter: TTraineeFilter
): Promise<TTrainee[]> => {
  const { email, firstName, lastName, phone } = filter;
  try {
    const trainees = await prisma.trainee.findMany({
      where: {
        trainerId: filter.trainerId,
        user: {
          firstName: firstName
            ? { startsWith: firstName, mode: "insensitive" }
            : undefined,
          lastName: lastName
            ? { startsWith: lastName, mode: "insensitive" }
            : undefined,
          email: email ? { contains: email, mode: "insensitive" } : undefined,
          phone: phone ? { startsWith: phone } : undefined,
        },
      },
      select: {
        id: true,
        user: {
          select: {
            ...USER_TRAINEE_INFO_SELECT,
          },
        },
      },
      skip: filter.skip || 0,
      take: filter.take || 100,
    });

    return trainees;
  } catch (error) {
    throw AppError.create(`${error}`, 500, false);
  }
};
