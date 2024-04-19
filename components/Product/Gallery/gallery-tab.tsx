"use client";

import Image from "next/image";
import { Image as ImageType } from "@/types";
import { Tab } from "@headlessui/react";
import ReactPlayer from "react-player";

interface GalleryTabProps {
  image: ImageType;
  onClick?: () => void;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab className="rounded-md relative flex aspect-square cursor-pointer items-center justify-center bg-white ">
      {({ selected }) => (
        <div>
          <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden ">
            {image?.url?.match(/https:\/\/.*\/video.*$|^.*\.mp4/) ? (
              <ReactPlayer
                key={image.id}
                url={image.url}
                width={"100%"}
                loop={true}
                playing={true}
                muted={true}
                alt={`Image from ${image.url}`}
                className="rounded-md transition-opacity duration-200 ease-in-out"
              />
            ) : (
              <Image
                key={image.id}
                src={image.url}
                alt={`Image from ${image.url}`}
                width={120}
                height={0}
                loading="lazy"
                className="rounded-md transition-opacity duration-200 ease-in-out"
              />
            )}
          </span>
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
