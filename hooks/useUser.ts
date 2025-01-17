import { AuthContext } from "@/context/Auth.context";
import { useContext } from "react";

export function useUser() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
