import { TUser } from "@/types/user.type";

import { apiClientService } from "./api.client.service";

const BASE_URL = "auth/";

const logout = async (): Promise<void> => {
  return await apiClientService.post(BASE_URL + "sign-out");
};

const getSession = async (): Promise<TUser | null> => {
  return await apiClientService.get<TUser | null>(BASE_URL + "session-user");
};

export const authClientService = {
  logout,
  getSession,
};
