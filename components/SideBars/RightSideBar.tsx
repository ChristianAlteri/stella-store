"use client";

import React, { useEffect, useState } from "react";

import {
  Color,
  Condition,
  Designer,
  Material,
  Product,
  Seller,
  Size,
  Subcategory,
} from "@/types";
import { randomiseData } from "../../utils/sortdata";
import MiniProductCard from "../Product/mini-product-card";
import MobileProductFilter from "../Filters/mobile-product-filter";
import RangeSlider from "../Filters/range-slider";

interface RightSideProps {
  sizes?: Size[];
  colors?: Color[];
  conditions?: Condition[];
  materials?: Material[];
  subcategories?: Subcategory[];
  productData?: Product[];
  designers?: Designer[];
  sellers?: Seller[];
  miniProductTitle?: string;
}

const RightSidebar: React.FC<RightSideProps> = ({
  sizes,
  colors,
  materials,
  subcategories,
  productData,
  miniProductTitle,
}) => {
  const [randomisedProductData, setRandomisedProductData] = useState(
    productData!
  );

  useEffect(() => {
    setRandomisedProductData(randomiseData(productData));
  }, [productData]);

  return (
    <aside className="h-full z-35">
      <div className="grid grid-rows-4 h-full w-full justify-end items-end flex-col">

        <div className="flex flex-col row-span-1 justify-center items-center h-2/3 w-full">
          <RangeSlider />
        </div>

        <div className="row-span-1 h-full w-full">
          <div className="flex flex-col bg-white w-full justify-center items-center">
            <MobileProductFilter valueKey="sizeId" name="Sizes" data={sizes} />
          </div>
          <div className="flex flex-col bg-white w-full justify-center items-center">
            <MobileProductFilter valueKey="colorId" name="Colors" data={colors} />
          </div>

          <div className="flex flex-col bg-white w-full justify-center items-center">
            <MobileProductFilter
              valueKey="materialId"
              name="Materials"
              data={materials}
            />
          </div>
          <div className="flex flex-col bg-white w-full justify-center items-center ">
            <MobileProductFilter
              valueKey="subcategoryId"
              name="Sub-Category"
              data={subcategories}
            />
          </div>
        </div>

        <div className="flex flex-col bg-white row-span-2 h-full w-full ">
          {randomisedProductData?.length > 0 ? (
            <MiniProductCard
              miniProductTitle={miniProductTitle}
              miniProductRoute="/featured"
              data={randomisedProductData}
            />
          ) : null}
        </div>

      </div>
    </aside>
  );
};

export default RightSidebar;
