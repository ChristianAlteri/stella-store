"use client";

import { cn } from "@/lib/utils";
import {
  Category,
  Color,
  Condition,
  Designer,
  Gender,
  Material,
  Seller,
  Size,
  Subcategory,
} from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useState } from "react";

interface MobileProductFilterProps {
  data:
    | (
        | Size
        | Color
        | Designer
        | Seller
        | Category
        | Condition
        | Material
        | Subcategory
        | Gender
      )[]
    | undefined;
  name: string;
  valueKey: string;
  onClose?: () => void;
}

const MobileProductFilter: React.FC<MobileProductFilterProps> = ({
  data,
  name,
  valueKey,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedValue = searchParams.get(valueKey);
  const [isVisible, setIsVisible] = useState(false);

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
    router.push(url);
  };

  const isSelected = (filterId: string) => selectedValue === filterId;

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
    <div className="flex flex-row justify-between w-full h-full"
    onClick={toggleVisibility}
    >
      <div className="flex flex-col underline bg-white justify-start items-start text-sm font-medium hover:underline hover:cursor-pointer">
        <div>{name}</div>
      </div>
      <div>
        +
      </div>
    </div>
      {isVisible && (
         <div className="grid grid-cols-4 w-full h-full p-2 gap-2">
          {data?.map((filterItem) => (
            <div key={filterItem.id}>
              <div
                className={cn(
                  "bg-light-background ml-2 gap-2 flex flex-row justify-center text-sm font-medium transition-colors hover:underline hover:cursor-pointer",
                  isSelected(filterItem.id)
                    ? " bg-light-background p-1 rounded-md flex justify-center items-center text-light-font transition-transform animate-pulse"
                    : "text-light-font"
                )}
                onClick={() => onClick(filterItem?.id)}
              >
                {filterItem.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MobileProductFilter;
