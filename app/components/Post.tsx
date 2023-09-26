"use client";

import React, { useEffect, useRef, useState } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";
import { useStore } from "@/src/store";
import PostMessageAlert from "@/components/post/PostMessageAlert";
import Pusher from "pusher-js";
import { parseToDate } from "@/utils/parseDate";
import PostCard from "@/components/post/PostCard";
import HeaderPost from "@/components/post/HeaderPost";
import Comment from "@/components/comment/CommentBody";
import { LoadingBar } from "@/components/Loading";
import { NewPostAlert } from "@/components/post/NewPostAlert";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

interface Props {
  posts: Post[];
}

const Post = ({ posts }: Props) => {
  const { thumbnail, isLoadingUpload, isUploadDone, uploadMessage, showComment, setIsUploadDone } = useStore();
  const [showPopupNewPost, setShowPopupNewPost] = useState<boolean>(false);
  const [allPost, setAllPosts] = useState<Post[]>(posts);
  const topRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_KEY as string, {
      cluster: "ap1",
    });
    const chanel = pusher.subscribe("post");
    chanel.bind("newPost", function (data: any) {
      const postData: Post = data.post;
      setAllPosts((prev) => [...prev, postData]);
      setShowPopupNewPost(true);
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
      const postData: Post = data.singlePost;
      const postIndex = allPost.findIndex((el) => el._id === postData._id);
      const updatedData = [...allPost];
      updatedData[postIndex] = postData;
      setAllPosts(updatedData);
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

  const handleScrollTop = () => {
    const top = topRef.current?.scrollIntoView({ behavior: "smooth" });
    const interval = setInterval(() => {
      setShowPopupNewPost(false);
    }, 1000);
  };

  allPost.sort((a, b) => parseToDate(b.createdAt).getTime() - parseToDate(a.createdAt).getTime());

  return (
    <div className="h-screen max-h-screen post-container relative">
      {showPopupNewPost ? (
        <div className="fixed w-full z-[100]">
          <div className="relative">
            <button onClick={handleScrollTop} className="absolute w-full z-[100]">
              <NewPostAlert />
            </button>
            <button onClick={() => setShowPopupNewPost(false)} className="z-[101] absolute right-1 top-1 text-white">
              <AiOutlineClose />
            </button>
          </div>
        </div>
      ) : null}
      {isLoadingUpload ? (
        <div className="fixed -top-1 z-50 w-full">
          <LoadingBar />
        </div>
      ) : null}
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
      <div ref={topRef}></div>
      {allPost.map((post, index) => (
        <div key={post._id} style={{ marginBottom: index === allPost.length - 1 ? "128px" : "0" }}>
          <PostCard post={post} allPost={allPost} />
        </div>
      ))}
    </div>
  );
};

export default Post;
