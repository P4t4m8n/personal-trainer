"use server";

import { prisma } from "@/prisma/prisma";
import { TUser, TUserFilter } from "@/types/user.type";
import { AppError } from "@/utils/server/Error.util";

const USER_SEARCH_SELECT = {
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
};

const USER_TRAINEE_INFO_SELECT = {
  id: true,
  firstName: true,
  lastName: true,
  phone: true,
  email: true,
};

export const getUserById = async (
  userId: string,
): Promise<TUser | null> => {
  try {
    const user = prisma.user.findFirstOrThrow({
      where: {
        id: userId,
      },
      select: {
        ...USER_SEARCH_SELECT,
      },
    });

    return user;
  } catch (error) {
    throw AppError.create(`${error}`, 401, false);
  }
};

export const getUserByTraineeId = async (
  traineeId: string
): Promise<TUser | null> => {
  try {
    const user = prisma.user.findFirstOrThrow({
      where: {
        trainee: {
          id: traineeId,
        },
      },
      select: {
        ...USER_TRAINEE_INFO_SELECT,
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
        phone: phone ? { startsWith: phone } : undefined,
        NOT: [
          ...(includeTrainees ? [{ trainee: { isNot: null } }] : []),
          ...(!includeTrainers ? [{ trainer: { isNot: null } }] : []),
        ],
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
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
