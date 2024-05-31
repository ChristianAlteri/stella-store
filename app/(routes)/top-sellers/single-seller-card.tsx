"use client";

import { Tooltip } from "@chakra-ui/react";
import { Seller } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { CiBadgeDollar } from "react-icons/ci";
import MiniProductSellerCard from "./mini-seller-product-card";
import SuggestedContainer from "@/components/Suggested/SuggestedContainer";

interface SellerCardProps {
  data: Seller;
  id: string;
}

const SellerCard: React.FC<SellerCardProps> = ({ data }) => {

  const isCharity = true;


  return (
    <div className="p-7 col-span-1 justify-center items-center rounded-sm overflow-hidden hover:cursor-pointer hover:underline">
      <Link href={`/sellers/${data?.id}`}>

        <div className="flex flex-row gap-4"> 
        
          {/* Billboard */}
          {data?.billboard?.imageUrl.match(
            /https:\/\/.*\.(video|mp4|MP4|mov).*/
          ) ? (
            <div
              key={data.billboard.id}
              className="flex w-full justify-center items-center"
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "0.375rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <video
                key={data.billboard.id}
                muted
                autoPlay
                loop
                width={1080}
                height={1350}
                src={`${data?.billboard?.imageUrl}`}
                className="flex justify-center items-center overflow-hidden bg-cover"
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  borderRadius: "0.375rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              ></video>
            </div>
          ) : (
            <div
              key={data.billboard?.id}
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: "0.375rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <Image
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  borderRadius: "0.375rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
                key={data.billboard.id}
                width={1080}
                height={1350}
                src={data?.billboard?.imageUrl}
                alt={data?.name}
              />
            </div>
          )}

            
          {/* Mini product card */}
          {data.products.length > 0 && (
            <MiniProductSellerCard
              data={data.products}
            />
          )}
        {/* <div className="flex-row justify-center items-center w-full hidden md:flex">
          <div className="flex justify-center h-full w-1/2 gap-2">
            {data.products.length > 0 && ( //same seller large screen
              <>
                <div className="flex border-t border-b ">
                  <SuggestedContainer
                    route={`sellers/${data?.id}`}
                    header={`MORE FROM ${data?.instagramHandle.toUpperCase()}`}
                    title={data?.instagramHandle.toUpperCase()}
                    data={data.products}
                  />
                </div>
              </>
            )}
          </div>
        </div> */}

        </div>


        {/* Name */}
        <div className="flex flex-row justify-center items-center gap-2 mt-4">
          <h2 className="text-lg text-black">
            @{data?.instagramHandle.toUpperCase()}
          </h2>
          {isCharity && (
                <div className="flex flex-row text-xs">
                  <Tooltip
                    label="Charity"
                    aria-label="A tooltip"
                    placement="bottom"
                  >
                    <p className="text-green-500 text-xs">
                      <CiBadgeDollar size={25} />
                    </p>
                  </Tooltip>
                </div>
              )}
        </div>
      </Link>
    </div>
  );
};

export default SellerCard;
