"use client";

import React, { useEffect, useState, useRef } from "react";
import { Product } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ReactPlayer from "react-player";

interface MiniProductSellerCardProps {
  data: Product[] | undefined;
}

const MiniProductSellerCard: React.FC<MiniProductSellerCardProps> = ({
  data,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProduct, setCurrentProduct] = useState<Product>(data![0]);
  const [opacity, setOpacity] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [opacityIntervalId, setOpacityIntervalId] =
    useState<NodeJS.Timeout | null>(null);
  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // flick through products
  useEffect(() => {
    intervalIdRef.current = setInterval(() => {
      setCurrentIndex((currentIndex) => {
        const newIndex = (currentIndex + 1) % data!.length;
        setCurrentProduct(data![newIndex]);
        return newIndex;
      });
    }, 1000);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [data]);


  // fade in opacity of description
  useEffect(() => {
    const opacityInterval = setInterval(() => {
      setOpacity((prevOpacity) => (prevOpacity === 0 ? 1 : 0));
    }, 2500); // TODO: can we make this variable change with the length of data
    // Cleanup on unmount
    return () => clearInterval(opacityInterval);
  }, []);

  // cleanup function
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
      if (opacityIntervalId) {
        clearInterval(opacityIntervalId);
      }
    };
  }, [intervalId, opacityIntervalId, data]);


  // const handleProductClick = () => {
  //   router.push(
  //     `/product/${currentProduct?.category?.id}/${currentProduct?.designer?.id}/${currentProduct?.id}/${currentProduct?.seller?.id}`
  //   );
  // };

  return (
    <div className="flex flex-col w-full">

        <div className="flex flex-col p-1 justify-center items-center" key={currentProduct.id}>
          <div
            className="flex justify-center items-center hover:cursor-pointer"
          >
            <div className="relative">
              {currentProduct?.images[0]?.url?.match(/https:\/\/.*\.(video|mp4|MP4|mov).*/)
              ? (
                <ReactPlayer
                  key={currentProduct?.images?.[0]?.id}
                  url={currentProduct?.images[0].url}
                  width={1080}
                  height={1350}
                  loop={true}
                  playing={true}
                  muted={true}
                  alt={`${currentProduct.name} from ${currentProduct.seller?.instagramHandle} by ${currentProduct.designer?.name} in size ${currentProduct.size?.name} for £${currentProduct.ourPrice} (RRP £${currentProduct.retailPrice})`}
                  className={`rounded-md transition-opacity duration-200 ease-in-out ${
                    currentProduct.isHidden ? "blur-xl" : ""
                  }`}
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    borderRadius: "0.375rem",
                  }}
                />
              ) : (
                <div className="flex">
                  <Image
                    key={currentProduct?.images?.[0]?.id}
                    width={1080}
                    height={1350}
                    loading="lazy"
                    src={currentProduct!.images[0]!.url}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                      borderRadius: "0.375rem",
                    }}
                    alt={`${currentProduct.name} from ${currentProduct.seller?.instagramHandle} by ${currentProduct.designer?.name} in size ${currentProduct.size?.name} for £${currentProduct.ourPrice} (RRP £${currentProduct.retailPrice})`}
                    className={`rounded-md transition-opacity duration-200 ease-in-out flex justify-center items-center overflow-hidden bg-cover 
                      ${currentProduct.isHidden ? "blur-xl" : ""}`}
                  />
                </div>
              )}

              {/* <div
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 "
                style={{ opacity }}>
                <div className="flex flex-col justify-center items-center m-5 ">
                  <a
                    href={`/designers/${currentProduct?.designer?.id}`}
                    className="text-xs hover:underline underline text-black hover:text-stone-700 bg-stone-200 bg-opacity-60"
                  >
                    {currentProduct.designer?.name.toUpperCase()}
                  </a>
                  <h3
                    className="text-xs hover:underline text-black hover:text-stone-700 hover:cursor-pointer bg-stone-200 bg-opacity-60"
                  >
                    {currentProduct.name}
                  </h3>
                  <div className="text-xs text-white  bg-stone-200 bg-opacity-60">
                    {currentProduct?.size?.name}
                  </div>
                  <div className="flex flex-row gap-1 bg-stone-200 bg-opacity-60">
                    <h6 className="text-xs text-red-500">
                      £{currentProduct.ourPrice}
                    </h6>
                    <h6 className="text-xs text-stone-400">RRP</h6>
                    <h6 className="text-xs text-stone-800 line-through">
                      £{currentProduct.retailPrice}
                    </h6>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
    </div>
  );
};

export default MiniProductSellerCard;


