"use client";

import { Product } from "@/types";
import Image from "next/image";

import ProductCardButton from "./ProductCardButton";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import useLike from "@/hooks/use-like";
import axios from "axios";
import ReactPlayer from "react-player";
import ShareButton from "./share-button";

interface ProductListProps {
  item: Product;
}

const ProductCard: React.FC<ProductListProps> = ({ item }) => {
  const router = useRouter();
  const cart = useCart();
  const likes = useLike();

  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

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
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${item.id}/likes`,
        { likes: item?.likes! + 1 }
      );
    } catch (error) {
      console.error(error);
    }
  };
  const onClickButton = async (item: any) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${item.id}/clicks`,
        { clicks: item?.clicks! + 1 }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onAddToLikes: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();
    likes.addItem(item);
    onLikeButton(item);
  };

  const handleProductClick = () => {
    router.push(
      `/product/${item?.category?.id}/${item?.designer?.id}/${item?.id}/${item?.seller?.id}`
    );
  };

  const imageFiles = item?.images?.filter(
    (image) => !image.url.match(/https:\/\/.*\/video.*/)
  );

  return (
    <>
      <div
        className="bg-white rounded-md mt-4 mb-4 p-2 col-span-1 w-full "
        onClick={() => onClickButton(item)}
      >
        <div className="gap-1 flex-row flex w-full p-1 mb-2 justify-center md:justify-between">
          {/* Likes */}
          <div className="flex w-full justify-center">
            <div className="text-stone-500 hover:scale-110 hover:cursor-pointer hover:text-black">
              <ProductCardButton
                icon={<CiHeart />}
                onClick={(event) => onAddToLikes(event)}
              />
            </div>
          </div>
          {/* Share */}
          <div className="flex w-full justify-center">
            <div className="text-stone-500 hover:scale-110 hover:cursor-pointer hover:text-black">
              <ShareButton
                url={`${process.env.NEXT_PUBLIC_SITE_URL}/product/${item?.category?.id}/${item?.designer?.id}/${item?.id}/${item?.seller?.id}`}
              />
            </div>
          </div>
          {/* Cart */}
          <div className="flex w-full justify-center">
            <div className="text-stone-800 hover:scale-110 hover:cursor-pointer hover:text-black">
              <ProductCardButton
                icon={<CiShoppingCart />}
                onClick={(event) => onAddToCart(event)}
              />
            </div>
          </div>
        </div>
        {/* Number of likes and people interested */}
        {/* <div className="gap-1 flex-row flex w-full p-1 mb-2 justify-center md:justify-between">
          <div className="text-xs text-stone-300 hover:text-stone-700 md:flex hidden hover:cursor-pointer  w-full justify-center">
              {item?.likes}
            </div>
            <div className="text-xs text-stone-300 hover:text-stone-700 md:flex hidden hover:cursor-pointer  w-full justify-center">
              {item?.clicks} 
            </div>
        </div> */}

        <div className="relative h-full w-full rounded-md flex justify-center items-center z-30">
          {/* Base Image - always visible */}
          <div className="inset-0 w-full h-full flex justify-center items-center hover:cursor-pointer">
            {/* If item is marked hidden we blur it. Used for unreleased products */}
            <Image
              onClick={handleProductClick}
              height={300}
              width={150}
              // src={item?.images?.[0].url}
              src={imageFiles[0].url}
              alt={item.name}
              priority
              className={`rounded-md transition-opacity duration-200 ease-in-out ${
                item.isCharity ? "blur-xl" : ""
              }`} //TODO: chnage to isHidden
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
                className={`rounded-md ${item.isCharity ? "blur-xl" : ""}`}
              />
            </div>
          )}
          {/* Cloudinary use /video in the url */}
          {item?.images?.map((image) =>
            image.url.match(/https:\/\/.*\/video.*/) ? (
              <div
                key={image.id}
                className={`z-50 absolute inset-0 flex justify-center  hover:opacity-100 hover:cursor-pointer opacity-0 transition-opacity duration-200 ease-in-out overflow-hidden ${
                  item.isCharity ? "blur-xl" : ""
                }`}
              >
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
        {/* large screens */}
        <div className="lg:flex flex-col hidden m-5">
          <div className="flex justify-between text-left mt-3">
            <Link
              href={`/designers/${item?.designer?.id}`}
              className="text-xs hover:underline text-black hover:text-stone-700"
            >
              {item.designer?.name.toUpperCase()}
            </Link>
            <h3
              onClick={handleProductClick}
              className="text-xs hover:underline text-black hover:text-stone-700 hover:cursor-pointer"
            >
              {item.name}
            </h3>
          </div>

          <div className="flex justify-between text-left mt-1">
            <div className="text-xs text-stone-300 hover:text-stone-700 ">
              size {item?.size?.name}
            </div>
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
          </div>
        </div>
        {/* mobile screens */}
        <div className="flex flex-col justify-center items-center lg:hidden m-5">
          <Link
            href={`/designers/${item?.designer?.id}`}
            className="text-xs hover:underline underline text-black hover:text-stone-700"
          >
            {item.designer?.name.toUpperCase()}
          </Link>
          <h3
            onClick={handleProductClick}
            className="text-xs hover:underline text-black hover:text-stone-700 hover:cursor-pointer"
          >
            {item.name}
          </h3>
          <div className="text-xs text-stone-300 hover:text-stone-700 ">
            {item?.size?.name}
          </div>
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
        </div>
      </div>
    </>
  );
};

export default ProductCard;
