"use client";
import Image from "next/image";
import React from "react";
import { BsPlay } from "@react-icons/all-files/bs/BsPlay";
import { motion } from "framer-motion";
import { useStore } from "@/src/store";
import { variants2 } from "@/utils/motion";
import Link from "next/link";

interface Props {
  user: User | undefined;
}

const LikedPost = ({ user }: Props) => {
  const { activeTab } = useStore();

  return (
    <motion.div initial="hidden" animate={activeTab === "like" ? "visible" : "hidden"} variants={variants2} transition={{ duration: 0.3 }} className="grid grid-cols-3 gap-[1px]">
      {user?.liked_post.map((post) => (
        <Link href={`/${post.user_id.username}/${post._id}`} key={post._id} className="aspect-[9/12] relative">
          <Image src={post.thumbnail} width={200} height={300} className="w-full h-full object-cover" alt="post" />
          <div className="flex items-center text-white absolute bottom-1 left-1">
            <BsPlay size={20} />
            <span className="font-semibold text-sm">{post.total_view}</span>
          </div>
        </Link>
      ))}
    </motion.div>
  );
};

export default LikedPost;
