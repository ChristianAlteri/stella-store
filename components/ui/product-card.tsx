"use client";

import { Designer, Product } from "@/types";
import Image from "next/image";

import ProductCardButton from "./ProductCardButton";
import { CiHeart, CiShare2, CiShoppingCart  } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import useLike from "@/hooks/use-like";
import axios from "axios";
import ReactPlayer from "react-player";



interface ProductListProps {
  item: Product 
}



const ProductCard: React.FC<ProductListProps> = ({ item }) => {
    const router = useRouter();
    const cart = useCart();
    const likes = useLike();

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.stopPropagation();
        cart.addItem(item);
    };

    const onLikeButton = async (item: any) => {
        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/products/${item.id}/likes`, { likes: item?.likes! + 1 });
        } catch (error) {
            console.error(error);
        }
    }
    const onClickButton = async (item: any) => {
        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/products/${item.id}/clicks`, { clicks: item?.clicks! + 1 });
        } catch (error) {
            console.error(error);
        }
    }

    const onAddTolikes: MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.stopPropagation();
        console.log("Adding item to Likes", item);
        likes.addItem(item);
        onLikeButton(item)
    };


    const handleProductClick = () => {
        router.push(`/product/${item?.category?.id}/${item?.designer?.name}/${item?.id}/${item?.seller?.instagramHandle}`);
    }

    const imageFiles = item?.images?.filter(image => !image.url.match(/https:\/\/.*\/video.*/));


  return (
    <>
      <div className="bg-white rounded-md mt-4 mb-4 p-2"
      onClick={() => onClickButton(item)}
      >
        {/* Actions */}
            <div className="flex flex-col gap-1 justify-end items-end right-0 ">
                {/* Likes */}
                <div className="flex flex-row justify-between w-full">
                    <div className="text-xs text-stone-300 hover:text-stone-700 hidden md:block hover:cursor-pointer">
                        {item?.likes} likes
                    </div>
                    <div className="text-stone-500 hover:scale-110 hover:cursor-pointer hover:text-black">
                    <ProductCardButton 
                        icon={<CiHeart />}  
                        onClick={(event) => onAddTolikes(event)}
                    />
                    </div>
                </div>
                {/* Share */}
                <div className="flex flex-row justify-between w-full">
                    <div className="text-xs text-stone-300 hover:text-stone-700 hidden md:block hover:cursor-pointer">
                        {item?.clicks} people interested
                    </div>
                    <div className="text-stone-500 hover:scale-110 hover:cursor-pointer hover:text-black">
                    <ProductCardButton 
                        icon={<CiShare2  />}  
                        onClick={() => {console.log('Share this')}}
                        />
                    </div>
                </div>
                {/* Cart */}
                <div className="flex flex-row justify-end w-full">
                    <div className="text-stone-800 hover:scale-110 hover:cursor-pointer hover:text-black">
                    <ProductCardButton 
                        icon={<CiShoppingCart  />}  
                        onClick={(event) => onAddToCart(event)}
                        />
                    </div>
                </div>
            </div>
            <div className="relative h-full w-full rounded-md flex justify-center items-center z-20">
                {/* Base Image - always visible */}
                <div className="inset-0 w-full h-full flex justify-center items-center hover:cursor-pointer">
                    <Image
                        onClick={handleProductClick}
                        height={300}
                        width={150}
                        // src={item?.images?.[0].url}
                        src={imageFiles[0].url}
                        alt={item.name}
                        priority
                        className="rounded-md transition-opacity duration-200 ease-in-out"
                    />
                </div>
                {/* Hover Image - only visible on hover */}
                {imageFiles[1] && (
                <div className="absolute inset-0 flex justify-center items-center hover:opacity-100 hover:cursor-pointer opacity-0 transition-opacity duration-200 ease-in-out">
                    <Image
                        onClick={handleProductClick}
                        height={150}
                        width={150}
                        src={imageFiles[1].url}
                        alt={item.name}
                        className="rounded-md"
                    />
                </div>
                )}
                {/* Cloudinary use /video in the url */}
                {item?.images?.map(image => 
                    image.url.match(/https:\/\/.*\/video.*/) ? (
                        <div key={image.id} className="z-0 absolute inset-0 flex justify-center  hover:opacity-100 hover:cursor-pointer opacity-0 transition-opacity duration-200 ease-in-out overflow-hidden">
                            <ReactPlayer
                            url={image.url}
                            objectFit="cover"
                            loop={true}
                            playing={true}
                            muted={true}
                            />
                            
                        </div>
                        ) : null
                        )}
            </div>

        <div className="flex flex-col text-left">
            <Link href={`/designers/${item?.designer?.id}`}className="text-xs hover:underline text-black hover:text-stone-700">{item.designer?.name.toUpperCase()}</Link>
            <h3 onClick={handleProductClick} className="text-xs hover:underline text-black hover:text-stone-700">{item.name}</h3>
            <div className="flex flex-row gap-1">
                <h6 onClick={handleProductClick} className="text-xs text-red-500">£{item.ourPrice}</h6>
                <h6 className="text-xs text-stone-500">from</h6>
                <h6 onClick={handleProductClick} className="text-xs text-stone-500">£{item.retailPrice}</h6>
            </div>
            <div className="text-xs text-stone-300 hover:text-stone-700 hidden md:block hover:cursor-pointer">
                        size {item?.size?.name}
             </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
