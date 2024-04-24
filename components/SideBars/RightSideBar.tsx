"use client";

import React, { useEffect, useState } from "react";
import { GoFilter } from "react-icons/go";

import {
  Category,
  Color,
  Condition,
  Designer,
  Gender,
  Material,
  Product,
  Seller,
  Size,
  Subcategory,
} from "@/types";
import FilterButtons from "./filter-buttons";
import { randomiseData } from "../../utils/sortdata";
import MiniProductCard from "../Product/mini-product-card";
import ProductFilter from "../Filters/product-filter";
import FullscreenProductFilters from "../Home/full-screen-product-filters";
import SideBarProductSort from "./sidebar-product-sort";
import MobileProductFilter from "../Filters/mobile-product-filter";
import { BsPersonRaisedHand } from "react-icons/bs";
import ClientAdvisor from "../ui/ClientAdvisor";

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
  conditions,
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
    <aside className="h-full fixed p-4 z-50">
      <div className="grid grid-rows-3 h-full w-full justify-end items-end flex-col">
        {/* <div className="row-span-1 h-full w-full"> */}
          {/* <SideBarProductSort
            categoryData={categoryData}
            productData={productData}
            genders={genders}
          /> */}
          {/* <div className="border w-full shadow-md">
            <BsPersonRaisedHand />
            <ClientAdvisor products={allProducts} />
          </div>
        </div> */}

        <div className="row-span-1 h-full w-full">
          <div className="flex flex-col bg-white w-full justify-center items-center">
            <MobileProductFilter valueKey="sizeId" name="Sizes" data={sizes} />
          </div>
          <div className="flex flex-col bg-white w-full justify-center items-center">
            <MobileProductFilter valueKey="colorId" name="Colors" data={colors} />
          </div>
          <div className="flex flex-col bg-white w-full justify-center items-center">
            <MobileProductFilter
              valueKey="conditionId"
              name="Conditions"
              data={conditions}
            />
          </div>
          <div className="flex flex-col bg-white w-full justify-center items-center">
            <MobileProductFilter
              valueKey="materialId"
              name="Materials"
              data={materials}
            />
          </div>
          <div className="flex flex-col bg-white w-full justify-center items-center">
            <MobileProductFilter
              valueKey="subcategoryId"
              name="Sub-Category"
              data={subcategories}
            />
          </div>
        </div>
        {/* <div className="row-span-1 h-full overflow-y-auto bg-white">
          <ProductFilter valueKey="sizeId" name="Sizes" data={sizes} />
        </div> */}
        {/* <div className="row-span-1 h-full overflow-y-auto bg-white">
          <ProductFilter valueKey="colorId" name="Colors" data={colors} />
        </div>
        <div className=" row-span-1 h-full overflow-y-auto bg-white">
          <ProductFilter
            valueKey="conditionId"
            name="Conditions"
            data={conditions}
          />
        </div>
        <div className=" row-span-1 h-full overflow-y-auto bg-white">
          <ProductFilter
            valueKey="materialId"
            name="Materials"
            data={materials}
          />
        </div>
        <div className=" row-span-1 h-full overflow-y-auto bg-white">
          <ProductFilter
            valueKey="subcategoryId"
            name="Sub-Category"
            data={subcategories}
          />
        </div> */}

        <div className="flex flex-col bg-white row-span-2 h-full w-full">
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
