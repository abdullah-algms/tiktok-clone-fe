import Image from "next/image";
import React from "react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/pages/api/auth/[...nextauth]";
import ButtonFollow from "@/components/button/ButtonFollow";

interface Props {
  user: User | undefined;
}

const ProfileBody = async ({ user }: Props) => {
  const session = await getServerSession(nextAuthOptions);
  const userSession = session?.user;

  return (
    <div className="flex flex-col items-center gap-3 mt-14">
      <Image src={user?.profile.image as string} width={96} height={96} alt="profile" className="rounded-full" />
      <p className="font-semibold">@{user?.username}</p>
      <div className="flex justify-center items-center gap-10 w-full">
        <div className="flex flex-col items-center w-[63px]">
          <span className="font-bold">{user?.total_following}</span>
          <span className="text-sm text-[rgba(22,24,35,0.5)]">Following</span>
        </div>
        <div className="flex flex-col items-center w-[63px]">
          <span className="font-bold">{user?.total_followers}</span>
          <span className="text-sm text-[rgba(22,24,35,0.5)]">Followers</span>
        </div>
        <div className="flex flex-col items-center w-[63px]">
          <span className="font-bold">{user?.total_likes}</span>
          <span className="text-sm text-[rgba(22,24,35,0.5)]">Likes</span>
        </div>
      </div>
      {userSession?.username !== user?.username ? <ButtonFollow currentUser={userSession} targetUser={user as User} width={164} height={44} /> : null}
      <p className="text-sm font-medium">{user?.profile.bio}oke</p>
    </div>
  );
};

export default ProfileBody;
