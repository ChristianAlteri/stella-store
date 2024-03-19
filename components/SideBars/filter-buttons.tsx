"use client";

import { useState } from "react";
import { Category, Color, Condition, Designer, Material, Seller, Size } from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";
import FilterList from "./filter-list";
import { IoCloseOutline } from "react-icons/io5";
import { CiSquarePlus } from "react-icons/ci";

interface FilterButtonsProps {
  data: (Size | Color | Designer | Seller | Category | Condition | Material)[] | undefined;
  name: string;
  valueKey: string;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  data,
  name,
  valueKey,
}) => {
  const [isExpanded, setIsExpanded] = useState(false); 

  return (
    <div className="flex flex-row items-start justify-start text-start ">
      <div className="flex w-full flex-row items-center border-b border-stone-300 ">
        <div className="mb-2">
        {!isExpanded && (
          <h3
            className="flex w-full flex-row items-center text-sm hover:underline hover:cursor-pointer gap-2"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {name}
            <CiSquarePlus className="flex flex-row hover:cursor-pointer text-stone-600 hover:text-stone-900" size={15} />
          </h3>
        )}

        {isExpanded && (
          <div className="flex flex-col gap-2">
            <div 
            className="flex w-1/2 flex-row justify-center items-center text-center text-sm bg-stone-400 text-white border rounded-md hover:cursor-pointer hover:underline"
            onClick={() => setIsExpanded(false)}>
              <IoCloseOutline size={15} />
            </div>
            {data?.map((filter) => (
              <FilterList
                key={filter.id}
                name={name}
                valueKey={valueKey}
                data={filter}
                onClose={() => setIsExpanded(false)}
              />
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default FilterButtons;
