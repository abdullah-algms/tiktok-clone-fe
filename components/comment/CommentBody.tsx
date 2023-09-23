"use client";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { getAllComments } from "@/utils/fetch";
import { useStore } from "@/src/store";
import Image from "next/image";
import { AiOutlineHeart } from "@react-icons/all-files/ai/AiOutlineHeart";
import DateConv from "@/utils/calculateTime";
import CommentBar from "./CommentBar";
import { parseToDate } from "@/utils/parseDate";
import Pusher from "pusher-js";

const Comment = () => {
  const [comments, setComments] = useState<Comments[]>([]);
  const { setShowComment, postIdComment, showComment } = useStore();
  const scrollDownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllComments(postIdComment);
      setComments(data as Comments[]);
    };
    fetchData();
  }, [postIdComment]);

  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_KEY as string, {
      cluster: "ap1",
    });
    const chanel = pusher.subscribe("comment");
    chanel.bind("commentPost", function (data: any) {
      const commentData: Comments = data.comment;
      setComments((prev) => [...prev, commentData]);
    });
    return () => {
      pusher.unsubscribe("comment");
    };
  }, []);

  useEffect(() => {
    const scrollDown = scrollDownRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  if (!showComment) return null;

  return (
    <div className="w-full h-2/3 absolute bottom-0 bg-white rounded-md z-[200] overflow-y-auto scrollbar-width-none">
      <div>
        <div className="flex items-center justify-between py-3 rounded-md px-3 fixed max-w-sm w-full bg-white top-1/3">
          <span></span>
          <h2 className="font-semibold">
            {comments.length} {comments.length <= 1 ? "comment" : "comments"}
          </h2>
          <button onClick={() => setShowComment(false)}>
            <AiOutlineClose />
          </button>
        </div>
        <div className="flex flex-col px-3 gap-5 mt-14 mb-20">
          {comments.map((comment) => (
            <div key={comment._id}>
              <div className="flex gap-2 items-start">
                <Image src={comment.user.profile.image} width={35} height={35} alt="profile" className="rounded-full object-fill w-[35px] h-[35px]" />
                <div className="w-full">
                  <h2 className="text-xs font-semibold text-[rgba(22,24,35,0.7)]">{comment.user.username}</h2>
                  <p>{comment.text}</p>
                  <div className="flex justify-between items-center mt-1">
                    <div className="flex gap-3 items-center text-[rgba(22,24,35,0.7)]">
                      <p className="text-xs">
                        <DateConv createdAt={parseToDate(comment.createdAt)} />
                      </p>
                      <p className="text-xs font-semibold ">Reply</p>
                    </div>
                    <div className="flex items-center gap-1 text-[rgba(22,24,35,0.7)]">
                      <button>
                        <AiOutlineHeart />
                      </button>
                      <p className="text-xs">{comment.total_like}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div ref={scrollDownRef}></div>
      </div>
      <CommentBar postId={postIdComment} />
    </div>
  );
};

export default Comment;
