import React from "react";
import SettingHeader from "./component/SettingHeader";
import SettingBody from "./component/SettingBody";

const Page = () => {
  return (
    <section className="bg-white min-h-screen h-screen overflow-y-auto">
      <SettingHeader />
      <SettingBody />
    </section>
  );
};

export default Page;
