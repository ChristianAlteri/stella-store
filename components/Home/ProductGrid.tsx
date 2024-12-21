"use client";

import { Product } from "@/types";
import getProductsForProductCard from "@/actions/get-products-for-product-card";
import ProductCard from "../Product/product-card";
import { useEffect, useState, useCallback, useRef } from "react";
import ProductCardSkeleton from "./product-skeleton";
import { throttle } from "../../utils/throttle";
import { useSearchParams } from "next/navigation";

interface ProductGridProps {
  children?: React.ReactNode;
  isOnSale?: boolean | undefined;
}

const LIMIT = 8;
const THROTTLE_DELAY = 1000;

const ProductGrid: React.FC<ProductGridProps> = ({ children, isOnSale }) => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingTriggerRef = useRef<HTMLDivElement | null>(null);

  // Fetch initial data
  // useEffect(() => {
  //   fetchData();

  // }, [searchParams, isOnSale]); 
  useEffect(() => {
    // When searchParams or isOnSale changes, reset pagination & product list
    setPage(1);
    setProducts([]);
    setHasMore(true);
  }, [searchParams, isOnSale]);

  const fetchData = useCallback(async () => {
    if (!process.env.NEXT_PUBLIC_STORE_ID || !hasMore) return;

    try {
      setIsLoading(true);
      const fetchedProductData = await getProductsForProductCard({
        storeIdFromOnlineStore: process.env.NEXT_PUBLIC_STORE_ID,
        isOnline: true,
        isArchived: false,
        isOnSale: isOnSale,
        sort: searchParams.get("sort") || undefined,
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
  }, [page, hasMore, searchParams]);

  const throttledCallback = useCallback(
    throttle((entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isLoading && hasMore) {
        fetchData();
      }
    }, THROTTLE_DELAY),
    [isLoading, hasMore, fetchData]
  );

  // Setup and cleanup for IntersectionObserver
  useEffect(() => {
    // Don't attach observer while loading
    if (isLoading) return;

    // Disconnect existing observer
    if (observer.current) {
      observer.current.disconnect();
    }

    // Create new observer with throttled callback
    observer.current = new IntersectionObserver(throttledCallback, {
      root: null,
      rootMargin: "200px",
      threshold: 0.1,
    });

    if (loadingTriggerRef.current) {
      observer.current.observe(loadingTriggerRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [isLoading, throttledCallback]);

  return (
    <>
      
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
        {!hasMore && (
          <p className="mt-4 mb-4 p-4 text-gray-500">No more products...</p>
        )}
      </div>
    </>
  );
};

export default ProductGrid;

// "use client";

// import { useEffect, useState, useCallback, useRef } from "react";
// import { FixedSizeGrid as Grid } from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";
// import { throttle } from "@/utils/throttle";

// import getProductsForProductCard from "@/actions/get-products-for-product-card";
// import ProductCard from "../Product/product-card";
// import ProductCardSkeleton from "./product-skeleton";
// import { Product } from "@/types";

// interface ProductGridProps {
//   children?: React.ReactNode;
// }

// const LIMIT = 2;
// const THROTTLE_DELAY = 1000;
// const COLUMN_WIDTH = 300; // Unused if you compute column width dynamically

// const ProductGrid: React.FC<ProductGridProps> = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const gridRef = useRef<Grid>(null);

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

//       setProducts((prev) => [...prev, ...fetchedProductData.products]);
//       setHasMore(fetchedProductData.products.length === LIMIT);
//       setPage((prevPage) => prevPage + 1);
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [page, hasMore]);

//   const throttledFetchData = useCallback(
//     throttle(() => {
//       if (!isLoading && hasMore) {
//         fetchData();
//       }
//     }, THROTTLE_DELAY),
//     [isLoading, hasMore, fetchData]
//   );

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const Cell = ({
//     columnIndex,
//     rowIndex,
//     style,
//     data,
//   }: {
//     columnIndex: number;
//     rowIndex: number;
//     style: React.CSSProperties;
//     data: {
//       columnCount: number;
//       products: Product[];
//       hasMore: boolean;
//       rowCount: number;
//       isLoading: boolean;
//     };
//   }) => {
//     const { columnCount, products, hasMore, rowCount, isLoading } = data;
//     const isLastRow = rowIndex === rowCount - 1;

//     // If we've reached the last row and there is no more data:
//     if (!hasMore && isLastRow) {
//       return (
//         <div style={{ ...style, textAlign: "center", padding: "1rem" }}>
//           <p className="mt-6 mb-4 p-4 text-muted-foreground w-full justify-center items-center">
//             No more products...
//           </p>
//         </div>
//       );
//     }

//     const productIndex = rowIndex * columnCount + columnIndex;
//     const product = products[productIndex];

//     // Show skeleton if loading / awaiting data
//     if (!product) {
//       return <div style={style}>{isLoading && <ProductCardSkeleton />}</div>;
//     }

//     return (
//       <div style={style} className="h-full">
//         <ProductCard item={product} />
//       </div>
//     );
//   };

//   const onItemsRendered = useCallback(
//     ({ visibleRowStopIndex }: { visibleRowStopIndex: number }) => {
//       if (visibleRowStopIndex >= products.length / 2) {
//         throttledFetchData();
//       }
//     },
//     [products.length, throttledFetchData]
//   );

//   return (
//     <div className="col-span-6 w-full h-[calc(100vh-100px)]">
//       <AutoSizer>
//         {({ height, width }) => {
//           // Simple "isMobile" check
//           const isMobile = width < 768;
//           const columnCount = isMobile ? 2 : 4;
//           const columnWidth = width / columnCount;

//           // Instead of a hardcoded 500px, let's do a different rowHeight for mobile
//           // so the product card will look more consistent.
//           const rowHeight = isMobile ? 430 : 570;

//           const rowCount =
//             Math.ceil(products.length / columnCount) + (hasMore ? 0 : 1);

//           return (
//             <Grid
//               ref={gridRef}
//               columnCount={columnCount}
//               columnWidth={columnWidth}
//               height={height}
//               rowCount={rowCount}
//               rowHeight={rowHeight}
//               width={width}
//               onItemsRendered={onItemsRendered}
//               itemData={{
//                 columnCount,
//                 products,
//                 hasMore,
//                 rowCount,
//                 isLoading,
//               }}
//             >
//               {Cell}
//             </Grid>
//           );
//         }}
//       </AutoSizer>
//     </div>
//   );
// };

// export default ProductGrid;

// "use client";

// import { useEffect, useState, useCallback, useRef } from "react";
// import { FixedSizeGrid as Grid } from "react-window";
// import AutoSizer from "react-virtualized-auto-sizer";
// import { throttle } from "@/utils/throttle";

// import getProductsForProductCard from "@/actions/get-products-for-product-card";
// import ProductCard from "../Product/product-card";
// import ProductCardSkeleton from "./product-skeleton";
// import { Product } from "@/types";

// interface ProductGridProps {
//   children?: React.ReactNode;
// }

// const LIMIT = 1;
// const THROTTLE_DELAY = 1000;
// const COLUMN_WIDTH = 300;
// const ROW_HEIGHT = 500;

// const ProductGrid: React.FC<ProductGridProps> = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const gridRef = useRef<Grid>(null);

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

//       setProducts((prev) => [...prev, ...fetchedProductData.products]);
//       setHasMore(fetchedProductData.products.length === LIMIT);
//       setPage((prevPage) => prevPage + 1);
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [page, hasMore]);

//   const throttledFetchData = useCallback(
//     throttle(() => {
//       if (!isLoading && hasMore) {
//         fetchData();
//       }
//     }, THROTTLE_DELAY),
//     [isLoading, hasMore, fetchData]
//   );

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   /**
//    * Cell renderer for each product or final footer row
//    */
//   const Cell = ({
//     columnIndex,
//     rowIndex,
//     style,
//     data, // data prop from react-window
//   }: {
//     columnIndex: number;
//     rowIndex: number;
//     style: React.CSSProperties;
//     data: {
//       columnCount: number;
//       products: Product[];
//       hasMore: boolean;
//       rowCount: number;
//       isLoading: boolean;
//     };
//   }) => {
//     const { columnCount, products, hasMore, rowCount, isLoading } = data;

//     const isLastRow = rowIndex === rowCount - 1;
//     if (!hasMore && isLastRow) {
//       // We’re on the extra “footer row” (when hasMore === false)
//       return (
//         // <div className="w-full justify-center items-center">
//         <div style={{ ...style, textAlign: "center", padding: "1rem" }}>
//           <p className="mt-4 mb-4 p-4 text-gray-500 w-full justify-center items-center">
//             No more products...
//           </p>
//         </div>
//       );
//     }

//     // Otherwise, calculate the product index
//     const productIndex = rowIndex * columnCount + columnIndex;
//     const product = products[productIndex];

//     if (!product) {
//       return <div style={style}>{isLoading && <ProductCardSkeleton />}</div>;
//     }

//     return (
//       <div style={style}>
//         <ProductCard item={product} />
//       </div>
//     );
//   };

//   const onItemsRendered = useCallback(
//     ({ visibleRowStopIndex }: { visibleRowStopIndex: number }) => {
//       // If the user’s near the bottom, attempt fetching more
//       if (visibleRowStopIndex >= products.length / 2) {
//         throttledFetchData();
//       }
//     },
//     [products.length, throttledFetchData]
//   );

//   return (
//     <div className="col-span-6 w-full h-[calc(100vh-100px)]">
//       <AutoSizer>
//         {({ height, width }) => {
//           const columnCount = Math.max(1, Math.floor(width / COLUMN_WIDTH));
//           // Add an extra row for the “No more products” message if we’re out of products
//           const rowCount =
//             Math.ceil(products.length / columnCount) + (hasMore ? 0 : 1);

//           return (
//             <Grid
//               ref={gridRef}
//               columnCount={columnCount}
//               columnWidth={COLUMN_WIDTH}
//               height={height}
//               rowCount={rowCount}
//               rowHeight={ROW_HEIGHT}
//               width={width}
//               onItemsRendered={onItemsRendered}
//               itemData={{
//                 columnCount,
//                 products,
//                 hasMore,
//                 rowCount,
//                 isLoading,
//               }}
//             >
//               {Cell}
//             </Grid>
//           );
//         }}
//       </AutoSizer>
//     </div>
//   );
// };

// export default ProductGrid;

// "use client";

// import { Product } from "@/types";
// import getProductsForProductCard from "@/actions/get-products-for-product-card";
// import ProductCard from "../Product/product-card";
// import { useEffect, useState, useCallback, useRef } from "react";
// import ProductCardSkeleton from "./product-skeleton";
// import { throttle } from "../../utils/throttle";

// interface ProductGridProps {
//   children?: React.ReactNode;
// }

// const LIMIT = 8;
// const THROTTLE_DELAY = 1000;

// const ProductGrid: React.FC<ProductGridProps> = ({ children }) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const observer = useRef<IntersectionObserver | null>(null);
//   const loadingTriggerRef = useRef<HTMLDivElement | null>(null);

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

//   const throttledCallback = useCallback(
//     throttle((entries: IntersectionObserverEntry[]) => {
//       if (entries[0].isIntersecting && !isLoading && hasMore) {
//         fetchData();
//       }
//     }, THROTTLE_DELAY),
//     [isLoading, hasMore, fetchData]
//   );

//   // Setup and cleanup for IntersectionObserver
//   useEffect(() => {
//     // Don't attach observer while loading
//     if (isLoading) return;

//     // Disconnect existing observer
//     if (observer.current) {
//       observer.current.disconnect();
//     }

//     // Create new observer with throttled callback
//     observer.current = new IntersectionObserver(throttledCallback, {
//       root: null,
//       rootMargin: "200px",
//       threshold: 0.1,
//     });

//     if (loadingTriggerRef.current) {
//       observer.current.observe(loadingTriggerRef.current);
//     }

//     return () => {
//       if (observer.current) {
//         observer.current.disconnect();
//       }
//     };
//   }, [isLoading, throttledCallback]);

//   // Fetch initial data
//   useEffect(() => {
//     fetchData();
//     // Only run on mount (unless you intend to re-fetch when page or hasMore changes)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className="col-span-6 flex flex-col justify-center items-center w-full h-full">
//       <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-center justify-center">
//         {products.map((item) => (
//           <ProductCard key={item.id} item={item} />
//         ))}
//         {children}
//       </div>
//       {/* Loading trigger element */}
//       <div ref={loadingTriggerRef} className="w-full h-10" />{" "}
//       {isLoading && (
//         <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-center justify-center mt-4">
//           {Array.from({ length: LIMIT }).map((_, index) => (
//             <ProductCardSkeleton key={`skeleton-${index}`} />
//           ))}
//         </div>
//       )}
//       {!hasMore && <p className="mt-4 mb-4 p-4 text-gray-500">No more products...</p>}
//     </div>
//   );
// };

// export default ProductGrid;

// "use client";

// import { Product } from "@/types";
// import getProductsForProductCard from "@/actions/get-products-for-product-card";
// import ProductCard from "../Product/product-card";
// import { useEffect, useState, useCallback, useRef } from "react";
// import ProductCardSkeleton from "./product-skeleton";

// interface ProductGridProps {
//   children?: React.ReactNode;
// }

// const LIMIT = 8;

// const ProductGrid: React.FC<ProductGridProps> = ({ children }) => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [hasMore, setHasMore] = useState(true);
//   const observer = useRef<IntersectionObserver | null>(null);
//   const loadingTriggerRef = useRef<HTMLDivElement | null>(null);

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
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (isLoading) return;

//     if (observer.current) observer.current.disconnect();

//     const callback = (entries: IntersectionObserverEntry[]) => {
//       if (entries[0].isIntersecting && hasMore && !isLoading) {
//         fetchData();
//       }
//     };

//     observer.current = new IntersectionObserver(callback, {
//       root: null,
//       rootMargin: "200px", // Load more when within 200px of the bottom
//       threshold: 0.1,
//     });

//     if (loadingTriggerRef.current) {
//       observer.current.observe(loadingTriggerRef.current);
//     }

//     return () => {
//       if (observer.current) observer.current.disconnect();
//     };
//   }, [isLoading, hasMore, fetchData]);

//   return (
//     <div className="col-span-6 flex flex-col justify-center items-center w-full h-full">
//       <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-center justify-center">
//         {products.map((item) => (
//           <ProductCard key={item.id} item={item} />
//         ))}
//         {children}
//       </div>
//       {/* Loading trigger element */}
//       <div ref={loadingTriggerRef} className="w-full h-10" />{" "}
//       {isLoading && (
//         <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-center justify-center mt-4">
//           {Array.from({ length: LIMIT }).map((_, index) => (
//             <ProductCardSkeleton key={`skeleton-${index}`} />
//           ))}
//         </div>
//       )}
//       {/* <FullscreenProductFiltersFooter productData={products} /> */}
//       {!hasMore && <p className="mt-4 mb4-4 p-4 text-muted-foreground">No more products...</p>}
//     </div>
//   );
// };

// export default ProductGrid;
