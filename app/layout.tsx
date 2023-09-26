import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextAuthProvider from "./Provider";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth/next";
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tiktok Clone",
  description: "Tiktok clone by mnuralim",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(nextAuthOptions);

  return (
    <html lang="en">
      <body className={`${inter.className} bg-black`}>
        <NextAuthProvider>
          <div className="h-fit fixed overflow-hidden top-0 w-full">
            <Suspense fallback={<Loading />}>{children}</Suspense>
            {session && <Navbar />}
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
