"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Category, Designer, Seller } from "@/types";
import Link from "next/link";
import useParamsUtil from "@/utils/useParamsUtil";
import { useParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

interface LeftSideProps {
  designers?: Designer[];
  categories?: Category[];
  sellers?: Seller[];
}

const LeftSidebar: React.FC<LeftSideProps> = ({
  designers,
  categories,
  sellers,
}) => {
  const { isSellerSelected, isDesignerSelected, isCategorySelected } =
    useParamsUtil();
  const params = useParams();

  const isLoading = !sellers || !designers || !categories;

  // Create sorted copies of the arrays
  const sortedSellers = sellers
  ?.filter(
    (seller) =>
      seller.products &&
      seller.products.length > 0 &&
      seller.products.some((product) => product.isOnline)
  )
  .sort((a, b) => a.storeName.localeCompare(b.storeName));
  const sortedDesigners = designers
  ?.filter(
    (designer) =>
      designer.products &&
      designer.products.length > 0 &&
      designer.products.some((product) => product.isOnline)
  )
  .sort((a, b) => a.name.localeCompare(b.name));
  const sortedCategories = categories
  ?.filter(
    (categories) =>
      categories.products &&
      categories.products.length > 0 &&
      categories.products.some((product) => product.isOnline)
  )
  .sort((a, b) => a.name.localeCompare(b.name));


  return (
    <aside className="h-full z-35">
      <div className="grid grid-rows-3 h-full justify-start items-start gap-4">
        <div className="row-span-1 h-full justify-start">
          <p className="font-bold text-lg bg-white">SELLERS</p>

          <ScrollArea className="h-[300px]">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-5 w-full mb-2 bg-gray-200"
                  />
                ))
              : sortedSellers?.map((seller) => (
                  <Link
                    href={`/${params.storeId}/sellers/${seller.id}`}
                    key={seller.storeName}
                  >
                    <p
                      className={cn(
                        "flex justify-start text-sm font-medium text-light-font transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                        isSellerSelected(seller.id)
                          ? "rounded-md w-full flex text-black underline transition-transform animate-pulse"
                          : "text-light-font"
                      )}
                    >
                      {seller.storeName.toUpperCase()}
                    </p>
                  </Link>
                ))}
          </ScrollArea>
        </div>

        <div className="row-span-1 h-full p-1">
          <p className="font-bold text-lg bg-white">DESIGNERS</p>

          <ScrollArea className="h-[300px]">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-5 w-full mb-2 bg-gray-200"
                  />
                ))
              : sortedDesigners?.map((designer) => (
                  <Link
                    href={`/${params.storeId}/designers/${designer.id}`}
                    key={designer.name}
                  >
                    <p
                      className={cn(
                        "flex justify-start text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                        isDesignerSelected(designer.id)
                          ? "rounded-md w-full flex text-black underline transition-transform animate-pulse"
                          : "text-light-font"
                      )}
                    >
                      {designer.name.toUpperCase()}
                    </p>
                  </Link>
                ))}
          </ScrollArea>
        </div>

        <div className="row-span-1 h-full p-1">
          <p className="font-bold text-lg bg-white">CATEGORIES</p>

          <ScrollArea className="h-[300px]">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="h-5 w-full mb-2 bg-gray-200"
                  />
                ))
              : sortedCategories?.map((category) => (
                  <Link
                    href={`/${params.storeId}/categories/${category.id}`}
                    key={category.name}
                  >
                    <p
                      className={cn(
                        "flex justify-start text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
                        isCategorySelected(category.id)
                          ? "rounded-md w-full flex text-black underline transition-transform animate-pulse"
                          : "text-light-font"
                      )}
                    >
                      {category.name.toUpperCase()}
                    </p>
                  </Link>
                ))}
          </ScrollArea>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;



// "use client";

// import React from "react";

// import { cn } from "@/lib/utils";

// import { Category, Designer, Seller } from "@/types";

// import Link from "next/link";
// import useParamsUtil from "@/utils/useParamsUtil";
// import { useParams } from "next/navigation";
// import { ScrollArea } from "@/components/ui/scroll-area";

// interface LeftSideProps {
//   designers?: Designer[];
//   categories?: Category[];
//   sellers?: Seller[];
// }

// const LeftSidebar: React.FC<LeftSideProps> = ({
//   designers,
//   categories,
//   sellers,
// }) => {
//   const { isSellerSelected, isDesignerSelected, isCategorySelected } = useParamsUtil();
//   const params = useParams();

//   return (
//     <aside className="h-full z-35">

//       <div className="grid grid-rows-3 h-full justify-start items-start gap-4">
//         <div className="row-span-1 h-full justify-start">
//           <p className="font-bold text-lg bg-white" >
//             SELLERS
//           </p>

//           <ScrollArea className="h-full">
//             {sellers?.map((seller, index) => (
//               <Link href={`/${params.storeId}/sellers/${seller.id}`} key={seller.storeName}>
//                 <p
//                   className={cn(
//                     "flex justify-start text-sm font-medium text-light-font transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
//                     isSellerSelected(seller.id)
//                       ? "rounded-md w-full flex text-black underline transition-transform animate-pulse"
//                       : "text-light-font"
//                   )}
//                 >
//                   {seller.storeName.toUpperCase()}
//                 </p>
//               </Link>
//             ))}
//           </ScrollArea>

//         </div>
//         <div className="row-span-1 h-full p-1">
//           <p className="font-bold text-lg bg-white" >
//             DESIGNERS
//           </p>

//           <ScrollArea className="h-full">
//             {designers?.map((designer, index) => (
//               <Link href={`/${params.storeId}/designers/${designer.id}`} key={designer.name}>
//                 <p
//                   className={cn(
//                     "flex justify-start text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
//                     isDesignerSelected(designer.id)
//                       ? "rounded-md w-full flex text-black underline transition-transform animate-pulse"
//                       : "text-light-font"
//                   )}
//                 >
//                   {designer.name.toUpperCase()}
//                 </p>
//               </Link>
//             ))}
//           </ScrollArea>

//         </div>
//         <div className="row-span-1 h-full p-1">
//           <p className="font-bold text-lg bg-white" >
//             CATEGORIES
//           </p>

//           <ScrollArea className="h-full">
//             {categories?.map((category, index) => (
//               <Link href={`/${params.storeId}/categories/${category.id}`} key={category.name}>
//                 <p
//                   className={cn(
//                     "flex justify-start text-sm font-medium transition-colors hover:text-stone-900 hover:underline hover:cursor-pointer",
//                     isCategorySelected(category.id)
//                       ? "rounded-md w-full flex text-black underline transition-transform animate-pulse"
//                       : "text-light-font"
//                   )}
//                 >
//                   {category.name.toUpperCase()}
//                 </p>
//               </Link>
//             ))}
//           </ScrollArea>

//         </div>
//       </div>
//     </aside>
//   );
// };

// export default LeftSidebar;
