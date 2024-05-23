"use client";

import { useEffect, useState } from "react";

import LikeItem from "./liked-item";
import useLike from "@/hooks/use-like";
import Summary from "../../cart/components/summary";

export const revalidate = 0;

const LikesPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const likes = useLike();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-row md:w-1/2 w-full bg-white justify-center items-center p-1">
      <div className="w-2/3 p-4">
        <h1 className="text-sm font-bold text-black">Your likes</h1>
        {likes.items.length === 0 && (
          <p className="text-neutral-500">No items in your likes.</p>
        )}
        <div>
          {likes.items.map((item) => (
            <LikeItem key={item.id} data={item} />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center w-1/3">

      </div>
    </div>
  );
};

export default LikesPage;
