import { User } from "@/types/user";
import axios from "axios";

type CheckSessionRequest = { success: boolean };

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
