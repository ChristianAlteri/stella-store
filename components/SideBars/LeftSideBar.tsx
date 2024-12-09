"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Category, Designer, Product, Seller } from "@/types";
import Link from "next/link";
import useParamsUtil from "@/utils/useParamsUtil";
import { useParams } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import getDesigners from "@/actions/get-designers";
import getCategories from "@/actions/get-categories";

interface LeftSideProps {}

const LeftSidebar: React.FC<LeftSideProps> = ({}) => {
  const sortedItems = (items: any[], key: string) => {
    // Filter items based on whether they have at least one online product
    const filteredItems = items.filter(item =>
      item.products?.some((product: Product) => product.isOnline)
    );
  
    // Sort the filtered items by the specified key
    return filteredItems.sort((a, b) => a[key].localeCompare(b[key]));
  };
  const { isDesignerSelected, isCategorySelected } =
    useParamsUtil();
  const [designers, setDesigners] = useState<Designer[] | undefined>(undefined);
  const [isLoadingDesigners, setIsLoadingDesigners] = useState(true);

  const [categories, setCategories] = useState<Category[] | undefined>(
    undefined
  );
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Fetch the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingDesigners(true);
        const designerData = await getDesigners(
          `${process.env.NEXT_PUBLIC_STORE_ID}`
        );
        setDesigners(sortedItems(designerData, "name"));
        setIsLoadingDesigners(false);

        setIsLoadingCategories(true);
        const categoryData = await getCategories(
          `${process.env.NEXT_PUBLIC_STORE_ID}`
        );
        setCategories(sortedItems(categoryData, "name"));
        setIsLoadingCategories(false);
      } catch (error) {
        console.error("Failed to fetch lefts side bar data:", error);
        setIsLoadingDesigners(false);
        setIsLoadingCategories(false);
      }
    };

    if (process.env.NEXT_PUBLIC_STORE_ID) {
      fetchData();
    }
  }, []);

  const isLoading = isLoadingDesigners || isLoadingCategories;

  return (
    <aside className="h-full z-35">
      <div className="grid grid-rows-2 h-full justify-start items-start gap-4">
        <div className="row-span-1 h-full p-1">
          <p className="font-bold text-lg bg-white">DESIGNERS</p>

          <ScrollArea className="h-[450px]">
            {isLoading ? (
              Array.from({ length: 1 }).map((_, index) => (
                // <Skeleton key={index} className="h-2 w-full mb-2 bg-gray-200" />
                <div key={index} className="text-super-small text-muted-foreground w-full justify-center text-center">Loading...</div>
              ))
            ) : designers?.length ? (
              designers.map((designer) => (
                <Link href={`/designers/${designer.id}`} key={designer.name}>
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
              ))
            ) : (
              <p className="text-sm text-gray-500">No designers available.</p>
            )}
          </ScrollArea>
        </div>

        <div className="row-span-1 h-full p-1">
          <p className="font-bold text-lg bg-white">CATEGORIES</p>

          <ScrollArea className="h-[450px]">
            {isLoading ? (
              Array.from({ length: 1 }).map((_, index) => (
                <div key={index}  className="text-super-small text-muted-foreground w-full justify-center text-center">Loading...</div>
              ))
            ) : categories?.length ? (
              categories.map((category) => (
                <Link href={`/categories/${category.id}`} key={category.name}>
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
              ))
            ) : (
              <p className="text-sm text-gray-500">No categories available.</p>
            )}
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
//               <Link href={`/sellers/${seller.id}`} key={seller.storeName}>
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
//               <Link href={`/designers/${designer.id}`} key={designer.name}>
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
//               <Link href={`/categories/${category.id}`} key={category.name}>
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
