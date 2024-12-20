"use client";

import { Product } from "@/types";
import getProducts from "@/actions/get-products";
import ProductCard from "../Product/product-card";
import { useEffect, useState } from "react";

interface ProductGridProps {
  children?: React.ReactNode;
}

const ProductGrid: React.FC<ProductGridProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]); // State for products
  const [isLoadingProducts, setIsLoadingProducts] = useState(false); // State for loading indicator

  // Fetch the data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingProducts(true);
        const fetchedProducts = await getProducts({
          storeIdFromOnlineStore: `${process.env.NEXT_PUBLIC_STORE_ID}`,
          all: true,
          isOnline: true,
        });
        setProducts(fetchedProducts);
        setIsLoadingProducts(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setIsLoadingProducts(false);
      }
    };

    if (process.env.NEXT_PUBLIC_STORE_ID) {
      fetchData();
    }
  }, []);

  return (
    <div className="col-span-6 flex flex-col justify-center items-center w-full h-full">
      <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-center justify-center">
        {isLoadingProducts ? (
          <p>Loading...</p>
        ) : (
          products.map((item: any) => <ProductCard key={item.id} item={item} />)
        )}
        {children}
      </div>
      <div className="fixed bottom-0 p-9 mb-4 w-1/3 z-50">
        {/* <FullscreenProductFiltersFooter productData={products} /> */}
      </div>
    </div>
  );
};

export default ProductGrid;
