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
import FilterModal from "../components/filter-modal";
import GenderFilter from "./gender-filter";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import getGenders from "@/actions/get-genders";
import { set } from "react-hook-form";
import { useEffect, useState } from "react";

interface FooterMobileButtonsProps {
  products?: Product[];
}

const FooterMobileButtons: React.FC<FooterMobileButtonsProps> = ({
  products,
}) => {
  const [genders, setGenders] = useState<Gender[] | null>(null);
  const [isLoadingGenders, setIsLoadingGenders] = useState(true);

  useEffect(() => {
    const fetchGenderData = async () => {
      try {
        setIsLoadingGenders(true);
        const genderData = await getGenders(
          `${process.env.NEXT_PUBLIC_STORE_ID}`
        );
        setGenders(genderData);
        setIsLoadingGenders(false);
      } catch (error) {
        console.error("Failed to fetch footer gender data:", error);
        setIsLoadingGenders(false);
      }
    };

    if (process.env.NEXT_PUBLIC_STORE_ID) {
      fetchGenderData();
    }
  }, []);

  return (
    <div className="flex col-span-4 flex-row w-full h-full justify-center items-center shadow-top p-1">
      <div className="flex flex-col items-center justify-center col-span-1 w-full min-h-[55px] text-xs">
        <FooterSort products={products} />
        SORT
      </div>
      {isLoadingGenders ? (
        <div className="w-full justify-center text-center text-super-small text-muted-foreground">Loading...</div>
      ) : (
        <>
          <div className="text-xs flex items-center justify-center col-span-1 w-full min-h-[55px] z-35 flex-col">
            <GenderFilter
              // icon={<BsGenderMale size={23}/>}
              gender={genders ? genders[0] : undefined}
            />
          </div>
          <div className="text-xs flex-col flex items-center justify-center col-span-1 w-full min-h-[55px] z-35">
            <GenderFilter
              //  icon={<BsGenderFemale size={23}/>}
              gender={genders ? genders[1] : undefined}
            />
          </div>
        </>
      )}
      <div className="text-xs flex flex-col items-center justify-center col-span-1 w-full min-h-[55px]">
        <FilterModal
          genders={genders || undefined}
        />{" "}
        FILTER
      </div>
    </div>
  );
};

export default FooterMobileButtons;
