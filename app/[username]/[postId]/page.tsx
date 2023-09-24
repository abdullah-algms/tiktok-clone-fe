import { getSinglePost } from "@/utils/fetch";
import React from "react";
import PostUser from "./components/PostUser";

interface Params {
  params: {
    postId: string;
  };
}

const Page = async ({ params }: Params) => {
  const postUser = (await getSinglePost(params.postId)) as Post;

  return (
    <div className="h-screen">
      <PostUser post={postUser} />
    </div>
  );
};

export default Page;
