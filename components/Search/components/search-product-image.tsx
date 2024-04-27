"use client";
import Image from "next/image";
import ReactPlayer from "react-player";
import { Product } from "@/types";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SearchProductImageProps {
  product: Product;
}

const SearchProductImage: React.FC<SearchProductImageProps> = ({ product }) => {
  const router = useRouter();
  const handleProductClick = (product: any) => {
    router.push(
      `/product/${product?.category?.id}/${product?.designer?.name}/${product?.id}/${product?.seller?.instagramHandle}`
    );
  };

  return (
    <div key={product.id} className="flex w-full rounded-md flex-col ">
      <div className="flex-col w-full border border-light-font">
        <div className="w-full justify-center text-center items-center text-super-small hover:underline bg-light-background text-light-font hover:cursor-pointer">
            <Link
            href={`/designers/${product.designer?.id}`}
            className="w-full justify-center text-center items-center text-super-small hover:underline bg-light-background text-light-font hover:cursor-pointer"
            >
            {product.designer?.name}
            </Link>
        </div>

        <div className="inset-0 w-full h-full flex justify-center items-center hover:cursor-pointer">
          {product?.images?.[0]?.url?.match(
            /https:\/\/.*\.(video|mp4|MP4|mov).*/
          ) ? (
            <ReactPlayer
              key={product?.images?.[0]?.id}
              onClick={() => handleProductClick(product)}
              url={product?.images?.[0]?.url}
              width="50%"
              height="50%"
              loop
              playing
              muted
              alt={`${product.name} video from ${product.seller?.instagramHandle} by ${product.designer?.name} in size ${product.size?.name} for £${product.ourPrice} (RRP £${product.retailPrice})`}
              className={`flex h-full fle-col items-center justify-center rounded-md transition-opacity duration-200 ease-in-out ${
                product.isHidden ? "blur-xl" : ""
              }`}
            />
          ) : (
            <>
              <div className="flex">
                <Image
                  key={product?.images?.[0]?.id}
                  onClick={() => handleProductClick(product)}
                  height={0}
                  width={50}
                  src={product?.images?.[0]?.url}
                  alt={`Image of ${product.name} from ${product.seller?.instagramHandle} by ${product.designer?.name} in size ${product.size?.name} for £${product.ourPrice} (RRP £${product.retailPrice})`}
                  priority
                  className={`rounded-md transition-opacity duration-200 ease-in-out ${
                    product.isHidden ? "blur-xl" : ""
                  }`}
                />
              </div>
            </>
          )}
        </div>
        <div className="flex flex-row w-full justify-between p-1 bg-light-background">
          <p
            className="justify-center text-center items-center text-super-small hover:underline hover:cursor-pointer text-light-font"
            onClick={() => handleProductClick(product)}
          >
            {product.name}
          </p>
          <p className="justify-center text-center items-center text-super-small text-red-500">
            £{product.ourPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchProductImage;
