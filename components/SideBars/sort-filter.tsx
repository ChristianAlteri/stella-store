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
      <div className="flex flex-col justify-start items-start mb-4">
        <div
          className="flex text-xs gap-2 justify-center items-center text-stone-600 hover:text-stone-900 hover:cursor-pointer"
          onClick={toggleFilters}
        >
          Sort by
          <CiSliderHorizontal className="flex flex-row" size={17} />
        </div>
        {filtersOpen && (
          <div className="flex flex-col justify-center items-center gap-1 w-full">
            <div className="flex flex-row gap-1 w-full">
              <br />
              <div key="high-to-low" className="grid items-center">
                <div
                  className="flex flex-row  justify-center items-center text-left text-xs text-stone-500 hover:underline hover:cursor-pointer"
                  onClick={() => onClick("high-to-low")}
                >
                  Latest
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-1 w-full">
              <div key="low-to-high" className="grid items-center">
                <div
                  className=" flex flex-row justify-center gap-1 items-center text-center text-xs "
                  onClick={() => onClick("low-to-high")}
                >
                  {/* <p className="w-full flex flex-row text-stone-900">Price:</p> */}
                  <p className="w-full flex flex-row text-stone-500 hover:underline hover:cursor-pointer">
                    Low to high
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-1 w-full">
              <div key="high-to-low" className="grid items-center">
                <div
                  className="flex flex-row justify-center gap-1 items-center text-center text-xs text-stone-500 hover:underline hover:cursor-pointer"
                  onClick={() => onClick("high-to-low")}
                >
                  {/* <p className="flex flex-row text-stone-900">Price:</p> */}
                  <p className="flex flex-row text-stone-500 hover:underline hover:cursor-pointer">
                    High to low
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SortFilter;
