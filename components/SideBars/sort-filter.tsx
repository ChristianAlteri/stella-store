"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import qs from "query-string";
import { CiSliderHorizontal } from "react-icons/ci";

interface SortFilterProps {
  data: Product[] | undefined;
  valueKey: string;
}

const SortFilter: React.FC<SortFilterProps> = ({ data, valueKey }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const toggleFilters = () => setFiltersOpen((prev) => !prev);
  const [filtersOpen, setFiltersOpen] = useState(false);
  // const selectedValue = searchParams.get(valueKey);

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

  return (
    <>
      <div className="flex flex-col ">
        <div
          className="flex text-stone-600 hover:text-stone-900 hover:cursor-pointer "
          onClick={toggleFilters}
        >
          <CiSliderHorizontal className=" flex flex-row " size={20} />
        </div>
        {filtersOpen && (
          <div className="flex flex-col gap-1">
            <div key="high-to-low" className="grid items-center">
              <div
                className="flex flex-row justify-center items-center text-left text-xs text-stone-500 hover:underline hover:cursor-pointer"
                onClick={() => onClick("high-to-low")}
              >
                Latest
              </div>
            </div>
            <div key="low-to-high" className="grid items-center">
              <div
                className="flex flex-row justify-center gap-1 items-center text-center text-xs "
                onClick={() => onClick("low-to-high")}
              >
                <p className="flex flex-row text-stone-900">Price:</p>
                <p className="flex flex-row text-stone-500 hover:underline hover:cursor-pointer">
                Low to high
                </p>
              </div>
            </div>

            <div key="high-to-low" className="grid items-center">
              <div
                className="flex flex-row justify-center gap-1 items-center text-center text-xs text-stone-500 hover:underline hover:cursor-pointer"
                onClick={() => onClick("high-to-low")}
              >
               <p className="flex flex-row text-stone-900">Price:</p>
                <p className="flex flex-row text-stone-500 hover:underline hover:cursor-pointer">
                High to low
                </p>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SortFilter;
