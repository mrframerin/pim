import "./globals.css";

export const metadata = {
  title: "Build with Notion's Developer Platform - Notion",
  description: "Frontend-only recreation of Notion's developer platform page."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
