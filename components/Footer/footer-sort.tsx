"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
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
import qs from "query-string";
import { CiSliderHorizontal, CiSquareRemove } from "react-icons/ci";
import FooterMobileButtons from "./footer-mobile-buttons";
import MegaSearch from "../Search/mega-search";
import { Drawer } from "@material-tailwind/react";
import { cn } from "@/lib/utils";

interface FooterSortProps {
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
  valueKey: string;
}

const FooterSort: React.FC<FooterSortProps> = ({
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
  valueKey,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const onClick = (id: string | undefined) => {
    const current = qs.parse(searchParams.toString());
    const query = { ...current, [valueKey]: id };
    if (current[valueKey] === id) {
      query[valueKey] = null;
    }
    const url = qs.stringifyUrl(
      { url: window.location.href, query },
      { skipNull: true }
    );
    console.log("url", url);
    router.push(url);
  };

  const isLowToHighSelected = searchParams.get("sort") === "low-to-high";
  const isHighToLowSelected = searchParams.get("sort") === "high-to-low";
  const isLatest = searchParams.get("sort") === "latest";

  return (
    <>
      <div
        onClick={openDrawer}
        className="flex flex-row justify-center text-center text-xs hover:underline hover:cursor-pointer"
      >
        <CiSliderHorizontal className="flex flex-row" size={25} />
      </div>
      <Drawer
        open={open}
        onClose={closeDrawer}
        placement="bottom"
        transition={{
          type: "spring",
          duration: 0.2,
        }}
        className="z-50 bg-white"
        placeholder={undefined}
        size={100}
      >
        <div className="h-full absolute text-xs flex flex-col items-center justify-center col-span-4 w-full border min-h-[65px] mb-7 p-4 bg-white">
          <div className="flex flex-row w-full justify-center items-center gap-8 p-3">
            <div
              className={cn(
                isLatest
                  ? "bg-green-200 w-4/5 p-2 rounded-xl h-full font-bold text-black scale-110 transition-transform animate-pulse "
                  : "text-stone-700 w-4/5 p-2 h-full scale-90"
              )}
              key="latest"
              onClick={() => onClick("latest")}
            >
              Latest
            </div>

            <div
              key="low-to-high"
              className={cn(
                isLowToHighSelected
                  ? "bg-green-200 w-4/5 p-2 rounded-xl h-full font-bold text-black scale-110 transition-transform animate-pulse "
                  : "text-stone-700 w-4/5 p-2 h-full scale-90"
              )}
              onClick={() => onClick("low-to-high")}
            >
              Price: Low
            </div>

            <div
              key="high-to-low"
              className={cn(
                isHighToLowSelected
                  ? "bg-green-200 w-4/5 p-2 rounded-xl h-full font-bold text-black scale-110 transition-transform animate-pulse "
                  : "text-stone-700 w-4/5 p-2 h-full scale-90"
              )}
              onClick={() => onClick("high-to-low")}
            >
              Price: High
            </div>
            <div className="flex flex-row text-stone-700 w-4/5 p-2 h-full scale-90">
              <MegaSearch
                sellers={sellers}
                designers={designers}
                categories={categories}
                sizes={sizes}
                colors={colors}
                products={products}
                materials={materials}
                conditions={conditions}
                genders={genders}
                subcategories={subcategories}
                icon={"More..."}
              />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default FooterSort;
