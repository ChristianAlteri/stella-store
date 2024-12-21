"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/types";
import Link from "next/link";
import SuggestedProductCard from "./components/suggested-product-card";
import LargeSuggestedProductCard from "./components/large-suggested-product-card";
import { MdOutlineChevronRight } from "react-icons/md";
import { useParams } from "next/navigation";
import getProducts from "@/actions/get-products";

interface SuggestedContainerProps {
  title?: string;
  header?: string;
  route?: string;
  isOnSale?: boolean | undefined;
  isFeatured?: boolean | undefined;
}

const SuggestedContainer: React.FC<SuggestedContainerProps> = ({
  title,
  header,
  route,
  isOnSale,
  isFeatured,
}) => {
  const params = useParams();
  const [isMounted, setIsMounted] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      setLoading(true);
      const fetchData = async () => {
        try {
          const response = await getProducts({
            all: true,
            isOnline: true,
            isArchived: false,
            isOnSale,
            isFeatured,
          });
          setProducts(response);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
    // Remove `products` from dependency array to avoid infinite loop:
  }, [isMounted, isOnSale, isFeatured]);

  if (!isMounted || loading) {
    return <div className="p-3">Loading...</div>;
  }

  return (
    <div className="p-3 h-full w-full">
      <h1 className="text-black flex flex-row gap-1 text-xs md:text-sm items-center p-1 ">
        {header?.toUpperCase()}
        <Link
          href={`${route}`}
          className="flex hover:underline hover:cursor-pointer text-black flex-row justify-start items-start text-xs md:text-sm"
        >
          <p className="underline rounded-lg text-black text-xs md:text-sm">
            {title?.toUpperCase()}
          </p>
        </Link>
        <MdOutlineChevronRight
          size={20}
          className="flex flex-row justify-center items-center animate-pulse text-xs hover:cursor-pointer hover:underline"
        />
      </h1>

      <div
        className="flex flex-row w-full overflow-x-auto m-1"
        style={{ scrollSnapType: "x mandatory", scrollPadding: "1rem" }}
      >
        {products?.map((item) => (
          <React.Fragment key={item.id}>
            <div className="hidden md:flex col-span-1 flex-shrink-0 w-1/4 mx-2 snap-center">
              <LargeSuggestedProductCard item={item} />
            </div>
            <div className="md:hidden flex col-span-1 flex-shrink-0 w-1/2 md:w-auto mx-2 snap-center">
              <SuggestedProductCard item={item} />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SuggestedContainer;


// "use client";
// import React, { useEffect, useState } from "react";
// import { Product } from "@/types";
// import Link from "next/link";
// import SuggestedProductCard from "./components/suggested-product-card";
// import LargeSuggestedProductCard from "./components/large-suggested-product-card";
// import { MdOutlineChevronRight } from "react-icons/md";
// import { useParams } from "next/navigation";
// import getProducts from "@/actions/get-products";

// interface SuggestedContainerProps {
//   title?: string;
//   header?: string;
//   route?: string;
//   isOnSale?: boolean | undefined;
//   isFeatured?: boolean | undefined;
// }

// const SuggestedContainer: React.FC<SuggestedContainerProps> = ({
//   title,
//   header,
//   route,
//   isOnSale,
//   isFeatured,
// }) => {
//   const params = useParams();
//   const [isMounted, setIsMounted] = useState(false);
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     if (isMounted) {
//       const fetchData = async () => {
//         const response = await getProducts({
//           all: true,
//           isOnline: true,
//           isArchived: false,
//           isOnSale: isOnSale,
//           isFeatured: isFeatured,
//         });

//         setProducts(response);
//       };
//       fetchData();
//     }
//   }, [isMounted, products]);

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <div className="p-3 h-full w-full">
//       <h1 className="text-black flex flex-row gap-1 text-xs md:text-sm items-center p-1 ">
//         {header?.toUpperCase()}
//         <Link
//           href={`${route}`}
//           className="flex hover:underline hover:cursor-pointer text-black flex-row justify-start items-start text-xs md:text-sm"
//         >
//           {" "}
//           <p className="underline rounded-lg text-black text-xs md:text-sm">
//             {title?.toUpperCase()}{" "}
//           </p>
//         </Link>
//         <MdOutlineChevronRight
//           size={20}
//           className="flex flex-row justify-center items-center animate-pulse text-xs hover:cursor-pointer hover:underline"
//         />
//       </h1>

//       <div
//         className="flex flex-row w-full overflow-x-auto m-1"
//         style={{ scrollSnapType: "x mandatory", scrollPadding: "1rem" }}
//       >
//         {products?.map((item) => (
//           <React.Fragment key={item.id}>
//             <div className="hidden md:flex col-span-1 flex-shrink-0 w-1/4 mx-2 snap-center">
//               <LargeSuggestedProductCard key={item.id} item={item} />
//             </div>
//             <div className="md:hidden flex col-span-1 flex-shrink-0 w-1/2 md:w-auto mx-2 snap-center">
//               <SuggestedProductCard key={item.id} item={item} />
//             </div>
//           </React.Fragment>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SuggestedContainer;
