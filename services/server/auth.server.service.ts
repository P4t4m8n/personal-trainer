"use server";

import { cookies } from "next/headers";

import bcrypt from "bcrypt";
import { prisma } from "@/prisma/prisma";

import { TUser } from "@/types/user.type";

import { authServerService } from "@/utils/server/auth.server.util";
import { AppError } from "@/utils/server/Error.util";

import { validateUserDto } from "@/validation/server/user.server.validation";

import { getUserById } from "./user.server.service";

export const signIn = async (
  _: unknown,
  formData: FormData
): Promise<TUser> => {
  try {
    const { email, password, googleId } =
      authServerService.formDataToUserDTO(formData);

    if (!email || (!password && !googleId)) {
      throw AppError.create("Missing credentials", 400, true);
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user?.email || !user?.id) {
      throw AppError.create("User not found", 404, true);
    }

    if (user.passwordHash && password) {
      const match = await bcrypt.compare(password, user.passwordHash);
      if (!match) {
        throw AppError.create("Invalid credentials", 401, true);
      }
    } else if (
      user?.googleIdHash &&
      googleId &&
      user.googleIdHash !== googleId
    ) {
      throw AppError.create("Invalid credentials", 401, true);
    }

    const token = await authServerService.createJWT(user.id);

    await authServerService.createCookie(token);
    const returnUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      imgUrl: user.imgUrl,
    };
    return returnUser;
  } catch (error) {
    throw error;
  }
};

export const signUp = async (
  _: unknown,
  formData: FormData
): Promise<TUser> => {
  const userData = authServerService.formDataToUserDTO(formData);
  const errors = validateUserDto(userData);

  if (errors.length) {
    const error = AppError.create(errors.join(", "), 400, true);
    throw error;
  }

  const saltRounds = 10;
  const { email, password, googleId } = userData;
  if (!email || (!password && !googleId)) {
    throw new Error("missing credentials");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }

  let passwordHash = null;
  let googleIdHash = null;

  if (password) {
    passwordHash = (await bcrypt.hash(password, saltRounds)) as string;
  } else if (googleId) {
    googleIdHash = (await bcrypt.hash(googleId, saltRounds)) as string;
  }
  delete userData?.password;
  delete userData?.googleId;

  const user = await prisma.user.create({
    data: { ...userData, passwordHash, googleIdHash },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      imgUrl: true,
    },
  });

  const token = await authServerService.createJWT(user.id);

  await authServerService.createCookie(token);

  return user;
};

export const signOut = async (): Promise<void> => {
  try {
    const _cookies = await cookies();

    _cookies.set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
      expires: new Date(0),
    });
  } catch (error) {
    throw AppError.create(`${error}`, 401, false);
  }
};

export const getSessionUser = async (): Promise<TUser | null> => {
  try {
    const token = (await cookies()).get("session")?.value;

    if (!token) {
      return null;
    }

    const payload = await authServerService.decodeToken(token);

    const user = await getUserById(payload.userId as string);

    return user;
  } catch (error) {
    AppError.create(`${error}`, 401, false);
    return null;
  }
};
