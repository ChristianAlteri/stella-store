"use client";

import Link from "next/link";

import { CiCoinInsert, CiHeart } from "react-icons/ci";
import { IoMdTrendingUp } from "react-icons/io";
import { TbPlaneArrival } from "react-icons/tb";
import { RiHome5Line } from "react-icons/ri";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SearchQuickLinks = () => {
  const pathname = usePathname();
  const isRouteSelected = (route: string) => pathname === route;

  return (
    <>
      <Link
        href="/top-likes"
        className="flex flex-col justify-center items-center rounded-xl w-full h-2/3 hover:underline"
      >
        <div
          className={cn(
            isRouteSelected("/top-likes")
              ? "bg-light-background w-full flex flex-col justify-center items-center text-light-font rounded-md animate-pulse"
              : "text-black flex flex-col justify-center items-center"
          )}
        >
          <CiHeart size={14} />
          Top Liked
        </div>
      </Link>
      <Link
        href="/most-viewed"
        className="flex flex-col justify-center items-center rounded-xl w-full h-2/3 hover:underline"
      >
        <div
          className={cn(
            isRouteSelected("/most-viewed")
              ? "bg-light-background w-full flex flex-col justify-center items-center text-light-font rounded-md animate-pulse"
              : "text-black flex flex-col justify-center items-center"
          )}
        >
          <IoMdTrendingUp size={14} />
          Trending
        </div>
      </Link>
      <Link
        href="/"
        className="flex flex-col justify-center items-center rounded-xl w-full h-2/3 hover:underline"
      >
        <div
          className={cn(
            isRouteSelected("/")
              ? "bg-light-background w-full flex flex-col justify-center items-center text-light-font rounded-md animate-pulse"
              : "text-black flex flex-col justify-center items-center"
          )}
        >
          <TbPlaneArrival size={14} />
          New 
        </div>
      </Link>
      <Link
        href="/for-you"
        className="flex flex-col justify-center items-center rounded-xl w-full h-2/3 hover:underline"
      >
        <div
          className={cn(
            isRouteSelected("/for-you")
              ? "bg-light-background w-full flex flex-col justify-center items-center text-light-font rounded-md h-full p-1 scale-110 transition-transform animate-pulse"
              : "text-black flex flex-col justify-center items-center"
          )}
        >
          <RiHome5Line size={14} />
          For You
        </div>
      </Link>
      <Link
        href="/sale"
        className="flex flex-col justify-center items-center rounded-xl w-full h-2/3 hover:underline"
      >
        <div
          className={cn(
            isRouteSelected("/sale")
              ? "bg-light-background w-full flex flex-col justify-center items-center text-light-font rounded-md h-full p-1 scale-110 transition-transform animate-pulse"
              : "text-black"
          )}
        >
          <CiCoinInsert size={14} />
          Sale
        </div>
      </Link>
    </>
  );
};

export default SearchQuickLinks;
