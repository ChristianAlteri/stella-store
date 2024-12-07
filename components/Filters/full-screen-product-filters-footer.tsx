"use client";

import { Gender, Product } from "@/types";
import React, { useEffect, useState } from "react";
import FullScreenFooterFilter from "./full-screen-footer-filter";
import getGenders from "@/actions/get-genders";

interface FullscreenProductFiltersFooterProps {
  productData?: Product[];
}

const FullscreenProductFiltersFooter: React.FC<
  FullscreenProductFiltersFooterProps
> = ({ productData }) => {
  const [genders, setGenders] = useState<Gender[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const data = await getGenders(
          `${process.env.NEXT_PUBLIC_STORE_ID}`
        );
        setGenders(data);
      } catch (error) {
        console.error("Error fetching homepage Genders:", error);
        setGenders([]);
      } finally {
        setLoading(false);
      }
    };

      fetchGenders();
  }, []);

  return (
    <div className="flex-col justify-center items-center rounded-md w-full h-13 border border-black hidden md:flex bg-transparent opacity-50 hover:opacity-100 hover:bg-white">
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
