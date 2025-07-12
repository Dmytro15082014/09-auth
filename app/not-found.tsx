import Link from "next/link";
import React from "react";
import css from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
  description: "This Page not found",
  openGraph: {
    title: "Not Found",
    description: "This Page not found",
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

const PageNotFound = () => {
  return (
    <div className={css.notfound}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href={"/"} className={css.backBtn}>
        ← Go back
      </Link>
    </div>
  );
};

export default PageNotFound;
