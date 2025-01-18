import { prisma } from "@/prisma/prisma";
import {
  TPersonalTraining,
  TPersonalTrainingFilter,
} from "@/types/personal-training.type";
import { AppError } from "@/utils/server/Error.util";

export const getPersonalTrainings = async (
  filter: TPersonalTrainingFilter
): Promise<TPersonalTraining[]> => {
  try {
    const personalTrainings = await prisma.personalTraining.findMany({
      where: {
        traineeId: filter.traineeId,
      },
    });
    return personalTrainings;
  } catch (error) {
    throw AppError.create(`${error}`, 401, false);
  }
};
