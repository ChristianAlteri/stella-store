"use client";

import NextImage from "next/image";
import { Tab } from "@headlessui/react";

import { Image } from "@/types";

import GalleryTab from "./gallery-tab";

interface GalleryProps {
  images: Image[];
}

const Gallery: React.FC<GalleryProps> = ({
  images = []
}) => {
    console.log("images", images);
  return ( 
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mt-6  w-full ">
        <Tab.List className="grid grid-cols-4 gap-2" >
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className=" w-full">
        {images.map((image) => (
          <Tab.Panel key={image.id}>
            <div className="h-full w-full">
              <NextImage
                height={300}
                width={300}
                src={image.url}
                alt="Image"

              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
 
export default Gallery;