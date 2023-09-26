import { LoadingBar } from "@/components/Loading";
import React from "react";

const Loading = () => {
  return (
    <div className="flex relative items-center justify-center top-0 z-[100] bg-black min-h-screen">
      <LoadingBar />
    </div>
  );
};

export default Loading;
