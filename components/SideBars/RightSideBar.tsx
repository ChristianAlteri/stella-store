"use client";

import React from "react";

import { cn } from "@/lib/utils";

import { Category, Color, Designer, Product, Seller, Size } from "@/types";
import { useParams } from "next/navigation";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SortButton from "./sort-button";
import SortFilter from "./sort-filter";
import FilterButtons from "../ui/FilterButtons";

interface RightSideProps {
  productData?: Product[];
  sizes?: Size[];
  designers?: Designer[];
  categories?: Category[];
  sellers?: Seller[];
  colors?: Color[];
}

const RightSidebar: React.FC<RightSideProps> = ({
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
      <div className="text-sm flex flex-row justify-end w-full mb-3">Refine:</div>
      <div className="flex flex-col justify-center items-center text-end w-full gap-3">
        <FilterButtons valueKey="sizeId" name="Sizes" data={sizes} />
        <FilterButtons valueKey="colorId" name="Colors" data={colors} />
      </div>
    </aside>
  );
};

export default RightSidebar;
