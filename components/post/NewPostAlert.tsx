import React from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

export const NewPostAlert = () => {
  return (
    <div className="bg-[#FE2C55] absolute rounded-md w-full flex h-14 items-center justify-center gap-5 px-3 animate-toastIn inset-x-0 translate-x-0">
      <h1 className="font-semibold text-sm text-white">1 New post</h1>
      <BsFillArrowUpCircleFill size="20" color="white" />
    </div>
  );
};
