import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Navbar from "@/components/layout/Navbar"
import "./globals.css";
import NextAuthProvider from "@/providers/nextauth";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TheCompanionnion",
  description: "Real-time AI Platform For Students And Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable}`}> <Navbar />
        <NextAuthProvider>
        {children}</NextAuthProvider>
       
      </body>
    </html>
  );
}
