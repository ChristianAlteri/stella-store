"use client";

import GenderFilter from "@/components/Footer/gender-filter";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { Category, Gender, Product } from "@/types";
import { useState } from "react";
import { TfiMore } from "react-icons/tfi";
import AllSortFilters from "../Filters/all-sort-filters";

interface FullscreenProductFiltersProps {
  productData?: Product[];
  genders?: Gender[];
}

const FullscreenProductFilters: React.FC<FullscreenProductFiltersProps> = ({
  productData,
  genders,
}) => {
  const toggleFilters = () => setFiltersOpen((prev) => !prev);
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <div className="flex-col justify-center items-center p-2 shadow-2xl rounded-md w-1/4  h-full border hidden md:flex">
      <div className="flex flex-col items-center p-4 shadow-lg rounded-md w-full h-full">
        {/* {categoryData?.name && <h1>{categoryData.name}</h1>} */}
        <div className="flex flex-row justify-center items-center w-full">
          {genders?.[0] && (
            <div className="h-full w-full">
              <GenderFilter
                icon={<BsGenderMale size={20} />}
                gender={genders[0]}
              />
            </div>
          )}
          {genders?.[1] && (
            <div className="h-full w-full">
              <GenderFilter
                icon={<BsGenderFemale size={20} />}
                gender={genders[1]}
              />
            </div>
          )}
        </div>
        <div
          className="flex text-stone-600 hover:text-stone-900 hover:cursor-pointer"
          onClick={toggleFilters}
        >
          <TfiMore className="flex flex-row mt-2" size={17} />
        </div>

        {filtersOpen && (
          <div className="flex flex-row gap-12 justify-between items-between w-full p-1">
            <AllSortFilters
              data={productData}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FullscreenProductFilters;
