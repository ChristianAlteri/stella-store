"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function ClothingSkeleton({
  isLoading,
}: {
  isLoading: boolean;
}) {
  if (!isLoading) return null;

  return (
    <>
      <Skeleton className="w-full h-40 rounded-md" />
      <Skeleton className="w-3/4 h-4 mt-2" />
    </>
  );
}
