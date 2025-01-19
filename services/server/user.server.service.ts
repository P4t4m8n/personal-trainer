"use server";

import { prisma } from "@/prisma/prisma";
import { TUser, TUserFilter } from "@/types/user.type";
import { AppError } from "@/utils/server/Error.util";
import { USER_SEARCH_SELECT, USER_TRAINEE_INFO_SELECT } from "./select";

export const getUserById = async (userId: string): Promise<TUser | null> => {
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
        firstName: firstName
          ? { startsWith: firstName, mode: "insensitive" }
          : undefined,
        lastName: lastName
          ? { startsWith: lastName, mode: "insensitive" }
          : undefined,
        email: email ? { contains: email } : undefined,
        phone: phone ? { startsWith: phone } : undefined,
        NOT: [
          ...(includeTrainees ? [{ trainee: { isNot: null } }] : []),
          ...(!includeTrainers ? [{ trainer: { isNot: null } }] : []),
        ],
      },
      select: {
        ...USER_TRAINEE_INFO_SELECT,
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
