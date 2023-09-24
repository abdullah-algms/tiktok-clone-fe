import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextAuthProvider from "./Provider";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth/next";
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(nextAuthOptions);

  return (
    <html lang="en">
      <body className={`${inter.className} bg-black bg-blend-darken`}>
        <NextAuthProvider>
          <div className="h-fit fixed top-0 w-full">
            {children}
            {/* {session && <Navbar />} */}
            <Navbar />
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
