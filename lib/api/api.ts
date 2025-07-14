import { User } from "@/types/user";
import axios from "axios";

export type CheckSessionRequest = { success: boolean };
export type LoginRequest = {
  email: string;
  password: string;
};

const baseUrl = process.env.NEXT_PUBLIC_API_URL + "/api";

export const nextServer = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export async function checkSession() {
  const res = await nextServer.get<CheckSessionRequest>("/auth/session");
  return res.data.success;
}

export async function getMe() {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}

export async function login(data: LoginRequest) {
  const res = await nextServer.post<User>("/auth/login", data);
  return res.data;
}

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}
