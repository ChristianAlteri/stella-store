"use client";

import { useState } from "react";

import { Dialog } from "@headlessui/react";

import { IoCloseOutline } from "react-icons/io5";
import Button from "@/components/ui/button";
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

import FilterButtons from "@/components/SideBars/filter-buttons";
import IconButton from "./icon-button";
import { CiMenuBurger } from "react-icons/ci";

import SearchInput from "./search-input";

import ShoppingCartButton from "../NavBar/buttons/ShoppingCartButton";
import Link from "next/link";

interface MobileFiltersProps {
  products: Product[] | undefined;
  colors: Color[] | undefined;
  designers?: Designer[];
  categories?: Category[];
  sellers?: Seller[];
  sizes?: Size[];
  conditions?: Condition[];
  materials?: Material[];
  genders?: Gender[];
  subcategories?: Subcategory[]; 
  icon?: React.ReactNode;
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  products,
  colors,
  designers,
  categories,
  sellers,
  sizes,
  conditions,
  materials,
  genders,
  subcategories,
  icon,
}) => {
  const [open, setOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const toggleFilters = () => setFiltersOpen((prev) => !prev);

  return (
    <>
      <div className="flex w-full justify-start gap-4">
        <Button
          onClick={onOpen}
          className="flex hover:underline hover:cursor-pointer hover:text-stone-900 transition z-40 text-xs items-center "
        >
          {/* Filter button disguised as a search bar */}
          {icon}
        </Button>
      </div>

      <Dialog open={open} as="div" className="relative z-40 " onClose={onClose}>
        {/* Background color and opacity */}
        <div className="fixed inset-0 bg-black bg-opacity-45" />

        {/* Dialog position */}
        <div className="fixed justify-center items-center inset-0 z-40 flex">
          <Dialog.Panel className="flex rounded-sm flex-col h-2/3 w-2/3 overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            <div className="flex flex-col w-full items-center justify-center ">
              <div className="flex flex-row justify-between w-full p-2 top-0 items-center text-center lg:w-1/2 md:w-1/2">
                <div className="">
                  <IconButton
                    icon={<IoCloseOutline size={17} />}
                    onClick={onClose}
                  />
                </div>
                {/* Cart */}
                <div className="">
                  <ShoppingCartButton />
                </div>
              </div>
              {/* Quick links that redirect to pages */}
              <div className="flex gap-2 flex-row text-xs lg:w-1/2 md:w-1/2 justify-between items-center mb-4">
                <Link href={`/top-likes`}>
                  <p
                    className="hover:underline hover:cursor-pointer"
                    onClick={onClose}
                  >
                    Top liked
                  </p>
                </Link>
                <Link href={`/most-viewed`}>
                  <p
                    className="hover:underline hover:cursor-pointer"
                    onClick={onClose}
                  >
                    Most viewed
                  </p>
                </Link>
                <Link href={`/`}>
                  <p
                    className="hover:underline hover:cursor-pointer"
                    onClick={onClose}
                  >
                    New arrivals
                  </p>
                </Link>
                <Link href={`/sale`}>
                  <p
                    className="hover:underline hover:cursor-pointer"
                    onClick={onClose}
                  >
                    Sale
                  </p>
                </Link>
              </div>
              <div className="flex flex-col w-1/2 justify-center items-center">
                {/* Search Bar */}
                <SearchInput
                  label="Search store..."
                  sizes={sizes}
                  colors={colors}
                  designers={designers}
                  categories={categories}
                  sellers={sellers}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4 p-4">
              <div
                onClick={toggleFilters}
                className="flex flex-row justify-center text-center text-xs hover:underline hover:cursor-pointer"
              >
                Toggle filters:
              </div>
              {filtersOpen && (
                <div className="grid grid-rows-7 gap-7">
                  <div className="flex flex-col gap-7 overflow-x-auto w-full ">
                    {designers && (
                      <FilterButtons
                        valueKey="designerId"
                        name="Designer"
                        data={designers}
                      />
                    )}
                    {categories && (
                      <FilterButtons
                        valueKey="categoryId"
                        name="Category"
                        data={categories}
                      />
                    )}
                    {sellers && (
                      <FilterButtons
                        valueKey="sellerId"
                        name="Seller"
                        data={sellers}
                      />
                    )}
                    {subcategories && (
                      <FilterButtons
                        valueKey="subcategoryId"
                        name="Subcategories"
                        data={subcategories}
                      />
                    )}
                    {sizes && (
                      <FilterButtons
                        valueKey="sizeId"
                        name="Sizes"
                        data={sizes}
                      />
                    )}
                    {materials && (
                      <FilterButtons
                        valueKey="materialId"
                        name="Materials"
                        data={materials}
                      />
                    )}
                    {conditions && (
                      <FilterButtons
                        valueKey="conditionId"
                        name="Conditions"
                        data={conditions}
                      />
                    )}
                    {colors && (
                      <FilterButtons
                      valueKey="colorId"
                      name="Colors"
                      data={colors}
                      />
                      )}
                    {genders && (
                      <FilterButtons
                        valueKey="genderId"
                        name="Genders"
                        data={genders}
                      />
                    )}
                  </div>

                  <div
                    onClick={onClose}
                    className="flex flex-row justify-center items-center text-center"
                  >
                    <button
                      className="border"
                      style={{ width: "100px", height: "100px" }}
                    >
                      Show results
                    </button>
                  </div>
                </div>
              )}
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;
