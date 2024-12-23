"use client";

import { Product } from "@/types";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCardButton from "./ProductCardButton";
import { CiHeart, CiRead, CiShoppingCart } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MouseEventHandler, useState } from "react";
import useCart from "@/hooks/use-cart";
import useLike from "@/hooks/use-like";
import axios from "axios";
import ReactPlayer from "react-player";

interface ProductCardProps {
  item: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const router = useRouter();
  const cart = useCart();
  const likes = useLike();
  const [isLoading, setIsLoading] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(item);
  };

  const onLikeButton = async (item: Product) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${item.id}/likes`,
        { likes: item.likes! + 1 }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onClickButton = async (item: Product) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${item.id}/clicks`,
        { clicks: item.clicks! + 1 }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const onAddToLikes: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();
    likes.addItem(item);
    onLikeButton(item);
  };

  const handleProductClick = () => {
    router.push(
      `/product/${item?.category?.id}/${item?.designer?.id}/${item?.id}/${item?.seller?.id}`
    );
  };

  if (isLoading) {
    return <ProductCardSkeleton />;
  }

  return (
    <div
      className="bg-white rounded-md col-span-1 w-full"
      onClick={() => onClickButton(item)}
    >
      <div className="relative h-full w-full rounded-md flex justify-center items-center z-30 p-2">
        <div className="inset-0 w-full h-full flex justify-center items-center hover:cursor-pointer">Image</div>
      </div>

      <ProductCardInfo
        item={item}
        onAddToCart={onAddToCart}
        onAddToLikes={onAddToLikes}
        handleProductClick={handleProductClick}
      />
    </div>
  );
};

