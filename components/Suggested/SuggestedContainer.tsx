'use client'
import React from "react";
import { Product } from "@/types";
import Link from "next/link";
import SuggestedProductCard from "./suggested-product-card";
import LargeSuggestedProductCard from "./large-suggested-product-card";
import { MdOutlineChevronRight } from "react-icons/md";



interface SuggestedContainerProps {
  data?: Product[];
  title?: string;
  header?: string;
  route?: string;
}

const SuggestedContainer: React.FC<SuggestedContainerProps> = ({
  data,
  title,
  header,
  route,
}) => {

  return (
    <div className="p-6">
      <h1 className="text-black flex flex-row gap-1 text-xs md:text-sm items-center p-1 ">
        {header?.toUpperCase()}
        <Link
          href={`/${route}`}
          className="flex hover:underline hover:cursor-pointer text-black flex-row justify-start items-start text-xs md:text-sm"
        >
          {" "}
          <p className="underline bg-light-background rounded-lg text-light-font text-xs md:text-sm">
            {title?.toUpperCase()}{" "}
          </p> 
        </Link>
        <MdOutlineChevronRight size={20}
        className="flex flex-row justify-center items-center animate-pulse text-xs hover:cursor-pointer hover:underline"
        />
      </h1>

      <div
        className="flex flex-row w-full overflow-x-auto m-1"
        style={{ scrollSnapType: "x mandatory", scrollPadding: "1rem" }}
      >
        {data?.map((item) => (
          <>
            <div className="hidden md:flex col-span-1 flex-shrink-0 w-1/4 mx-2 snap-center">
              <LargeSuggestedProductCard key={item.id} item={item} />
            </div>
            <div className="md:hidden flex col-span-1 flex-shrink-0 w-1/2 md:w-auto mx-2 snap-center">
              <SuggestedProductCard key={item.id} item={item} />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default SuggestedContainer;
