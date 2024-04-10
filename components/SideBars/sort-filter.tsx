import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import qs from "query-string";
import { cn } from "@/lib/utils";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

interface SortFilterProps {
  data: Product[] | undefined;
  valueKey: string;
}

const SortFilter: React.FC<SortFilterProps> = ({ data, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onClick = (id: string | undefined) => {
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

  return (
    <>
      <div className="justify-center items-center mb-4 grid grid-cols-2 gap-2 w-full">
        <div className="col-span-2 flex justify-center items-center mb-4">
        </div>
        <div className="flex flex-col justify-center gap-1 items-center text-center text-xs text-stone-500 hover:underline hover:cursor-pointer col-span-1 w-full">
          <p
            className={cn(
              isLowToHighSelected
                ? "bg-stella-green w-full flex justify-center items-center text-white text-xs rounded-md h-full p-1 scale-110 transition-transform animate-pulse"
                : "text-stone-500"
            )}
            onClick={() => onClick("low-to-high")}
          >
            <div className="flex flex-col justify-center items-center">
              <FiArrowDown size={20} /> Low to high
            </div>
          </p>
        </div>
        <div className="flex flex-col justify-center gap-1 items-center text-center text-xs text-stone-500 hover:underline hover:cursor-pointer col-span-1 w-full">
          <p
            className={cn(
              isHighToLowSelected
                ? "bg-stella-green w-full flex justify-center items-center text-white text-xs rounded-md h-full p-1 scale-110 transition-transform animate-pulse"
                : "text-stone-500"
            )}
            onClick={() => onClick("high-to-low")}
          >
            <div className="flex flex-col justify-center items-center">
              <FiArrowUp size={20} />High to low
            </div>
          </p>
        </div>
      </div>
    </>
  );
};

export default SortFilter;