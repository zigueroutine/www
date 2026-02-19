import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zigueroutine — Pneus",
  description: "Venda de pneus em Portugal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}
