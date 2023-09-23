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
    <div>
      <PostUser post={postUser} />
    </div>
  );
};

export default Page;
