
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Providers } from "@/components/providers/SessionProvider";

import { auth } from "@/lib/auth";
const font = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Companion",
  description: "Real-time AI Conversation Platform For Students And Developers",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${font.variable}`}>

        <Providers session={session}>
          <Navbar session={session} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
