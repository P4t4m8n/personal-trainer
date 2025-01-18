import { prisma } from "@/prisma/prisma";
import { TProgram, TProgramFilter } from "@/types/program.type";
import { AppError } from "@/utils/server/Error.util";

export const getPrograms = async (
  filter: TProgramFilter
): Promise<TProgram[]> => {
  try {
    const programs = await prisma.program.findMany({
      where: {
        traineeId: filter.traineeId,
      },
    });

    return programs;
  } catch (error) {
    throw AppError.create(`${error}`, 401, false);
  }
};
