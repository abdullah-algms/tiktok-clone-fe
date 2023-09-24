"use client";

import Image from "next/image";
import React, { useState } from "react";
import { BsPlusCircleFill } from "@react-icons/all-files/bs/BsPlusCircleFill";
import { BsPlayCircle } from "react-icons/bs";
import { AiFillCheckCircle } from "@react-icons/all-files/ai/AiFillCheckCircle";
import { CgBox } from "@react-icons/all-files/cg/CgBox";
import { RxPerson } from "react-icons/rx";
import { TbCloudUpload } from "react-icons/tb";
import { RiArrowRightSLine } from "@react-icons/all-files/ri/RiArrowRightSLine";
import { HiOutlineLocationMarker } from "@react-icons/all-files/hi/HiOutlineLocationMarker";
import { RiErrorWarningLine } from "@react-icons/all-files/ri/RiErrorWarningLine";
import { HiOutlinePlus } from "@react-icons/all-files/hi/HiOutlinePlus";
import { BiWorld } from "@react-icons/all-files/bi/BiWorld";
import { BiDotsHorizontal } from "@react-icons/all-files/bi/BiDotsHorizontal";
import { BiShare } from "@react-icons/all-files/bi/BiShare";
import { BsWhatsapp, BsMessenger, BsFacebook } from "react-icons/bs";
import { addPost } from "@/utils/fetch";
import { useSession } from "next-auth/react";
import { useStore } from "@/src/store";
import { useRouter } from "next/navigation";

