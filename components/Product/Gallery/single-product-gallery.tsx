"use client";

import NextImage from "next/image";
import { Tab } from "@headlessui/react";

// import { Image } from "@/types";
import Image from "next/image";
import { Image as ImageType } from "@/types";

import GalleryTab from "./gallery-tab";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images = [] }) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse ">
      <div className="mt-6 w-full">
        <Tab.List className="grid grid-cols-4 gap-2">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className=" w-full ">
        {images.map((image) => (
          <Tab.Panel
            className="hover:cursor-pointer"
            key={image.id}
            onClick={() => window.open(`${image.url}`, "_blank")}
          >
            <div className="h-full w-full">
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
                  width={250}
                  height={0}
                  className="rounded-md transition-opacity duration-200 ease-in-out"
                />
              )}
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
