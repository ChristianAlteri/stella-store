"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { cn } from "@/lib/utils";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { BiHide } from "react-icons/bi";
import { CiBadgeDollar, CiCoinInsert } from "react-icons/ci";
import { Product, Gender } from "@/types";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

interface FullScreenFooterFilterProps {
  data: Product[] | undefined;
  womenswear: Gender | undefined;
  menswear: Gender | undefined;
  icon?: React.ReactNode;
}

const FullScreenFooterFilter: React.FC<FullScreenFooterFilterProps> = ({
  data,
  womenswear,
  menswear,
  icon,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = (valueKey: string, id: string | undefined) => {
    const current = qs.parse(searchParams.toString());
    const query = { ...current, [valueKey]: id };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      { url: window.location.href, query },
      { skipNull: true }
    );
    router.push(url);
  };

  const isLowToHighSelected = searchParams.get("sort") === "low-to-high";
  const isHighToLowSelected = searchParams.get("sort") === "high-to-low";
  const isOnSaleSelected = searchParams.get("isOnSale") === "true";
  const isCharitySelected = searchParams.get("isCharity") === "true";
  const isHiddenSelected = searchParams.get("isHidden") === "true";
  const isWomenswearSelected =
    womenswear && searchParams.get("genderId") === womenswear.id;
  const isMenswearSelected =
    menswear && searchParams.get("genderId") === menswear.id;

  return (
    <>
      <div className="flex flex-row justify-center items-center m-2 p-1 gap-2 w-full overflow-auto">
        <div className="flex flex-col justify-center gap-1 items-center text-center text-xs text-light-font hover:cursor-pointer hover:underline w-full">
          <div
            className={cn(
              isLowToHighSelected
                ? "underline text-black w-full flex justify-center items-center  text-xs rounded-md h-full p-1  transition-transform animate-pulse"
                : " text-light-font"
            )}
            onClick={() => handleClick("sort", "low-to-high")}
          >
            <div className="flex flex-col justify-center items-center">
              <FiArrowDown size={17} /> PRICE
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-1 items-center text-center text-xs  text-light-font hover:cursor-pointer hover:underline w-full">
          <div
            className={cn(
              isHighToLowSelected
                ? "underline text-black w-full flex justify-center items-center  text-xs rounded-md h-full p-1  transition-transform animate-pulse"
                : " text-light-font"
            )}
            onClick={() => handleClick("sort", "high-to-low")}
          >
            <div className="flex flex-col justify-center items-center">
              <FiArrowUp size={17} />
              PRICE
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-1 items-center text-center text-xs  text-light-font hover:cursor-pointer hover:underline w-full h-full p-1 rounded-md">
          <div
            className={cn(
              "w-full h-full flex flex-col justify-center items-center text-center text-xs hover:cursor-pointer hover:underline",
              isWomenswearSelected
                ? "underline text-black flex justify-center items-center  text-xs rounded-md h-full p-1  transition-transform animate-pulse"
                : "text-stone-700 text-xs h-full"
            )}
            onClick={() => {
              if (womenswear) {
                handleClick("genderId", womenswear?.id);
              }
            }}
          >
            {/* <BsGenderFemale size={20} /> */}
            {womenswear?.name.toUpperCase()}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-1 items-center text-center text-xs  text-light-font hover:cursor-pointer hover:underline w-full h-full p-1 rounded-md">
          <div
            className={cn(
              "w-full h-full flex flex-col justify-center items-center text-center text-xs hover:cursor-pointer hover:underline",
              isMenswearSelected
                ? "underline text-black flex justify-center items-center  text-xs rounded-md h-full p-1  transition-transform animate-pulse"
                : "text-stone-700 text-xs h-full"
            )}
            onClick={() => {
              if (menswear) {
                handleClick("genderId", menswear?.id);
              }
            }}
          >
            {/* <BsGenderMale size={20} /> */}
            {menswear?.name.toUpperCase()}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-1 items-center text-center text-xs  text-light-font hover:cursor-pointer hover:underline w-full h-full p-1 rounded-md">
          <div
            className={cn(
              isHiddenSelected
                ? "underline text-black w-full flex justify-center items-center  text-xs rounded-md h-full p-1  transition-transform animate-pulse"
                : " text-light-font flex flex-col justify-center items-center"
            )}
            onClick={() => handleClick("isHidden", "true")}
          >
            <div className="flex flex-col justify-center items-center ">
              {/* <BiHide size={20} /> */}
              UNRELEASED
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-1 items-center text-center text-xs  text-light-font hover:cursor-pointer hover:underline w-full">
          <div
            className={cn(
              isCharitySelected
                ? "underline text-black w-full flex justify-center items-center  text-xs rounded-md h-full p-1  transition-transform animate-pulse"
                : " text-light-font w-full flex flex-col justify-center items-center"
            )}
            onClick={() => handleClick("isCharity", "true")}
          >
            <div className="flex flex-col justify-center items-center text-green-500">
              {/* <CiBadgeDollar size={20} /> */}
              CHARITY
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-1 items-center text-center text-xs  text-light-font hover:cursor-pointer hover:underline w-full">
          <div
            className={cn(
              isOnSaleSelected
                ? "underline text-black w-full flex justify-center items-center  text-xs rounded-md h-full p-1  transition-transform animate-pulse"
                : " text-light-font w-full flex flex-col justify-center items-center"
            )}
            onClick={() => handleClick("isOnSale", "true")}
          >
            <div className="flex flex-col justify-center items-center text-red-500">
              {/* <CiCoinInsert size={20} /> */}
              SALE
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default FullScreenFooterFilter;
