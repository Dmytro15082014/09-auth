import { User } from "@/types/user";
import { type Note, type NoteInput } from "../../types/note";
import { nextServer } from "./api";

export type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
  tag?: string;
};
export type paramsProps = {
  page: number;
  perPage: number;
  search: string;
  tag?: string;
};
export type RegisterRequest = {
  email: string;
  password: string;
};
export type CheckSessionRequest = {
  success: boolean;
};
export type LoginRequest = {
  email: string;
  password: string;
};
export type SetUserNameReq = { email: string; username: string };
const limit = 12;

export async function fetchNotes(
  search: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> {
  const params: paramsProps = {
    search: search.trim(),
    page,
    perPage: limit,
  };
  if (tag) params.tag = tag;
  const { data } = await nextServer.get<FetchNotesResponse>("notes/", {
    params,
  });
  return data;
}

export async function createNote(noteData: NoteInput): Promise<Note> {
  const { data } = await nextServer.post<Note>("/notes", noteData);
  return data;
}

export async function deleteNote(noteId: number): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
  return data;
}

export async function fetchNoteById(id: number): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}
export async function register(newUserData: RegisterRequest): Promise<User> {
  const { data } = await nextServer.post<User>("/auth/register", newUserData);
  return data;
}

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

export async function changeNameMe(newUserName: User): Promise<SetUserNameReq> {
  const { data } = await nextServer.patch<SetUserNameReq>(
    "/users/me",
    newUserName
  );
  return data;
}
