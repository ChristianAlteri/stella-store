"use client";

import { Billboard } from "@/types";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

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

  // console.log('bill',data.imageUrl);
  if (!data || !data.imageUrl) {
    return <div>Sorry, no billboard working.</div>; 
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6 rounded-xl overflow-hidden ">
      {data?.imageUrl.match(/https:\/\/.*\/image.*/) && (
        <img
          style={{
            width: "80vw",
            height: "60vh",
            backgroundSize: "cover",
            backgroundImage: `url(${data?.imageUrl})`,
          }}
          className="rounded-xl relative aspect-square overflow-hidden bg-cover"
        ></img>
      )}
      {/* Cloudinary use /video in the url */}
      {data?.imageUrl.match(/https:\/\/.*\/video.*/) && (
        <ReactPlayer
          url={data?.imageUrl}
          style={{ width: "100%", height: "100%" }}
          // controls
          loop={true}
          playing={true}
          muted={true}
        />
      )}
    </div>
  );
};

export default Billboard;
