import { createContext, useEffect, useState, type ReactNode } from "react";
import * as authApi from "@/apis/auth-api";
import type { AuthUser } from "@/apis/auth-api";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "@/utils/local-storage";

type AuthContextValue = {
  user: AuthUser | null;
  initialLoading: boolean;
  userLogin: (email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchMe = async () => {
    const { data } = await authApi.getMe();
    setUser(data.user);
    return data.user;
  };

  useEffect(() => {
    const init = async () => {
      try {
        if (getAccessToken()) {
          await fetchMe();
        }
      } catch {
        removeAccessToken();
      } finally {
        setInitialLoading(false);
      }
    };

    init();
  }, []);

  const userLogin = async (email: string, password: string) => {
    const { data } = await authApi.login({ email, password });
    setAccessToken(data.accessToken);
    return fetchMe();
  };

  const logout = () => {
    setUser(null);
    removeAccessToken();
  };

  return (
    <AuthContext.Provider value={{ user, initialLoading, userLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
