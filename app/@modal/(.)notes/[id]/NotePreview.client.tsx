"use client";

import Modal from "@/components/Modal/Modal";
import useEscapeClose from "@/hooks/useEscapeClose";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import css from "../../../../components/NotePreview/NotePreview.module.css";

const NotePreview = () => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };
  useEscapeClose(handleClose);
  const { id } = useParams<{ id: string }>();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(String(id)),
    enabled: !!id,
    refetchOnMount: false,
  });
  if (isLoading) {
    return <p className={css.loader}>Loading, please wait...</p>;
  }
  if (error || !note) {
    return <p>Something went wrong.</p>;
  }
  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <div className={css.item}>
          <button className={css.backBtn} onClick={handleClose}>
            ← Back
          </button>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </div>
          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{note.createdAt}</p>
        </div>
      </div>
    </Modal>
  );
};

export default NotePreview;
