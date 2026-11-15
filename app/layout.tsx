import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Módulo 2 · Unidade 1 | Vetorização e Embeddings para Busca Semântica",
  description:
    "Página didática de apoio aos alunos do Curso de Formação em IA Generativa — CucandoTI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
