"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (pathName === "/opening") {
      interval = setInterval(() => {
        router.push("/");
      }, 2000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [pathName, router]);
  return (
    <div className="min-h-screen h-screen overflow-y-auto flex items-center justify-center">
      <Image src={"/img/giphy.gif"} width={100} height={100} alt="logo" />
    </div>
  );
};

export default Page;
