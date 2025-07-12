"use client";
import { useId, useState } from "react";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import type { NoteInput } from "../../types/note";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useNoteDraft } from "@/lib/store/noteStore";

const NoteSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title is too long")
    .required("Title is required"),
  content: Yup.string().max(500, "Content is too long"),
  tag: Yup.string().oneOf(
    ["Todo", "Work", "Personal", "Meeting", "Shopping"],
    "Invalid tag"
  ),
});

export default function NoteForm() {
  const fieldId = useId();
  const router = useRouter();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { draft, setDraft, clearDraft } = useNoteDraft();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (newNote: NoteInput) => createNote(newNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
      clearDraft();
      router.back();
    },
    onError: () => {
      toast.error("The Note didn`t create.. Try again!");
    },
  });

  const handleCancel = () => {
    router.back();
  };

  const handleChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setDraft({ ...draft, [name]: value });
    try {
      await (Yup.reach(NoteSchema, name) as Yup.AnySchema).validate(value);
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setErrors((prev) => ({ ...prev, [name]: error.message }));
      }
    }
  };

  const noteFormSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as NoteInput;
    const hasError = Object.values(errors).some((msg) => msg);
    const isEmpty = !draft.title && !draft.content;
    if (isEmpty || hasError) {
      toast.error("The Note didn`t create.. Try again!");
      return;
    }
    mutate(values);
  };

  return (
    <form className={css.form} action={noteFormSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input
          id={`${fieldId}-title`}
          type="text"
          name="title"
          className={css.input}
          defaultValue={draft.title}
          onChange={handleChange}
        />
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea
          id={`${fieldId}-content`}
          name="content"
          rows={8}
          className={css.textarea}
          defaultValue={draft.content}
          onChange={handleChange}
        />
        {errors.content && <span className={css.error}>{errors.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select
          id={`${fieldId}-tag`}
          name="tag"
          className={css.select}
          defaultValue={draft.tag}
          onChange={handleChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <span className={css.error}>{errors.tag}</span>}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          {isPending ? "Creating new note..." : "Create note"}
        </button>
      </div>
    </form>
  );
}
