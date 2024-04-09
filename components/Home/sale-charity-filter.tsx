"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { cn } from "@/lib/utils";

import { BiHide } from "react-icons/bi";
import { CiBadgeDollar, CiCoinInsert } from "react-icons/ci";

interface SaleCharityFilterProps {}

const SaleCharityFilter: React.FC<SaleCharityFilterProps> = ({}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const onClick = (valueKey: string, id: string) => {
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
  const isOnSaleSelected = searchParams.get("isOnSale") === "true";
  const isCharitySelected = searchParams.get("isCharity") === "true";
  const isHiddenSelected = searchParams.get("isHidden") === "true";

  return (
    <>
      <div className="flex flex-col gap-4 justify-center items-center w-full h-full">
        <div className="flex justify-center items-center gap-4 w-full h-full">
          <div
            key="sale"
            className="flex flex-col justify-center gap-1 items-center text-center text-xs text-stone-500 hover:underline hover:cursor-pointer w-full"
          >
            <div
              className={cn(
                isOnSaleSelected
                  ? "bg-green-200 w-full p-1 rounded-xl h-full text-black scale-110 transition-transform animate-pulse  flex flex-col justify-center items-center"
                  : "text-stone-500 w-full flex flex-col justify-center items-center"
              )}
              onClick={() => onClick("isOnSale", "true")}
            >
              <CiCoinInsert size={20}/>Sale
            </div>
          </div>
          <div
            key="charity"
            className="flex flex-col justify-center gap-1 items-center text-center text-xs text-stone-500 hover:underline hover:cursor-pointer w-full"
          >
            <div
              className={cn(
                isCharitySelected
                  ? "bg-green-200 w-full p-1 rounded-xl h-full text-black scale-110 transition-transform animate-pulse flex flex-col justify-center items-center"
                  : "text-stone-500 w-full flex flex-col justify-center items-center"
              )}
              onClick={() => onClick("isCharity", "true")}
            >
              <CiBadgeDollar size={20}/>Charity
            </div>
          </div>
          <div
            key="hidden"
            className="flex flex-col justify-center gap-1 items-center text-center text-xs text-stone-500 hover:underline hover:cursor-pointer w-full h-full">
            <div
              className={cn(
                isHiddenSelected
                  ? "bg-bubble-gum w-full p-1 rounded-xl h-full text-black scale-110 transition-transform animate-pulse  flex flex-col justify-center items-center"
                  : "text-stone-500  flex flex-col justify-center items-center"
              )}
              onClick={() => onClick("isHidden", "true")}
            >
              <BiHide size={20}/>Unreleased
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SaleCharityFilter;
