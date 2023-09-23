"use client";
import { useStore } from "@/src/store";
import React from "react";
import { CgMenuGridO } from "@react-icons/all-files/cg/CgMenuGridO";
import { RiHeartAddLine } from "@react-icons/all-files/ri/RiHeartAddLine";

const ActiveTab = () => {
  const { activeTab, setActiveTab } = useStore();

  const handleSetActiveTab = (active: string) => {
    setActiveTab(active);
  };
  return (
    <div className="flex items-center justify-between border px-16 mt-3">
      <button onClick={() => handleSetActiveTab("post")} className={`border-b-2 border-b-black py-2 px-4 transform transition-all duration-200 ease-linear ${activeTab === "post" ? "border-opacity-100" : "border-opacity-0"}`}>
        <CgMenuGridO size={24} color={`${activeTab === "post" ? "black" : "rgba(22,24,35,0.5)"}`} />
      </button>
      <button onClick={() => handleSetActiveTab("like")} className={`border-b-2 border-b-black py-2 px-4 transform transition-all duration-200 ease-linear ${activeTab === "like" ? "border-opacity-100" : "border-opacity-0"}`}>
        <RiHeartAddLine size={24} color={`${activeTab === "like" ? "black" : "rgba(22,24,35,0.5)"}`} />
      </button>
    </div>
  );
};

export default ActiveTab;
