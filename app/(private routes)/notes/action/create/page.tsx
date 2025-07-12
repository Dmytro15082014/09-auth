import NoteForm from "@/components/NoteForm/NoteForm";
import css from "../../../../components/CreateNote/CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note",
  description: "Creating a new Note",
  openGraph: {
    title: "Create Note",
    description: "Create your Notes on Note Hub",
    url: "https://08-zustand-m8zqgnqxp-dima-terens-projects.vercel.app/notes/action/create",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "logo NoteHub",
      },
    ],
  },
};

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
