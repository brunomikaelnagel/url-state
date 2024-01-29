import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "URL State",
  description: "Este é um mini applicativo que aplica a questão do URL State, que seria armazenar informações na url e utilizar do useSearchParams para ocasionar mudanças. Fiz um exemplo com filtros em uma tabela.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
