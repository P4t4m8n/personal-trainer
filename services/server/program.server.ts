import { prisma } from "@/prisma/prisma";
import { TProgram, TProgramFilter } from "@/types/program.type";
import { AppError } from "@/utils/server/Error.util";
import { programServerUtil } from "@/utils/server/program.server.util";

export const getPrograms = async (
  filter: TProgramFilter
): Promise<TProgram[]> => {
  try {
    const programs = await prisma.program.findMany({
      where: {
        traineeId: filter.traineeId,
      },
    });

    return programs.map((p) => ({
      ...p,
      startDate: p.startDate.toISOString(),
      endDate: p.endDate.toISOString(),
    }));
  } catch (error) {
    throw AppError.create(`${error}`, 401, false);
  }
};

export const saveProgram = async (formData: FormData): Promise<TProgram> => {
  try {
    const dto = programServerUtil.formDataToProgramDto(formData);
    const errors = programServerUtil.validateProgramCreateDto(dto);
    if (errors.length) {
      throw AppError.create(errors.join("\n"), 400, false);
    }

    if (dto.id) {
      const program = await prisma.program.update({
        where: {
          id: dto.id,
        },
        data: {
          ...dto,
        },
      });
      return program;
    }

    const program = await prisma.program.create({
      data: {
        ...dto,
        traineeId: dto.traineeId!,
        trainerId: dto.trainerId!,
        startDate: dto.startDate as Date,
        endDate: dto.endDate as Date,
        isActive: false,
      },
    });

    return program;
  } catch (error) {
    throw AppError.create(`${error}`, 401, false);
  }
};
