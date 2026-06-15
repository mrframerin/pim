import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Build with Notion's Developer Platform - Notion",
  description:
    "A frontend-only Next.js implementation of the Notion Developer Platform page."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
