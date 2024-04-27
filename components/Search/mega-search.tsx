"use client";

import { useEffect, useState } from "react";

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

import IconButton from "../ui/icon-button";
import ShoppingCartButton from "../NavBar/ShoppingCartButton";


import SearchQuickLinks from "./search-quick-links";
import SearchInputAndResultsSellers from "./search-input-and-results-sellers";
import SearchInputAndResultsProducts from "./search-input-and-results-products";
import { usePathname } from "next/navigation";

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
  const [searchBy, setSearchBy] = useState('Product');
  const pathname = usePathname();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);


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

      <Dialog open={open} as="div" className="relative z-50 " onClose={onClose}>
        {/* Background color and opacity */}
        <div className="fixed inset-0 bg-light-background bg-opacity-85" />

        {/* Dialog position */}
        <div className="fixed justify-center items-center inset-0 z-40 flex">
          <Dialog.Panel className="flex rounded-sm flex-col h-2/3 w-2/3 overflow-y-auto bg-white shadow-xl border border-light-font">
            <div className="flex flex-col w-full h-full items-center justify-center ">

              <div className="flex flex-row justify-between w-full p-2 top-0 items-center text-center ">
                <div className="">
                  <IconButton
                    icon={<IoCloseOutline size={17} />}
                    onClick={onClose}
                  />
                </div>
                {/* Cart */}
                <div className="">
                  <ShoppingCartButton
                  size="17px"
                  />
                </div>
              </div>

              <div className="border-t border-light-font justify-center items-center w-full"></div>
              
              {/* Quick links that redirect to pages */}
              <div className="flex flex-row w-full justify-between items-center p-2 text-super-small">
                <SearchQuickLinks />
              </div>

              <div className="border-t border-light-font justify-center items-center w-full"></div>

              <div className="grid grid-cols-1 w-2/3 justify-start items-start mt-2 h-full">
                {/* Search Bar */}
                <div className="h-full">
                  <select
                    className="flex flex-col justify-center items- text-xs p-3"
                    name="searchBy"
                    id="searchBy"
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value)}
                  >
                    <option value="Product">Search by: Product</option>
                    <option value="Other">Search by: Seller, Designer or Category</option>
                  </select>
                  {searchBy === 'Product' ? (
                    <SearchInputAndResultsProducts
                      label="Search entire store..."
                    />
                  ) : (
                    <SearchInputAndResultsSellers
                      label="Search by Seller, Designer or Category..."
                      sizes={sizes}
                      colors={colors}
                      designers={designers}
                      categories={categories}
                      sellers={sellers}
                    />
                  )}
                </div>
              </div>
            </div>


            
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default MegaSearch;


