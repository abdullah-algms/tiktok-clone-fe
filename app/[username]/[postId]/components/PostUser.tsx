"use client";

import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import PostCard from "@/components/post/PostCard";

interface Props {
  post: Post;
}

const PostUser = ({ post }: Props) => {
  const [userPost, setUserPost] = useState<Post>(post);

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
    <div className="h-screen post-container relative grid grid-cols-1">
      <PostCard post={userPost} allPost={undefined} />
    </div>
  );
};

export default PostUser;
