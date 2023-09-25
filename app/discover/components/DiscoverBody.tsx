"use client";
import React from "react";
import { BsDot } from "@react-icons/all-files/bs/BsDot";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ButtonFollow from "@/components/button/ButtonFollow";

interface Props {
  users: User[] | undefined;
  currentUser:
    | {
        _id: string;
        accessToken: string;
        username: string;
        email: string;
        about: string;
        image: string;
        name: string;
      }
    | undefined;
}

const DiscoverBody = ({ users, currentUser }: Props) => {
  const router = useRouter();

  return (
    <div className="mb-32">
      <div className="flex flex-col gap-3 mt-16 px-3">
        {users?.map((user) =>
          user.username === currentUser?.username ? null : (
            <button onClick={() => router.push(`/${user.username}`)} key={user._id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src={user.profile.image} alt="profile-image" width={50} height={50} className="rounded-full object-fill w-12 h-12" />
                <div className="flex items-start flex-col">
                  <h2 className="font-semibold">{user.profile.name}</h2>

                  <div className="flex items-center gap-1">
                    <p className="text-xs text-[rgba(22,24,35,0.5)]">@{user.username},</p>
                    <p className="text-xs text-[rgba(22,24,35,0.5)]">
                      {user.total_followers} {user.total_followers <= 1 ? "follower" : "followers"}
                    </p>
                  </div>
                </div>
              </div>
              {user._id === currentUser?._id ? null : <ButtonFollow width={100} height={30} currentUser={currentUser} targetUser={user} />}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default DiscoverBody;
