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
import { CiSquareRemove } from "react-icons/ci";
import FooterMobileButtons from "./footer-mobile-buttons";
import MobileFilters from "../ui/MobileFilters";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => setIsExpanded((prev) => !prev);

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

  console.log('footer-Sort', designers);

  if (isExpanded) {
    return (
      <>
        <FooterMobileButtons />
      </>
    );
  }

  return (
    <div className="h-full absolute text-xs flex flex-col items-center justify-center col-span-4 w-full border min-h-[56px]">
      <div className="flex flex-row w-full justify-center items-center gap-8 p-3">
        <div
          className="flex flex-row "
          key="latest"
          onClick={() => onClick("latest")}
        >
          Latest
        </div>

        <div
          key="low-to-high"
          className="flex flex-row"
          onClick={() => onClick("low-to-high")}
        >
          Price: Low to high
        </div>

        <div
          key="high-to-low"
          className="flex flex-row"
          onClick={() => onClick("high-to-low")}
        >
          Price: High to low
        </div>
        <div className="flex flex-row">
          <MobileFilters
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
        <div className="h-full flex justify-end" onClick={toggleExpand}>
          <CiSquareRemove size={25} />
        </div>
      </div>
    </div>
  );
};

export default FooterSort;
