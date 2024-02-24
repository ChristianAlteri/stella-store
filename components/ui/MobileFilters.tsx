"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Dialog } from "@headlessui/react";

import { IoCloseOutline } from "react-icons/io5";
import Button from "@/components/ui/button";
import { Category, Color, Designer, Size } from "@/types";

import FilterButtons from "@/components/ui/FilterButtons";
import IconButton from "./icon-button";

interface MobileFiltersProps {
  sizes: Size[],
  colors: Color[],
  designers: Designer[],
  categories: Category[]
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  sizes,
  colors,
  designers,
  categories
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

      <Dialog open={open} as="div" className="relative z-40 lg:hidden" onClose={onClose}>
        
        {/* Background color and opacity */}
        <div className="fixed inset-0 bg-black bg-opacity-45" />
        
        {/* Dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<IoCloseOutline size={15} />} onClick={onClose} />
            </div>
            <div className="flex flex-col gap-4 p-4 ">

                <FilterButtons
                    valueKey="sizeId" 
                    name="Sizes" 
                    data={sizes}
                />
                <FilterButtons 
                    valueKey="colorId"
                    name = "Colors"
                    data={colors} 
                />
                <div className="flex flex-row overflow-x-auto w-full ">
                    <FilterButtons 
                        valueKey="designerId"
                        name = "Designers"
                        data={designers} 
                    />
                </div>
                <FilterButtons 
                    valueKey="categoryId"
                    name = "Categories"
                    data={categories} 
                />
          </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MobileFilters;