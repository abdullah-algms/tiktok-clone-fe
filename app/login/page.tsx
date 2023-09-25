import { ButtonLoginGithub, ButtonLoginGoogle } from "@/components/button/Button";
import React from "react";
import { AiOutlineClose, AiOutlineQuestionCircle } from "react-icons/ai";

const Page = () => {
  return (
    <section className="flex flex-col justify-between h-screen px-4 py-4 bg-white overflow-y-scroll min-h-screen">
      <div>
        <div className="flex justify-between">
          <AiOutlineClose size={23} />
          <AiOutlineQuestionCircle size={25} />
        </div>
        <div className="text-center px-3">
          <h1 className="text-2xl font-bold">Sign up for TikTok</h1>
          <p className="text-[rgba(22,24,35,0.5)]">Create a profile, follow other accounts, make your own videos, and more.</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 px-3">
        <ButtonLoginGoogle />
        <ButtonLoginGithub />
      </div>
      <div>
        <p className="text-[rgba(22,24,35,0.5)] text-xs text-center">
          By continuing, you agree to TikTok’s <span className="font-semibold text-black">Terms of Service</span> and confirm that you have read TikTok’s <span className="font-semibold text-black">Privacy Policy</span>.
        </p>
      </div>
    </section>
  );
};

export default Page;
