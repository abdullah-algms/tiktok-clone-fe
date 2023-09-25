import React from "react";
import SearchBody from "./components/SearchBody";
import { getAllUsers } from "@/utils/fetch";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";

const Page = async () => {
  const allUsers = await getAllUsers();
  const session = await getServerSession(nextAuthOptions);
  const userSession = session?.user;

  return (
    <section className="bg-white h-screen px-3 overflow-y-auto">
      <SearchBody users={allUsers} currentUser={userSession} />
    </section>
  );
};

export default Page;
