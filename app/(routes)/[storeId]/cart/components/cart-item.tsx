'use client';
import Image from "next/image";

import IconButton from "@/components/ui/icon-button";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { useRouter, useParams } from "next/navigation";
import { CiCircleRemove } from "react-icons/ci";
import Link from "next/link";

interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();
  const router = useRouter();
  const params = useParams();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const handleProductClick = () => {
    router.push(
      `/${params.storeId}/product/${data?.category?.id}/${data?.designer?.name}/${data?.id}/${data?.seller?.instagramHandle}`
    );
  };

  return (
    <div className="group py-6 border-b w-full">
      <div className="flex flex-row ">

        <div className="relative overflow-hidden hover:cursor-pointer"
        onClick={handleProductClick}
        >
          {/* If item is marked hidden, we blur it. Used for unreleased products */}
          {data?.images[0]?.url?.match(/https:\/\/.*\.(video|mp4|MP4|mov).*/) ? (
            <video
              height={90}
              width={90}
              muted
              autoPlay
              loop
              key={data?.images?.[0]?.id}
              src={data?.images[0].url}
              className={`rounded-md transition-opacity duration-200 ease-in-out ${
                data.isHidden ? "blur-xl" : ""
              }`}
            ></video>
          ) : (
            <>
              <div className="flex">
                <Image
                  key={data?.images?.[0]?.id}
                  onClick={handleProductClick}
                  height={0}
                  width={100}
                  src={data!.images[0]!.url}
                  alt={`${data.name} from ${data.seller?.storeName} by ${data.designer?.name} in size ${data.size?.name} for £${data.ourPrice} (RRP £${data.retailPrice})`}
                  priority
                  className={`rounded-md transition-opacity duration-200 ease-in-out 
                      ${data.isHidden ? "blur-xl" : ""}`}
                />
              </div>
            </>
          )}
        </div>

        <div className="relative flex flex-1 flex-col justify-between ">
          <div className="absolute z-10 right-0 top-0">
            <IconButton onClick={onRemove} icon={<CiCircleRemove size={20} />} />
          </div>
          <div className="relative pr-9 w-full">
            <div className="flex justify-between">
              <div className="flex flex-col">
                {/* <p
                  className="text-sm ml-4  text-black hover:underline hover:cursor-pointer"
                  onClick={handleProductClick}
                >
                  {data.name}
                </p> */}
                <Link href={`/${params.storeId}/designers/${data.designer.id}`} className="ml-4 md:text-xs text-super-small text-stone-900 hover:underline hover:cursor-pointer">
                  {data.designer.name.toUpperCase()}
                </Link>
                <Link href={`/${params.storeId}/sellers/${data.seller.id}`} className="ml-4 md:text-xs text-super-small mt-2 text-stone-900 hover:underline hover:cursor-pointer">
                  {data.seller.storeName.toUpperCase()}
                </Link>
              </div>
              <p className="ml-4 pl-4 md:text-sm text-super-small text-red-500">
                {" "}
                £{data.ourPrice}{" "}
              </p>
            </div>
            <div className="flex flex-row">
              <div className="flex flex-row justify-center items-center">
                <p className="pl-4 md:text-xs text-super-small  text-stone-500">Size: {data.size.name.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
