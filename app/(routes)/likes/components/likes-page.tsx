"use client";

import { useEffect, useState } from "react";

import LikeItem from "./liked-item";
import useLike from "@/hooks/use-like";
import { Product } from "@/types";
import getCheckoutAndLikes from "@/actions/get-checkout-likes";

interface LikesPageProps {}

export const revalidate = 0;

const LikesPage: React.FC<LikesPageProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const likes = useLike();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const fetchData = async () => {
        const likedProductIds = likes.items.map((item) => item.id);

        const response = await getCheckoutAndLikes(
          `${process.env.NEXT_PUBLIC_STORE_ID}`,
          likedProductIds
        );

        setLikedProducts(response);
      };
      fetchData();
    }
  }, [isMounted]);

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row md:w-1/2 w-full bg-white justify-center items-center p-1">
      <div className="w-full p-4">
        <h1 className="text-sm font-bold text-black">Your likes</h1>
        {likedProducts.length === 0 && (
          <p className="text-neutral-500">No items in your likes.</p>
        )}
        <div>
          {likedProducts.map((item) => (
            <LikeItem key={item.id} data={item} />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center w-1/3"></div>
    </div>
  );
};

export default LikesPage;
