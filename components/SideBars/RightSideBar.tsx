"use client";

import React from "react";

import { Category, Color, Condition, Designer, Material, Product, Seller, Size, Subcategory } from "@/types";
import FilterButtons from "./filter-buttons";

interface RightSideProps {
  sizes?: Size[];
  colors?: Color[];
  conditions?: Condition[];
  materials?: Material[];
  subcategories?: Subcategory[];
  productData?: Product[];
  designers?: Designer[];
  categories?: Category[];
  sellers?: Seller[];
}

const RightSidebar: React.FC<RightSideProps> = ({
  productData,
  designers,
  categories,
  sellers,
  sizes,
  colors,
  conditions,
  materials,
  subcategories,
}) => {

  return (
    <aside className="h-full w-full">
      <div className="text-sm flex flex-row justify-end w-full mb-3">Refine:</div>
      <div className="flex flex-col justify-center items-center text-end w-full gap-3">
        <FilterButtons valueKey="sizeId" name="Sizes" data={sizes} />
        <FilterButtons valueKey="colorId" name="Colors" data={colors} />
        <FilterButtons valueKey="conditionId" name="Conditions" data={conditions} />
        <FilterButtons valueKey="materialId" name="Materials" data={materials} />
        <FilterButtons valueKey="subcategoryId" name="Sub-Category" data={subcategories} />
      </div>
    </aside>
  );
};

export default RightSidebar;
