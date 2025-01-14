"use client";

import { Product } from "@/types";
import React, { MouseEventHandler } from "react";
import { CiHeart, CiShare2 } from "react-icons/ci";
import ProductCardButton from "./ProductCardButton";
import ShareButton from "./share-button";
import axios from "axios";
import useLike from "@/hooks/use-like";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

interface BuyNowCardProps {
  data: Product;
}

const BuyNowCard: React.FC<BuyNowCardProps> = ({ data }) => {
  const likes = useLike();
  const cart = useCart();
  const router = useRouter();

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

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
    router.push("/cart");
  };

  const onAddToLikes: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();
    likes.addItem(data);
    onLikeButton(data);
  };

  return (
    <div className="flex flex-col gap-3 w-full mt-3">
      <div className="flex flex-row gap-1 justify-start items-start text-start w-full">
        {/* <h1 className=" text-sm text-red-500 font-bold">
          ${data.ourPrice}
        </h1>
        <h1 className=" text-sm">RRP</h1>
        <h1 className=" text-sm line-through">${data.retailPrice}</h1> */}
        {/* {data?.likes === 1 ? (
          <h1 className="flex text-super-small">{data?.likes} person has liked this</h1>
        ) : (
          <h1 className="flex text-super-small">{data?.likes} people have liked this</h1>
        )}
        <h1 className="flex flex-row text-super-small">
          {data?.clicks} have viewed this product
        </h1> */}
      </div>

      <div className="flex flex-row items-center w-full justify-between">
        <button 
        className="bg-light-background rounded-sm text-light-font border border-darker-background font-semibold p-2 w-2/3 hover:bg-darker-background hover:text-white "
        onClick={(event) => onAddToCart(event)}
        >
          Buy Now
        </button>
        <div className="p-3 flex flex-row justify-center items-center text-center gap-5">
          <ProductCardButton
            icon={<CiHeart />}
            onClick={(event) => onAddToLikes(event)}
          />
          <ShareButton
            url={`${process.env.NEXT_PUBLIC_SITE_URL}/product/${data?.category?.id}/${data?.designer?.id}/${data?.id}/${data?.seller?.id}`}
          />
        </div>

      </div>

      <div className="flex flex-row w-2/3 justify-center items-center">
        <h1 className="flex text-super-small justify-center items-center text-stone-300">Shipping details at checkout</h1>
      </div>
    </div>
  );
};

export default BuyNowCard;
