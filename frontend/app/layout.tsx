import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

import { auth } from "@/lib/auth";
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Companion",
  description: "Real-time AI Conversation Platform For Students And Developers",
};


import { Providers } from "@/components/providers/SessionProvider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${bricolage.variable}`}>
        <Providers session={session}>
          <Navbar session={session} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
