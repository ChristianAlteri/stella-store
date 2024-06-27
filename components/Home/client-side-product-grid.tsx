"use client";

import { Product } from "@/types";
import ProductCard from "../Product/product-card";

export interface ClientSideProductGrid {
  productData: Product[];
}

const ClientSideProductGrid: React.FC<ClientSideProductGrid> = ({
  productData,
}) => {
  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-4 items-center text-center justify-center">

      <div className="flex flex-row h-full w-full">
        {productData.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ClientSideProductGrid;
