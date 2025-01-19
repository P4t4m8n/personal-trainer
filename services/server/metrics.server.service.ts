"use server";
import { prisma } from "@/prisma/prisma";
import { TTraineeMetrics, TTraineeMetricsFilter } from "@/types/trainee.type";
import { AppError } from "@/utils/server/Error.util";
import { metricsServerUtil } from "@/utils/server/metrics.server.util";
import { validateMetricsDto } from "@/validation/server/metrics.server.validation";

export const getMetricsById = async (
  id: string
): Promise<TTraineeMetrics | null> => {
  try {
    const metric = await prisma.traineeMetrics.findFirstOrThrow({
      where: {
        OR: [
          {
            id: id,
          },
          {
            traineeId: id,
          },
        ],
      },
    });

    return metric;
  } catch (error) {
    throw AppError.create(`${error}`, 401, false);
  }
};

export const getMetrics = async (
  filter: TTraineeMetricsFilter
): Promise<TTraineeMetrics[]> => {
  try {
    const metrics = prisma.traineeMetrics.findMany({
      where: {
        traineeId: filter.traineeId,
      },
      omit: {
        traineeId: false,
      },
      orderBy: {
        date: "asc",
      },
      take: 5,
    });

    return metrics;
  } catch (error) {
    throw AppError.create(`${error}`, 401, false);
  }
};

export const saveMetrics = async (
  formData: FormData
): Promise<TTraineeMetrics> => {
  try {
    const metricsDto = metricsServerUtil.formDataToMetricsDto(formData);
    const errors = validateMetricsDto(metricsDto);

    if (errors.length) {
      throw AppError.create(errors.join(", "), 400, true);
    }

    if (metricsDto?.id) {
      const metric = await prisma.traineeMetrics.update({
        where: {
          id: metricsDto.id,
        },
        data: metricsDto,
      });
      return metric;
    }

    delete metricsDto.id;

    const metric = await prisma.traineeMetrics.create({
      data: { ...metricsDto, traineeId: metricsDto.traineeId! },
    });

    return metric;
  } catch (error) {
    throw AppError.create(`${error}`, 401, false);
  }
};
