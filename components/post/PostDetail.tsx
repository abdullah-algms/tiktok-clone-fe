import Link from "next/link";
import React from "react";
import { HiMusicNote } from "react-icons/hi";

interface Props {
  post: Post;
  isVideoPlaying: boolean;
}
const PostDetail = ({ post, isVideoPlaying }: Props) => {
  return (
    <div className="text-white flex flex-col gap-1">
      <Link href={`/${post.user_id.username}`} className="font-semibold text-[17px]">
        {post.user_id.username}
      </Link>
      <p className="text-sm max-w-[80%]">{post.caption}</p>
      <div className="flex items-center gap-1">
        <HiMusicNote />
        <div className="marquee-container">
          <div className={`${isVideoPlaying ? "marquee-animate" : ""} text-sm font-medium`}>original sound- {post.user_id.username}</div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
