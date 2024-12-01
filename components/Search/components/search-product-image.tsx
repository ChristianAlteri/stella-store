"use client";

import Image from "next/image";
import ReactPlayer from "react-player";
import { Product } from "@/types";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface SearchProductImageProps {
  product: Product;
}

const SearchProductImage: React.FC<SearchProductImageProps> = ({ product }) => {
  const router = useRouter();
  const params = useParams();

  const handleProductClick = (product: Product) => {
    router.push(
      `${params.storeId}/product/${product.category?.id}/${product.designer?.name}/${product.id}/${product.seller?.instagramHandle}`
    );
  };

  const isVideo = product?.images?.[0]?.url?.match(
    /https:\/\/.*\.(video|mp4|MP4|mov).*/
  );

  return (
    <Card className="w-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-2">
        <div className="flex justify-between items-center text-super-small md:text-xs">
          <Link
            href={`${params.storeId}/sellers/${product.seller.id}`}
            className="hover:underline"
          >
            {product.seller.storeName.toUpperCase()}
          </Link>
          <span className="text-red-500 font-semibold text-super-small md:text-xs">
            £{product.ourPrice}
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <AspectRatio ratio={1 / 1} className="relative w-full h-full">
          {isVideo ? (
            <ReactPlayer
              url={product.images[0].url}
              width="100%"
              height="100%"
              loop
              playing
              muted
              onClick={() => handleProductClick(product)}
              className="cursor-pointer"
            />
          ) : (
            <Image
              src={product.images[0].url}
              alt={`${product.name} by ${product.designer?.name}`}
              fill
              className={`object-cover transition-opacity duration-200 ease-in-out cursor-pointer ${
                product.isHidden ? "blur-xl" : ""
              }`}
              onClick={() => handleProductClick(product)}
            />
          )}
        </AspectRatio>
      </CardContent>
      <CardFooter className="p-2 flex justify-between items-center text-super-small md:text-xs">
        <Link
          href={`${params.storeId}/designers/${product.designer?.id}`}
          className="hover:underline"
        >
          {product.designer?.name.toUpperCase()}
        </Link>
        <span className="text-muted-foreground text-super-small md:text-xs">
          Size: {product.size?.name}
        </span>
      </CardFooter>
    </Card>
  );
};

export default SearchProductImage;

// "use client";
// import Image from "next/image";
// import ReactPlayer from "react-player";
// import { Product } from "@/types";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";

// interface SearchProductImageProps {
//   product: Product;
// }

// const SearchProductImage: React.FC<SearchProductImageProps> = ({ product }) => {
//   const router = useRouter();
//   const params = useParams();
//   const handleProductClick = (product: any) => {
//     router.push(
//       `${params.storeId}/product/${product?.category?.id}/${product?.designer?.name}/${product?.id}/${product?.seller?.instagramHandle}`
//     );
//   };

//   return (
//     <div key={product.id} className="flex w-full rounded-md flex-col ">
//       <div className="flex-col w-full border">
//         <div className="flex flex-row w-full justify-center items-center p-1">
//           <div className="flex flex-row gap-1 w-full justify-center">
//             <Link href={`${params.storeId}/sellers/${product.seller.id}`}>
//               <p className="w-full justify-center text-center items-center text-super-small hover:underline hover:cursor-pointer">
//                 {product.seller.storeName.toUpperCase()}
//               </p>
//             </Link>

//             {/* <Link href={`/categories/${product.category.id}`}>
//               <p className="w-full justify-center text-center items-center text-super-small hover:underline hover:cursor-pointer">
//                 {product.category.name.toUpperCase()}
//               </p>
//             </Link> */}
//           </div>
//         </div>

//         <div className="inset-0 w-full h-full flex justify-center items-center hover:cursor-pointer">
//           {product?.images?.[0]?.url?.match(
//             /https:\/\/.*\.(video|mp4|MP4|mov).*/
//           ) ? (
//             <ReactPlayer
//               key={product?.images?.[0]?.id}
//               onClick={() => handleProductClick(product)}
//               url={product?.images?.[0]?.url}
//               width="80%"
//               height="80%"
//               loop
//               playing
//               muted
//               alt={`${product.name} video from ${product.seller?.storeName} by ${product.designer?.name} in size ${product.size?.name} for £${product.ourPrice} (RRP £${product.retailPrice})`}
//               className={`flex h-full fle-col items-center justify-center rounded-md transition-opacity duration-200 ease-in-out ${
//                 product.isHidden ? "blur-xl" : ""
//               }`}
//             />
//           ) : (
//             <>
//               <div className="flex">
//                 <Image
//                   key={product?.images?.[0]?.id}
//                   onClick={() => handleProductClick(product)}
//                   height={0}
//                   width={80}
//                   src={product?.images?.[0]?.url}
//                   alt={`Image of ${product.name} from ${product.seller?.storeName} by ${product.designer?.name} in size ${product.size?.name} for £${product.ourPrice} (RRP £${product.retailPrice})`}
//                   priority
//                   className={`rounded-md transition-opacity duration-200 ease-in-out ${
//                     product.isHidden ? "blur-xl" : ""
//                   }`}
//                 />
//               </div>
//             </>
//           )}
//         </div>

//         <div
//           className="flex flex-row w-full justify-between p-1"
//           onClick={() => handleProductClick(product)}
//         >
//           <div className="flex flex-row w-full justify-between">
//             <Link
//               href={`${params.storeId}/designers/${product.designer?.id}`}
//               className="w-full justify-center text-center items-center text-super-small hover:underline hover:cursor-pointer"
//             >
//               {product.designer?.name.toUpperCase()}
//             </Link>
//             <p className="justify-center text-center items-center text-super-small text-red-500 w-full">
//               £{product.ourPrice}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchProductImage;
