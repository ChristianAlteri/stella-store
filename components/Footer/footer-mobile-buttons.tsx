"use client";

import {
  Category,
  Color,
  Condition,
  Designer,
  Material,
  Product,
  Seller,
  Size,
} from "@/types";
import { useState } from "react";
import { CiSliderHorizontal } from "react-icons/ci";
import FooterSort from "./footer-sort";
import Link from "next/link";

interface FooterMobileButtonsProps {
  products?: Product[];
  designers?: Designer[];
  categories?: Category[];
  sellers?: Seller[];
  colors?: Color[];
  sizes?: Size[];
  conditions?: Condition[];
  materials?: Material[];
}

const FooterMobileButtons: React.FC<FooterMobileButtonsProps> = ({
  products,
  designers,
  categories,
  sellers,
  colors,
  sizes,
  conditions,
  materials,
}) => {
  const [isActive, setIsActive] = useState(false);

  const [isFooterSortExpanded, setFooterSortExpanded] = useState(false);
  const toggleFooterSortExpanded = () => {
    setFooterSortExpanded((prev) => !prev);
    setIsActive(!isActive);
  };

  if (isFooterSortExpanded) {
    return (
      <>
        <FooterSort
          valueKey="sort"
          products={products}
          colors={colors}
          sizes={sizes}
          conditions={conditions}
          designers={designers}
          sellers={sellers}
          categories={categories}
          materials={materials}
        />
      </>
    );
  }

  return (
    <>
      <Link
        href={`/sellers`}
        className="text-xs flex items-center justify-center col-span-1 w-full border-t border-b border-r min-h-[65px]"
      >
        Sellers
      </Link>
      <Link
        href={`/designers`}
        className="text-xs flex items-center justify-center col-span-1 w-full border-t border-b border-r min-h-[65px]"
      >
        Designers
      </Link>
      <Link
        href={`/categories`}
        className="text-xs flex items-center justify-center col-span-1 w-full border-t border-b border-r min-h-[65px]"
      >
        Categories
      </Link>
      <div
        className="flex items-center justify-center col-span-1 w-full border-t border-b border-r min-h-[65px]"
        onClick={toggleFooterSortExpanded}
      >
        <CiSliderHorizontal size={16} />
      </div>
    </>
  );
};

export default FooterMobileButtons;
