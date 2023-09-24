"use client";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { BsGithub } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { MdArrowBackIosNew } from "react-icons/md";

export const ButtonLoginGoogle = () => {
  return (
    <button onClick={() => signIn("google", { callbackUrl: "/" })} className="w-full flex justify-between border py-2 px-2 rounded-lg">
      <Image src={"/img/google.png"} alt="google" width={25} height={25} />
      <span className="font-medium">Continue with Google</span>
      <span></span>
    </button>
  );
};

export const ButtonLoginGithub = () => {
  return (
    <button onClick={() => signIn("github", { callbackUrl: "/" })} className="w-full flex justify-between border py-2 px-2 rounded-lg">
      <BsGithub size={25} />
      <span className="font-medium">Continue with Github</span>
      <span></span>
    </button>
  );
};

export const ButtonBack = ({ color, size }: { color: string; size: string }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()}>
      <MdArrowBackIosNew color={color} size={size} />
    </button>
  );
};

export const ButtonLogout = () => {
  return <button onClick={() => signOut()}>Log out</button>;
};
