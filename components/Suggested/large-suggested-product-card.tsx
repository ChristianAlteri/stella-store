"use client";

import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LargeSuggestedProductCardProps {
  item: Product;
}

const LargeSuggestedProductCard: React.FC<LargeSuggestedProductCardProps> = ({
  item,
}) => {
  const router = useRouter();
  const handleProductClick = () => {
    router.push(
      `/product/${item?.category?.id}/${item?.designer?.id}/${item?.id}/${item?.seller?.id}`
    );
  };

  return (
    <>
      <div className="w-1/2 flex">
        <div className="relative">
          <Image
            src={item!.images[0].url}
            alt={item!.name}
            width={120}
            height={120}
            className={` transition-opacity duration-200 ease-in-out ${
              item?.isHidden ? "blur-xl" : ""
            }`}
          />
          <div className="flex flex-col justify-center items-center m-5">
            <Link
              href={`/designers/${item?.designer?.id}`}
              className="text-xs hover:underline underline text-black"
            >
              {item.designer?.name.toUpperCase()}
            </Link>
            <h3
              onClick={handleProductClick}
              className="text-xs hover:underline text-light-font hover:cursor-pointer"
            >
              {item.name}
            </h3>
            <div className="text-xs text-light-font ">{item?.size?.name}</div>
            <div className="flex flex-row gap-1">
              <h6 onClick={handleProductClick} className="text-xs text-red-500">
                £{item.ourPrice}
              </h6>
              <h6 className="text-xs text-stone-400">RRP</h6>
              <h6
                onClick={handleProductClick}
                className="text-xs text-stone-800 line-through"
              >
                £{item.retailPrice}
              </h6>
            </div>
            <div className="flex flex-row justify-between items-start text-black text-super-small w-3/4">
              <h3>{item?.likes} likes</h3>
              <h3>{item?.clicks} views</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LargeSuggestedProductCard;
