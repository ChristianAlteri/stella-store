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
import IconButton from "../ui/icon-button";


import SearchInputAndResults from "./search-input-and-results";

import ShoppingCartButton from "../NavBar/ShoppingCartButton";
import Link from "next/link";

interface MegaSearchProps {
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

const MegaSearch: React.FC<MegaSearchProps> = ({
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
  

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <div className="flex w-full justify-start gap-4">
        <Button
          onClick={onOpen}
          className="flex hover:underline hover:cursor-pointer hover:text-stone-900 transition z-50 text-xs items-center "
        >
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
                <SearchInputAndResults
                  label="Search store..."
                  sizes={sizes}
                  colors={colors}
                  designers={designers}
                  categories={categories}
                  sellers={sellers}
                />
              </div>
            </div>


            
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MegaSearch;


