import Image from "next/image";



import IconButton from "@/components/ui/icon-button";

import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

import { useRouter } from "next/navigation";
import { CiCircleRemove } from "react-icons/ci";



interface CartItemProps {
  data: Product;
}

const CartItem: React.FC<CartItemProps> = ({
  data
}) => {
  const cart = useCart();
  const router = useRouter();

  const onRemove = () => {
    cart.removeItem(data.id);
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
          <IconButton onClick={onRemove} icon={<CiCircleRemove  size={20} />} />
        </div>
        <div className="relative pr-9 w-full">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p className="text-sm ml-4  text-black hover:underline hover:cursor-pointer"
              onClick={handleProductClick}
              >
                {data.name}
              </p>
              <p className="ml-4 text-xs text-stone-900">{data.designer.name}</p>
              <p className="ml-4 text-xs mt-2 text-stone-900">sold by {data.seller.instagramHandle}</p>
            </div>
              <p className="ml-4 pl-4 text-sm text-stone-900"> £{data.ourPrice} </p>
          </div>
          <div className="flex flex-row">
            <div className="flex flex-row justify-center items-center">
                <p className="pl-4 text-xs  text-stone-500">{data.size.name}</p>

              </div>
          </div>

        </div>
      </div>
    </div>
  );
}
 
export default CartItem;