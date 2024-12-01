"use client";

import { Tooltip } from "@chakra-ui/react";
import { Seller } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { CiBadgeDollar } from "react-icons/ci";
import MiniProductSellerCard from "./mini-seller-product-card";
import { CiInstagram } from "react-icons/ci";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SellerCardProps {
  data: Seller;
  id: string;
}

const SellerCard: React.FC<SellerCardProps> = ({ data }) => {
  const params = useParams();

  return (
    <div className="p-4 col-span-1 justify-center items-center rounded-sm overflow-hidden ">
      <Link href={`sellers/${data?.id}`}>
        <div className="flex flex-row gap-4">
          {/* Billboard */}
          <Avatar className="w-16 h-16">
              <AvatarImage
                src={data?.billboard?.imageUrl ?? "/default-profile.png"}
                alt={`${data.storeName}`}
              />
              <AvatarFallback>
                {data.storeName[0].toUpperCase()}
                {data.storeName[1].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          {
            /* {data?.billboard?.imageUrl.match( 
            // /https:\/\/.*\.(video|mp4|MP4|mov).*/
            // ) ? (
            // <div
            //   key={data.billboard.id}
            //   className="flex w-full justify-center items-center"
            //   style={{
            //     width: "100%",
            //     height: "100%",
            //     overflow: "hidden",
            //     borderRadius: "0.375rem",
            //     display: "flex",
            //     justifyContent: "center",
            //     alignItems: "center",
            //     margin: "auto",
            //   }}
            // >
            //   <video
            //     key={data.billboard.id}
            //     muted
            //     autoPlay
            //     loop
            //     width={1080}
            //     height={1350}
            //     src={`${data?.billboard?.imageUrl}`}
            //     className="flex justify-center items-center overflow-hidden bg-cover"
            //     style={{
            //       objectFit: "cover",
            //       width: "100%",
            //       height: "100%",
            //       borderRadius: "0.375rem",
            //       display: "flex",
            //       justifyContent: "center",
            //       alignItems: "center",
            //       margin: "auto",
            //     }}
            //   ></video>
            // </div>
            // ) : (
            // <div
            //   key={data.billboard?.id}
            //   style={{
            //     width: "100%",
            //     height: "100%",
            //     overflow: "hidden",
            //     borderRadius: "0.375rem",
            //     display: "flex",
            //     justifyContent: "center",
            //     alignItems: "center",
            //     margin: "auto",
            //   }}
            // >
            //   <Image
            //     style={{
            //       objectFit: "cover",
            //       width: "100%",
            //       height: "100%",
            //       borderRadius: "0.375rem",
            //       display: "flex",
            //       justifyContent: "center",
            //       alignItems: "center",
            //       margin: "auto",
            //     }}
            //     key={data.billboard.id}
            //     width={1080}
            //     height={1350}
            //     src={data?.billboard?.imageUrl}
            //     alt={data?.name}
            //   />
            // </div>
            // )}
            /*/}


          {/* Mini product card */
          }
          {data.products.length > 0 && (
            <MiniProductSellerCard data={data.products} />
          )}
        </div>
      </Link>

      {/* Name */}
      <div className="flex flex-col justify-center items-center mt-2">
        <h2 className="text-sm text-black hover:cursor-pointer hover:underline">
          <Link href={`${params.storeId}/sellers/${data?.id}`}>
            {data?.storeName.toUpperCase()}
          </Link>
        </h2>
      </div>

      <div className="flex flex-row justify-center items-center gap-2">
        <Link
          href={`https://instagram.com/${data?.instagramHandle}`}
          className="text-lg text-black"
          target="_blank"
        >
          <p className="text-red-500 text-xs">
            <CiInstagram size={20} />
          </p>
        </Link>
      </div>

      {data.sellerType === "influencer" ? (
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="flex flex-row text-xs w-2/3 gap-4 justify-between">
            <div className="flex flex-col gap-1">
              {/* <p className="text-black text-super-small text-start justify-start items-start">SIZE GUIDE:</p> */}
              <p className="text-black text-super-small text-start justify-start items-start">
                SHOE: {data?.shoeSizeEU}
              </p>
              <p className="text-black text-super-small text-start justify-start items-start">
                TOP: {data?.topSize.toUpperCase()}
              </p>
              <p className="text-black text-super-small text-start justify-start items-start">
                BOTTOM: {data?.bottomSize.toUpperCase()}
              </p>
            </div>
            {/* TODO: A seller now points to a charity model. update how we access the charity name and url  */}
            {/* {data?.charityName && (
              <div className="flex flex-col gap-1">
                <p className="text-black text-super-small text-end justify-end items-end">
                  DONATES TO:{" "}
                </p>
                <a href={data?.charityUrl} target="_blank">
                  <p className="text-green-500 text-xs text-end justify-end items-end">
                    {" "}
                    {data?.charityName.toUpperCase()}
                  </p>
                </a>
              </div>
            )} */}
          </div>
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center gap-2">
          <div className="flex flex-row text-xs w-2/3 gap-4 justify-between">
            <div className="flex flex-col gap-1 w-full">
              <p className="text-black text-super-small text-center justify-center items-center w-full">
                {data?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerCard;
