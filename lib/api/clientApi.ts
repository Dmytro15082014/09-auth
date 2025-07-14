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
  search?: string;
  tag?: string;
};
export type RegisterRequest = {
  email: string;
  password: string;
};

const limit = 12;

// const headersToken = {
//   Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
//   Accept: "application/json",
// };

export async function fetchNotes(
  search: string,
  page: number,
  tag?: string | null
): Promise<FetchNotesResponse> {
  const params: paramsProps = {
    page,
    perPage: limit,
  };

  if (search.trim()) params.search = search;
  if (tag) params.tag = tag;

  const { data } = await nextServer.get<FetchNotesResponse>(`/notes`, {
    params,
    // headers: headersToken,
  });
  return data;
}

export async function createNote(noteData: NoteInput): Promise<Note> {
  const { data } = await nextServer.post<Note>("/notes", noteData, {
    // headers: headersToken,
  });
  return data;
}

export async function deleteNote(noteId: number): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`, {
    // headers: headersToken,
  });
  return data;
}

export async function fetchNoteById(id: number): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    // headers: headersToken,
  });
  return data;
}

export async function register(newUserData: RegisterRequest): Promise<User> {
  const { data } = await nextServer.post<User>("/auth/register", newUserData);
  return data;
}
