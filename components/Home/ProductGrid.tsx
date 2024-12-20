"use client";

import { Product } from "@/types";
import getProductsForProductCard from "@/actions/get-products-for-product-card";
import ProductCard from "../Product/product-card";
import { useEffect, useState } from "react";

interface ProductGridProps {
  children?: React.ReactNode;
}

type ProductWithPagination = {
  products: Product[];
  total: number;
  page: number;
  limit: number;
};

const ProductGrid: React.FC<ProductGridProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingProducts(true);
        const fetchedProductData = await getProductsForProductCard({
          storeIdFromOnlineStore: `${process.env.NEXT_PUBLIC_STORE_ID}`,
          isOnline: true,
          page,
          limit,
        });
        console.log("fetchedProductData", fetchedProductData);
        setProducts((prevProducts) => {
          console.log("Previous products:", prevProducts.map(p => p.id));
          console.log("Newly fetched products:", fetchedProductData.products.map(p => p.id));
          const updated = [...prevProducts, ...fetchedProductData.products];
          console.log("Updated products:", updated.map(p => p.id));
          return updated;
        });
        setTotal(fetchedProductData.total);
        setIsLoadingProducts(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setIsLoadingProducts(false);
      }
    };

    if (process.env.NEXT_PUBLIC_STORE_ID) {
      fetchData();
    }
  }, [page]);

  const loadMore = () => {
    if (products.length < total) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="col-span-6 flex flex-col justify-center items-center w-full h-full">
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-center justify-center">
        {isLoadingProducts && page === 1 ? (
          <p>Loading...</p>
        ) : (
          products.map((item) => <ProductCard key={item.id} item={item} />)
        )}
        {children}
      </div>
      {products.length < total && !isLoadingProducts && (
        <button
          onClick={loadMore}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default ProductGrid;

// "use client";

// import { Product } from "@/types";
// import getProducts from "@/actions/get-products";
// import ProductCard from "../Product/product-card";
// import { useEffect, useState } from "react";

// interface ProductGridProps {
//   children?: React.ReactNode;
// }

// const ProductGrid: React.FC<ProductGridProps> = ({ children }) => {
//   const [products, setProducts] = useState<Product[]>([]); // State for products
//   const [isLoadingProducts, setIsLoadingProducts] = useState(false); // State for loading indicator

//   // Fetch the data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoadingProducts(true);
//         const fetchedProducts = await getProducts({
//           storeIdFromOnlineStore: `${process.env.NEXT_PUBLIC_STORE_ID}`,
//           all: true,
//           isOnline: true,
//         });
//         setProducts(fetchedProducts);
//         setIsLoadingProducts(false);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//         setIsLoadingProducts(false);
//       }
//     };

//     if (process.env.NEXT_PUBLIC_STORE_ID) {
//       fetchData();
//     }
//   }, []);

//   return (
//     <div className="col-span-6 flex flex-col justify-center items-center w-full h-full">
//       <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-center justify-center">
//         {isLoadingProducts ? (
//           <p>Loading...</p>
//         ) : (
//           products.map((item: any) => <ProductCard key={item.id} item={item} />)
//         )}
//         {children}
//       </div>
//       <div className="fixed bottom-0 p-9 mb-4 w-1/3 z-50">
//         {/* <FullscreenProductFiltersFooter productData={products} /> */}
//       </div>
//     </div>
//   );
// };

// export default ProductGrid;
