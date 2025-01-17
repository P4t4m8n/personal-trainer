"use client";

import { authClientService } from "@/services/client/auth.client.service";
import { TUser } from "@/types/user.type";
import { useState, ReactNode, useEffect, useRef, FC } from "react";
import { AuthContext } from "@/context/Auth.context";

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: FC<Props> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<TUser | null>(null);

  //Access the state value without causing a re-render
  const userRef = useRef<TUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authClientService.getSession();
        console.log("user:", user)
        setUser(user);
        userRef.current = user;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  const logout = async () => {
    try {
      await authClientService.logout();
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setUser(null);
      userRef.current = null;
    }
  };

  const getCurrentUserNoRender = () => userRef.current;

  return (
    <AuthContext.Provider
      value={{ user, logout, getCurrentUserNoRender, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
