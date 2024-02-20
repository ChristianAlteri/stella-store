import React from 'react';
import ProductCard from '@/components/ui/product-card'; 
import { Product } from '@/types';

interface SuggestedContainerProps {
    data: Product[];
    title?: string;
}

const SuggestedContainer: React.FC<SuggestedContainerProps> = ({ data, title }) => {
  return (
    <div className="p-4">
      <h3 className="flex hover:underline hover:cursor-pointer text-stone-900 flex-row justify-start p-4 items-start text-xs">
        {title}
      </h3>
      <div className="grid grid-cols-4 w-full items-center">
        {data.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedContainer;