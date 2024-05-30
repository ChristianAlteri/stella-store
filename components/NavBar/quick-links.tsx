"use client";

import Link from "next/link";

import { CiCoinInsert, CiHeart } from "react-icons/ci";
import { IoMdTrendingUp } from "react-icons/io";
import { TbPlaneArrival } from "react-icons/tb";
import { RiHome5Line } from "react-icons/ri";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { IoPersonCircleOutline } from "react-icons/io5";

const QuickLinks = () => {
  const pathname = usePathname();
  const isRouteSelected = (route: string) => pathname === route;

  return (
    <>
      <Link
        href="/"
        className="flex flex-col lg:text-sm text-super-small justify-center items-center rounded-xl w-2/3 h-full hover:underline p-1"
      >
        <div
          className={cn(
            isRouteSelected("/")
              ? " underline w-full flex flex-col justify-center items-center text-light-font lg:text-sm text-super-small rounded-md h-full p-1 transition-transform animate-pulse"
              : "text-stone-300 flex flex-col justify-center items-center"
          )}
        >
          {/* <TbPlaneArrival size={20} /> */}
          NEW ARRIVALS
        </div>
      </Link>
      <Link
        href="/top-sellers"
        className="flex flex-col lg:text-sm text-super-small justify-center items-center rounded-xl w-2/3 h-full hover:underline p-1"
      >
        <div
          className={cn(
            isRouteSelected("/top-sellers")
              ? "underline w-full flex flex-col justify-center items-center text-light-font lg:text-sm text-super-small rounded-md h-full p-1 transition-transform animate-pulse"
              : "text-stone-300 flex flex-col justify-center items-center w-full"
          )}
        >
          {/* <CiHeart size={20} /> */}
          {/* <IoPersonCircleOutline size={20} /> */}
          TOP SELLERS
        </div>
      </Link>
      <Link
        href="/top-likes"
        className="flex flex-col lg:text-sm text-super-small justify-center items-center rounded-xl w-2/3 h-full hover:underline p-1"
      >
        <div
          className={cn(
            isRouteSelected("/top-likes")
              ? " underline w-full flex flex-col justify-center items-center text-light-font lg:text-sm text-super-small rounded-md h-full p-1 transition-transform animate-pulse"
              : "text-stone-300 flex flex-col justify-center items-center w-2/3"
          )}
        >
          {/* <CiHeart size={20} /> */}
          TOP ITEMS
        </div>
      </Link>

      {/* <Link
        href="/most-viewed"
        className="hover: flex flex-col text-xs justify-center items-center rounded-xl w-2/3 h-full hover:underline p-1"
      >
        <div
          className={cn(
            isRouteSelected("/most-viewed")
              ? " underline w-full flex flex-col justify-center items-center text-light-font text-xs rounded-md h-full p-1 transition-transform animate-pulse"
              : "text-stone-300 flex flex-col justify-center items-center"
          )}
        >
          <IoMdTrendingUp size={20} />
          Trending
        </div>
      </Link> */}

      {/* <Link
        href="/for-you"
        className="hover: flex flex-col text-xs justify-center items-center rounded-xl w-2/3 h-full hover:underline p-1"
      >
        <div
          className={cn(
            isRouteSelected("/for-you")
              ? " underline w-full flex flex-col justify-center items-center text-light-font text-xs rounded-md h-full p-1 transition-transform animate-pulse"
              : "text-stone-300 flex flex-col justify-center items-center"
          )}
        >
          <RiHome5Line size={20} />
          For You
        </div>
      </Link> */}
      <Link
        href="/sale"
        className="flex flex-col lg:text-sm text-super-small justify-center items-center rounded-xl w-2/3 h-full hover:underline p-1"
      >
        <div
          className={cn(
            isRouteSelected("/sale")
              ? " underline w-full flex flex-col justify-center items-center text-red-500 lg:text-sm text-super-small rounded-md h-full p-1 transition-transform animate-pulse"
              : "text-red-500 flex flex-col justify-center items-center"
          )}
        >
          {/* <CiCoinInsert size={20} /> */}
          SALE
        </div>
      </Link>
    </>
  );
};

export default QuickLinks;
