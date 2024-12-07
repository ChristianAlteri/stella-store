"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/types";

interface OrderSummaryItemProps {
  data: Product;
}

const OrderSummaryItem: React.FC<OrderSummaryItemProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const handleProductClick = () => {
    router.push(
      `/${process.env.NEXT_PUBLIC_API_URL}/product/${data?.category?.id}/${data?.designer?.name}/${data?.id}/${data?.seller?.instagramHandle}`
    );
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="relative w-20 h-20 flex-shrink-0">
        {data?.images[0]?.url?.match(/https:\/\/.*\.(video|mp4|MP4|mov).*/) ? (
          <video
            muted
            autoPlay
            loop
            className={`w-full h-full object-cover rounded-md ${
              data?.isHidden ? "blur-xl" : ""
            }`}
          >
            <source src={data?.images[0].url} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={data?.images[0].url}
            alt={`${data?.name} from ${data?.seller?.storeName} by ${data?.designer?.name} in size ${data?.size?.name} for $${data?.ourPrice} (RRP $${data?.retailPrice})`}
            layout="fill"
            objectFit="cover"
            className={`rounded-md ${data?.isHidden ? "blur-xl" : ""}`}
            onClick={handleProductClick}
          />
        )}
      </div>
      <div className="flex-grow">
        <Link
          href={`/${process.env.NEXT_PUBLIC_API_URL}/designers/${data?.designer.id}`}
          className="text-sm font-medium hover:underline"
        >
          {data?.designer.name.toUpperCase()}
        </Link>
        <Link
          href={`/${process.env.NEXT_PUBLIC_API_URL}/sellers/${data?.seller.id}`}
          className="block text-xs text-gray-500 hover:underline"
        >
          {data?.seller.storeName.toUpperCase()}
        </Link>
        <p className="text-sm font-semibold text-red-500">${data?.ourPrice}</p>
        <p className="text-xs text-gray-500">Size: {data?.size.name}</p>
      </div>
    </div>
  );
};

export default OrderSummaryItem;



// "use client";
// import Image from "next/image";

// import { Product } from "@/types";
// import { useParams, useRouter } from "next/navigation";
// import Link from "next/link";

// interface OrderSummaryItemProps {
//   data: Product;
// }

// const OrderSummaryItem: React.FC<OrderSummaryItemProps> = ({ data }) => {
//   const router = useRouter();
//   const params = useParams();

//   const handleProductClick = () => {
//     router.push(
//       `/${process.env.NEXT_PUBLIC_API_URL}/product/${data?.category?.id}/${data?.designer?.name}/${data?.id}/${data?.seller?.instagramHandle}`
//     );
//   };

//   return (
//     <div className="group p-2 w-full col-span-1">
//       <div className="flex flex-row">
//         <div className="relative overflow-hidden">
//           {/* If item is marked hidden, we blur it. Used for unreleased products */}
//           {data?.images[0]?.url?.match(
//             /https:\/\/.*\.(video|mp4|MP4|mov).*/
//           ) ? (
//             <video
//               height={90}
//               width={90}
//               muted
//               autoPlay
//               loop
//               key={data?.images?.[0]?.id}
//               src={data?.images[0].url}
//               className={`rounded-md transition-opacity duration-200 ease-in-out ${
//                 data.isHidden ? "blur-xl" : ""
//               }`}
//             ></video>
//           ) : (
//             <>
//               <div className="flex">
//                 <Image
//                   key={data?.images?.[0]?.id}
//                   onClick={handleProductClick}
//                   height={0}
//                   width={100}
//                   src={data!.images[0]!.url}
//                   alt={`${data.name} from ${data.seller?.storeName} by ${data.designer?.name} in size ${data.size?.name} for $${data.ourPrice} (RRP $${data.retailPrice})`}
//                   priority
//                   className={`rounded-md transition-opacity duration-200 ease-in-out 
//                       ${data.isHidden ? "blur-xl" : ""}`}
//                 />
//               </div>
//             </>
//           )}
//         </div>

//         <div className="relative flex flex-1 flex-col justify-between">
//           <div className="flex flex-col justify-start items-start text-start">
//             <Link
//               href={`${process.env.NEXT_PUBLIC_API_URL}/designers/${data.designer.id}`}
//               className="ml-4 md:text-xs text-super-small hover:underline hover:cursor-pointer"
//             >
//               {data.designer.name.toUpperCase()}
//             </Link>
//             <Link
//               href={`${process.env.NEXT_PUBLIC_API_URL}/sellers/${data.seller.id}`}
//               className="ml-4 md:text-xs text-super-small hover:underline hover:cursor-pointer"
//             >
//               {data.seller.storeName.toUpperCase()}
//             </Link>
//             <p className="ml-4 md:text-xs text-super-small hover:underline hover:cursor-pointer text-red-500">
//               {" "}
//               ${data.ourPrice}{" "}
//             </p>
//             <p className="ml-4 md:text-xs text-super-small hover:underline hover:cursor-pointer">
//               {data.size.name.toUpperCase()}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderSummaryItem;
