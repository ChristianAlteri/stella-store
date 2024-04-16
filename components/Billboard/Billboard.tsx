"use client";
import { Billboard } from "@/types";
import React from "react";
import { useEffect, useState } from "react";


interface BillboardProps {
  data: Billboard;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!data || !data.imageUrl) {
    return <div>Sorry, no billboard working.</div>;
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6 rounded-xl overflow-hidden justify-center items-center">
      {data?.imageUrl.match(/https:\/\/.*\/image.*/) && (
        <img
          style={{
            width: "120vh",
            height: "60vh",
            backgroundSize: "cover",
            backgroundImage: `url(${data?.imageUrl})`,
          }}
          className="flex justify-center items-center rounded-xl relative aspect-square overflow-hidden bg-cover"
        ></img>
      )}
      {/* Cloudinary use /video in the url */}
      {data?.imageUrl.match(/https:\/\/.*\/video.*/) && (
        <div className="flex w-full h-full">
          <video
            muted
            autoPlay
            loop
            src={`${data?.imageUrl}`}
            className="flex justify-center items-center rounded-xl overflow-hidden bg-cover"
          ></video>
        </div>
      )}
    </div>
  );
};

export default Billboard;