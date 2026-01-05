import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import NextAuthProvider from "@/providers/nextauth";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Companion",
  description: "Real-time AI Conversation Platform For Students And Developers",
};

import { auth } from "@/lib/auth";
import { VapiProvider } from "@/providers/vapi";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${bricolage.variable}`}>
        <Navbar session={session} />
        <VapiProvider>{children}</VapiProvider>
        {/* <NextAuthProvider>{children}</NextAuthProvider> */}
      </body>
    </html>
  );
}
