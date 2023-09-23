import React from "react";

interface Props {
  message: string;
}
const PostMessageAlert = ({ message }: Props) => {
  return (
    <div className="bg-white rounded-md w-full flex h-14 flex-col justify-center px-3 animate-toastIn">
      <h1 className="font-semibold text-sm">{message}</h1>
      {message === "Successfully uploaded your video!" ? <p className="text-sm">it will appear on your feed soon</p> : null}
    </div>
  );
};

export default PostMessageAlert;
