import { ButtonBack } from "@/components/button/Button";
import React from "react";

const AddPostHeader = () => {
  return (
    <div className="flex justify-between items-center py-2 px-3">
      <ButtonBack />
      <h2 className="font-semibold text-base">Posting</h2>
      <span></span>
    </div>
  );
};

export default AddPostHeader;
