"use client";

import React, { useEffect, useState } from "react";
import { GoFilter } from "react-icons/go";

import {
  Category,
  Color,
  Condition,
  Designer,
  Material,
  Product,
  Seller,
  Size,
  Subcategory,
} from "@/types";
import FilterButtons from "./filter-buttons";
import { randomiseData } from "../../utils/sortdata";
import MiniProductCard from "../Product/mini-product-card";


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
  miniProductTitle?: string;
}

const RightSidebar: React.FC<RightSideProps> = ({
  sizes,
  colors,
  conditions,
  materials,
  subcategories,
  productData,
  miniProductTitle,
}) => {

  const [randomisedProductData, setRandomisedProductData] = useState(productData!);

  useEffect(() => {
    setRandomisedProductData(randomiseData(productData));
  }, [productData]);


  return (
    <aside className="h-full fixed p-4 z-50">
      <div className="flex text-xs gap-2 justify-center items-center text-stone-600 hover:text-stone-900 hover:cursor-pointer mb-4">
        Filter by
        <GoFilter className="flex flex-row" size={17} />
      </div>
      <div className="grid grid-rows-6 h-1/2 justify-start items-start">
        <div className="ml-1 row-span-1 h-full overflow-y-auto bg-white ">
            <FilterButtons valueKey="sizeId" name="Sizes" data={sizes} />
        </div>
        <div className="ml-1 row-span-1 h-full overflow-y-auto bg-white ">
            <FilterButtons valueKey="colorId" name="Colors" data={colors} />
        </div>
        <div className="ml-1 row-span-1 h-full overflow-y-auto bg-white ">
            <FilterButtons valueKey="conditionId" name="Conditions" data={conditions}/>
        </div>
        <div className="ml-1 row-span-1 h-full overflow-y-auto bg-white ">
            <FilterButtons valueKey="materialId" name="Materials" data={materials}/>
        </div>
        <div className="ml-1 row-span-1 h-full overflow-y-auto bg-white ">
            <FilterButtons valueKey="subcategoryId" name="Sub-Category" data={subcategories}/>
        </div>
        <div className="flex flex-col  bg-white">
          { randomisedProductData?.length > 0 ? 
            <MiniProductCard 
            miniProductTitle={miniProductTitle}
            miniProductRoute="/featured"
            data={randomisedProductData} 
            /> : null 
          }
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
