"use server";

import { prisma } from "@/prisma/prisma";
import { TUser, TUserFilter } from "@/types/user.type";
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

//Joining the trainer and/or trainee tables to give a visualization if the user is a trainee/trainer
export const getUsers = async (filter: TUserFilter): Promise<TUser[]> => {
  try {
    const {
      email,
      phone,
      firstName,
      lastName,
      includeTrainers = false,
      includeTrainees = true,
    } = filter;
    const users = await prisma.user.findMany({
      where: {
        firstName: firstName ? { startsWith: firstName } : undefined,
        lastName: lastName ? { startsWith: lastName } : undefined,
        email: email ? { contains: email } : undefined,
        phone: phone ? { equals: +phone } : undefined,
        ...(includeTrainees && !includeTrainers
          ? { trainee: { isNot: null } } // Only users with a trainee relation
          : includeTrainers && !includeTrainees
          ? { trainer: { isNot: null } } // Only users with a trainer relation
          : !includeTrainees && !includeTrainers
          ? { AND: [{ trainee: { is: null } }, { trainer: { is: null } }] } // Users with no relations
          : {}), // No additional filters if both are true
      },
      select: {
        firstName: true,
        lastName: true,
        trainee: {
          select: {
            id: true,
          },
        },
        trainer: {
          select: {
            id: true,
          },
        },
      },
    });

    return users;
  } catch (error) {
    throw AppError.create(`${error}`, 401, false);
  }
};
