import { TUser } from "@/types/user.type";

import { createContext } from "react";
interface AuthProvider {
  user: TUser | null;
  logout: () => Promise<void>;
  getCurrentUserNoRender: () => TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
}
export const AuthContext = createContext<AuthProvider | undefined>(undefined);
