'use client'

import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { cn } from "@/lib/utils";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { BiHide } from "react-icons/bi";
import { CiBadgeDollar, CiCoinInsert } from "react-icons/ci";
import { Product } from "@/types";

interface AllSortFiltersProps {
  data: Product[] | undefined;
}

const AllSortFilters: React.FC<AllSortFiltersProps> = ({ data }) => {
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
    console.log("url", url);
    router.push(url);
  };

  const isLowToHighSelected = searchParams.get("sort") === "low-to-high";
  const isHighToLowSelected = searchParams.get("sort") === "high-to-low";
  const isOnSaleSelected = searchParams.get("isOnSale") === "true";
  const isFeaturedSelected = searchParams.get("isFeatured") === "true";
  const isHiddenSelected = searchParams.get("isHidden") === "true";

  return (
    <>
      <div className="flex flex-row justify-center items-center m-2 p-1 gap-2 w-full overflow-auto">
        <div className="flex flex-col justify-center gap-1 items-center text-center text-xs text-stone-300  hover:cursor-pointer w-full">
          <div
            className={cn(
              isLowToHighSelected
                ? "bg-stella-green w-full flex justify-center items-center text-white text-xs rounded-md h-full p-1 scale-110 transition-transform animate-pulse"
                : "text-stone-300"
            )}
            onClick={() => handleClick("sort", "low-to-high")}
          >
            <div className="flex flex-col justify-center items-center">
              <FiArrowDown size={20} /> Price
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-1 items-center text-center text-xs text-stone-300 hover:underline hover:cursor-pointer w-full">
          <div
            className={cn(
              isHighToLowSelected
                ? "bg-stella-green w-full flex justify-center items-center text-white text-xs rounded-md h-full p-1 scale-110 transition-transform animate-pulse"
                : "text-stone-300"
            )}
            onClick={() => handleClick("sort", "high-to-low")}
          >
            <div className="flex flex-col justify-center items-center">
              <FiArrowUp size={20} />
              Price
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-1 items-center text-center text-xs text-stone-300 hover:cursor-pointer w-full">
          <div
            className={cn(
              isFeaturedSelected
                ? "bg-stella-green w-full flex justify-center items-center text-white text-xs rounded-md h-full p-1 scale-110 transition-transform animate-pulse"
                : "text-stone-300 w-full flex flex-col justify-center items-center"
            )}
            onClick={() => handleClick("isFeatured", "true")}
          >
            <div className="flex flex-col justify-center items-center">
              <CiBadgeDollar size={20} />
              OUR PICKS
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-1 items-center text-center text-xs text-stone-300 hover:cursor-pointer w-full">
          <div
            className={cn(
              isOnSaleSelected
                ? "bg-stella-green w-full flex justify-center items-center text-white text-xs rounded-md h-full p-1 scale-110 transition-transform animate-pulse"
                : "text-stone-300 w-full flex flex-col justify-center items-center"
            )}
            onClick={() => handleClick("isOnSale", "true")}
          >
            <div className="flex flex-col justify-center items-center text-red-500">
              <CiCoinInsert size={20} />
              Sale
            </div>
          </div>
        </div>
        
        {/* <div className="flex flex-col justify-center gap-1 items-center text-center text-xs text-stone-300 hover:cursor-pointer w-full h-full">
          <div
            className={cn(
              isHiddenSelected
                ? "bg-stella-green w-full flex justify-center items-center text-white text-xs rounded-md h-full p-1 scale-110 transition-transform animate-pulse"
                : "text-stone-300 flex flex-col justify-center items-center"
            )}
            onClick={() => handleClick("isHidden", "true")}
          >
            <div className="flex flex-col justify-center items-center">
              <BiHide size={20} />
              Unreleased
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default AllSortFilters;
