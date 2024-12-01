"use client";
import Image from "next/image";
import ReactPlayer from "react-player";
import { Product } from "@/types";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface SearchProductImageProps {
  product: Product;
}

const SearchProductImage: React.FC<SearchProductImageProps> = ({ product }) => {
  const router = useRouter();
  const params = useParams();
  const handleProductClick = (product: any) => {
    router.push(
      `${params.storeId}/product/${product?.category?.id}/${product?.designer?.name}/${product?.id}/${product?.seller?.instagramHandle}`
    );
  };

  return (
    <div key={product.id} className="flex w-full rounded-md flex-col ">
      <div className="flex-col w-full border">
        <div className="flex flex-row w-full justify-center items-center p-1">
          <div className="flex flex-row gap-1 w-full justify-center">
            <Link href={`${params.storeId}/sellers/${product.seller.id}`}>
              <p className="w-full justify-center text-center items-center text-super-small hover:underline hover:cursor-pointer">
                {product.seller.storeName.toUpperCase()}
              </p>
            </Link>

            {/* <Link href={`/categories/${product.category.id}`}>
              <p className="w-full justify-center text-center items-center text-super-small hover:underline hover:cursor-pointer">
                {product.category.name.toUpperCase()}
              </p>
            </Link> */}
          </div>
        </div>

        <div className="inset-0 w-full h-full flex justify-center items-center hover:cursor-pointer">
          {product?.images?.[0]?.url?.match(
            /https:\/\/.*\.(video|mp4|MP4|mov).*/
          ) ? (
            <ReactPlayer
              key={product?.images?.[0]?.id}
              onClick={() => handleProductClick(product)}
              url={product?.images?.[0]?.url}
              width="80%"
              height="80%"
              loop
              playing
              muted
              alt={`${product.name} video from ${product.seller?.storeName} by ${product.designer?.name} in size ${product.size?.name} for £${product.ourPrice} (RRP £${product.retailPrice})`}
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
                  width={80}
                  src={product?.images?.[0]?.url}
                  alt={`Image of ${product.name} from ${product.seller?.storeName} by ${product.designer?.name} in size ${product.size?.name} for £${product.ourPrice} (RRP £${product.retailPrice})`}
                  priority
                  className={`rounded-md transition-opacity duration-200 ease-in-out ${
                    product.isHidden ? "blur-xl" : ""
                  }`}
                />
              </div>
            </>
          )}
        </div>

        <div
          className="flex flex-row w-full justify-between p-1"
          onClick={() => handleProductClick(product)}
        >
          <div className="flex flex-row w-full justify-between">
            <Link
              href={`${params.storeId}/designers/${product.designer?.id}`}
              className="w-full justify-center text-center items-center text-super-small hover:underline hover:cursor-pointer"
            >
              {product.designer?.name.toUpperCase()}
            </Link>
            <p className="justify-center text-center items-center text-super-small text-red-500 w-full">
              £{product.ourPrice}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProductImage;
