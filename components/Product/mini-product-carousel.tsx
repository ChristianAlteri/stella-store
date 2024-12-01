"use client";

import { Product } from "@/types";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import ReactPlayer from "react-player";

interface MiniProductCarouselProps {
  data: Product[] | undefined;
  miniProductTitle?: string;
  miniProductRoute?: string;
}

const MiniProductCarousel: React.FC<MiniProductCarouselProps> = ({ data, miniProductTitle, miniProductRoute }) => {
  const router = useRouter();
  const params = useParams();

  const handleProductClick = (product: Product) => {
    router.push(
      `${params.storeId}/product/${product?.category?.id}/${product?.designer?.id}/${product?.id}/${product?.seller?.id}`
    );
  };

  return (
    <div className="flex flex-col justify-center items-center mb-4">
     <Link
          href={`${params.storeId}/${miniProductRoute}` || `${params.storeId}/`}
          className="w-1/3 flex justify-center text-sm font-medium transition-colors border shadow-md rounded-md p-1 hover:text-stone-900 hover:underline hover:cursor-pointer mb-3"
        >
        <div className="flex flex-row p-2 z-50 text-xs bg-transparent text-stone-600 ">
            {miniProductTitle}
        </div>
    </Link>
    <Carousel loop autoplay autoplayDelay={2000} className="rounded-xl" placeholder={undefined}>
        {data?.map((product, index) => (
        <div key={index}>
        <div className="grid grid-cols-3 gap-4">
          {data?.slice(index, index + 3).map((product, i) => (
            <div key={i} className={`relative h-full w-full transition-opacity duration-200 ease-in-out ${product?.isCharity ? "blur-xl" : ""}`}>
              <div className="relative">
              {product?.images[0]?.url?.match(/https:\/\/.*\.(video|mp4|MP4|mov).*/)
              ? (
                <ReactPlayer
                  key={product?.images?.[0]?.id}
                  url={product?.images[0].url}
                  width={"100%"}
                  loop={true}
                  playing={true}
                  muted={true}
                  alt={`${product.name} from ${product.seller?.storeName} by ${product.designer?.name} in size ${product.size?.name} for £${product.ourPrice} (RRP £${product.retailPrice})`}
                  className={`rounded-md transition-opacity duration-200 ease-in-out ${
                    product.isHidden ? "blur-xl" : ""
                  }`}
                />
              ) : (
                <div className="flex">
                  <Image
                    key={product?.images?.[0]?.id}
                    onClick={() => handleProductClick(product)}
                    height={0}
                    width={120}
                    src={product!.images[0]!.url}
                    alt={`${product.name} from ${product.seller?.storeName} by ${product.designer?.name} in size ${product.size?.name} for £${product.ourPrice} (RRP £${product.retailPrice})`}
                    priority
                    className={`rounded-md transition-opacity duration-200 ease-in-out 
                      ${product.isHidden ? "blur-xl" : ""}`}
                  />
                </div>
              )}
                {/* <Image src={product.images[0].url} alt={product.name} width={70} height={70} /> */}
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <div className="flex flex-col justify-center items-center m-5">
                    <a href={`${params.storeId}/designers/${product?.designer?.id}`} className="text-xs hover:underline underline text-black hover:text-stone-700 bg-stone-200 bg-opacity-60">
                      {product.designer?.name.toUpperCase()}
                    </a>
                    <h3 className="text-xs hover:underline text-black hover:text-stone-700 hover:cursor-pointer bg-stone-200 bg-opacity-60">
                      {product.name}
                    </h3>
                    <div className="text-xs text-white bg-stone-200 bg-opacity-60">{product?.size?.name}</div>
                    <div className="flex flex-row gap-1 bg-stone-200 bg-opacity-60">
                      <h6 className="text-xs text-red-500">£{product.ourPrice}</h6>
                      <h6 className="text-xs text-stone-400">RRP</h6>
                      <h6 className="text-xs text-stone-800 line-through">£{product.retailPrice}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      ))}
    </Carousel>
    </div>
  );
};

export default MiniProductCarousel;