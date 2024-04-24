"use client";

import React from "react";

import { cn } from "@/lib/utils";

import { Category, Designer, Seller } from "@/types";

import Link from "next/link";
import useParamsUtil from "@/utils/useParamsUtil";

interface LeftSideProps {
  designers?: Designer[];
  categories?: Category[];
  sellers?: Seller[];
}

const LeftSidebar: React.FC<LeftSideProps> = ({
  designers,
  categories,
  sellers,
}) => {
  const { isSellerSelected, isDesignerSelected, isCategorySelected } = useParamsUtil();

  return (
    <aside className="h-full fixed p-4 z-40">

      <div className="grid grid-rows-3 h-1/2 justify-start items-start">
        <div className="row-span-1 h-full justify-start">
          <Link className="underline bg-white" href={`/sellers`}>
            Sellers
          </Link>
          <div className="ml-1 row-span-1 h-full overflow-y-auto bg-white ">
            {sellers?.map((seller, index) => (
              <Link href={`/sellers/${seller.id}`} key={seller.instagramHandle}>
                <p
                  className={cn(
                    "flex justify-start text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                    isSellerSelected(seller.id)
                      ? "text-stone bg-light-background rounded-md w-full p-1 flex justify-center items-center text-light-font underline transition-transform animate-pulse"
                      : "text-stone-500"
                  )}
                >
                  {seller.instagramHandle}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="row-span-1 h-full">
          <Link className="underline bg-white" href={`/designers`}>
            Designers
          </Link>
          <div className="ml-1 row-span-1 h-full overflow-y-auto bg-white ">
            {designers?.map((designer, index) => (
              <Link href={`/designers/${designer.id}`} key={designer.name}>
                <p
                  className={cn(
                    "flex justify-start text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                    isDesignerSelected(designer.id)
                      ? "text-stone bg-light-background rounded-md w-full p-1 flex justify-center items-center text-light-font underline transition-transform animate-pulse"
                      : "text-stone-500"
                  )}
                >
                  {designer.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="row-span-1 h-full">
          <Link className="underline bg-white" href={`/categories`}>
            Categories
          </Link>
          <div className="ml-1 row-span-1 h-full overflow-y-auto bg-white ">
            {categories?.map((category, index) => (
              <Link href={`/categories/${category.id}`} key={category.name}>
                <p
                  className={cn(
                    "flex justify-start text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                    isCategorySelected(category.id)
                      ? "text-stone bg-light-background rounded-md w-full p-1 flex justify-center items-center text-light-font underline transition-transform animate-pulse"
                      : "text-stone-500"
                  )}
                >
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
