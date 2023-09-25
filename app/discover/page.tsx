import React from "react";
import { getAllUsers } from "@/utils/fetch";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import DiscoverBody from "./components/DiscoverBody";
import DiscoverHeader from "./components/DiscoverHeader";

const Page = async () => {
  const allUsers = await getAllUsers();
  const session = await getServerSession(nextAuthOptions);
  const userSession = session?.user;

  return (
    <section className="bg-white h-screen  overflow-y-auto">
      <DiscoverHeader />
      <DiscoverBody users={allUsers} currentUser={userSession} />
    </section>
  );
};

export default Page;
