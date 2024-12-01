"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";


const QuickLinks = () => {
  const pathname = usePathname();
  const isRouteSelected = (route: string) => pathname === route;
  const params = useParams();

  return (
    <>
      <Link
        href={`/${params.storeId}`}
        className="flex flex-col lg:text-sm text-super-small justify-center items-center rounded-xl w-full h-full hover:underline "
      >
        <div
          className={cn(
            isRouteSelected(`/${params.storeId}`)
              ? " underline w-full flex flex-col justify-center items-center text-light-font lg:text-sm text-super-small rounded-md h-full"
              : "text-stone-300 flex flex-col justify-center items-center"
          )}
        >
          NEW ARRIVALS
        </div>
      </Link>
      <Link
        href={`/${params.storeId}/top-sellers`}
        className="flex flex-col lg:text-sm text-super-small justify-center items-center rounded-xl w-full h-full hover:underline "
      >
        <div
          className={cn(
            isRouteSelected(`/${params.storeId}/top-sellers`)
              ? "underline w-full flex flex-col justify-center items-center text-light-font lg:text-sm text-super-small rounded-md h-full"
              : "text-stone-300 flex flex-col justify-center items-center w-full"
          )}
        >
          TOP SELLERS
        </div>
      </Link>
      <Link
        href={`/${params.storeId}/trending`}
        className="flex flex-col lg:text-sm text-super-small justify-center items-center rounded-xl w-full h-full hover:underline "
      >
        <div
          className={cn(
            isRouteSelected(`/${params.storeId}/trending`)
              ? " underline w-full flex flex-col justify-center items-center text-light-font lg:text-sm text-super-small rounded-md h-full"
              : "text-stone-300 flex flex-col justify-center items-center w-full"
          )}
        >
          TRENDING ITEMS
        </div>
      </Link>

      <Link
        href={`/${params.storeId}/sale`}
        className="flex flex-col lg:text-sm text-super-small justify-center items-center rounded-xl w-full h-full hover:underline "
      >
        <div
          className={cn(
            isRouteSelected(`/${params.storeId}/sale`)
              ? " underline w-full flex flex-col justify-center items-center text-red-500 lg:text-sm text-super-small rounded-md h-full"
              : "text-red-500 flex flex-col justify-center items-center"
          )}
        >
          SALE
        </div>
      </Link>
    </>
  );
};

export default QuickLinks;
