import ProfileHeader from "./components/ProfileHeader";
import ProfileBody from "./components/ProfileBody";
import { getSingleUser, getUserPost } from "@/utils/fetch";
import ProfilePost from "./components/ProfilePost";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";

interface Params {
  params: {
    username: string;
  };
}

const Page = async ({ params }: Params) => {
  const responseUser = await getSingleUser(params.username);
  const user: User | undefined = responseUser;

  const responseUserPost = await getUserPost(params.username);

  const session = await getServerSession(nextAuthOptions);
  // if (!session) {
  //   redirect("/login");
  // }
  return (
    <section className="bg-white min-h-screen">
      <ProfileHeader user={user} />
      <ProfileBody user={user} />
      <ProfilePost posts={responseUserPost} user={user} />
    </section>
  );
};

export default Page;
