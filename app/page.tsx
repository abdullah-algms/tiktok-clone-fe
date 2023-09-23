import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Post from "./components/Post";
import { getAllComments, getAllPost } from "@/utils/fetch";
import Comment from "@/components/comment/CommentBody";
import { useStore } from "@/src/store";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);
  const posts: Post[] = (await getAllPost()) as Post[];

  // const postId = useStore.getState().postIdComment;
  // console.log({ postId });
  // const comments = await getAllComments(postId);

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="relative">
      <Post posts={posts} />
      {/* <Comment comment={comments} /> */}
    </main>
  );
}
