"use client";

import React from "react";

import { cn } from "@/lib/utils";

import { Category, Color, Designer, Product, Seller, Size } from "@/types";
import { useParams } from "next/navigation";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SortFilter from "./sort-filter";

interface LeftSideProps {
  productData?: Product[];
  sizes?: Size[];
  designers?: Designer[];
  categories?: Category[];
  sellers?: Seller[];
  colors?: Color[];
}

const LeftSidebar: React.FC<LeftSideProps> = ({
  productData,
  designers,
  categories,
  sellers,
  sizes,
  colors,
}) => {
  const pathname = usePathname();
  const params = useParams();

  return (
    
    <aside className="h-full w-full">
      <div className="flex flex-col w-full text-center gap-3">
        <SortFilter valueKey="sort" data={productData} /> 
        <div>
          <Link className="hover:underline" href={`/sellers`}>
            Sellers
          </Link>
          {sellers?.map((seller, index) => (
            <Link href={`/sellers/${seller.id}`} key={seller.instagramHandle}>
              <p
                className={cn(
                  "flex justify-start text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                  pathname === `/seller/${seller.id}`
                    ? "text-stone"
                    : "text-stone-500"
                )}
              >
                {seller.instagramHandle}
              </p>
            </Link>
          ))}
        </div>
        <div>
          <Link className="hover:underline" href={`/designers`}>
            Designers
          </Link>
          {designers?.map((designer, index) => (
            <Link href={`/designers/${designer.id}`} key={designer.name}>
              <p
                className={cn(
                  "flex justify-start text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                  pathname === `/designer/${designer.id}`
                    ? "text-stone"
                    : "text-stone-500"
                )}
              >
                {designer.name}
              </p>
            </Link>
          ))}
        </div>
        <div>
          <Link className="hover:underline" href={`/categories`}>
            Categories
          </Link>
          {categories?.map((category, index) => (
            <Link href={`/categories/${category.id}`} key={category.name}>
              <p
                className={cn(
                  "flex justify-start text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                  pathname === `/category/${category.id}`
                    ? "text-stone"
                    : "text-stone-500"
                )}
              >
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
