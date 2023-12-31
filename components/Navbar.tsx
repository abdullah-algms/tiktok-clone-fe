"use client";
import Link from "next/link";
import React from "react";
import { RiCompass3Fill } from "@react-icons/all-files/ri/RiCompass3Fill";
import { RiHome4Fill } from "@react-icons/all-files/ri/RiHome4Fill";
import { RiHome4Line } from "@react-icons/all-files/ri/RiHome4Line";
import { FiCompass } from "@react-icons/all-files/fi/FiCompass";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { PiChatCenteredTextBold, PiChatCenteredTextFill } from "react-icons/pi";
import { RxPerson } from "react-icons/rx";
import { useParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;
  const params = useParams();

  return pathName === "/add-post" || pathName === "/setting" || pathName === "/opening" || pathName === "/login" ? null : (
    <section className={`fixed bottom-0 left-0 flex w-full z-[100] justify-between px-4 py-2 shadow-lg ${pathName === "/" || pathName === `/${params?.username}/${params?.postId}` ? "bg-black text-white" : "bg-white"} `}>
      <Link className="flex flex-col items-center" href={"/"}>
        {pathName === "/" ? <RiHome4Fill size={24} color="white" /> : <RiHome4Line size={24} />}
        <span className="text-[10px]">Home</span>
      </Link>
      <Link className="flex flex-col items-center" href={"/discover"}>
        {pathName === "/discover" ? (
          <>
            <RiCompass3Fill size={24} />
            <span className="text-[10px] font-semibold">Discover</span>
          </>
        ) : (
          <>
            <FiCompass size={24} />
            <span className="text-[10px]">Discover</span>
          </>
        )}
      </Link>
      <Link href={"/add-post"} className="flex items-center">
        <BiSolidMessageSquareAdd size={24} />
      </Link>
      <Link className="flex flex-col items-center" href={"/inbox"}>
        {pathName === "/inbox" ? (
          <>
            <PiChatCenteredTextFill size={24} />
            <span className="text-[10px] font-semibold">Inbox</span>
          </>
        ) : (
          <>
            <PiChatCenteredTextBold size={24} />
            <span className="text-[10px]">Inbox</span>
          </>
        )}
      </Link>
      <Link className="flex flex-col items-center" href={`/${user?.username}`}>
        <RxPerson size={24} />
        <span className="text-[10px]">Profile</span>
      </Link>
    </section>
  );
};

export default Navbar;
