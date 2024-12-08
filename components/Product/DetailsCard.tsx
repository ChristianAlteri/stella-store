"use client";

import { Product } from "@/types";
import Link from "next/link";
import React from "react";
import { CiBadgeDollar } from "react-icons/ci";
import BuyNowCard from "./BuyNowCard";
import MiniProductCard from "./mini-product-card";
import { useParams } from "next/navigation";

interface DetailsCardProps {
  data: Product;
  products?: Product[];
}

const DetailsCard: React.FC<DetailsCardProps> = ({ data, products }) => {
  const params = useParams();
  // const descriptionElements = data.description
  //   .split("- ") // Split the description by the hyphen
  //   .filter((item) => item.trim() !== "") // Remove any empty strings
  //   .map((item, index) => (
  //     <React.Fragment key={index}>
  //       {index > 0 && (
  //         <React.Fragment>
  //           <br />
  //         </React.Fragment>
  //       )}
  //       - {item}
  //     </React.Fragment>
  //   ));

  return (
    <>
      <div className="flex flex-col w-full border-t border-light-font mt-3 mb-1">
        <div className="mt-3 flex flex-col w-full">
          <Link
            href={`/designers/${data?.designer?.id}`}
            className="text-2xl font-bold hover:underline hover:cursor-pointer"
          >
            {data?.designer?.name.toUpperCase()}{" "}
          </Link>
          <h1 className="md:text-sm text-md  font-semibold ">
            {data?.name.toUpperCase()}
          </h1>
          <div className=" flex flex-col w-full">
            <h1 className="text-xs flex flex-row text-light-font justify-start w-full">
              {data?.size?.name.toUpperCase()}
            </h1>

            <div className="flex flex-col justify-end w-full gap-1 mt-4">
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-row items-center justify-start w-full gap-1 mt-4">
                  <h1 className=" text-sm text-red-500 font-bold">
                    ${data.ourPrice}
                  </h1>
                  {data.isOnSale && (
                    <>
                      <h6 className="text-xs">WAS</h6>
                      <h6 className="text-xs line-through">
                        ${data.retailPrice}
                      </h6>
                    </>
                  )}
                </div>

                <div className="flex flex-col justify-end w-full gap-1 mt-4 mb-2">
                  {data?.likes === 1 ? (
                    <h1 className="flex text-super-small w-full justify-end">
                      {data?.likes} person has liked this
                    </h1>
                  ) : (
                    <h1 className="flex text-super-small w-full justify-end">
                      {data?.likes} people have liked this
                    </h1>
                  )}
                  <h1 className="flex flex-row text-super-small w-full justify-end">
                    {data?.clicks} have viewed this product
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-light-font mb-1">
          <BuyNowCard data={data} />
        </div>

        <div className="border-t border-light-font mt-3 mb-1">
          <div className="mt-3">
            <div className="flex flex-row gap-1 w-full justify-center items-center">
              {/* <h1 className="md:text-xs text-sm">Sold by: </h1>
              <Link
                href={`/sellers/${data?.seller?.id}`}
                className="md:text-xs font-semibold text-sm hover:underline hover:cursor-pointer underline"
              >
                {" "}
                {data?.seller?.storeName.toUpperCase()}
              </Link> */}
            </div>
            {/* {data?.isCharity && (
              <>
                <div className="flex flex-row w-full">
                  <h1 className="text-super-small flex flex-row w-full justify-start gap-1 items-center">
                    A percentage of proceeds from this sale will go to charity{" "}
                    <p className="text-green-500">
                      <CiBadgeDollar size={20} />
                    </p>
                  </h1>
                </div>
              </>
            )} */}

            <div className="flex flex-row justify-between w-full gap-1 mt-2">
              <div>
                <h1 className="md:text-xs text-sm">DESCRIPTION: </h1>
                <h1 className="md:text-xs text-xs ml-1">
                  {data?.description}
                  {/* {descriptionElements} */}
                </h1>
              </div>

              <div>
                <h1 className="md:text-xs text-sm">SPECS: </h1>
                <div className="">
                  <h1 className="md:text-xs text-sm">
                    Material: {data?.material?.name}
                  </h1>
                  <h1 className="md:text-xs text-sm">
                    Condition: {data?.condition?.name}
                  </h1>
                  <div className="flex flex-row gap-2">
                    <h1 className="md:text-xs text-sm">Colour: </h1>
                    <h1 className="md:text-xs text-sm">
                      Colour: {data?.color?.name}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-col flex w-full justify-center items-center">
              {/* <h1 className="text-xs">In {data?.condition?.name} condition</h1> */}
              <h1 className="text-xs">
                Part of the{" "}
                <Link
                  href={`/categories/${data?.category?.id}`}
                  className="text-xs  hover:underline hover:cursor-pointer underline"
                >
                  {data?.category?.name.toLowerCase()}
                </Link>{" "}
                collection
              </h1>
            </div>
          </div>
        </div>
        {/* <div className="border-t border-light-font mt-3 mb-1 justify-center items-center w-full"></div> */}
        {/* <aside className="flex flex-col w-full justify-center items-center p-4">
          {products && products.length > 0 && (
            <MiniProductCard
              data={products}
              miniProductRoute="/featured"
              miniProductTitle="Our Picks"
            />
          )}
        </aside> */}
      </div>
    </>
  );
};

export default DetailsCard;
