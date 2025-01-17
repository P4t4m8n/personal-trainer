import { TUserCreateDto } from "@/types/user.type";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import sanitizeHtml from "sanitize-html";

const formDataToUserDTO = (formData: FormData): TUserCreateDto => {
  const email = sanitizeHtml(formData.get("email")?.toString() || "");
  const password = sanitizeHtml(formData.get("password")?.toString() || "");
  const firstName = sanitizeHtml(formData.get("firstName")?.toString() || "");
  const lastName = sanitizeHtml(formData.get("lastName")?.toString() || "");
  const imgUrl = sanitizeHtml(formData.get("imgUrl")?.toString() || "");
  const googleId = sanitizeHtml(formData.get("googleId")?.toString() || "");
  const phone = formData.get("phone");
  const returnedData: TUserCreateDto = {
    email,
    password,
    firstName,
    lastName,
    imgUrl: imgUrl || "/imgs/avatarDefault.svg",
    googleId,
    phone: phone ? parseInt(sanitizeHtml(phone.toString())) : null,
  };

  return returnedData;
};

const getEmpty = (): TUserCreateDto => {
  return {
    email: "",
    firstName: "",
    lastName: "",
    phone: null,
  };
};

const decodeToken = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const { payload } = await jwtVerify(token, secret);

  return payload;
};

const createCookie = async (token: string) => {
  const _cookies = await cookies();
  _cookies.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
    maxAge: 24 * 60 * 60, // 24 hours
  });
};

const createJWT = async (userId: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret);
};

export const authServerService = {
  formDataToUserDTO,
  getEmpty,
  decodeToken,
  createCookie,
  createJWT,
};
