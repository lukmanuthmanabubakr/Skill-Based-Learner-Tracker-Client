import { api } from "../../lib/api";
import type { AuthResponse, LoginPayload, RegisterPayload } from "../../types/auth";


export async function registerService(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/api/auth/register", payload);
  return data;
}

export async function loginService(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/api/auth/login", payload);
  return data;
}
export async function getMeService() {
  const { data } = await api.get("/api/auth/users/me");
  return data;
}
