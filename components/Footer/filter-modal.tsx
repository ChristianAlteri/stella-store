"use client";

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
import { Drawer } from "@material-tailwind/react";
import FilterButtons from "../SideBars/filter-buttons";
import React from "react";
import { GoFilter } from "react-icons/go";

import {  IoChevronForwardOutline } from "react-icons/io5";
import MiniProductCard from "../Product/mini-product-card";
import SaleCharityFilter from "../Home/sale-charity-filter";

interface FilterModalProps {
  colors: Color[] | undefined;
  designers?: Designer[];
  categories?: Category[];
  sellers?: Seller[];
  sizes?: Size[];
  conditions?: Condition[];
  materials?: Material[];
  genders?: Gender[];
  subcategories?: Subcategory[];
  onSaleProducts?: Product[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  colors,
  designers,
  categories,
  sellers,
  genders,
  sizes,
  conditions,
  materials,
  subcategories,
  onSaleProducts,
}) => {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <div
        onClick={openDrawer}
        className="flex flex-row justify-center text-center text-xs hover:underline hover:cursor-pointer"
      >
        <GoFilter className="flex flex-row" size={25} />
      </div>
      <Drawer 
        open={open} 
        onClose={closeDrawer} 
        placement="right" 
        transition={{
            type: "tween",
            duration: 0.3,
        }}
        className=" bg-white opacity-95 " 
        placeholder={undefined} size={500} 
      >
        <div className="grid grid-cols-1 gap-4 p-4">
          
          <div className="flex flex-row items-center justify-center text-black mb-4">
            <span className="underline text-md">Filter by</span>
            <GoFilter className="ml-2" size={20} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="h-full overflow-y-auto bg-white">
              <FilterButtons valueKey="sizeId" name="Sizes" data={sizes} />
            </div>
            <div className="h-full overflow-y-auto bg-white">
              <FilterButtons valueKey="colorId" name="Colors" data={colors} />
            </div>
            <div className="h-full overflow-y-auto bg-white">
              <FilterButtons
                valueKey="conditionId"
                name="Conditions"
                data={conditions}
              />
            </div>
            <div className="h-full overflow-y-auto bg-white">
              <FilterButtons
                valueKey="materialId"
                name="Materials"
                data={materials}
              />
            </div>
            <div className="h-full overflow-y-auto bg-white">
              <FilterButtons
                valueKey="subcategoryId"
                name="Sub-Category"
                data={subcategories}
              />
            </div>
            <SaleCharityFilter/>
            <div className="flex flex-col bg-white">
              {onSaleProducts && (
                <MiniProductCard miniProductRoute="/sale" miniProductTitle="On Sale" data={onSaleProducts} />
              )}
            </div>
            <button
            className="flex flex-row justify-end"
            onClick={closeDrawer}
          >
            <IoChevronForwardOutline size={25} />
          </button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default FilterModal;
