import { fetchNotesServer } from "@/lib/api/serverApi";
import React from "react";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = { params: Promise<{ slug: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filter = slug?.[0] === "All" ? "" : slug?.[0];
  const tag = filter || "All notes";
  return {
    title: tag,
    description: `Note filtered by: ${tag}`,
    openGraph: {
      title: tag,
      description: `Note filtered by: ${tag}`,
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

const App = async ({ params }: Props) => {
  const { slug } = await params;
  const tag = slug?.[0] === "All" ? undefined : slug?.[0];

  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["note"],
    queryFn: () => fetchNotesServer("", 1, tag),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient initialTag={tag} />
      </HydrationBoundary>
    </>
  );
};

export default App;
