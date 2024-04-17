"use client";

import Link from "next/link";

import { CiCoinInsert, CiHeart } from "react-icons/ci";
import { IoMdTrendingUp } from "react-icons/io";
import { TbPlaneArrival } from "react-icons/tb";
import { RiHome5Line } from "react-icons/ri";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const QuickLinks = () => {
  const pathname = usePathname();
  const isRouteSelected = (route: string) => pathname === route;

  return (
    <>
      <Link
        href="/top-likes"
        className="flex flex-col text-xs justify-center items-center rounded-xl w-full h-2/3 hover:underline"
      >
        <div
          className={cn(
            isRouteSelected("/top-likes")
              ? "bg-light-background w-full flex flex-col justify-center items-center text-light-font text-xs rounded-md h-full p-1 scale-110 transition-transform animate-pulse"
              : "text-stone-300 flex flex-col justify-center items-center"
          )}
        >
          <CiHeart size={20} />
          Top Liked
        </div>
      </Link>
      <Link
        href="/most-viewed"
        className="flex flex-col text-xs justify-center items-center rounded-xl w-full h-2/3 hover:underline"
      >
        <div
          className={cn(
            isRouteSelected("/most-viewed")
              ? "bg-light-background w-full flex flex-col justify-center items-center text-light-font text-xs rounded-md h-full p-1 scale-110 transition-transform animate-pulse"
              : "text-stone-300 flex flex-col justify-center items-center"
          )}
        >
          <IoMdTrendingUp size={20} />
          Trending
        </div>
      </Link>
      <Link
        href="/"
        className="flex flex-col text-xs justify-center items-center rounded-xl w-full h-2/3 hover:underline"
      >
        <div
          className={cn(
            isRouteSelected("/")
              ? "bg-light-background w-full flex flex-col justify-center items-center text-light-font text-xs rounded-md h-full p-1 scale-110 transition-transform animate-pulse"
              : "text-stone-300 flex flex-col justify-center items-center"
          )}
        >
          <TbPlaneArrival size={20} />
          New Arrivals
        </div>
      </Link>
      <Link
        href="/for-you"
        className="flex flex-col text-xs justify-center items-center rounded-xl w-full h-2/3 hover:underline"
      >
        <div
          className={cn(
            isRouteSelected("/for-you")
              ? "bg-light-background w-full flex flex-col justify-center items-center text-light-font text-xs rounded-md h-full p-1 scale-110 transition-transform animate-pulse"
              : "text-stone-300 flex flex-col justify-center items-center"
          )}
        >
          <RiHome5Line size={20} />
          For You
        </div>
      </Link>
      <Link
        href="/sale"
        className="flex flex-col text-xs justify-center items-center rounded-xl w-full h-2/3 hover:underline"
      >
        <div
          className={cn(
            isRouteSelected("/sale")
              ? "bg-light-background w-full flex flex-col justify-center items-center text-light-font text-xs rounded-md h-full p-1 scale-110 transition-transform animate-pulse"
              : "text-stone-300"
          )}
        >
          <CiCoinInsert size={20} />
          Sale
        </div>
      </Link>
    </>
  );
};

export default QuickLinks;
