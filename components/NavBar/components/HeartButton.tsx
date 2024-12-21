"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
import useLike from "@/hooks/use-like";
import { Product } from "@/types";
import getCheckoutAndLikes from "@/actions/get-checkout-likes";

interface HeartButtonProps {}

const HeartButton: React.FC<HeartButtonProps> = ({}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [likedProducts, setLikedProducts] = useState<Product[] | undefined>([]);
  const likes = useLike();
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const fetchData = async () => {
        const likedProductIds = likes.items.map((item) => item.id);

        const response = await getCheckoutAndLikes(`${process.env.NEXT_PUBLIC_STORE_ID}`,
          likedProductIds
        );

        setLikedProducts(response);
      };
      fetchData()
    }
  }, [isMounted, products]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="">
      <Button
        onClick={() => router.push(`/likes`)}
        className="flex  flex-row items-center justify-center"
      >
        <span className="p-1 text-super-small text-green-800">
          {likedProducts?.length ?? 0}
        </span>
        <CiHeart
          size={"27px"}
          className="flex flex-row justify-center absolute hover:cursor-pointer hover:text-stone-900 hover:underline"
        />
      </Button>
    </div>
  );
};

export default HeartButton;
