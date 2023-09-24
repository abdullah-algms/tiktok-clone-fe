"use client";

import React, { useEffect, useState } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useStore } from "@/src/store";
import PostMessageAlert from "@/components/post/PostMessageAlert";
import Pusher from "pusher-js";
import { parseToDate } from "@/utils/parseDate";
import PostCard from "@/components/post/PostCard";
import HeaderPost from "@/components/post/HeaderPost";
import Comment from "@/components/comment/CommentBody";

interface Props {
  posts: Post[];
}

const Post = ({ posts }: Props) => {
  const { thumbnail, isLoadingUpload, isUploadDone, uploadMessage, showComment, setIsUploadDone } = useStore();
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
    <div className="h-screen max-h-screen post-container relative">
      {isLoadingUpload ? (
        <div className="fixed top-11 left-5 z-10">
          <LoadingIndicator thumbnail={thumbnail} />
        </div>
      ) : null}
      {isUploadDone ? (
        <div className="fixed top-0 z-50 w-full ">
          <PostMessageAlert message={uploadMessage} />
        </div>
      ) : null}
      <div className="fixed top-2 z-10 inset-x-0 mx-auto">
        <HeaderPost />
      </div>
      {showComment ? (
        <div className="fixed w-full h-screen z-[200] bg-black bg-opacity-60">
          <Comment />
        </div>
      ) : null}
      {allPost.map((post, index) => (
        <div key={post._id} style={{ marginBottom: index === allPost.length - 1 ? "128px" : "0" }}>
          <PostCard post={post} allPost={allPost} />
        </div>
      ))}
    </div>
  );
};

export default Post;
