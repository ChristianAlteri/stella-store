import React from 'react';
import ProductCard from '@/components/ui/product-card'; 
import { Product } from '@/types';
import Link from 'next/link';

interface SuggestedContainerProps {
    data: Product[];
    title?: string;
    header?: string;
    route?: string;
}

const SuggestedContainer: React.FC<SuggestedContainerProps> = ({ data, title, header, route }) => {
  return (
    <div className="p-4">
      <h1 className="text-stone-900 flex flex-row gap-1 text-xs">{header?.toUpperCase()}
      <Link href={`/${route}/${title}`} className="flex hover:underline hover:cursor-pointer text-stone-900 flex-row justify-start items-start text-xs"> {title?.toUpperCase()} </Link>
      </h1>
      <div className="grid grid-cols-4 w-full items-center">
        {data.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SuggestedContainer;