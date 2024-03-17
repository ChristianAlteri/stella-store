"use client";

import React from "react";

import { cn } from "@/lib/utils";

import { Category, Color, Designer, Product, Seller, Size } from "@/types";
import { useParams } from "next/navigation";
import SortButton from "./sort-button";

interface RightSideProps {
  sizes?: Size[];
  designers?: Designer[];
  categories?: Category[];
  sellers?: Seller[];
  products?: Product[];
  colors?: Color[];
}

const RightSidebar: React.FC<RightSideProps> = ({ 
    designers,
    categories,
    sellers,
    sizes,
    colors,
}) => {

  return (
      <aside className="flex w-1/6 text-left p-3 sticky z-50">
        hiiiiii
        <div className="flex flex-col gap-7 overflow-x-auto w-full ">
          <SortButton
            colors={colors}
            designers={designers}
            categories={categories}
            sellers={sellers}
            sizes={sizes}
          />
        </div>
      </aside>
  );
};

export default RightSidebar;
