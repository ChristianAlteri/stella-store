"use client";

import { Designer, Product } from "@/types";
import Image from "next/image";

interface ProductListProps {
//   item: Product  & {
//     designers: Designer;
//   };
  item: Product 
}


const ProductCard: React.FC<ProductListProps> = ({ item }) => {

  return (
    <>
      <div className="bg-white group cursor-pointer rounded-md p-2 ">
        {/* Images and actions */}
        <div className="flex aspect-square rounded-md relative justify-center">
          <Image
            height={600}
            width={100}
            src={item?.images?.[0].url}
            alt={item.name}
            // fill
            // objectFit="fill"
            className="rounded-md relative"
          />
        </div>
        <div className="flex flex-col text-left">
            <h1 className="text-xs hover:underline text-black hover:text-stone-700">{item.designer.name.toUpperCase()}</h1>
            <h3 className="text-xs hover:underline text-black hover:text-stone-700">{item.name}</h3>
            <div className="flex flex-row gap-1">
                <h6 className="text-xs hover:underline text-red-500">£{item.ourPrice}</h6>
                <h6 className="text-xs text-stone-500">from</h6>
                <h6 className="text-xs hover:underline text-stone-500">£{item.retailPrice}</h6>
            </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
