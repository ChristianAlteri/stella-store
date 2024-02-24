"use client";

import { Designer, Product } from "@/types";
import Image from "next/image";
import ProductCardButton from "./ProductCardButton";
import { CiHeart, CiShare2, CiShoppingCart  } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Link from "next/link";


interface ProductListProps {
  item: Product 
}


const ProductCard: React.FC<ProductListProps> = ({ item }) => {
    // console.log("item",item);
    const router = useRouter();

    const handleProductClick = () => {
        router.push(`/product/${item?.category?.id}/${item?.designer?.name}/${item?.id}/${item?.seller?.instagramHandle}`);
    }

  return (
    <>
      <div className="bg-white group cursor-pointer rounded-md p-2 ">
        {/* Actions */}
            <div className="flex flex-col gap-1 justify-end items-end right-0 hover:text-primary">
                {/* Likes */}
                <div className="flex flex-row justify-between w-full">
                    <div className="opacity-0 group-hover:opacity-100 text-xs text-stone-200 hover:text-stone-500">
                        {item?.likes} people have this in their likes
                    </div>
                    <div className="opacity-20 group-hover:opacity-100">
                    <ProductCardButton 
                        icon={<CiHeart />}  
                        onClick={() => {console.log('add this to my likes')}}
                    />
                    </div>
                </div>

                {/* Share */}
                <div className="flex flex-row justify-between w-full">
                    <div className="opacity-0 group-hover:opacity-100 text-xs text-stone-200 hover:text-stone-500">
                        {item?.clicks} people interested
                    </div>
                    <div className="opacity-0 group-hover:opacity-100">
                    <ProductCardButton 
                        icon={<CiShare2  />}  
                        onClick={() => {console.log('Share this')}}
                        />
                    </div>
                </div>
                {/* Cart */}
                <div className="flex flex-row justify-between w-full">
                    <div className="opacity-0 group-hover:opacity-100 text-xs text-stone-200 hover:text-stone-500">
                        size {item?.size?.name}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100">
                    <ProductCardButton 
                        icon={<CiShoppingCart  />}  
                        onClick={() => {console.log('Add to cart')}}
                        />
                    </div>
                </div>
            </div>
            {/* <div className="flex h-full w-full rounded-md justify-center relative">

                <Image
                    onClick={handleProductClick}
                    height={300}
                    width={300}
                    src={item?.images?.[1].url}
                    alt={item.name}
                    className="opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out"
                />

                <Image
                    onClick={handleProductClick}
                    height={300}
                    width={300}
                    src={item?.images?.[0].url}
                    alt={item.name}
                    className="hover:opacity-0 transition-opacity duration-300 ease-in-out"
                />
            </div> */}
            <div className="relative h-full w-full rounded-md flex justify-center items-center">
                {/* Base Image - always visible */}
                <div className=" inset-0 w-full h-full flex justify-center items-center">
                    <Image
                        onClick={handleProductClick}
                        height={150}
                        width={150}
                        src={item?.images?.[0].url}
                        alt={item.name}
                        className="rounded-md transition-opacity duration-200 ease-in-out"
                    />
                </div>
                {/* Hover Image - only visible on hover */}
                <div className="absolute inset-0 flex justify-center items-center hover:opacity-100 opacity-0 transition-opacity duration-200 ease-in-out">
                    <Image
                        onClick={handleProductClick}
                        height={150}
                        width={150}
                        src={item?.images?.[1].url}
                        alt={item.name}
                        className="rounded-md"
                    />
                </div>
            </div>
        <div className="flex flex-col text-left">

            <Link href={`/designers/${item?.designer?.id}`}className="text-xs hover:underline text-black hover:text-stone-700">{item.designer?.name.toUpperCase()}</Link>
            {/* <Link href={`/designers/${item?.designerId}`}className="text-xs hover:underline text-black hover:text-stone-700">{item.designerId}</Link> */}
            <h3 onClick={handleProductClick} className="text-xs hover:underline text-black hover:text-stone-700">{item.name}</h3>
            <div className="flex flex-row gap-1">
                <h6 onClick={handleProductClick} className="text-xs hover:underline text-red-500">£{item.ourPrice}</h6>
                <h6 className="text-xs text-stone-500">from</h6>
                <h6 onClick={handleProductClick} className="text-xs hover:underline text-stone-500">£{item.retailPrice}</h6>
            </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
