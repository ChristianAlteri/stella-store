"use client";

import { useState } from "react";
import {
  Category,
  Color,
  Condition,
  Designer,
  Material,
  Seller,
  Size,
} from "@/types";
import FilterList from "../SideBars/filter-list";
import { IoCloseOutline } from "react-icons/io5";
import { CiSquarePlus } from "react-icons/ci";

interface GenderFilterProps {
  data:
    | (Size | Color | Designer | Seller | Category | Condition | Material)[]
    | undefined;
  name: string;
  valueKey: string;
}

const GenderFilter: React.FC<GenderFilterProps> = ({
  data,
  name,
  valueKey,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="flex flex-row items-start justify-start text-start ">
      <div className="flex w-full flex-row items-center">
        <div className="mb-2">
            <div className="flex flex-row gap-2">
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
        </div>
      </div>
    </div>
  );
};

export default GenderFilter;
