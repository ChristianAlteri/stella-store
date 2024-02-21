"use client";

import { Designer, Product } from "@/types";
import Image from "next/image";
import ProductCardButton from "./ProductCardButton";
import { CiHeart, CiShare2, CiShoppingCart  } from "react-icons/ci";
import { useRouter } from "next/navigation";


interface ProductListProps {
  item: Product 
}


const ProductCard: React.FC<ProductListProps> = ({ item }) => {
    const router = useRouter();

    const handleProductClick = () => {
        router.push(`/product/${item?.category?.name}/${item?.designer?.name}/${item?.id}/${item?.seller?.instagramHandle}`);
    }

  return (
    <>
      <div onClick={handleProductClick} className="bg-white group cursor-pointer rounded-md p-2 ">
        {/* Actions */}
            <div className="flex flex-col gap-1 justify-end items-end right-0 hover:text-primary">
                {/* Likes */}
                <div className="opacity-20 group-hover:opacity-100">
                <ProductCardButton 
                
                    icon={<CiHeart />}  
                    onClick={() => {console.log('add this to my likes')}}
                />
                </div>

                {/* Share */}
                <div className="opacity-0 group-hover:opacity-100">
                <ProductCardButton 
                    icon={<CiShare2  />}  
                    onClick={() => {console.log('Share this')}}
                    />
                </div>
                {/* Cart */}
                <div className="opacity-0 group-hover:opacity-100">
                <ProductCardButton 
                    icon={<CiShoppingCart  />}  
                    onClick={() => {console.log('Add to cart')}}
                    />
                </div>
            </div>
        <div className="flex aspect-square rounded-md justify-center">
        {/* Image */}
            <Image
                height={600}
                width={100}
                src={item?.images?.[0].url}
                alt={item.name}
                // fill
                // objectFit="fill"
                className="rounded-md "
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
