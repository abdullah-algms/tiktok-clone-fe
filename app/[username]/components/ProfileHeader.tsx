"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { BsThreeDots } from "@react-icons/all-files/bs/BsThreeDots";
import { ButtonBack } from "@/components/button/Button";

interface Props {
  user: User | undefined;
}

const ProfileHeader = ({ user }: Props) => {
  const { data: session } = useSession();
  const userSession = session?.user;
  return (
    <div className="flex justify-between items-center border py-2 px-3 fixed w-full z-[100] bg-white">
      <div className="px-[12px]"></div>
      <h2 className="font-semibold text-[18px]">{user?.profile.name}</h2>
      <Link href={"/setting"}>
        <BsThreeDots size={23} />
      </Link>
    </div>
  );
};

export default ProfileHeader;
