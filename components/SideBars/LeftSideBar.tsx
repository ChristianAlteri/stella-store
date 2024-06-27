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
    <aside className="h-full z-35">

      <div className="grid grid-rows-3 h-1/2 justify-start items-start">
        <div className="row-span-1 h-full justify-start">
          <Link className="font-bold text-lg bg-white" href={`/top-sellers`}>
            SELLERS
          </Link>
          <div className="ml-1 row-span-1 h-full overflow-y-auto bg-white ">
            {sellers?.map((seller, index) => (
              <Link href={`/sellers/${seller.id}`} key={seller.instagramHandle}>
                <p
                  className={cn(
                    "flex justify-start text-sm font-medium text-light-font transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                    isSellerSelected(seller.id)
                      ? "rounded-md w-full flex text-black underline transition-transform animate-pulse"
                      : "text-light-font"
                  )}
                >
                  {seller.instagramHandle.toUpperCase()}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="row-span-1 h-full p-1">
          <Link className="font-bold text-lg bg-white" href={`/designers`}>
            DESIGNERS
          </Link>
          <div className="ml-1 row-span-1 h-full overflow-y-auto bg-white ">
            {designers?.map((designer, index) => (
              <Link href={`/designers/${designer.id}`} key={designer.name}>
                <p
                  className={cn(
                    "flex justify-start text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                    isDesignerSelected(designer.id)
                      ? "rounded-md w-full flex text-black underline transition-transform animate-pulse"
                      : "text-light-font"
                  )}
                >
                  {designer.name.toUpperCase()}
                </p>
              </Link>
            ))}
          </div>
        </div>
        <div className="row-span-1 h-full p-1">
          <Link className="font-bold text-lg bg-white" href={`/categories`}>
            CATEGORIES
          </Link>
          <div className="ml-1 row-span-1 h-full overflow-y-auto bg-white ">
            {categories?.map((category, index) => (
              <Link href={`/categories/${category.id}`} key={category.name}>
                <p
                  className={cn(
                    "flex justify-start text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                    isCategorySelected(category.id)
                      ? "rounded-md w-full flex text-black underline transition-transform animate-pulse"
                      : "text-light-font"
                  )}
                >
                  {category.name.toUpperCase()}
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
