import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Post from "./components/Post";
import { getAllPost } from "@/utils/fetch";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);
  const posts: Post[] = (await getAllPost()) as Post[];

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="relative">
      <Post posts={posts} />
    </main>
  );
}
