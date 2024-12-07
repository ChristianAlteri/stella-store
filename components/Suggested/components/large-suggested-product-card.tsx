"use client";

import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import ReactPlayer from "react-player";

interface LargeSuggestedProductCardProps {
  item: Product;
}

const LargeSuggestedProductCard: React.FC<LargeSuggestedProductCardProps> = ({
  item,
}) => {
  const router = useRouter();
  const params = useParams();
  const handleProductClick = () => {
    router.push(
      `/product/${item?.category?.id}/${item?.designer?.id}/${item?.id}/${item?.seller?.id}`
    );
  };

  return (
    <>
      <div className="w-full justify-center items-center flex">
        <div className="relative h-full w-full rounded-md flex justify-center items-center z-30">
          <div className="inset-0 w-full h-full flex justify-center items-center hover:cursor-pointer">
            {item?.images[0]?.url?.match(/https:\/\/.*\.(video|mp4|MP4|mov).*/) ? (
              <ReactPlayer
                key={item?.images?.[0]?.id}
                url={item?.images[0].url}
                width={"100%"}
                loop={true}
                playing={true}
                muted={true}
                alt={`${item.name} from ${item.seller?.storeName} by ${item.designer?.name} in size ${item.size?.name} for $${item.ourPrice} (RRP $${item.retailPrice})`}
                className={`rounded-md transition-opacity duration-200 ease-in-out ${
                  item.isHidden ? "blur-xl" : ""
                }`}
              />
            ) : (
              <>
                <div className="flex">
                  <Image
                    key={item?.images?.[0]?.id}
                    onClick={handleProductClick}
                    height={0}
                    width={200}
                    src={item!.images[0]!.url}
                    alt={`${item.name} from ${item.seller?.storeName} by ${item.designer?.name} in size ${item.size?.name} for $${item.ourPrice} (RRP $${item.retailPrice})`}
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
                  alt={`${item?.name} video from ${item?.seller?.storeName} by ${item?.designer?.name} in size ${item?.size?.name} for $${item?.ourPrice} (RRP $${item?.retailPrice})`}
                  className={`rounded-md transition-opacity duration-200 ease-in-out ${
                    item?.isHidden ? "blur-xl" : ""
                  }`}
                />
              ) : (
                <>
                  <div className="flex ">
                    <Image
                      key={item?.images?.[1]?.id}
                      onClick={handleProductClick}
                      height={0}
                      width={200}
                      src={item?.images?.[1]?.url}
                      alt={`Image of ${item.name} from ${item.seller?.storeName} by ${item.designer?.name} in size ${item.size?.name} for $${item.ourPrice} (RRP $${item.retailPrice})`}
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


          <div className="absolute flex-col justify-center items-center m-5">
            <div className="flex flex-col justify-center items-center  w-full">
              <Link
                href={`/designers/${item?.designer?.id}`}
                className="text-super-small hover:underline underline text-black bg-white opacity-50"
              >
                {item.designer?.name.toUpperCase()}
              </Link>
              {/* <h3
                onClick={handleProductClick}
                className="text-xs hover:underline text-light-font bg-light-background hover:cursor-pointer"
              >
                {item.name}
              </h3>
              <div className="text-xs text-black bg-light-background">{item?.size?.name}</div>
              <div className="flex flex-row gap-1 bg-light-background">
                <h6 onClick={handleProductClick} className="text-xs text-red-500">
                  ${item.ourPrice}
                </h6>
                <h6 className="text-xs text-stone-400">RRP</h6>
                <h6
                  onClick={handleProductClick}
                  className="text-xs text-stone-800 line-through"
                >
                  ${item.retailPrice}
                </h6>
              </div>
              <div className="flex flex-row justify-between items-start text-black text-super-small w-full bg-light-background">
                <h3>{item?.likes} likes</h3>
                <h3>{item?.clicks} views</h3>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LargeSuggestedProductCard;
