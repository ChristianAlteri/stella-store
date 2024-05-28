"use client";

import { Billboard } from "@/types";
import React from "react";
import { useEffect, useState } from "react";


interface HomepageBillboardProps {
  data: Billboard[];
}

const HomepageBillboard: React.FC<HomepageBillboardProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // console.log("data", data[0].imageUrl);

  return (
    <>
      {data?.map((billboard, index) => (
        <div
          key={index}
          className="flex w-full justify-center items-center"
          style={{ width: "100%", height: "50%", overflow: "hidden" }}
        >
          <video
            muted
            autoPlay
            loop
            src={`${billboard?.imageUrl}`}
            className="flex justify-center items-center rounded-xl overflow-hidden bg-cover"
          ></video>
        </div>
      ))}
    </>
  );
};

export default HomepageBillboard;

{
  /* <ReactPlayer
            url={billboard?.imageUrl}
            style={{ width: '100%', height: '100%' }}
            loop={true}
            playing={true}
            muted={true}
          /> */
}
