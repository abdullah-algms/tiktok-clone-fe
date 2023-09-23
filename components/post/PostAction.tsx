"use client";
import React from "react";
import { FaHeart } from "@react-icons/all-files/fa/FaHeart";
import { BsChatSquareDotsFill } from "@react-icons/all-files/bs/BsChatSquareDotsFill";
import { PiShareFatFill } from "react-icons/pi";
import Link from "next/link";
import Image from "next/image";
import { BsPlusCircleFill } from "@react-icons/all-files/bs/BsPlusCircleFill";
import { useSession } from "next-auth/react";
import { likePost } from "@/utils/fetch";
import { useStore } from "@/src/store";

interface Props {
  post: Post;
  isVideoPlaying: boolean;
}

const PostAction = ({ post, isVideoPlaying }: Props) => {
  const { data: session } = useSession();
  const currentUser = session?.user;
  const { setShowComment, setPostIdComment } = useStore();

  const alreadyLike = post.likes.find((id) => id === currentUser?._id);

  const handleLike = async () => {
    try {
      await likePost(post._id, currentUser?._id as string);
    } catch (error) {
      alert("Internal server error");
      console.log(error);
    }
  };

  const handleComment = async (id: string) => {
    console.log(id);
    setShowComment(true);
    setPostIdComment(id);
  };

  return (
    <div className="flex flex-col gap-5">
      <Link className="bg-white w-11 h-11 aspect-square rounded-full relative mb-1" href={`/${post.user_id.username}`}>
        <Image alt="profile" src={post.user_id.profile.image} width={100} height={100} className="object-contain p-[1px] rounded-full" />
        <BsPlusCircleFill className="absolute bg-white rounded-full w-5 h-5 -bottom-2 inset-x-0 mx-auto" color="#FE2C55" />
      </Link>
      <button onClick={handleLike} className="flex flex-col items-center cursor-pointer">
        <FaHeart size="28" color={`${alreadyLike ? "#FE2C55" : "white"}`} />
        <span className="text-white text-sm font-semibold">{post.total_likes}</span>
      </button>
      <div className="flex flex-col items-center">
        <button onClick={() => handleComment(post._id)}>
          <BsChatSquareDotsFill size="28" color="white" />
        </button>
        <span className="text-white text-sm font-semibold">{post.total_comments}</span>
      </div>
      <div className="flex flex-col items-center">
        <PiShareFatFill size="28" color="white" />
        <span className="text-white text-sm font-semibold">122</span>
      </div>
      <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
        <Image alt="profile" src={post.user_id.profile.image} width={28} height={28} className={`object-contain p-[1px] rounded-full shadow-2xl shadow-black ${isVideoPlaying ? "spin-profile" : ""}`} />
      </div>
    </div>
  );
};

export default PostAction;
