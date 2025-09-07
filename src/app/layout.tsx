import type { Metadata } from "next";
import { Geist, Manrope } from "next/font/google";
import "./globals.css";

import { SessionWrapper } from './sessionWrapper'

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
})

export const metadata: Metadata = {
  title: "CodeNotes - Plataforma de Anotações para Programadores",
  description: "Organize seus estudos, anotações e exemplos práticos de programação em um só lugar",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "CodeNotes - Plataforma de Anotações para Programadores",
    description: "Organize seus estudos, anotações e exemplos práticos de programação em um só lugar",
    siteName: "CodeNotes",
    images: ["/capa.png"],
    locale: "pt-BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeNotes - Plataforma de Anotações para Programadores",
    description: "Organize seus estudos, anotações e exemplos práticos de programação em um só lugar",
    images: ["/capa.png"],
  },
  metadataBase: new URL("https://codenotes-wheat.vercel.app"),
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geist.variable} ${manrope.variable} antialiased`}
      >
        <SessionWrapper>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
