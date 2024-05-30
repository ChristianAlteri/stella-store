"use client";
import { Billboard } from "@/types";
import React from "react";
import { useEffect, useState } from "react";

interface ProfileBillboardProps {
  data: Billboard;
}

const ProfileBillboard: React.FC<ProfileBillboardProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  console.log("data", data);
  if (!data || !data.imageUrl) {
    return <div>Sorry, no Profilebillboard working.</div>;
  }

  return (
    <div className="rounded-full overflow-hidden flex justify-center items-center w-24 h-24 bg-gray-200">
      {data?.imageUrl.match(/https:\/\/.*\.(video|mp4|MP4|mov).*/) ? (
        <video
          muted
          autoPlay
          loop
          src={`${data?.imageUrl}`}
          className="rounded-full w-full h-full object-cover"
        ></video>
      ) : (
        <img
          src={`${data?.imageUrl}`}
          alt="Profile"
          className="rounded-full w-full h-full object-cover"
        />
      )}
    </div>
  );
};

export default ProfileBillboard;
