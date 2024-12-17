"use client";

import { Product } from "@/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiBadgeDollar } from "react-icons/ci";
import BuyNowCard from "./BuyNowCard";
import MiniProductCard from "./mini-product-card";
import { useParams } from "next/navigation";
import getSingleProduct from "@/actions/get-single-product";

interface DetailsCardProps {
  productId: string;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ productId }) => {
  const [productData, setProductData] = useState<Product | null>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productData = await getSingleProduct(productId);
        setProductData(productData);
        setIsLoadingProducts(false);
      } catch (error) {
        console.error("Failed to fetch store data:", error);
        setIsLoadingProducts(false);
      }
    };

    fetchProductData();
  }, []);

  return (
    <>
      {isLoadingProducts ? (
        <div className="h-full w-full justify-center items-center p-7">
          <h1 className="h-full w-full text-sm text-muted-foreground">
            Loading...
          </h1>
        </div>
      ) : (
        <div className="flex flex-col w-full border-t border-light-font mt-3 mb-1">
          <div className="mt-3 flex flex-col w-full">
            <Link
              href={`/designers/${productData?.designer?.id}`}
              className="text-2xl font-bold hover:underline hover:cursor-pointer"
            >
              {productData?.designer?.name.toUpperCase()}{" "}
            </Link>
            <h1 className="md:text-sm text-md  font-semibold ">
              {productData?.name.toUpperCase()}
            </h1>
            <div className=" flex flex-col w-full">
              <h1 className="text-xs flex flex-row text-light-font justify-start w-full">
                {productData?.size?.name.toUpperCase()}
              </h1>

              <div className="flex flex-col justify-end w-full gap-1 mt-4">
                <div className="flex flex-row w-full justify-between">
                  <div className="flex flex-row items-center justify-start w-full gap-1 mt-4">
                    <h1 className=" text-sm text-red-500 font-bold">
                      ${productData?.ourPrice}
                    </h1>
                    {productData?.isOnSale && (
                      <>
                        <h6 className="text-xs">WAS</h6>
                        <h6 className="text-xs line-through">
                          ${productData?.retailPrice}
                        </h6>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col justify-end w-full gap-1 mt-4 mb-2">
                    {productData?.likes === 1 ? (
                      <h1 className="flex text-super-small w-full justify-end">
                        {productData?.likes} person has liked this
                      </h1>
                    ) : (
                      <h1 className="flex text-super-small w-full justify-end">
                        {productData?.likes} people have liked this
                      </h1>
                    )}
                    <h1 className="flex flex-row text-super-small w-full justify-end">
                      {productData?.clicks} have viewed this product
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-light-font mb-1">
            {productData && <BuyNowCard data={productData} />}
          </div>

          <div className="border-t border-light-font mt-3 mb-1">
            <div className="mt-3">
              <div className="flex flex-row gap-1 w-full justify-center items-center"></div>

              <div className="flex flex-row justify-between w-full gap-1 mt-2">
                <div>
                  <h1 className="md:text-xs text-sm">DESCRIPTION: </h1>
                  <h1 className="md:text-xs text-xs ml-1">
                    {productData?.description}
                  </h1>
                </div>

                <div>
                  <h1 className="md:text-xs text-sm">SPECS: </h1>
                  <div className="">
                    <h1 className="md:text-xs text-sm">
                      Material: {productData?.material?.name}
                    </h1>
                    <h1 className="md:text-xs text-sm">
                      Condition: {productData?.condition?.name}
                    </h1>
                    <div className="flex flex-row gap-2">
                      <h1 className="md:text-xs text-sm">Colour: </h1>
                      <h1 className="md:text-xs text-sm">
                        {productData?.color?.name}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-col flex w-full justify-center items-center mt-2">
                <h1 className="text-xs">
                  Part of the{" "}
                  <Link
                    href={`/categories/${productData?.category?.id}`}
                    className="text-xs hover:underline hover:cursor-pointer underline"
                  >
                    {productData?.category?.name.toLowerCase()}
                  </Link>{" "}
                  collection
                </h1>
              </div>
            </div>
          </div>
          <hr className="w-full" />
        </div>
      )}
    </>
  );
};

export default DetailsCard;
