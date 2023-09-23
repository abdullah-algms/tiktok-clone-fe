import Link from "next/link";
import React from "react";
import { AiOutlineMenu } from "@react-icons/all-files/ai/AiOutlineMenu";
import { LuSearch } from "react-icons/lu";

const HeaderPost = () => {
  return (
    <div className="w-full flex text-white items-center justify-between px-5">
      <AiOutlineMenu size="25" />
      <div className="flex items-center gap-4">
        <div className="text-[17px] font-semibold flex flex-col items-center gap-1">
          <span className="text-slate-300">Following</span>
          <span className="inline-block w-7 h-1 bg-transparent"></span>
        </div>
        <div className="text-[17px] font-semibold flex flex-col items-center gap-1">
          <div className="">For You</div>
          <div className="inline-block w-7 h-1 bg-white"></div>
        </div>
      </div>
      <Link href={"/search"}>
        <LuSearch size="25" />
      </Link>
    </div>
  );
};

export default HeaderPost;
