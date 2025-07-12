import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import NotePreview from "./NotePreview.client";

type Props = { params: Promise<{ id: string }> };

const NotePreviewData = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(Number(id)),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview />
    </HydrationBoundary>
  );
};

export default NotePreviewData;
