"use client";
import React, { useEffect, useRef, useState } from "react";
import PostAction from "./PostAction";
import PostDetail from "./PostDetail";
import { FaPlay } from "react-icons/fa";

interface Props {
  post: Post;
  allPost: Post[] | undefined;
}

const PostCard = ({ post, allPost }: Props) => {
  const playerRefs = useRef<{ [key: string]: HTMLVideoElement }>({});
  const [isVideoPlaying, setisVideoPlaying] = useState<{ [key: string]: boolean }>({});
  const [isVideoPlay, setIsVideoPlay] = useState<boolean>(false);

  const handleVideoClick = (postId: string) => {
    if (isVideoPlaying[postId]) {
      //@ts-ignore
      playerRefs[postId]?.pause();
      setisVideoPlaying({ ...isVideoPlaying, [postId]: false });
      setIsVideoPlay(false);
    } else {
      //@ts-ignore
      playerRefs[postId]?.play();
      setisVideoPlaying({ ...isVideoPlaying, [postId]: true });
      setIsVideoPlay(true);
    }
  };

  const handleVideoIntersection = (postId: string, entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      // Video is in the viewport, play it
      //@ts-ignore
      playerRefs[postId]?.play();
      setisVideoPlaying({ ...isVideoPlaying, [postId]: true });
      setIsVideoPlay(true);
    } else {
      // Video is out of the viewport, pause it
      //@ts-ignore
      playerRefs[postId]?.pause();
      setisVideoPlaying({ ...isVideoPlaying, [postId]: false });
      setIsVideoPlay(false);
    }
  };

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin around the viewport
      threshold: 0.5, // Trigger when at least 50% of the video is visible
    };

    const observers: IntersectionObserver[] = [];

    if (allPost) {
      allPost?.forEach((post) => {
        const postId = post._id;
        //@ts-ignore
        const videoElement = playerRefs[postId];

        if (videoElement) {
          const observer = new IntersectionObserver((entries) => handleVideoIntersection(postId, entries[0]), options);

          observer.observe(videoElement);
          observers.push(observer);
        }
      });
    }

    // Cleanup observers when the component unmounts
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [allPost]);

  return (
    <>
      <section className="h-[88vh] flex items-center overflow-hidden justify-center relative overflow-x-hidden">
        <video
          className="brightness-90  w-full h-auto object-fill"
          id={post._id}
          //@ts-ignore
          ref={(ref) => (playerRefs[post._id] = ref)}
          onClick={() => handleVideoClick(post._id)}
          loop
          preload="auto"
          playsInline
          src={post.post}
        />
        <div className="absolute right-[10px] z-10 bottom-[30px]">
          <PostAction isVideoPlaying={isVideoPlay} post={post} />
        </div>
        <div className="absolute bottom-[30px] left-3 z-10">
          <PostDetail isVideoPlaying={isVideoPlay} post={post} />
        </div>

        <div className="gradient-overlay"></div>
        {isVideoPlay ? null : (
          <div className="absolute inset-1/2 transform -translate-x-[20px] -translate-y-[40px] pointer-events-none">
            <FaPlay size="50" color="white" />
          </div>
        )}
      </section>
    </>
  );
};

export default PostCard;
