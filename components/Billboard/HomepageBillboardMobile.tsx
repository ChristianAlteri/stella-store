"use client";

import { Billboard } from "@/types";
import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";


interface HomepageBillboardMobileProps {
  data: Billboard | Billboard[] | null; 
}

const HomepageBillboardMobile: React.FC<HomepageBillboardMobileProps> = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (!data) {
    return (
      <div className="w-full h-full justify-center items-center text-center text-3xl">
        <p>Please add a Mobile screen Billboard via your back end</p>
      </div>
    );
  }

    // Normalise data to always be an array
    const normalizedData = Array.isArray(data) ? data : [data];

  return (
    <>
      {normalizedData?.map((billboard, index) => (
        billboard?.imageUrl.match(/https:\/\/.*\.(video|mp4|MP4|mov).*/) ? (
          <div
            key={index}
            className="flex w-full justify-center items-center"
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
          >
            <video
              muted
              autoPlay
              loop
              src={`${billboard?.imageUrl}`}
              className="flex justify-center items-center overflow-hidden bg-cover"
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            ></video>
          </div>
        ) : (
          <div key={billboard?.id} style={{ width: "100%", height: "100%", overflow: "hidden" }}>
          <Image
            key={billboard?.id}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            width={1920}
            height={1080}
            src={billboard?.imageUrl}
            alt={`Image of ${billboard.name} })`}
            priority
            className={``}
          />
          </div>
        )
      ))}
    </>
  );
};

export default HomepageBillboardMobile;

