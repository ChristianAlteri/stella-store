import Image from "next/image";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";

import IconButton from "@/components/ui/icon-button";
// import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import { IoCloseOutline } from "react-icons/io5";
import useLike from "@/hooks/use-like";
import { useRouter } from "next/navigation";

interface LikedItemProps {
  data: Product;
}

const LikedItem: React.FC<LikedItemProps> = ({
  data
}) => {
  const useLikesFunc = useLike();
  const router = useRouter();

  const onRemove = () => {
    useLikesFunc.removeItem(data.id);
  };

  const handleProductClick = () => {
    router.push(`/product/${data?.category?.id}/${data?.designer?.name}/${data?.id}/${data?.seller?.instagramHandle}`);
}

  return ( 
    <div className="group flex py-6 border-b w-full">
      <div className="relative overflow-hidden">
        <Image
          height={50}
          width={50}
          src={data.images[0].url}
          alt=""
        />
      </div>
      <div className="relative flex flex-1 flex-col justify-between ">
        <div className="absolute z-10 right-0 top-0">
          <IconButton onClick={onRemove} icon={<IoCloseOutline size={15} />} />
        </div>
        <div className="relative pr-9 w-full">
          <div className="flex justify-between">
            <p className="text-sm ml-4 mb-4 text-black hover:underline hover:cursor-pointer"
            onClick={handleProductClick}
            >
              {data.name}
            </p>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row justify-center items-center">
                <p className="ml-4 border-l border-gray-200 pl-4 text-xs text-stone-500">{data.likes} likes</p>
                <p className="ml-4 border-l border-gray-200 pl-4 text-xs text-stone-500"> {data.clicks} interested</p>
              </div>
            <div className="hidden group-hover:cursor-pointer group-hover:flex flex-col mt-1 text-xs">
              <div className="flex">
                <p className="ml-4 border-l border-gray-200 pl-4 text-stone-500"> £{data.ourPrice} </p>
                <p className="ml-4 border-l border-gray-200 pl-4 text-stone-500">{data.designer.name}</p>
                <p className="ml-4 border-l border-gray-200 pl-4 text-stone-500">{data.seller.instagramHandle}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
 
export default LikedItem;
