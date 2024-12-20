"use client";
import { Skeleton } from "../ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-md col-span-1 w-full animate-pulse">
    <div className="relative h-[350px] w-full rounded-md flex justify-center items-center z-30 p-2">
      <Skeleton className="h-full w-full rounded-md" />
    </div>
    <div className="p-1 m-1 space-y-2">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  </div>
  );
};

export default ProductCardSkeleton;
