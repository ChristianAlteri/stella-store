"use client";

import { useState } from "react"; // Import useState
import { cn } from "@/lib/utils";
import { Category, Color, Designer, Seller, Size } from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";
import Button from "./button";
import { IoCloseOutline } from "react-icons/io5";

interface FilterListProps {
  data: (Size | Color | Designer | Seller | Category) | undefined;
  name: string;
  valueKey: string;
  onClose: () => void;
}

const FilterList: React.FC<FilterListProps> = ({ data, name, valueKey, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to control visibility
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedValue = searchParams.get(valueKey);

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

  return (
    <>
        
      <div className="flex flex-col w-full overflow-x-auto gap-2 ">
        <div key={data?.id} className="flex flex-row items-center">
          <div
            className={cn(
              "rounded-md flex border flex-row justify-center items-center text-center text-xs text-stone-500 p-2 bg-white border-stone-300",
              selectedValue === data?.id && "bg-primary text-white"
            )}
            onClick={() => onClick(data?.id)}
          >
            {data?.name}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterList;
