import { defaultLocale, supportedLocales } from "@/i18n";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default function RootLayout({ children, params }: Props) {
  if (!supportedLocales.includes(params.locale)) {
    notFound();
  }

  return (
    <html lang={params.locale || defaultLocale}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}