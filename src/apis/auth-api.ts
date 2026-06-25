import axios from "../config/axios";
import type { RegisterPayload } from "../validators/validate-register";
import type { LoginPayload } from "../validators/validate-login";
import type { UserRole } from "../types/user";

export type RegisterResponse = {
  message: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type AuthUser = {
  id: number;
  email: string;
  role: UserRole;
};

export type GetMeResponse = {
  user: AuthUser;
};

export const register = (input: RegisterPayload) =>
  axios.post<RegisterResponse>("/auth/register", input);

export const login = (input: LoginPayload) =>
  axios.post<LoginResponse>("/auth/login", input);

export const getMe = () => axios.get<GetMeResponse>("/auth/me");
