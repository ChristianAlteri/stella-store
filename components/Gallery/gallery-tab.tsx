import NextImage from "next/image";
import { Tab } from "@headlessui/react";

import { cn } from "@/lib/utils";
import { Image } from "@/types";

interface GalleryTabProps {
  image: Image;
    onClick?: () => void;
}

const GalleryTab: React.FC<GalleryTabProps> = ({
  image
}) => {
  return ( 
    <Tab
      className="rounded-md relative flex aspect-square cursor-pointer items-center justify-center bg-white"
    >
      {({ selected }) => (
        <div>
          <span className="absolute h-full w-full aspect-square inset-0 overflow-hidden ">
            <NextImage 
              fill 
              src={image.url} 
              alt={image.url} 
              className="object-cover object-center" 
            />
          </span>
        </div>
      )}
    </Tab>
  );
}
 
export default GalleryTab;