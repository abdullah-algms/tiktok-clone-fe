"use client";
import React, { useEffect, useState } from "react";
import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import { BsDot } from "@react-icons/all-files/bs/BsDot";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonBack } from "@/components/button/Button";
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

const SearchBody = ({ users, currentUser }: Props) => {
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [historySearch, setHistorySearch] = useState<User[]>([]);
  const router = useRouter();

  const saveHistory = (user: User, username: string) => {
    const updateHistory = [user, ...historySearch];
    localStorage.setItem("historySearch", JSON.stringify(updateHistory));
    router.push(`/${username}`);
  };

  const handleDeleteHistory = (id: string) => {
    const filterHistorySearch = historySearch.filter((el) => el._id !== id);
    setHistorySearch(filterHistorySearch);
    localStorage.setItem("historySearch", JSON.stringify(filterHistorySearch));
  };

  useEffect(() => {
    const historySearch = localStorage.getItem("historySearch");
    if (historySearch) {
      setHistorySearch(JSON.parse(historySearch));
    }
  }, []);

  // const historyUserSearch = historySearch.slice(0, 5);
  const historyUserSearch = historySearch.filter((user, index, self) => index === self.findIndex((u) => u._id === user._id)).slice(0, 5);

  let searchUser: User[] | undefined;
  if (keyword) {
    searchUser = users?.filter((user) => user.username.toLowerCase().includes(keyword.toLowerCase())).slice(0, 10);
  }
  return (
    <div className="mb-32">
      <div className="flex justify-between items-center gap-3 fixed w-full bg-white top-0 py-3 px-3">
        <ButtonBack size="20" color="black" />
        <div className="relative w-full">
          <input className="w-full bg-[rgba(22,24,35,0.12)] py-1 rounded-md outline-none pl-8" type="text" placeholder="Search" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <FiSearch className="absolute top-2 left-2" />
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-16 px-3">
        {searchUser?.length ? (
          searchUser?.map((user) => (
            <button onClick={() => saveHistory(user, user.username)} key={user._id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image src={user.profile.image} alt="profile-image" width={50} height={50} className="rounded-full object-fill w-12 h-12" />
                <div className="flex items-start flex-col">
                  <h2 className="font-semibold">{user.username}</h2>
                  <p className="text-xs text-[rgba(22,24,35,0.5)]">{user.profile.name}</p>
                  <div className="flex items-center text-sm text-[rgba(22,24,35,0.5)]">
                    <p>{user.total_followers} followers</p>
                    <BsDot />
                    <p>{user.total_post} video</p>
                  </div>
                </div>
              </div>
              {user._id === currentUser?._id ? null : <ButtonFollow width={100} height={30} currentUser={currentUser} targetUser={user} />}
            </button>
          ))
        ) : keyword === "" || !keyword ? (
          historyUserSearch?.map((user) => (
            <div key={user._id} className="flex items-center justify-between">
              <Link href={`/${user.username}`} className="flex items-center gap-3">
                <Image src={user.profile.image} alt="profile-image" width={50} height={50} className="rounded-full object-fill w-12 h-12" />
                <div className="flex flex-col">
                  <h2 className="font-semibold">{user.username}</h2>
                  <p className="text-xs text-[rgba(22,24,35,0.5)]">{user.profile.name}</p>
                  <div className="flex items-center text-sm text-[rgba(22,24,35,0.5)]">
                    <p>{user.total_followers} followers</p>
                    <BsDot />
                    <p>{user.total_post} video</p>
                  </div>
                </div>
              </Link>
              <button onClick={() => handleDeleteHistory(user._id)}>
                <AiOutlineClose />
              </button>
            </div>
          ))
        ) : (
          <div>{`No results found for '${keyword}'`}</div>
        )}
      </div>
    </div>
  );
};

export default SearchBody;
