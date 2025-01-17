"use server";

import { prisma } from "@/prisma/prisma";
import { TUser } from "@/types/user.type";
import { AppError } from "@/utils/server/Error.util";

export const getUserById = async (userId: string): Promise<TUser | null> => {
  try {
    const user = prisma.user.findFirstOrThrow({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        trainer: {
          select: {
            id: true,
          },
        },
        trainee: {
          select: {
            id: true,
          },
        },
      },
    });

    return user;
  } catch (error) {
    throw AppError.create(`${error}`, 401, false);
  }
};
