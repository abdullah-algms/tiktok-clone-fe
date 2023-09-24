"use client";

import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import PostCard from "@/components/post/PostCard";
import Comment from "@/components/comment/CommentBody";
import { useStore } from "@/src/store";
import { ButtonBack } from "@/components/button/Button";
import { BiSearch } from "@react-icons/all-files/bi/BiSearch";
import Link from "next/link";

interface Props {
  post: Post;
}

const PostUser = ({ post }: Props) => {
  const [userPost, setUserPost] = useState<Post>(post);
  const { showComment } = useStore();

  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_KEY as string, {
      cluster: "ap1",
    });
    const chanel = pusher.subscribe("post");
    chanel.bind("likePost", function (data: any) {
      const postData: Post = data.singlePost;
      setUserPost(postData);
    });
    return () => {
      pusher.unsubscribe("post");
    };
  }, []);

  return (
    <div className="h-screen max-h-screen post-container">
      <div className="absolute z-50 w-full flex items-center gap-1 px-3 top-2">
        <ButtonBack color="white" size="25" />
        <Link href={"/search"} className="w-full border rounded-md py-2 border-r-white flex items-center justify-between px-2 text-sm text-white font-semibold">
          <div className="flex items-center gap-1">
            <BiSearch />
            <p>Find related content</p>
          </div>
          <p>Search</p>
        </Link>
      </div>
      {showComment ? (
        <div className="fixed w-full h-screen z-[200] bg-black bg-opacity-60">
          <Comment />
        </div>
      ) : null}
      <PostCard post={userPost} allPost={undefined} />
    </div>
  );
};

export default PostUser;
