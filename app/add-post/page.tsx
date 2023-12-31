import React from "react";
import AddPostHeader from "./components/AddPostHeader";
import AddPostBody from "./components/AddPostBody";

const Page = () => {
  return (
    <section className="bg-white h-screen max-h-screen overflow-y-auto">
      <AddPostHeader />
      <AddPostBody />
    </section>
  );
};

export default Page;
