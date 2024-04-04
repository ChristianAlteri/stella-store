"use client";

import { Product } from "@/types";
import Link from "next/link";
import React from "react";
import { CiBadgeDollar } from "react-icons/ci";

interface DetailsCardProps {
  data: Product;
}

const DetailsCard: React.FC<DetailsCardProps> = ({ data }) => {
  console.log(data);
  const descriptionElements = data.description
    .split("- ") // Split the description by the hyphen
    .filter((item) => item.trim() !== "") // Remove any empty strings
    .map((item, index) => (
      <React.Fragment key={index}>
        {index > 0 && (
          <React.Fragment>
            <br />
          </React.Fragment>
        )}
        - {item}
      </React.Fragment>
    ));

  return (
    <div className="flex flex-col m-5">
      <div className="m-2">
        <Link
          href={`/designers/${data?.designer?.id}`}
          className="text-sm hover:underline hover:cursor-pointer underline"
        >
          {data?.designer?.name.toUpperCase()}{" "}
        </Link>
        <h1 className="text-xs p-1">{data?.name}</h1>
      </div>
      <div className="m-2">
        <div className="flex flex-row gap-1">
          <h1 className="text-xs">Sold By </h1>
          <Link
            href={`/sellers/${data?.seller?.id}`}
            className="text-xs hover:underline hover:cursor-pointer underline"
          >
            {" "}
            {data?.seller?.instagramHandle.toUpperCase()}
          </Link>
        </div>
        <div className="p-1">
          <h1 className="text-xs ">In {data?.condition?.name} condition</h1>
          <h1 className="text-xs ">Size {data?.size?.name}</h1>
          <h1 className="text-xs ">Part of the {" "}
            <Link
            href={`/categories/${data?.category?.id}`}
            className="text-xs hover:underline hover:cursor-pointer underline "
          >
             {data?.category?.name.toLowerCase()}
          </Link>
          {" "} collection
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-1 m-2 ">
        <h1 className="text-xs">Description </h1>
        <h1 className="text-xs p-1">{descriptionElements}</h1>
        <h1 className="text-xs">Specs </h1>
        <div className="p-1">
          <h1 className="text-xs">Material: {data?.material?.name}</h1>
          <div className="flex flex-row gap-2">
            <h1 className="text-xs">Colour: </h1>
            <div
              className="h-4 w-4 rounded-sm border border-stone-300"
              style={{ backgroundColor: data?.color?.value }}
            ></div>
          </div>
        </div>
        {data?.isCharity && (
          <>
            <br />
            <div className="flex flex-row p-1">
              <h1 className=" text-xs">
                A percentage of proceeds from this sale will go to charity
                <p>
                    <CiBadgeDollar size={20} />
                </p>
              </h1>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailsCard;
