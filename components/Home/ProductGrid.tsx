"use client";

import { Product } from "@/types";
import getProductsForProductCard from "@/actions/get-products-for-product-card";
import ProductCard from "../Product/product-card";
import { useEffect, useState, useCallback, useRef } from "react";
import ProductCardSkeleton from "./product-skeleton";

interface ProductGridProps {
  children?: React.ReactNode;
}

const LIMIT = 8;

const ProductGrid: React.FC<ProductGridProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingTriggerRef = useRef<HTMLDivElement | null>(null);

  const fetchData = useCallback(async () => {
    if (!process.env.NEXT_PUBLIC_STORE_ID || !hasMore) return;

    try {
      setIsLoading(true);
      const fetchedProductData = await getProductsForProductCard({
        storeIdFromOnlineStore: process.env.NEXT_PUBLIC_STORE_ID,
        isOnline: true,
        page,
        limit: LIMIT,
      });

      setProducts((prevProducts) => [
        ...prevProducts,
        ...fetchedProductData.products,
      ]);
      setTotal(fetchedProductData.total);
      setHasMore(fetchedProductData.products.length === LIMIT);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (observer.current) observer.current.disconnect();

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasMore) {
        fetchData();
      }
    };

    observer.current = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "200px", // Load more when within 800px of the bottom
      threshold: 0.1,
    });

    if (loadingTriggerRef.current) {
      observer.current.observe(loadingTriggerRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [isLoading, hasMore, fetchData]);

  return (
    <div className="col-span-6 flex flex-col justify-center items-center w-full h-full">
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-center justify-center">
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
        {children}
      </div>
      {/* Loading trigger element */}
      <div ref={loadingTriggerRef} className="w-full h-10" />{" "}
      {isLoading && (
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-center justify-center mt-4">
          {Array.from({ length: LIMIT }).map((_, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ))}
        </div>
      )}
      {/* <FullscreenProductFiltersFooter productData={products} /> */}
      {!hasMore && <p className="mt-4 text-gray-500">No more products...</p>}
    </div>
  );
};

export default ProductGrid;

// 'use client';

// import { Product } from "@/types";
// import getProductsForProductCard from "@/actions/get-products-for-product-card";
// import ProductCard from "../Product/product-card";
// import { useEffect, useState, useCallback, useRef } from "react";
// import { Skeleton } from "@/components/ui/skeleton";
// import ProductCardSkeleton from "./product-skeleton";

// interface ProductGridProps {
//   children?: React.ReactNode;
// }

// type ProductWithPagination = {
//   products: Product[];
//   total: number;
//   page: number;
//   limit: number;
// };

// const LIMIT = 8;

// const ProductGrid: React.FC<ProductGridProps> = ({ children }) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const observer = useRef<IntersectionObserver | null>(null);
//   const lastProductElementRef = useRef<HTMLDivElement | null>(null);

//   const fetchData = useCallback(async () => {
//     if (!process.env.NEXT_PUBLIC_STORE_ID || !hasMore) return;

//     try {
//       setIsLoading(true);
//       const fetchedProductData = await getProductsForProductCard({
//         storeIdFromOnlineStore: process.env.NEXT_PUBLIC_STORE_ID,
//         isOnline: true,
//         page,
//         limit: LIMIT,
//       });

//       setProducts((prevProducts) => [
//         ...prevProducts,
//         ...fetchedProductData.products,
//       ]);
//       setTotal(fetchedProductData.total);
//       setHasMore(fetchedProductData.products.length === LIMIT);
//       setPage((prevPage) => prevPage + 1);
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [page, hasMore]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (isLoading) return;

//     if (observer.current) observer.current.disconnect();

//     const callback = (entries: IntersectionObserverEntry[]) => {
//       if (entries[0].isIntersecting && hasMore) {
//         fetchData();
//       }
//     };

//     observer.current = new IntersectionObserver(callback, {
//       root: null,
//       rootMargin: '0px',
//       threshold: 1.0
//     });

//     if (lastProductElementRef.current) {
//       observer.current.observe(lastProductElementRef.current);
//     }

//     return () => {
//       if (observer.current) observer.current.disconnect();
//     };
//   }, [isLoading, hasMore, fetchData]);

//   return (
//     <div className="col-span-6 flex flex-col justify-center items-center w-full h-full">
//       <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-center justify-center">
//         {products.map((item, index) => (
//           <div
//             key={item.id}
//             ref={index === products.length - 1 ? lastProductElementRef : null}
//           >
//             <ProductCard item={item} />
//           </div>
//         ))}
//         {isLoading &&
//           Array.from({ length: LIMIT }).map((_, index) => (
//             <ProductCardSkeleton key={`skeleton-${index}`} />
//           ))}
//         {children}
//       </div>
//       {!hasMore && <p className="mt-4 text-gray-500">No more products to load.</p>}
//     </div>
//   );
// };

// export default ProductGrid;

// "use client";

// import { Product } from "@/types";
// import getProductsForProductCard from "@/actions/get-products-for-product-card";
// import ProductCard from "../Product/product-card";
// import { useEffect, useState, useCallback } from "react";
// import Button from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import ProductCardSkeleton from "./product-skeleton";

// interface ProductGridProps {
//   children?: React.ReactNode;
// }

// type ProductWithPagination = {
//   products: Product[];
//   total: number;
//   page: number;
//   limit: number;
// };

// const LIMIT = 4;

// const ProductGrid: React.FC<ProductGridProps> = ({ children }) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);

//   const fetchData = useCallback(async () => {
//     if (!process.env.NEXT_PUBLIC_STORE_ID) return;

//     try {
//       setIsLoading(true);
//       const fetchedProductData = await getProductsForProductCard({
//         storeIdFromOnlineStore: process.env.NEXT_PUBLIC_STORE_ID,
//         isOnline: true,
//         page,
//         limit: LIMIT,
//       });

//       setProducts((prevProducts) => [
//         ...prevProducts,
//         ...fetchedProductData.products,
//       ]);
//       setTotal(fetchedProductData.total);
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [page]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const loadMore = () => {
//     if (products.length < total) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   return (
//     <div className="col-span-6 flex flex-col justify-center items-center w-full h-full">
//       <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-center justify-center">
//         {products.map((item) => (
//           <ProductCard key={item.id} item={item} />
//         ))}
//         {isLoading &&
//           Array.from({ length: LIMIT }).map((_, index) => (
//             <ProductCardSkeleton key={`skeleton-${index}`} />
//           ))}
//         {children}
//       </div>
//       {products.length < total && (
//         <Button onClick={loadMore} disabled={isLoading} className="mt-4 mb-4">
//           {isLoading ? "Loading..." : "Load More"}
//         </Button>
//       )}
//     </div>
//   );
// };

// export default ProductGrid;