const AddPostBody = () => {
  const [caption, setCaption] = useState<string>("");
  const [isChooseVideo, setIsChooseVideo] = useState<boolean>(false);
  const [videoPost, setVideoPost] = useState<string | null | File>("");
  const [thumbnail, setThummbnail] = useState<string | null | File>("");
  const [cover, setCover] = useState<ArrayBuffer | string | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const { setIsLoadingUpload, setThumbnail: setThumbnailCover, setIsUploadDone, setUploadMessage } = useStore();

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.size <= 10000000) {
      setIsChooseVideo(true);
      setVideoPost(file);
    } else {
      alert("Video size should not exceed 10MB, Select another video!");
      setIsChooseVideo(false);
      setVideoPost(null);
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThummbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCover(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!videoPost || !thumbnail) {
      alert("Video post and Cover are required!");
      return;
    }
    setIsLoadingUpload(true);
    setThumbnailCover(cover as string);
    router.push("/");

    try {
      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("location", "malang");
      formData.append("userId", user?._id as string);
      formData.append("thumbnail", thumbnail as string);
      formData.append("video", videoPost as string);

      const response = await addPost(formData);
      if (response.success) {
        setUploadMessage("Successfully uploaded your video!");
        setIsUploadDone(true);
        setIsLoadingUpload(false);
      }
    } catch (error) {
      setUploadMessage("Failed to upload!,Try again later");
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-between bg-white gap-44">
      <div>
        <div className="border px-3 py-4">
          <div className="flex justify-between">
            <textarea
              name="caption"
              id="caption"
              placeholder="Make content more informative by adding more detailed descriptions of up to 4000 characters."
              className="resize-none outline-none w-3/4 h-20 placeholder:text-sm"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
            <div className="w-[20%] bg-black h-24 rounded-md relative overflow-hidden">
              {cover ? <Image src={`${cover}`} width={100} height={120} alt="cover" className="object-cover w-full aspect-[9/16]" /> : null}
              <label htmlFor="video-post">
                {isChooseVideo ? (
                  <span>
                    <AiFillCheckCircle className="absolute bg-white rounded-full w-5 h-5 inset-y-0 my-auto inset-x-0 mx-auto" color="green" />
                  </span>
                ) : (
                  <span>
                    <BsPlusCircleFill className="absolute bg-white rounded-full w-5 h-5 inset-y-0 my-auto inset-x-0 mx-auto" color="#FE2C55" />
                  </span>
                )}
                <input type="file" accept=".mp4" name="video-post" id="video-post" className="hidden" onChange={handleVideoSelect} />
              </label>
              <label htmlFor="thumbnail-cover" className="absolute bottom-0 left-1">
                <span className="text-white text-[9px]">Choose cover</span>
                <input type="file" accept="image/*" name="thumbnail-cover" id="thumbnail-cover" className="hidden" onChange={handleChangeImage} />
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs bg-[rgba(22,24,35,0.12)] py-1 w-[75px] text-center rounded-md font-medium"># Tag</p>
            <p className="text-xs bg-[rgba(22,24,35,0.12)] py-1 w-[75px] text-center rounded-md font-medium">@ Mentions</p>
            <p className="text-xs bg-[rgba(22,24,35,0.12)] py-1 w-[75px] text-center rounded-md font-medium flex justify-center gap-1 items-center">
              <BsPlayCircle /> <span>Video</span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between px-3 mt-4">
          <div className="flex items-center gap-2">
            <RxPerson className="font-semibold" />
            <span className="font-medium text-sm">Tag others</span>
          </div>
          <RiArrowRightSLine size="25" />
        </div>
        <div className="flex items-center justify-between px-3 mt-4">
          <div className="flex items-center gap-2">
            <HiOutlineLocationMarker className="font-semibold" />
            <span className="font-medium text-sm flex items-center gap-1">
              <span>Location</span>
              <span>
                <RiErrorWarningLine size="13" color="#A4A4A4" />
              </span>
            </span>
          </div>
          <RiArrowRightSLine size="25" />
        </div>
        <div className="flex items-center gap-2 mt-2 px-3 text-[#A4A4A4]">
          <p className="text-xs bg-[rgba(22,24,35,0.12)] py-1 px-2 text-center rounded-md font-medium">Cilacap</p>
          <p className="text-xs bg-[rgba(22,24,35,0.12)] py-1 px-2 text-center rounded-md font-medium">KONOHA</p>
          <p className="text-xs bg-[rgba(22,24,35,0.12)] py-1 px-2 text-center rounded-md font-medium">Dimana-mana</p>
          <p className="text-xs bg-[rgba(22,24,35,0.12)] py-1 px-2 text-center rounded-md font-medium">Kab. Wakanda</p>
        </div>
        <div className="flex items-center justify-between px-3 mt-4 text-[#A4A4A4]">
          <div className="flex items-center gap-2">
            <HiOutlinePlus className="font-semibold" />
            <span className="font-medium text-sm">Add link</span>
          </div>
          <RiArrowRightSLine size="25" />
        </div>
        <div className="flex items-center justify-between px-3 mt-4">
          <div className="flex items-center gap-2">
            <BiWorld className="font-semibold" />
            <span className="font-medium text-sm">Everyone can see this post</span>
          </div>
          <RiArrowRightSLine size="25" />
        </div>
        <div className="flex justify-between items-start px-3 mt-4">
          <div className="flex items-start gap-2">
            <BiDotsHorizontal className="font-semibold" />
            <span className="font-medium text-sm flex flex-col">
              <span>More options</span>
              <span className="text-xs text-[#A4A4A4]">Tap to manage comments, Duet and stitch preferences</span>
            </span>
          </div>
          <RiArrowRightSLine size="25" />
        </div>
        <div className="flex justify-between items-center px-3 mt-4">
          <div className="flex items-start gap-2">
            <BiShare className="font-semibold scale-x-[-1]" />
            <span className="font-medium text-sm flex flex-col">
              <span>Share to</span>
              <span className="text-xs text-[#A4A4A4]">Other platforms</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full aspect-square w-7 bg-[rgba(22,24,35,0.12)] flex items-center justify-center">
              <BsWhatsapp color="#A4A4A4" />
            </div>
            <div className="rounded-full aspect-square w-7 bg-[rgba(22,24,35,0.12)] flex items-center justify-center">
              <BsMessenger color="#A4A4A4" />
            </div>
            <div className="rounded-full aspect-square w-7 bg-[rgba(22,24,35,0.12)] flex items-center justify-center">
              <BsFacebook color="#A4A4A4" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-3">
        <div className="flex items-center mb-2 gap-2">
          <input type="checkbox" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />
          <p className="text-sm font-medium">I agree to all privacy and policies</p>
        </div>
        <div className="flex gap-2 items-center ">
          <button className="w-1/2 bg-[rgba(22,24,35,0.12)] text-black py-2 rounded-md font-semibold flex items-center justify-center gap-2" type="button">
            <CgBox />
            <span>Draft</span>
          </button>
          <button disabled={!isChecked} className={`${isChecked ? "bg-opacity-100" : "bg-opacity-40"} w-1/2 text-white bg-[#FE2C55] py-2 rounded-md font-semibold flex items-center justify-center gap-2`} type="submit">
            <TbCloudUpload />
            <span>Posting</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddPostBody;
