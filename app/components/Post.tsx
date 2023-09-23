"use client";

import React, { useEffect, useState } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useStore } from "@/src/store";
import PostMessageAlert from "@/components/post/PostMessageAlert";
import Pusher from "pusher-js";
import { parseToDate } from "@/utils/parseDate";
import PostCard from "@/components/post/PostCard";

interface Props {
  posts: Post[];
}

const Post = ({ posts }: Props) => {
  const { thumbnail, isLoadingUpload, isUploadDone, uploadMessage, setIsUploadDone } = useStore();
  const [allPost, setAllPosts] = useState<Post[]>(posts);

  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_KEY as string, {
      cluster: "ap1",
    });
    const chanel = pusher.subscribe("post");
    chanel.bind("newPost", function (data: any) {
      const postData: Post = data.post;
      setAllPosts((prev) => [...prev, postData]);
    });
    return () => {
      pusher.unsubscribe("post");
    };
  }, []);

  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_KEY as string, {
      cluster: "ap1",
    });
    const chanel = pusher.subscribe("post");
    chanel.bind("likePost", function (data: any) {
      const postData: Post[] = data.allPost;
      setAllPosts(postData);
    });
    return () => {
      pusher.unsubscribe("post");
    };
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isUploadDone) {
      intervalId = setInterval(() => {
        setIsUploadDone(false);
      }, 4000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isUploadDone]);

  allPost.sort((a, b) => parseToDate(b.createdAt).getTime() - parseToDate(a.createdAt).getTime());

  return (
    <div className="h-screen post-container relative grid grid-cols-1">
      {isLoadingUpload ? (
        <div className="absolute top-11 left-5 z-10">
          <LoadingIndicator thumbnail={thumbnail} />
        </div>
      ) : null}
      {isUploadDone ? (
        <div className="fixed left-[572px] top-0 z-50 w-full ">
          <PostMessageAlert message={uploadMessage} />
        </div>
      ) : null}
      {allPost.map((post) => (
        <div key={post._id}>
          <PostCard post={post} allPost={allPost} />
        </div>
      ))}
    </div>
  );
};

export default Post;
