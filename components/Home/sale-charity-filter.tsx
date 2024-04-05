"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { TfiMore } from "react-icons/tfi";
import { cn } from "@/lib/utils";

interface SaleCharityFilterProps {}

const SaleCharityFilter: React.FC<SaleCharityFilterProps> = ({}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  

  const toggleFilters = () => setFiltersOpen((prev) => !prev);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const onClick = (valueKey: string, id: string) => {
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
  const isOnSaleSelected = searchParams.get("isOnSale") === "true";
  const isCharitySelected = searchParams.get("isCharity") === "true";
  const isHiddenSelected = searchParams.get("isHidden") === "true";

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center">
        <div
          className="flex text-stone-600 hover:text-stone-900 hover:cursor-pointer"
          onClick={toggleFilters}
        >
          {/* <MdKeyboardArrowDown className="flex flex-row mt-2" size={20} /> */}
          <TfiMore className="flex flex-row mt-2" size={17} />
        </div>
        {filtersOpen && (
          <div className="flex flex-row w-full justify-center items-center gap-5 ">

          <div key="sale" className="flex flex-col justify-center items-center text-xs text-stone-500 hover:underline hover:cursor-pointer">
            <div className={cn(
              isOnSaleSelected ? "bg-green-200 w-full p-4 rounded-xl h-full font-bold text-black scale-110 transition-transform animate-pulse " : "text-stone-500"
            )} onClick={() => onClick("isOnSale", "true")}>
              Sale
            </div>
          </div>
          
          <div key="charity" className="flex flex-row justify-center items-center text-xs text-stone-500 hover:underline hover:cursor-pointer">
            <div className={cn(
              isCharitySelected ? "bg-green-200 w-full p-4 rounded-xl h-full font-bold text-black scale-110 transition-transform animate-pulse" : "text-stone-500"
            )} onClick={() => onClick("isCharity", "true")}>
              Charity
            </div>
          </div>
          <div key="hidden" className="flex flex-row justify-center items-center text-xs text-stone-500 hover:underline hover:cursor-pointer">
            <div className={cn(
              isHiddenSelected ? "bg-green-200 w-full p-4 rounded-xl h-full font-bold text-black scale-110 transition-transform animate-pulse" : "text-stone-500"
            )} onClick={() => onClick("isHidden", "true")}>
              Unreleased
            </div>
          </div>
        </div>
        )}
      </div>
    </>
  );
};

export default SaleCharityFilter;
