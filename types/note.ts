export type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};

export type NoteInput = {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
};
