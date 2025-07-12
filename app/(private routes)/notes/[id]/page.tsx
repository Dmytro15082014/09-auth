import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { title, content } = await fetchNoteById(Number(id));
  return {
    title,
    description: content.slice(0, 30),
    openGraph: {
      title,
      description: content.slice(0, 30),
      url: "https://08-zustand-m8zqgnqxp-dima-terens-projects.vercel.app",
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
}

const NoteItem = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(Number(id)),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteItem;
