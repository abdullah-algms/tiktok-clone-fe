import { ButtonBack } from "@/components/button/Button";
import React from "react";

const DiscoverHeader = () => {
  return (
    <div className="flex w-full fixed bg-white items-center justify-between border-b py-2 px-3">
      <ButtonBack size="20" color="black" />
      <h2 className="font-semibold text-[18px]">Discover</h2>
      <span></span>
    </div>
  );
};

export default DiscoverHeader;
