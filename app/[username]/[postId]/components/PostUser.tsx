"use client";

import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import PostCard from "@/components/post/PostCard";
import Comment from "@/components/comment/CommentBody";
import { useStore } from "@/src/store";

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
