"use client";
import css from "./page.module.css";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchBox from "../../../../../components/SearchBox/SearchBox";
import NoteList from "../../../../../components/NoteList/NoteList";
import Pagination from "../../../../../components/Pagination/Pagination";
import { fetchNotes } from "../../../../../lib/api/clientApi";
import Link from "next/link";

type Props = {
  initialTag?: string;
};

const NotesClient = ({ initialTag }: Props) => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 300);
  const tag = initialTag === "All" ? undefined : initialTag;
  const { data, isSuccess } = useQuery({
    queryKey: ["note", debouncedSearch, page, tag],
    queryFn: () => fetchNotes(debouncedSearch, page, tag),
    refetchOnMount: false,
    placeholderData: keepPreviousData,
  });

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch);
    setPage(1);
  };
  const totalPages = data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onSearch={handleSearch} value={search} />
        {isSuccess && data.notes.length === 0 && (
          <>
            <span> No Match found</span>
          </>
        )}
        {isSuccess && totalPages > 1 && (
          <Pagination totalPages={totalPages} page={page} onPage={setPage} />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </div>
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
};

export default NotesClient;
