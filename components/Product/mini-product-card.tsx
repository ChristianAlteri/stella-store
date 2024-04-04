"use client";
import React, { useState } from "react";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";




interface MiniProductCardProps {
  data: Product[] | undefined;
}

const MiniProductCard: React.FC<MiniProductCardProps> = ({ data }) => {

    const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  return (
    <div className="row-span-1 relative">
      <Link
        href={"/featured"}
        className="flex justify-center text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer"
      >
        Our picks
      </Link>
        {data?.map((product, index) => (
          <div key={product.id}>
            <Link
              href={`/product/${product?.category?.id}/${product?.designer?.id}/${product?.id}/${product?.seller?.id}`}
              className="flex justify-center items-center hover:cursor-pointer"
            >
              <Image
                src={product.images[0].url}
                alt={product.name}
                width={70}
                height={70}
              />
              <div className="absolute flex-col top-0 left-0 w-full h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer">
                <h1 className="text-center text-black">
                  {product.designer.name}
                </h1>
                <h1 className="text-center text-black">{product.name}</h1>
                <h1 className="text-center text-black">{product.ourPrice}</h1>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default MiniProductCard;
