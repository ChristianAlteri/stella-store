'use client'

import { Product } from "@/types";

interface ProductListProps {
  title: string;
  data: Product[]
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  data
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {data.length === 0 && 
        <div>
          No results found
        </div>
      }

      <div className="flex">
        {data.map((item) => (

        //   <ProductCard key={item.id} data={item} />DO
        <div  key={item.name}>{item.name}TODO:</div>
        ))}
      </div>
    </div>
   );
}
 
export default ProductList;