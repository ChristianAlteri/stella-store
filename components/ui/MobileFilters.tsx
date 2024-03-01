"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Dialog } from "@headlessui/react";

import { IoCloseOutline } from "react-icons/io5";
import Button from "@/components/ui/button";
import { Category, Color, Designer, Seller, Size } from "@/types";

import FilterButtons from "@/components/ui/FilterButtons";
import IconButton from "./icon-button";
import { Input } from "./input";

interface MobileFiltersProps {
  sizes?: Size[];
  colors?: Color[];
  designers?: Designer[];
  categories?: Category[];
  sellers?: Seller[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  sizes,
  colors,
  designers,
  categories,
  sellers,
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  console.log(sizes);

  return (
    <>
      <Button
        onClick={onOpen}
        className="flex hover:underline hover:cursor-pointer p-2 hover:text-stone-900 transition text-xs items-center gap-x-2 lg:hidden"
      >
        Filters
      </Button>

      <Dialog
        open={open}
        as="div"
        className="relative z-40 lg:hidden"
        onClose={onClose}
      >
        {/* Background color and opacity */}
        <div className="fixed inset-0 bg-black bg-opacity-45" />

        {/* Dialog position */}
        <div className="fixed justify-center items-center inset-0 z-40 flex">
          <Dialog.Panel className="flex rounded-sm flex-col h-1/3 w-2/3 overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            <div className="flex flex-col w-full items-center justify-center">
              <div className="top-0 right-0 relative flex items-center justify-end px-4 w-full">
                <IconButton
                  icon={<IoCloseOutline size={15} />}
                  onClick={onClose}
                />
              </div>
              <div className="flex flex-col w-1/2 justify-center items-center">
                {/* Search Bar */}
                <Input className="bg-white" placeholder="Search store" />
              </div>
            </div>
            <div className="flex flex-col gap-4 p-4">
              <div className="flex gap-2 flex-row text-xs justify-center items-center">
                <p>topLiked</p>
                <p>mostViewed</p>
                <p>newArrivals</p>
                <p>sale</p>
              </div>
              <div className="text-xs">Filter by:</div>
              <div className="grid grid-rows-7 gap-7">
                <div className="flex flex-row overflow-x-auto w-full ">
                  {designers && (
                    <FilterButtons
                      valueKey="designerId"
                      name="Designers"
                      data={designers}
                    />
                  )}
                </div>
                {categories && (
                  <FilterButtons
                    valueKey="categoryId"
                    name="Categories"
                    data={categories}
                  />
                )}
                {sellers && (
                  <FilterButtons
                    valueKey="sellerId"
                    name="Sellers"
                    data={sellers}
                  />
                )}
                {sizes && (
                  <FilterButtons 
                  valueKey="sizeId" 
                  name="Sizes" 
                  data={sizes} 
                  />
                )}
                {colors && (
                  <FilterButtons
                    valueKey="colorId"
                    name="Colors"
                    data={colors}
                  />
                )}
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;
