"use client";

import { Gender, Product } from "@/types";
import React from "react";
import FullScreenFooterFilter from "./full-screen-footer-filter";

interface FullscreenProductFiltersFooterProps {
  productData?: Product[];
  genders?: Gender[];
}

const FullscreenProductFiltersFooter: React.FC<
  FullscreenProductFiltersFooterProps
> = ({ productData, genders }) => {

  return (
    <div className="flex-col justify-center items-center rounded-md w-full h-13 border hidden md:flex bg-transparent opacity-50 hover:opacity-100 hover:bg-white">
      <div className="flex flex-row justify-between items-center w-full">
        <FullScreenFooterFilter 
          womenswear={genders?.[0]}
          menswear={genders?.[1]}
          data={productData}
        />
      </div>
    </div>
  );
};

export default FullscreenProductFiltersFooter;
