'use client'

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import { CiHeart, CiRead } from "react-icons/ci";

interface ViewsLikesFilterProps {
  data: Product[] | undefined;
}

const ViewsLikesFilter: React.FC<ViewsLikesFilterProps> = ({ data }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const current = qs.parse(searchParams.toString());
    if (!current.sort) {
      const query = { ...current, sort: "most-liked" };
      const url = qs.stringifyUrl(
        { url: window.location.href, query },
        { skipNull: true }
      );
      router.replace(url);
    }
  }, [searchParams, router]);

  const handleClick = (valueKey: string, id: string | undefined) => {
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

  const isMostLiked = searchParams.get("sort") === "most-liked";
  const isMostViewed = searchParams.get("sort") === "most-viewed";

  return (
    <>
      <div className="flex flex-row justify-center items-center m-2 p-1 gap-2 w-full overflow-auto md:w-1/2">
        <div className="flex flex-col justify-center gap-1 items-center text-center text-xs text-stone-300 hover:cursor-pointer w-full">
          <div
            className={cn(
              isMostLiked
                ? "underline hover:underline hover:cursor-pointer "
                : "text-black"
            )}
            onClick={() => handleClick("sort", "most-liked")}
          >
            <div className="flex flex-row justify-center items-center gap-1">
              TOP LIKED
              <CiHeart size={17} />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-1 items-center text-center text-xs text-stone-300 hover:cursor-pointer w-full">
          <div
            className={cn(
              isMostViewed
                ? "underline hover:underline hover:cursor-pointer "
                : "text-black"
            )}
            onClick={() => handleClick("sort", "most-viewed")}
          >
            <div className="flex flex-row justify-center items-center gap-1">
              TOP VIEWED
              <CiRead size={17}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewsLikesFilter;
