"use client";
import { addComment } from "@/utils/fetch";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { BsArrowUpCircleFill } from "react-icons/bs";

interface Props {
  postId: string;
}

const CommentBar = ({ postId }: Props) => {
  const [comment, setComment] = useState<string>("");
  const { data: session } = useSession();
  const userSession = session?.user;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await addComment(userSession?._id as string, postId, comment);
      if (response.success) {
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex fixed items-center gap-3 w-full bottom-0 py-2 z-10 border-t px-3 bg-white">
      <Image src={userSession?.image as string} width={35} height={35} alt="profile" className="rounded-full object-fill w-[35px] h-[35px]" />
      <form onSubmit={handleSubmit} className="w-full relative">
        <input type="text" className="w-full bg-[#f1f1f1] outline-none py-2 rounded-xl pl-3 pr-8" placeholder="Add comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
        {comment.length ? (
          <button type="submit" className="bottom-3 right-2 absolute z-20">
            <BsArrowUpCircleFill size="18" color="#FE2C55" />
          </button>
        ) : null}
      </form>
    </div>
  );
};

export default CommentBar;
