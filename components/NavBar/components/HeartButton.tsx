"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/button";
import { CiHeart } from "react-icons/ci";
import useLike from "@/hooks/use-like";
import { Product } from "@/types";

interface HeartButtonProps {
  products: Product[];
}

const HeartButton: React.FC<HeartButtonProps> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [likedProducts, setLikedProducts] = useState<Product[]>([]);
  const likes = useLike();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const likedProductsNotArchived = products.filter(
        (product) => !product.isArchived
      );
      const likedProductIds = likes.items.map((item) => item.id);
      const filteredLikedProducts = likedProductsNotArchived.filter((product) =>
        likedProductIds.includes(product.id)
      );
      setLikedProducts(filteredLikedProducts);
    }
  }, [isMounted, products]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="">
      <Button
        onClick={() => router.push("/likes")}
        className="flex  flex-row items-center justify-center"
      >
        <span className="p-1 text-super-small text-green-800">
          {likedProducts.length}
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
