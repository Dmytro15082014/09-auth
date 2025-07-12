import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackQueryProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto-main",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Note Hub",
  description: "Created for you, manage your tasks and personal time.",
  openGraph: {
    title: "Note Hub",
    description: "Created for you, manage your tasks and personal time.",
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

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackQueryProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
