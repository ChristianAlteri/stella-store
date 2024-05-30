"use client";

import { Tooltip } from "@chakra-ui/react";
import { Seller } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { CiBadgeDollar } from "react-icons/ci";
import MiniProductSellerCard from "./mini-seller-product-card";

interface SellerCardProps {
  data: Seller;
  id: string;
}

const SellerCard: React.FC<SellerCardProps> = ({ data }) => {

  const isCharity = true;

  return (
    <div className="col-span-1 relative p-6 rounded-sm overflow-hidden hover:cursor-pointer">
      <Link href={`/sellers/${data?.id}`}>

        <div className="flex flex-row"> 
        
          {data?.billboard?.imageUrl.match(
            /https:\/\/.*\.(video|mp4|MP4|mov).*/
          ) ? (
            <div
              key={data.billboard.id}
              className="flex w-full justify-center items-center"
              style={{
                width: "65%",
                height: "65%",
                overflow: "hidden",
                borderRadius: "0.375rem",
              }}
            >
              <video
                key={data.billboard.id}
                muted
                autoPlay
                loop
                width={1920}
                height={1080}
                src={`${data?.billboard?.imageUrl}`}
                className="flex justify-center items-center overflow-hidden bg-cover"
                style={{
                  objectFit: "cover",
                  width: "65%",
                  height: "65%",
                  borderRadius: "0.375rem",
                }}
              ></video>
            </div>
          ) : (
            <div
              key={data.billboard?.id}
              style={{
                width: "65%",
                height: "65%",
                overflow: "hidden",
                borderRadius: "0.375rem",
              }}
            >
              <Image
                style={{
                  objectFit: "cover",
                  width: "65%",
                  height: "65%",
                  borderRadius: "0.375rem",
                }}
                key={data.billboard.id}
                width={1920}
                height={1080}
                src={data?.billboard?.imageUrl}
                alt={data?.name}
              />
            </div>
          )}
            
          {/* Mini product card */}
          <MiniProductSellerCard
            data={data.products}
          />
        </div>


        {/* Name */}
        <div className="flex flex-row justify-center items-center gap-2 mt-2">
          <h2 className="text-2xl font-bold text-black">
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
                      <CiBadgeDollar size={27} />
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
