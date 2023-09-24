"use client";
import React from "react";
import ActiveTab from "./ActiveTab";
import Post from "./Post";
import { useStore } from "@/src/store";
import LikedPost from "./LikedPost";

interface Props {
  posts: Post[] | undefined;
  user: User | undefined;
}

const ProfilePost = ({ posts, user }: Props) => {
  const { activeTab } = useStore();

  return (
    <div className="transform transition-all duration-500 ease-linear pb-32">
      <ActiveTab />
      {activeTab === "post" ? <Post posts={posts} /> : <LikedPost user={user} />}
    </div>
  );
};

export default ProfilePost;
