"use client";

import { useState } from "react"; // Import useState
import { cn } from "@/lib/utils";
import { Category, Color, Designer, Seller, Size } from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";
import Button from "./button";
import FilterList from "./FilterList";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

interface FilterButtonsProps {
  data: (Size | Color | Designer | Seller | Category)[] | undefined;
  name: string;
  valueKey: string;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  data,
  name,
  valueKey,
}) => {
  const [isExpanded, setIsExpanded] = useState(false); 
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
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

  return (
    <div className="flex rounded-md flex-row items-start justify-start text-start">
      <div className="flex w-full flex-row items-center border-b border-stone-300 ">
        <div className="mb-2">
        {/* Hide name when isExpanded is true */}
        {!isExpanded && (
          <h3
            className="flex w-full flex-row items-center text-xs hover:underline hover:cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {name}
            <div className="flex w-full justify-end">
              <IoIosArrowForward />
            </div>
          </h3>
        )}
        {/* Only show this section when isExpanded is true */}
        {isExpanded && (
          <div>
            <div onClick={() => setIsExpanded(false)}>
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
