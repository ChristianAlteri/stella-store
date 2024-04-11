"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { cn } from "@/lib/utils";
import { Gender } from "@/types";

interface GenderFilterProps {
  gender: Gender | undefined;
  icon?: React.ReactNode;
}

const GenderFilter: React.FC<GenderFilterProps> = ({ gender, icon }) => {
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
    router.push(url);
  };
  const isSelected = searchParams.get("genderId") === gender?.id;

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center h-full">
        <div className="flex justify-center items-center text-center flex-row w-full h-full text-xs">
          <br />

          <div
            key={gender?.name}
            className="flex justify-center items-center flex-col w-full h-full"
          >
            <div
              className={cn(
                "w-full h-full flex flex-col justify-center items-center text-center text-xs text-white hover:underline hover:cursor-pointer",
                isSelected
                ? "bg-stella-green w-4/5 flex justify-center items-center text-white text-xs rounded-md h-full p-1 scale-110 transition-transform animate-pulse"
                  : "text-stone-700 w-4/5 text-xs h-full scale-90" 
              )}
              onClick={() => {
                if (gender) {
                  onClick("genderId", gender?.id);
                }
              }}
            >
             {icon}{gender?.name} 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GenderFilter;
