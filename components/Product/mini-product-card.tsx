"use client";

import React, { useEffect, useState, useRef } from "react";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { CiSquareChevLeft, CiSquareChevRight } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Tooltip } from "@material-tailwind/react";
import ReactPlayer from "react-player";

interface MiniProductCardProps {
  data: Product[] | undefined;
  miniProductTitle?: string;
  miniProductRoute?: string;
}

const MiniProductCard: React.FC<MiniProductCardProps> = ({
  data,
  miniProductTitle,
  miniProductRoute,
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

  // click handlers
  const handleNext = () => {
    console.log("click", intervalIdRef.current);
    // Correctly increment the index for the next item
    const newIndex = (currentIndex + 1) % data!.length;
    setCurrentIndex(newIndex);
    setCurrentProduct(data![newIndex]); // Set the current product based on the new index
    // Stop the auto-cycling interval
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null; // Reset the interval reference
    }
  };
  const handlePrev = () => {
    // Calculate the previous index correctly
    const newIndex = currentIndex === 0 ? data!.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setCurrentProduct(data![newIndex]); // Set the current product based on the new index
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  const handleProductClick = () => {
    router.push(
      `/product/${currentProduct?.category?.id}/${currentProduct?.designer?.id}/${currentProduct?.id}/${currentProduct?.seller?.id}`
    );
  };

  return (
    <div className="flex flex-col">
      <div>
        <Link
          href={miniProductRoute || "/"}
          className="flex justify-center text-sm font-medium  transition-colors border shadow-md rounded-md p-1 hover:text-stone-900 hover:underline hover:cursor-pointer"
        >
          <Tooltip
            className="flex flex-row p-2 z-50 text-xs bg-transparent text-stone-600 "
            placement="top"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 55 },
            }}
            content={`Click to browse ${miniProductTitle} for a limited time`}
          >
            <p className="bg-light-background text-light-font">
              {miniProductTitle}
            </p>
          </Tooltip>
        </Link>
        <div className="flex flex-row w-full justify-between p-2 mt-2">
          <button onClick={handlePrev} className="flex shadow-sm ">
            <CiSquareChevLeft size={23} />
          </button>
          <button onClick={handleNext} className="flex shadow-sm ">
            <CiSquareChevRight size={23} />
          </button>
        </div>
        <div className="flex flex-col p-1" key={currentProduct.id}>
          <div
            onClick={handleProductClick}
            className="flex justify-center items-center hover:cursor-pointer"
          >
            <div className="relative">
              {currentProduct?.images[0]?.url?.match(/https:\/\/.*\.(video|mp4|MP4).*/)
              ? (
                <ReactPlayer
                  key={currentProduct?.images?.[0]?.id}
                  url={currentProduct?.images[0].url}
                  width={"100%"}
                  loop={true}
                  playing={true}
                  muted={true}
                  alt={`${currentProduct.name} from ${currentProduct.seller?.instagramHandle} by ${currentProduct.designer?.name} in size ${currentProduct.size?.name} for £${currentProduct.ourPrice} (RRP £${currentProduct.retailPrice})`}
                  className={`rounded-md transition-opacity duration-200 ease-in-out ${
                    currentProduct.isHidden ? "blur-xl" : ""
                  }`}
                />
              ) : (
                <div className="flex">
                  <Image
                    key={currentProduct?.images?.[0]?.id}
                    onClick={handleProductClick}
                    height={0}
                    width={120}
                    loading="lazy"
                    src={currentProduct!.images[0]!.url}
                    alt={`${currentProduct.name} from ${currentProduct.seller?.instagramHandle} by ${currentProduct.designer?.name} in size ${currentProduct.size?.name} for £${currentProduct.ourPrice} (RRP £${currentProduct.retailPrice})`}
                    className={`rounded-md transition-opacity duration-200 ease-in-out 
                      ${currentProduct.isHidden ? "blur-xl" : ""}`}
                  />
                </div>
              )}

              <div
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-300 "
                style={{ opacity }}
              >
                <div className="flex flex-col justify-center items-center m-5 ">
                  <a
                    href={`/designers/${currentProduct?.designer?.id}`}
                    className="text-xs hover:underline underline text-black hover:text-stone-700 bg-stone-200 bg-opacity-60"
                  >
                    {currentProduct.designer?.name.toUpperCase()}
                  </a>
                  <h3
                    onClick={handleProductClick}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniProductCard;


