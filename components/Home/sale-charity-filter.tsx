"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { CiSliderHorizontal } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
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

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center">
        <div
          className="flex text-stone-600 hover:text-stone-900 hover:cursor-pointer"
          onClick={toggleFilters}
        >
          <MdKeyboardArrowDown className="flex flex-row" size={20} />
        </div>
        {filtersOpen && (
          <div className="flex justify-center items-center text-center flex-row gap-9 w-full p-1">
            <br />

            <div key="sale" className="flex justify-center items-center flex-col w-full ">
              <div
                className={cn(
                    "w-full flex flex-row justify-center text-xs text-stone-500 hover:underline hover:cursor-pointer",
                    isOnSaleSelected ? " rounded-md underline text-stone-900" : "text-stone-500"
                  )}
                onClick={() => onClick("isOnSale", "true")}
              >
                Sale
              </div>
            </div>
            <div key="charity" className="flex justify-center items-center flex-col w-full ">
              <div
               className={cn(
                "w-full flex flex-row justify-center text-xs text-stone-500 hover:underline hover:cursor-pointer",
                isCharitySelected ? " rounded-md underline text-stone-900" : "text-stone-500"
              )}
                onClick={() => onClick("isCharity","true")}
              >
                Charity
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SaleCharityFilter;
