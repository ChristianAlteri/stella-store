"use client";

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
import FooterSort from "./footer-sort";
import FilterModal from "./filter-modal";
import GenderFilter from "./gender-filter";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";

interface FooterMobileButtonsProps {
  products?: Product[];
  designers?: Designer[];
  categories?: Category[];
  sellers?: Seller[];
  colors?: Color[];
  sizes?: Size[];
  conditions?: Condition[];
  materials?: Material[];
  genders?: Gender[] | undefined;
  subcategories?: Subcategory[];
  onSaleProducts?: Product[];
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
  genders,
  subcategories,
  onSaleProducts,
}) => {

  return (
    <div className="flex col-span-4 flex-row w-full h-full justify-center items-center shadow-top">
    <div
        className="flex flex-col items-center justify-center col-span-1 w-full min-h-[55px] text-xs">
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
          genders={genders}
          subcategories={subcategories}
        />Sort by
      </div>
      <div className="text-xs flex items-center justify-center col-span-1 w-full min-h-[55px] z-35 flex-col">
      <GenderFilter 
      icon={<BsGenderMale size={25}/>}
      gender={genders ? genders[0] : undefined} 
      /> Menswear
      </div>
      <div
        className="text-xs flex-col flex items-center justify-center col-span-1 w-full min-h-[55px] z-35">
       <GenderFilter 
       icon={<BsGenderFemale size={25}/>}
       gender={genders ? genders[1] : undefined} 
       /> Womenswear
      </div>
      <div
        className="text-xs flex flex-col items-center justify-center col-span-1 w-full min-h-[55px]">
        <FilterModal
          colors={colors}
          sizes={sizes}
          conditions={conditions}
          designers={designers}
          sellers={sellers}
          categories={categories}
          materials={materials}
          genders={genders}
          subcategories={subcategories}
          onSaleProducts={onSaleProducts}
          /> Filter by
      </div>
      
    </div>
  );
};

export default FooterMobileButtons;
