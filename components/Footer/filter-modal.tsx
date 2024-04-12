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

import { IoChevronForwardOutline } from "react-icons/io5";
import MiniProductCard from "../Product/mini-product-card";
import ProductFilter from "../Filters/product-filter";

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
  sizes,
  conditions,
  materials,
  subcategories,
  onSaleProducts,
}) => {
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const temp = [
    {
      createdAt: "2024-03-25T18:14:14.245Z",
      id: "5153224c-e306-437f-bc74-2b1caddde41d",
      name: "Black",
      storeId: "f3598d1d-0506-4493-bfc1-59aa32a99a32",
      updatedAt: "2024-03-25T18:14:14.245Z",
      value: "#000",
    },
    {
      createdAt: "2024-03-25T18:14:14.245Z",
      id: "5153224c-e306-437f-bc74-2b1caddde41d",
      name: "Black",
      storeId: "f3598d1d-0506-4493-bfc1-59aa32a99a32",
      updatedAt: "2024-03-25T18:14:14.245Z",
      value: "#000",
    },
    {
      createdAt: "2024-03-25T18:14:14.245Z",
      id: "5153224c-e306-437f-bc74-2b1caddde41d",
      name: "Black",
      storeId: "f3598d1d-0506-4493-bfc1-59aa32a99a32",
      updatedAt: "2024-03-25T18:14:14.245Z",
      value: "#000",
    },
    {
      createdAt: "2024-03-25T18:14:14.245Z",
      id: "5153224c-e306-437f-bc74-2b1caddde41d",
      name: "Black",
      storeId: "f3598d1d-0506-4493-bfc1-59aa32a99a32",
      updatedAt: "2024-03-25T18:14:14.245Z",
      value: "#000",
    },
    {
      createdAt: "2024-03-25T18:14:14.245Z",
      id: "5153224c-e306-437f-bc74-2b1caddde41d",
      name: "Black",
      storeId: "f3598d1d-0506-4493-bfc1-59aa32a99a32",
      updatedAt: "2024-03-25T18:14:14.245Z",
      value: "#000",
    },
    {
      createdAt: "2024-03-25T18:14:14.245Z",
      id: "5153224c-e306-437f-bc74-2b1caddde41d",
      name: "WHITE",
      storeId: "f3598d1d-0506-4493-bfc1-59aa32a99a32",
      updatedAt: "2024-03-25T18:14:14.245Z",
      value: "#000",
    },
    {
      createdAt: "2024-03-25T18:14:14.245Z",
      id: "5153224c-e306-437f-bc74-2b1caddde41d",
      name: "WHITE",
      storeId: "f3598d1d-0506-4493-bfc1-59aa32a99a32",
      updatedAt: "2024-03-25T18:14:14.245Z",
      value: "#000",
    },
    {
      createdAt: "2024-03-25T18:14:14.245Z",
      id: "5153224c-e306-437f-bc74-2b1caddde41d",
      name: "WHITE",
      storeId: "f3598d1d-0506-4493-bfc1-59aa32a99a32",
      updatedAt: "2024-03-25T18:14:14.245Z",
      value: "#000",
    },
    {
      createdAt: "2024-03-25T18:14:14.245Z",
      id: "5153224c-e306-437f-bc74-2b1caddde41d",
      name: "WHITE",
      storeId: "f3598d1d-0506-4493-bfc1-59aa32a99a32",
      updatedAt: "2024-03-25T18:14:14.245Z",
      value: "#000",
    },
    {
      createdAt: "2024-03-25T18:14:14.245Z",
      id: "5153224c-e306-437f-bc74-2b1caddde41d",
      name: "BLUE",
      storeId: "f3598d1d-0506-4493-bfc1-59aa32a99a32",
      updatedAt: "2024-03-25T18:14:14.245Z",
      value: "#000",
    },
    {
      createdAt: "2024-03-25T18:14:14.245Z",
      id: "5153224c-e306-437f-bc74-2b1caddde41d",
      name: "BLUE",
      storeId: "f3598d1d-0506-4493-bfc1-59aa32a99a32",
      updatedAt: "2024-03-25T18:14:14.245Z",
      value: "#000",
    },
    {
      createdAt: "2024-03-25T18:14:14.245Z",
      id: "5153224c-e306-437f-bc74-2b1caddde41d",
      name: "BLUE",
      storeId: "f3598d1d-0506-4493-bfc1-59aa32a99a32",
      updatedAt: "2024-03-25T18:14:14.245Z",
      value: "#000",
    },
    {
      createdAt: "2024-03-25T18:14:14.245Z",
      id: "5153224c-e306-437f-bc74-2b1caddde41d",
      name: "BLUE",
      storeId: "f3598d1d-0506-4493-bfc1-59aa32a99a32",
      updatedAt: "2024-03-25T18:14:14.245Z",
      value: "#000",
    },
  ];

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
        className=" bg-white  "
        placeholder={undefined}
        size={500}
      >
        
        <div className="grid grid-rows-10 h-full flex-row">

        <div className="row-span-1 bg-white flex-row justify-end items-end w-full p-4">
          <div className="animate-loop-scroll whitespace-nowrap">
            This is scrolling text. This is scrolling text. This is scrolling text.
          </div>
        </div>

          <div className="row-span-4 p-2 overflow-y-auto h-full flex-row justify-center items-center shadow-2xl rounded-md border w-full">
            <div className="grid grid-rows-2 justify-center items-center flex-col h-full top-0 shadow-lg rounded-md bg-white w-full">


              <div className="grid grid-cols-3 gap-12 h-1/2 overflow-y-auto row-span-1 flex-row justify-center items-center">
                <div className="flex flex-col bg-white w-full justify-center items-center">
                  <ProductFilter valueKey="sizeId" name="Sizes" data={sizes} />
                </div>
                <div className="flex flex-col bg-white w-full justify-center items-center">
                  <ProductFilter
                    valueKey="colorId"
                    name="Colors"
                    data={colors}
                  />
                </div>
                <div className="flex flex-col bg-white w-full justify-center items-center">
                  <ProductFilter
                    valueKey="conditionId"
                    name="Conditions"
                    data={conditions}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12 h-1/2 row-span-1 flex-row justify-between w-full">
                <div className="flex flex-col bg-white w-full justify-center items-center">
                  <ProductFilter
                    valueKey="materialId"
                    name="Materials"
                    data={materials}
                  />
                </div>
                <div className="flex flex-col bg-white w-full justify-center items-center">
                  <ProductFilter
                    valueKey="subcategoryId"
                    name="Sub-Category"
                    data={subcategories}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row-span-4 p-4 mt-4 overflow-y-auto h-full">
            <div className="flex flex-col bg-white">
              {onSaleProducts && (
                <MiniProductCard
                  miniProductRoute="/sale"
                  miniProductTitle="On Sale"
                  data={onSaleProducts}
                />
              )}
            </div>
          </div>

          <div className="row-span-1 bg-white flex-row justify-end items-end w-full p-4">
            <button className="flex flex-row justify-end w-full " onClick={closeDrawer}>
              <IoChevronForwardOutline size={25} />
            </button>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default FilterModal;
