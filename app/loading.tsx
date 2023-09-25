import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const loading = () => {
  return (
    <div className="flex min-h-screen h-screen items-center justify-center z-[100]  relative w-full">
      <div className="animate-spin text-slate-300">
        <AiOutlineLoading3Quarters size="50" />
      </div>
    </div>
  );
};

export default loading;
