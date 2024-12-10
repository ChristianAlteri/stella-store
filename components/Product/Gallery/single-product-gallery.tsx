"use client";

import { Tab } from "@headlessui/react";
import Image from "next/image";
import { Image as ImageType, Product } from "@/types";

import GalleryTab from "./gallery-tab";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
import getSingleProduct from "@/actions/get-single-product";

interface GalleryProps {
  productId: string;
}

const Gallery: React.FC<GalleryProps> = ({ productId }) => {
  const [productData, setProductData] = useState<Product | null>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await getSingleProduct(productId);
        setProductData(productData);
        setIsLoadingProducts(false);
      } catch (error) {
        console.error("Failed to fetch store data:", error);
        setIsLoadingProducts(false);
      }
    };

    fetchProductData();
  }, []);

  const images = productData?.images || [];

  return (
    <>
      {isLoadingProducts ? (
        <div className="h-full w-full justify-center items-center p-7">
          <h1 className="h-full w-full text-sm text-muted-foreground">
            Loading...
          </h1>
        </div>
      ) : (
        <Tab.Group as="div" className="flex flex-col-reverse ">
          <div className="w-full h-full gap-1 justify-center items-center">
            <Tab.List className="grid grid-cols-3 w-full justify-center items-center">
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
                  {image?.url?.match(/https:\/\/.*\.(video|mp4|MP4|mov).*/) ? (
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
                      width={350}
                      height={0}
                      loading="lazy"
                      className="rounded-md transition-opacity duration-200 ease-in-out"
                    />
                  )}
                </div>
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      )}
    </>
  );
};

export default Gallery;