const ProductCardInfo: React.FC<{
  item: Product;
  onAddToCart: MouseEventHandler<HTMLButtonElement>;
  onAddToLikes: MouseEventHandler<HTMLButtonElement>;
  handleProductClick: () => void;
}> = ({ item, onAddToCart, onAddToLikes, handleProductClick }) => (
  <>
    <div className="lg:flex flex-col hidden p-1 m-1">
      <div className="flex flex-row justify-between text-gray-500 w-full ">
        <div className="flex flex-row w-full gap-1 items-center">
          <div className="text-stone-500 hover:cursor-pointer hover:text-black text-xs">
            <ProductCardButton
              icon={<CiHeart size={18} />}
              onClick={onAddToLikes}
            />
          </div>
          <h3 className="text-xs">{item?.likes}</h3>
        </div>
        <div className="flex flex-row w-full gap-1 justify-end p-1 text-stone-500 items-center">
          <CiRead size={18} />
          <h3 className="text-xs">{item?.clicks}</h3>
        </div>
      </div>

      <div className="flex justify-between text-left">
        <div
          onClick={handleProductClick}
          className="text-xs hover:underline hover:cursor-pointer text-black"
        >
          {item.name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </div>
        <Link
          href={`/designers/${item?.designer?.id}`}
          className="text-xs font-bold hover:underline text-black hover:text-stone-700 hover:cursor-pointer"
        >
          {item.designer?.name.toUpperCase()}
        </Link>
      </div>

      <div className="flex justify-between text-left">
        <div className="text-xs text-stone-300 hover:text-stone-700 ">
          Size: {item?.size?.name}
        </div>
      </div>

      <div className="flex flex-row w-full items-center">
        <div className="flex flex-row gap-1 w-full items-center">
          <div className="text-gray-500 hover:cursor-pointer hover:text-black text-xs">
            <ProductCardButton
              icon={<CiShoppingCart size={18} />}
              onClick={onAddToCart}
            />
          </div>
        </div>
        <div className="flex flex-row gap-1 justify-end w-full">
          <h6 onClick={handleProductClick} className="text-xs text-red-500">
            ${item.ourPrice}
          </h6>
          {item.isOnSale && (
            <>
              <h6 className="text-xs">WAS</h6>
              <h6 onClick={handleProductClick} className="text-xs line-through">
                ${item.originalPrice}
              </h6>
            </>
          )}
        </div>
      </div>
    </div>

    <div className="flex flex-col justify-center items-center lg:hidden p-1 m-1">
      <div className="flex flex-row justify-between text-gray-500 w-full ">
        <div className="flex flex-row w-full gap-1 items-center">
          <div className="text-stone-500 hover:cursor-pointer hover:text-black text-super-small">
            <ProductCardButton
              icon={<CiHeart size={18} />}
              onClick={onAddToLikes}
            />
          </div>
          <h3 className="text-super-small">{item?.likes}</h3>
        </div>
        <div className="flex flex-row w-full gap-1 justify-end p-1 text-stone-500 items-center">
          <CiRead size={18} />
          <h3 className="text-super-small">{item?.clicks}</h3>
        </div>
      </div>

      <div
        onClick={handleProductClick}
        className="text-xs hover:underline hover:cursor-pointer text-black"
      >
        {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
      </div>
      <Link
        href={`/designers/${item?.designer?.id}`}
        className="text-xs hover:underline text-black hover:cursor-pointer"
      >
        {item.designer?.name.toUpperCase()}
      </Link>
      <div className="flex flex-row justify-end w-full gap-1">
        <h6 className="text-xs text-red-500">${item.ourPrice}</h6>
        {item.isOnSale && (
          <h6 onClick={handleProductClick} className="text-xs line-through">
            ${item.originalPrice}
          </h6>
        )}
      </div>
      <div className="flex flex-row gap-1 w-full items-center justify-between">
        <div className="flex flex-row gap-1 w-full items-center p-1">
          <div className="text-gray-500 hover:cursor-pointer hover:text-black text-xs">
            <ProductCardButton
              icon={<CiShoppingCart size={18} />}
              onClick={onAddToCart}
            />
          </div>
        </div>

        <div className="flex flex-row gap-1 justify-end text-super-small text-black w-full items-center m-1">
          Size: {item?.size?.name}
        </div>
      </div>
    </div>
  </>
);

const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-md col-span-1 w-full animate-pulse">
    <div className="relative h-[350px] w-full rounded-md flex justify-center items-center z-30 p-2">
      <Skeleton className="h-full w-full rounded-md" />
    </div>
    <div className="p-1 m-1 space-y-2">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="flex justify-between">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </div>
  </div>
);

export default ProductCard;

// "use client";

// import { Product } from "@/types";
// import Image from "next/image";
// import { Skeleton } from "@/components/ui/skeleton";

// import ProductCardButton from "./ProductCardButton";
// import { CiBadgeDollar, CiHeart, CiRead, CiShoppingCart } from "react-icons/ci";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";
// import { MouseEventHandler, useEffect, useState } from "react";
// import useCart from "@/hooks/use-cart";
// import useLike from "@/hooks/use-like";
// import axios from "axios";
// import ReactPlayer from "react-player";
// import ShareButton from "./share-button";
// import { Tooltip } from "@chakra-ui/react";
// import ClothingSkeleton from "../ui/clothing-skeleton";

// interface ProductListProps {
//   item: Product;
// }

// const ProductCard: React.FC<ProductListProps> = ({ item }) => {
//   const router = useRouter();
//   const cart = useCart();
//   const likes = useLike();
//   const params = useParams();

//   // const [isMounted, setIsMounted] = useState(false);
//   const [isImageLoading, setIsImageLoading] = useState(true);
//   const [showSkeleton, setShowSkeleton] = useState(true);

//   const handleImageLoad = () => {
//     setIsImageLoading(false);
//   };

//   // useEffect(() => {
//   //   setIsMounted(true);
//   // }, []);

//   // if (!isMounted) {
//   //   return null;
//   // }

//   const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
//     event.stopPropagation();
//     cart.addItem(item);
//   };

//   const onLikeButton = async (item: any) => {
//     try {
//       await axios.patch(
//         `${process.env.NEXT_PUBLIC_API_URL}/products/${item.id}/likes`,
//         { likes: item?.likes! + 1 }
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const onClickButton = async (item: any) => {
//     try {
//       await axios.patch(
//         `${process.env.NEXT_PUBLIC_API_URL}/products/${item.id}/clicks`,
//         { clicks: item?.clicks! + 1 }
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const onAddToLikes: MouseEventHandler<HTMLButtonElement> = async (event) => {
//     event.stopPropagation();
//     likes.addItem(item);
//     onLikeButton(item);
//   };

//   const handleProductClick = () => {
//     router.push(
//       `/product/${item?.category?.id}/${item?.designer?.id}/${item?.id}/${item?.seller?.id}`
//     );
//   };

//   return (
//     <>
//       <div
//         className="bg-white rounded-md col-span-1 w-full "
//         onClick={() => onClickButton(item)}
//       >
//         {/* images */}
//         <div className="relative h-full w-full rounded-md flex justify-center items-center z-30 p-2">
//           <div className="inset-0 w-full h-full flex justify-center items-center hover:cursor-pointer">
//             {/* If item is marked hidden, we blur it. Used for unreleased products */}
//             {item?.images[0]?.url?.match(
//               /https:\/\/.*\.(video|mp4|MP4|mov).*/
//             ) ? (
//               <ReactPlayer
//                 key={item?.images?.[0]?.id}
//                 url={item?.images[0].url}
//                 width={"100%"}
//                 loop={true}
//                 playing={true}
//                 muted={true}
//                 alt={`${item.name} by ${item.designer?.name} in size ${item.size?.name} for $${item.ourPrice}`}
//                 className={`rounded-md transition-opacity duration-200 ease-in-out ${
//                   item.isHidden ? "blur-xl" : ""
//                 }`}
//               />
//             ) : (
//               <>
//                 <div className="lg:flex hidden">
//                   <Image
//                     key={item?.images?.[0]?.id}
//                     onClick={handleProductClick}
//                     width={1080}
//                     height={1350}
//                     src={item!.images[0]!.url}
//                     alt={`${item.name} by ${item.designer?.name} in size ${item.size?.name} for $${item.ourPrice}`}
//                     priority
//                     className={`rounded-md transition-opacity duration-200 ease-in-out
//                     ${item.isHidden ? "blur-xl" : ""}`}
//                     onLoad={handleImageLoad}
//                   />
//                 </div>
//                 <div className="flex lg:hidden">
//                   <Image
//                     key={item?.images?.[0]?.id}
//                     onClick={handleProductClick}
//                     width={1080}
//                     height={1350}
//                     src={item!.images[0]!.url}
//                     alt={`${item.name} by ${item.designer?.name} in size ${item.size?.name} for $${item.ourPrice}`}
//                     priority
//                     className={`rounded-md transition-opacity duration-200 ease-in-out
//                     ${item.isHidden ? "blur-xl" : ""}`}
//                     onLoad={handleImageLoad}
//                   />
//                 </div>
//               </>
//             )}
//           </div>
//           {/* Hover Image or Video */}
//           {item?.images[1] && (
//             <div className="absolute inset-0 flex justify-center items-center hover:opacity-100 hover:cursor-pointer opacity-0 transition-opacity duration-200 ease-in-out">
//               {item?.images?.[1]?.url?.match(
//                 /https:\/\/.*\.(video|mp4|MP4|mov).*/
//               ) ? (
//                 <ReactPlayer
//                   key={item?.images?.[1]?.id}
//                   onClick={handleProductClick}
//                   url={item?.images?.[1]?.url}
//                   width="100%"
//                   loop
//                   playing
//                   muted
//                   alt={`${item.name} video by ${item.designer?.name} in size ${item.size?.name} for $${item.ourPrice}`}
//                   className={`rounded-md transition-opacity duration-200 ease-in-out ${
//                     item.isHidden ? "blur-xl" : ""
//                   }`}
//                 />
//               ) : (
//                 <>
//                   <div className="lg:flex hidden">
//                     <Image
//                       key={item?.images?.[1]?.id}
//                       onClick={handleProductClick}
//                       width={1080}
//                       height={1350}
//                       src={item?.images?.[1]?.url}
//                       alt={`Image of ${item.name} by ${item.designer?.name} in size ${item.size?.name} for $${item.ourPrice}`}
//                       priority
//                       className={`rounded-md transition-opacity duration-200 ease-in-out ${
//                         item.isHidden ? "blur-xl" : ""
//                       }`}
//                       onLoad={handleImageLoad}
//                     />
//                   </div>
//                   <div className="flex lg:hidden">
//                     <Image
//                       key={item?.images?.[1]?.id}
//                       onClick={handleProductClick}
//                       width={1080}
//                       height={1350}
//                       src={item?.images?.[1]?.url}
//                       alt={`Image of ${item.name} by ${item.designer?.name} in size ${item.size?.name} for $${item.ourPrice}`}
//                       priority
//                       className={`rounded-md transition-opacity duration-200 ease-in-out ${
//                         item.isHidden ? "blur-xl" : ""
//                       }`}
//                       onLoad={handleImageLoad}
//                     />
//                   </div>
//                 </>
//               )}
//             </div>
//           )}
//         </div>

//         {/* large screens */}
//         <div className="lg:flex flex-col hidden p-1 m-1">
//           <div className="flex flex-row justify-between text-gray-500 w-full ">
//             <div className="flex flex-row w-full gap-1 items-center">
//               <div className="text-stone-500 hover:cursor-pointer hover:text-black text-xs">
//                 <ProductCardButton
//                   icon={<CiHeart size={18} />}
//                   onClick={(event) => onAddToLikes(event)}
//                 />
//               </div>
//               <h3 className="text-xs">{item?.likes}</h3>
//             </div>
//             <div className="flex flex-row w-full gap-1 justify-end p-1 text-stone-500 items-center">
//               <CiRead size={18} />
//               <h3 className="text-xs">{item?.clicks}</h3>
//             </div>
//           </div>

//           <div className="flex justify-between text-left">
//             <div
//               onClick={handleProductClick}
//               className="text-xs hover:underline hover:cursor-pointer text-black"
//             >
//               {/* {item.name.charAt(0).toUpperCase() + item.name.slice(1)} */}
//               {item.name
//               .split(' ') // Split the string into an array of words
//               .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
//               .join(' ')
//               }
//             </div>
//             <Link
//               // onClick={handleProductClick}
//               href={`/designers/${item?.designer?.id}`}
//               className="text-xs font-bold hover:underline text-black hover:text-stone-700 hover:cursor-pointer"
//             >
//               {item.designer?.name.toUpperCase()}
//             </Link>
//           </div>

//           {/* <div className="flex justify-end flex-row mt-1"> */}
//           <div className="flex justify-between text-left">
//             {/* <Link
//               href={`/sellers/${item?.seller?.id}`}
//               className="text-xs hover:underline text-black hover:text-stone-700 "
//             >
//               {item.seller?.storeName.toUpperCase()}
//             </Link> */}
//             <div className="text-xs text-stone-300 hover:text-stone-700 ">
//               Size: {item?.size?.name}
//             </div>
//           </div>

//           <div className="flex flex-row w-full items-center">
//             <div className="flex flex-row gap-1 w-full items-center">
//               {/* {item?.isCharity && (
//                 <div className="flex flex-row text-xs">
//                   <Tooltip
//                     label="Charity"
//                     aria-label="A tooltip"
//                     placement="bottom"
//                   >
//                     <p className="text-green-500 text-xs">
//                       <CiBadgeDollar size={18} />
//                     </p>
//                   </Tooltip>
//                 </div>
//               )} */}
//               <div className="text-gray-500 hover:cursor-pointer hover:text-black text-xs">
//                 <ProductCardButton
//                   icon={<CiShoppingCart size={18} />}
//                   onClick={(event) => onAddToCart(event)}
//                 />
//               </div>
//             </div>
//             <div className="flex flex-row gap-1 justify-end w-full">
//               <h6 onClick={handleProductClick} className="text-xs text-red-500">
//                 ${item.ourPrice}
//               </h6>
//               {item.isOnSale && (
//                 <>
//                   <h6 className="text-xs">WAS</h6>
//                   <h6
//                     onClick={handleProductClick}
//                     className="text-xs line-through"
//                   >
//                     ${item.originalPrice}
//                   </h6>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* mobile screens */}
//         <div className="flex flex-col justify-center items-center lg:hidden p-1 m-1">
//           <div className="flex flex-row justify-between text-gray-500 w-full ">
//             <div className="flex flex-row w-full gap-1 items-center">
//               <div className="text-stone-500 hover:cursor-pointer hover:text-black text-super-small">
//                 <ProductCardButton
//                   icon={<CiHeart size={18} />}
//                   onClick={(event) => onAddToLikes(event)}
//                 />
//               </div>
//               <h3 className="text-super-small">{item?.likes}</h3>
//             </div>
//             <div className="flex flex-row w-full gap-1 justify-end p-1 text-stone-500 items-center">
//               <CiRead size={18} />
//               <h3 className="text-super-small">{item?.clicks}</h3>
//             </div>
//           </div>

//           <div
//             onClick={handleProductClick}
//             className="text-xs hover:underline hover:cursor-pointer text-black"
//           >
//             {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
//           </div>
//           <Link
//             // onClick={handleProductClick}
//             href={`/designers/${item?.designer?.id}`}
//             className="text-xs hover:underline text-black hover:cursor-pointer"
//           >
//             {/* {item.designer?.name.charAt(0).toUpperCase() +
//               item.designer?.name.slice(1)} */}
//             {item.designer?.name.toUpperCase()}
//           </Link>
//           <div className="flex flex-row justify-end w-full gap-1">
//             {/* <div className="text-gray-500 hover:cursor-pointer hover:text-black text-xs ">
//               <Link
//                 href={`/sellers/${item?.seller?.id}`}
//                 className="text-xs hover:underline  text-black truncate"
//               >
//                 {item.seller?.storeName.toUpperCase()}
//               </Link>
//             </div> */}
//             <h6 className="text-xs text-red-500">${item.ourPrice}</h6>
//             {item.isOnSale && (
//               <>
//                 <h6
//                   onClick={handleProductClick}
//                   className="text-xs line-through"
//                 >
//                   ${item.originalPrice}
//                 </h6>
//               </>
//             )}
//           </div>
//           <div className="flex flex-row gap-1 w-full items-center justify-between">
//             <div className="flex flex-row gap-1 w-full items-center p-1">
//               <div className="text-gray-500 hover:cursor-pointer hover:text-black text-xs">
//                 <ProductCardButton
//                   icon={<CiShoppingCart size={18} />}
//                   onClick={(event) => onAddToCart(event)}
//                 />
//               </div>
//               {/* {item?.isCharity && (
//                 <div className="flex flex-row text-xs">
//                   <Tooltip
//                     label="Charity"
//                     aria-label="A tooltip"
//                     placement="bottom"
//                   >
//                     <p className="text-green-500 text-xs">
//                       <CiBadgeDollar size={15} />
//                     </p>
//                   </Tooltip>
//                 </div>
//               )} */}
//             </div>

//             <div className="flex flex-row gap-1 justify-end text-super-small text-black w-full items-center m-1">
//               Size: {item?.size?.name}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductCard;
