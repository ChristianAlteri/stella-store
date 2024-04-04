"use client";

import { Product } from "@/types";
import React, { MouseEventHandler } from "react";
import { CiHeart, CiShare2 } from "react-icons/ci";
import ProductCardButton from "./ProductCardButton";
import ShareButton from "./share-button";
import axios from "axios";
import useLike from "@/hooks/use-like";

interface BuyNowCardProps {
  data: Product;
}

const BuyNowCard: React.FC<BuyNowCardProps> = ({ data }) => {
  const likes = useLike();

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

  const onAddToLikes: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();
    likes.addItem(data);
    onLikeButton(data);
  };

  const descriptionElements = data.description
    .split("- ")
    .map((item, index) => (
      <React.Fragment key={index}>
        {index > 0 && (
          <React.Fragment>
            <br />
          </React.Fragment>
        )}
        {item}
      </React.Fragment>
    ));

  return (
    <div className="flex flex-col gap-3 p-5 w-full">
      <div className="flex flex-row gap-1">
        <h1 className="text-xs text-red-500">£{data.ourPrice}</h1>
        <h1 className="text-xs ">RRP</h1>
        <h1 className="text-xs line-through">£{data.retailPrice}</h1>
      </div>
      <h1 className="flex text-xs  text-stone-300">Shipping included</h1>
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="flex text-xs">{data?.likes} people liked this</h1>
        <h1 className="flex flex-row text-xs">
          {data?.clicks} have viewed this product
        </h1>
      </div>
      <div className="flex flex-row items-center ">
        <button className="bg-stone-900  rounded-sm text-white p-2 w-2/3">
          Buy Now
        </button>
        {/* <div className="w-1/3 "><CiHeart/></div> */}
        <div className="w-1/3 flex flex-col justify-center items-center text-center gap-1">
          <ProductCardButton
            icon={<CiHeart />}
            onClick={(event) => onAddToLikes(event)}
          />
          <ShareButton
            url={`${process.env.NEXT_PUBLIC_SITE_URL}/product/${data?.category?.id}/${data?.designer?.id}/${data?.id}/${data?.seller?.id}`}
          />
        </div>
      </div>
    </div>
  );
};

export default BuyNowCard;
