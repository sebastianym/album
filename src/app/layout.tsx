import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vantelina y Sebaseco",
  description: "Un album de fotos de Vantelina y Sebaseco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
