"use client";
import type { Billboard } from "@/types";
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

  console.log("data", data);
  if (!data || !data.imageUrl) {
    return <div>Sorry, no billboard working.</div>;
  }

  return (
    <div className="p-3 sm:p-4 lg:p-6 rounded-xl overflow-hidden justify-center items-center">
      {data?.imageUrl.match(/https:\/\/.*\.(video|mp4|MP4|mov).*/) ? (
        <div className="flex w-full h-full">
          <video
            muted
            autoPlay
            loop
            src={`${data?.imageUrl}`}
            className="flex justify-center items-center rounded-xl overflow-hidden bg-cover"
          ></video>
        </div>
      ) : (
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
    </div>
  );
};

export default Billboard;
