import { ButtonBack } from "@/components/button/Button";
import React from "react";

const SettingHeader = () => {
  return (
    <div className="flex w-full items-center justify-between border-b py-2 px-3">
      <ButtonBack size="20" color="black" />
      <h2 className="font-semibold text-[18px]">Privacy and settings</h2>
      <span></span>
    </div>
  );
};

export default SettingHeader;
