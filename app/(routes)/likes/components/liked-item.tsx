import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
// import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { IoClose, IoCloseOutline } from "react-icons/io5";
import useLike from "@/hooks/use-like";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import { CiCircleRemove, CiShare2, CiShoppingCart } from "react-icons/ci";
import ProductCardButton from "@/components/ui/ProductCardButton";
import Link from "next/link";

interface LikedItemProps {
  data: Product;
}

const LikedItem: React.FC<LikedItemProps> = ({ data }) => {
  const useLikesFunc = useLike();
  const router = useRouter();
  const cart = useCart();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  const onRemove = () => {
    useLikesFunc.removeItem(data.id);
  };

  const handleProductClick = () => {
    router.push(
      `/product/${data?.category?.id}/${data?.designer?.name}/${data?.id}/${data?.seller?.instagramHandle}`
    );
  };

  return (
    <div className="group flex py-6 border-b w-full">
      <div className="relative overflow-hidden">
        <Image height={50} width={50} src={data.images[0].url} alt="" />
      </div>
      <div className="relative flex flex-1 flex-col justify-between ">
        <div className="absolute z-10 right-0 top-0">
          <div className="flex flex-col gap-1 justify-between w-full">
            <IconButton
              onClick={onRemove}
              icon={<CiCircleRemove  size={20} />}
            />
            {/* Share */}
            <ProductCardButton
              icon={<CiShare2  size={20} />}
              onClick={() => {
                console.log("Share this");
              }}
            />
           {/* Cart */}
            <ProductCardButton
              icon={<CiShoppingCart  size={20} />}
              onClick={(event: any) => onAddToCart(event)}
              />
          </div>
        </div>
        <div className="relative pr-9 w-full">
          <div className="flex justify-between">
            <p
              className="text-sm ml-4 mb-4 text-black hover:underline hover:cursor-pointer"
              onClick={handleProductClick}
            >
              {data.name}
            </p>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row justify-center items-center">
              <p className="ml-4 border-l border-gray-200 pl-4 text-xs text-stone-500">
                {data.likes} likes
              </p>
              <p className="ml-4 border-l border-gray-200 pl-4 text-xs text-stone-500">
                {" "}
                {data.clicks} interested
              </p>
              <p className="ml-4 border-l border-gray-200 pl-4 text-xs text-stone-500">
                {" "}
                £{data.ourPrice}{" "}
              </p>
              <Link
                href={`/designers/${data?.designer?.id}`}
                className="ml-4 border-l border-gray-200 pl-4 text-xs text-stone-500 hover:underline text-black hover:text-stone-700"
              >
                {data.designer?.name.toUpperCase()}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikedItem;
