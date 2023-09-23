import Image from "next/image";
import React from "react";

interface Props {
  thumbnail: string;
}

const LoadingIndicator = ({ thumbnail }: Props) => {
  return (
    <div className="relative w-10 h-14 rounded overflow-hidden">
      <Image src={thumbnail} width={200} height={300} alt="loading-post" className="object-fill w-full h-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="loading-container">
          <div className="loader"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
