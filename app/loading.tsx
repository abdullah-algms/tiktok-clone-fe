import { LoadingBar } from "@/components/Loading";
import React from "react";

const Loading = () => {
  return (
    <div className="relative h-5 top-0  bg-black">
      <LoadingBar />
    </div>
  );
};

export default Loading;
