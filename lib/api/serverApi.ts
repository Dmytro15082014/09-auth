import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { FetchNotesResponse, paramsProps } from "./clientApi";

export interface NoteSearch {
  params: paramsProps;
  headers: { Cookie: string };
}

export async function checkServerSession() {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export async function getServerMe(): Promise<User> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function fetchNotes(
  search: string,
  page: number,
  tag?: string
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  const noteSearchParams: NoteSearch = {
    params: {
      search: search.trim(),
      page,
      perPage: 12,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  };
  if (tag) noteSearchParams.params.tag = tag;
  const { data } = await nextServer.get<FetchNotesResponse>(
    "/notes",
    noteSearchParams
  );
  return data;
}
