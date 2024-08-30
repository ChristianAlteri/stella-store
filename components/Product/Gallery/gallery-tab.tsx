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
    <Tab className="p-1 mb-2 mt-2">
      {({ selected }) => (
        <div className="w-2/3 h-2/3">
          <span className="h-2/3 w-2/3 inset-0">
            {image?.url?.match(/https:\/\/.*\.(video|mp4|MP4).*/) ? (
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
