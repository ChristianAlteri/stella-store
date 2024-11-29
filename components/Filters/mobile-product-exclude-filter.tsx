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

interface MobileProductExcludeFilterProps {
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

const MobileProductExcludeFilter: React.FC<MobileProductExcludeFilterProps> = ({
  data,
  name,
  valueKey,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const excludeKey = `exclude${valueKey.charAt(0).toUpperCase() + valueKey.slice(1)}`; // Key for excluded IDs
  const excludedValues = searchParams.get(excludeKey)?.split(",") || []; // Get excluded IDs from URL
  const [isVisible, setIsVisible] = useState(false);

  // Handle excluding IDs logic
  const onClick = (id: string | undefined) => {
    const current = qs.parse(searchParams.toString());

    const excludedIds = current[excludeKey] ? (current[excludeKey] as string).split(",") : [];

    if (excludedIds.includes(id!)) {
      // If the ID is already excluded, remove it
      const index = excludedIds.indexOf(id!);
      if (index > -1) excludedIds.splice(index, 1);
    } else {
      // Add ID to the exclusion list
      excludedIds.push(id!);
    }

    current[excludeKey] = excludedIds.join(",");

    const url = qs.stringifyUrl(
      { url: window.location.href, query: current },
      { skipNull: true }
    );
    router.push(url);
  };

  // Check if the filter item is excluded
  const isExcluded = (filterId: string) => excludedValues.includes(filterId);

  // Toggle visibility of the filter list
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <div
        className="flex flex-row justify-between items-center w-full h-full mb-2"
        onClick={toggleVisibility}
      >
        <div className="flex flex-col bg-white justify-start items-start text-sm font-bold hover:underline hover:cursor-pointer">
          <div>{name.toUpperCase()}</div>
        </div>
        <div className="hover:cursor-pointer">+</div>
      </div>
      {isVisible && (
        <div className="grid grid-cols-4 md:grid-cols-2 w-full h-full mb-2">
          {data?.map((filterItem) => (
            <div key={filterItem.id}>
              <div
                className={cn(
                  "flex flex-row justify-between text-xs font-medium transition-colors hover:underline hover:cursor-pointer",
                  isExcluded(filterItem.id)
                    ? "flex flex-row justify-between items-center text-red-600 underline transition-transform" // Highlight excluded items in red
                    : "text-black"
                )}
                onClick={() => onClick(filterItem?.id)}
              >
                {filterItem.name.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MobileProductExcludeFilter;
