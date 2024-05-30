"use client";

import { Product } from "@/types";
import Image from "next/image";

import ProductCardButton from "./ProductCardButton";
import {
  CiBadgeDollar,
  CiCoinInsert,
  CiDiscount1,
  CiHeart,
  CiRead,
  CiShoppingCart,
} from "react-icons/ci";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import useLike from "@/hooks/use-like";
import axios from "axios";
import ReactPlayer from "react-player";
import ShareButton from "./share-button";
import { Tooltip } from "@chakra-ui/react";

interface ProductListProps {
  item: Product;
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

  return (
    <>
      <div
        className="bg-white rounded-md col-span-1 w-full "
        onClick={() => onClickButton(item)}
      >
        {/* share */}
        {/* <div className="lg:flex hidden gap-1 flex-row w-full mb-2 justify-center md:justify-between">
          <div className="flex w-full justify-center">
            <div className="text-stone-500 hover:scale-110 hover:cursor-pointer hover:text-black">
              <ProductCardButton
                icon={<CiHeart />}
                onClick={(event) => onAddToLikes(event)}
              />
            </div>
          </div>

          <div className="flex w-full justify-center">
            <div className="text-stone-500 hover:scale-110 hover:cursor-pointer hover:text-black">
              <ShareButton
                url={`${process.env.NEXT_PUBLIC_SITE_URL}/product/${item?.category?.id}/${item?.designer?.id}/${item?.id}/${item?.seller?.id}`}
              />
            </div>
          </div>

          <div className="flex w-full justify-center">
            <div className="text-stone-800 hover:scale-110 hover:cursor-pointer hover:text-black">
              <ProductCardButton
                icon={<CiShoppingCart />}
                onClick={(event) => onAddToCart(event)}
              />
            </div>
          </div>
        </div> */}
        
        {/* images */}
        <div className="relative h-full w-full rounded-md flex justify-center items-center z-30 p-2">
          <div className="inset-0 w-full h-full flex justify-center items-center hover:cursor-pointer">
            {/* If item is marked hidden, we blur it. Used for unreleased products */}
            {item?.images[0]?.url?.match(
              /https:\/\/.*\.(video|mp4|MP4|mov).*/
            ) ? (
              <ReactPlayer
                key={item?.images?.[0]?.id}
                url={item?.images[0].url}
                width={"100%"}
                loop={true}
                playing={true}
                muted={true}
                alt={`${item.name} from ${item.seller?.instagramHandle} by ${item.designer?.name} in size ${item.size?.name} for £${item.ourPrice} (RRP £${item.retailPrice})`}
                className={`rounded-md transition-opacity duration-200 ease-in-out ${
                  item.isHidden ? "blur-xl" : ""
                }`}
              />
            ) : (
              <>
                <div className="lg:flex hidden">
                  <Image
                    key={item?.images?.[0]?.id}
                    onClick={handleProductClick}
                    width={1920}
                    height={1080}
                    src={item!.images[0]!.url}
                    alt={`${item.name} from ${item.seller?.instagramHandle} by ${item.designer?.name} in size ${item.size?.name} for £${item.ourPrice} (RRP £${item.retailPrice})`}
                    priority
                    className={`rounded-md transition-opacity duration-200 ease-in-out 
                    ${item.isHidden ? "blur-xl" : ""}`}
                  />
                </div>
                <div className="flex lg:hidden">
                  <Image
                    key={item?.images?.[0]?.id}
                    onClick={handleProductClick}
                    width={1920}
                    height={1080}
                    src={item!.images[0]!.url}
                    alt={`${item.name} from ${item.seller?.instagramHandle} by ${item.designer?.name} in size ${item.size?.name} for £${item.ourPrice} (RRP £${item.retailPrice})`}
                    priority
                    className={`rounded-md transition-opacity duration-200 ease-in-out 
                    ${item.isHidden ? "blur-xl" : ""}`}
                  />
                </div>
              </>
            )}
          </div>
          {/* Hover Image or Video */}
          {item?.images[1] && (
            <div className="absolute inset-0 flex justify-center items-center hover:opacity-100 hover:cursor-pointer opacity-0 transition-opacity duration-200 ease-in-out">
              {item?.images?.[1]?.url?.match(
                /https:\/\/.*\.(video|mp4|MP4|mov).*/
              ) ? (
                <ReactPlayer
                  key={item?.images?.[1]?.id}
                  onClick={handleProductClick}
                  url={item?.images?.[1]?.url}
                  width="100%"
                  loop
                  playing
                  muted
                  alt={`${item.name} video from ${item.seller?.instagramHandle} by ${item.designer?.name} in size ${item.size?.name} for £${item.ourPrice} (RRP £${item.retailPrice})`}
                  className={`rounded-md transition-opacity duration-200 ease-in-out ${
                    item.isHidden ? "blur-xl" : ""
                  }`}
                />
              ) : (
                <>
                  <div className="lg:flex hidden">
                    <Image
                      key={item?.images?.[1]?.id}
                      onClick={handleProductClick}
                      width={1920}
                      height={1080}
                      src={item?.images?.[1]?.url}
                      alt={`Image of ${item.name} from ${item.seller?.instagramHandle} by ${item.designer?.name} in size ${item.size?.name} for £${item.ourPrice} (RRP £${item.retailPrice})`}
                      priority
                      className={`rounded-md transition-opacity duration-200 ease-in-out ${
                        item.isHidden ? "blur-xl" : ""
                      }`}
                    />
                  </div>
                  <div className="flex lg:hidden">
                    <Image
                      key={item?.images?.[1]?.id}
                      onClick={handleProductClick}
                      width={1920}
                      height={1080}
                      src={item?.images?.[1]?.url}
                      alt={`Image of ${item.name} from ${item.seller?.instagramHandle} by ${item.designer?.name} in size ${item.size?.name} for £${item.ourPrice} (RRP £${item.retailPrice})`}
                      priority
                      className={`rounded-md transition-opacity duration-200 ease-in-out ${
                        item.isHidden ? "blur-xl" : ""
                      }`}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* large screens */}
        <div className="lg:flex flex-col hidden p-1 m-1">
        <div className="flex flex-row justify-between text-gray-500 w-full ">
            <div className="flex flex-row w-full gap-1 ">
              <div className="text-stone-500 hover:scale-110 hover:cursor-pointer hover:text-black">
                <ProductCardButton
                  icon={<CiHeart />}
                  onClick={(event) => onAddToLikes(event)}
                  />
              </div>
              <h3
              className="text-super-small"
              >{item?.likes}</h3>
            </div>
            <div className="flex flex-row w-full gap-1 justify-end ">
              <div className="text-stone-500 hover:scale-110 hover:cursor-pointer hover:text-black">
                <CiRead />
              </div>
              <h3
              className="text-super-small"
              >{item?.clicks}</h3>
            </div>
          </div>

          <div className="flex justify-between text-left">
            <Link
              href={`/designers/${item?.designer?.id}`}
              className="text-xs hover:underline text-black hover:text-stone-700"
            >
              {item.seller?.instagramHandle.toUpperCase()}
            </Link>
            <h3
              onClick={handleProductClick}
              className="text-xs font-bold hover:underline text-black hover:text-stone-700 hover:cursor-pointer"
            >
              {item.designer?.name.charAt(0).toUpperCase() +
                item.designer?.name.slice(1)}
            </h3>
          </div>

          <div className="flex justify-end flex-row mt-1">
            {/* <div className="flex flex-row gap-2 items-start text-light-font text-super-small w-full">
              <h3>{item?.likes} likes</h3>
              <h3>{item?.clicks} views</h3>
            </div> */}
            <div className="text-xs text-stone-300 hover:text-stone-700 ">
              {item?.size?.name}
            </div>
          </div>

          <div className="flex flex-row w-full items-center">
            <div className="flex flex-row gap-1 w-full items-center">
              {/* {item?.isOnSale && (
                <div className="flex flex-row">
                  <Tooltip
                    label="On sale"
                    aria-label="A tooltip"
                    placement="bottom"
                  >
                    <p className="text-red-500">
                      <CiCoinInsert size={25} />
                    </p>
                  </Tooltip>
                </div>
              )} */}
              {item?.isCharity && (
                <div className="flex flex-row text-xs">
                  <Tooltip
                    label="Charity"
                    aria-label="A tooltip"
                    placement="bottom"
                  >
                    <p className="text-green-500 text-xs">
                      <CiBadgeDollar size={18} />
                    </p>
                  </Tooltip>
                </div>
              )}
            </div>
            <div className="flex flex-row gap-1 justify-end w-full">
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
        <div className="flex flex-col justify-center items-center lg:hidden p-1 m-1">

          <div className="flex flex-row justify-between  text-gray-500 w-full p-1">
            <div className="flex flex-row w-full gap-1 ">
              <div className="text-stone-500 hover:scale-110 hover:cursor-pointer hover:text-black">
                <ProductCardButton
                  icon={<CiHeart />}
                  onClick={(event) => onAddToLikes(event)}
                  />
              </div>
              <h3
              className="text-super-small"
              >{item?.likes}</h3>
            </div>
            <div className="flex flex-row w-full gap-1 justify-end ">
              <div className="text-stone-500 hover:scale-110 hover:cursor-pointer hover:text-black">
                <CiRead />
              </div>
              <h3
              className="text-super-small"
              >{item?.clicks}</h3>
            </div>
          </div>

          <Link
            href={`/designers/${item?.designer?.id}`}
            className="text-xs hover:underline underline text-black"
          >
            {item.seller?.instagramHandle.toUpperCase()}
          </Link>
          <h3
            onClick={handleProductClick}
            className="text-xs hover:underline text-black hover:cursor-pointer"
          >
            {item.designer?.name.charAt(0).toUpperCase() +
                item.designer?.name.slice(1)}
          </h3>
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
          <div className="flex flex-row gap-1 w-full items-center justify-between">
            <div className="flex flex-row gap-1 w-full items-center p-1">
              {/* {item?.isOnSale && (
                <div className="flex flex-row">
                  <Tooltip
                    label="On sale"
                    aria-label="A tooltip"
                    placement="bottom"
                  >
                    <p className="text-gray-500">
                      <CiDiscount1 size={15} />
                    </p>
                  </Tooltip>
                </div>
              )} */}
              {item?.isCharity && (
                <div className="flex flex-row text-xs">
                  <Tooltip
                    label="Charity"
                    aria-label="A tooltip"
                    placement="bottom"
                  >
                    <p className="text-green-500 text-xs">
                      <CiBadgeDollar size={15} />
                    </p>
                  </Tooltip>
                </div>
              )}
            </div>

            <div className="flex flex-row gap-1 justify-end text-super-small text-black w-full items-center m-1">
              {item?.size?.name}
            </div>

          </div>
          {/* <div className="flex flex-row justify-between items-start text-black text-super-small w-full underline">
            <h3>{item?.likes} likes</h3>
            <h3>{item?.clicks} views</h3>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
