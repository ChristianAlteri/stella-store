'use client'
import { Product } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SuggestedProductCardProps {
    item?: Product;
  }

const SuggestedProductCard:React.FC<SuggestedProductCardProps> = ({item}) => {
    const router = useRouter();
    const handleProductClick = () => {
        router.push(
        `/product/${item?.category?.id}/${item?.designer?.id}/${item?.id}/${item?.seller?.id}`
        );
    };

    return ( 

        <div className="cols-span-1">
            <div className="relative">
                <Image
                src={item!.images[0].url}
                alt={item!.name}
                width={100}
                height={100}
                className={` transition-opacity duration-200 ease-in-out ${
                    item?.isHidden ? "blur-xl" : ""
                }`}
                />
                <div
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                >
                <div className="flex flex-col justify-center items-center m-5 ">
                    <a
                    href={`/designers/${item?.designer?.id}`}
                    className="text-xs hover:underline underline text-black hover:text-stone-700 bg-stone-200 bg-opacity-60"
                    >
                    {item?.designer?.name.toUpperCase()}
                    </a>
                    <h3
                    onClick={handleProductClick}
                    className="text-xs hover:underline text-black hover:text-stone-700 hover:cursor-pointer bg-stone-200 bg-opacity-60"
                    >
                    {item?.name}
                    </h3>
                    <div className="text-xs text-white  bg-stone-200 bg-opacity-60">
                    {item?.size?.name}
                    </div>
                    <div className="flex flex-row gap-1 bg-stone-200 bg-opacity-60">
                    <h6 className="text-xs text-red-500">£{item?.ourPrice}</h6>
                    <h6 className="text-xs text-stone-400">RRP</h6>
                    <h6 className="text-xs text-stone-800 line-through">
                        £{item?.retailPrice}
                    </h6>
                    </div>
                </div>
                </div>
            </div>
        </div>
     );
}
 
export default SuggestedProductCard;