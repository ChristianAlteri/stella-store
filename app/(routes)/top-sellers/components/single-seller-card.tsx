"use client";

import { Seller } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { CiInstagram } from "react-icons/ci";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import MiniProductSellerCard from "./mini-seller-product-card";

interface SellerCardProps {
  data: Seller;
  id: string;
}

const SellerCard: React.FC<SellerCardProps> = ({ data }) => {
  const params = useParams();

  return (
    <>
      <div
        key={data?.id}
        className="w-full max-w-sm mx-auto justify-center items-center text-center border rounded-md p-4"
      >
        <div className="flex flex-col gap-2 justify-center items-center text-center w-full">
          <Link
            href={`sellers/${data?.id}`}
            className="flex items-center space-x-4 justify-center text-center w-full"
          >
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={data?.billboard?.imageUrl ?? "/default-profile.png"}
                alt={`${data.storeName}`}
              />
              <AvatarFallback>
                {data.storeName[0].toUpperCase()}
                {data.storeName[1].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <div className=" justify-center items-center text-center w-full">
          <div className="p-2 w-full justify-center items-center text-center">
            <Link
              href={`sellers/${data?.id}`}
              className="flex items-center space-x-4 justify-center text-center w-full"
            >
              <div>
                <h2 className="text-lg font-semibold hover:underline">
                  {data?.storeName.toUpperCase()}
                </h2>
              </div>
            </Link>
          </div>
          {data.products.length > 0 && (
            <div className="justify-center items-center text-center w-full">
              <MiniProductSellerCard data={data.products} />
            </div>
          )}
          {data.sellerType === "influencer" ? (
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <span className="font-semibold">Shoe:</span> {data?.shoeSizeEU}
              </div>
              <div>
                <span className="font-semibold">Top:</span>{" "}
                {data?.topSize.toUpperCase()}
              </div>
              <div>
                <span className="font-semibold">Bottom:</span>{" "}
                {data?.bottomSize.toUpperCase()}
              </div>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">
              {data?.description}
            </p>
          )}
        </div>
        <div className="pt-2 flex justify-between items-center">
          <Link
            href={`/sellers/${data?.id}`}
            className="text-sm text-primary hover:underline"
          >
            View Profile
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={`https://instagram.com/${data?.instagramHandle.replace(
                    "@",
                    ""
                  )}`}
                  className="text-pink-500 hover:text-pink-600 transition-colors"
                  target="_blank"
                >
                  <CiInstagram size={24} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Follow on Instagram</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </>
  );
};

export default SellerCard;

// "use client";

// import { Tooltip } from "@chakra-ui/react";
// import { Seller } from "@/types";
// import Image from "next/image";
// import Link from "next/link";
// import { CiBadgeDollar } from "react-icons/ci";
// import MiniProductSellerCard from "./mini-seller-product-card";
// import { CiInstagram } from "react-icons/ci";
// import { useParams } from "next/navigation";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// interface SellerCardProps {
//   data: Seller;
//   id: string;
// }

// const SellerCard: React.FC<SellerCardProps> = ({ data }) => {
//   const params = useParams();

//   return (
//     <div className="p-4 col-span-1 justify-center items-center rounded-sm overflow-hidden ">
//       <Link href={`sellers/${data?.id}`}>
//         <div className="flex flex-row gap-4">
//           {/* Billboard */}
//           <Avatar className="w-16 h-16">
//             <AvatarImage
//               src={data?.billboard?.imageUrl ?? "/default-profile.png"}
//               alt={`${data.storeName}`}
//             />
//             <AvatarFallback>
//               {data.storeName[0].toUpperCase()}
//               {data.storeName[1].toUpperCase()}
//             </AvatarFallback>
//           </Avatar>

//           {/* Mini product card */}
//           {data.products.length > 0 && (
//             <MiniProductSellerCard data={data.products} />
//           )}
//         </div>
//       </Link>

//       {/* Name */}
//       <div className="flex flex-col justify-center items-center mt-2">
//         <h2 className="text-sm text-black hover:cursor-pointer hover:underline">
//           <Link href={`${process.env.NEXT_PUBLIC_API_URL}/sellers/${data?.id}`}>
//             {data?.storeName.toUpperCase()}
//           </Link>
//         </h2>
//       </div>

//       <div className="flex flex-row justify-center items-center gap-2">
//         <Link
//           href={`https://instagram.com/${data?.instagramHandle}`}
//           className="text-lg text-black"
//           target="_blank"
//         >
//           <p className="text-red-500 text-xs">
//             <CiInstagram size={20} />
//           </p>
//         </Link>
//       </div>

//       {data.sellerType === "influencer" ? (
//         <div className="flex flex-row justify-center items-center gap-2">
//           <div className="flex flex-row text-xs w-2/3 gap-4 justify-between">
//             <div className="flex flex-col gap-1">
//               {/* <p className="text-black text-super-small text-start justify-start items-start">SIZE GUIDE:</p> */}
//               <p className="text-black text-super-small text-start justify-start items-start">
//                 SHOE: {data?.shoeSizeEU}
//               </p>
//               <p className="text-black text-super-small text-start justify-start items-start">
//                 TOP: {data?.topSize.toUpperCase()}
//               </p>
//               <p className="text-black text-super-small text-start justify-start items-start">
//                 BOTTOM: {data?.bottomSize.toUpperCase()}
//               </p>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="flex flex-row justify-center items-center gap-2">
//           <div className="flex flex-row text-xs w-2/3 gap-4 justify-between">
//             <div className="flex flex-col gap-1 w-full">
//               <p className="text-black text-super-small text-center justify-center items-center w-full">
//                 {data?.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SellerCard;
