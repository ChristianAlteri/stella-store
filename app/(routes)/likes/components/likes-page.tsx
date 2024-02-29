"use client";

import { useEffect, useState } from 'react';

import Container from '@/components/ui/Container';
import useCart from '@/hooks/use-cart';

import Summary from './summary'
import LikeItem from './liked-item';
import useLike from '@/hooks/use-like';
import { Product } from '@/types';
import ProductCard from '@/components/ui/product-card';

export const revalidate = 0;

interface LikesPageProps {
  products?: Product[];

}

const LikesPage: React.FC<LikesPageProps> = ({
  products
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const likes = useLike();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-1/2 bg-white">
        <div className="flex flex-col justify-start w-full p-3">
          <h1 className="text-sm text-stone-900">My Wishlist</h1>
          <div className="p-4 w-full">
              {likes.items.length === 0 && <p className="text-neutral-500">I like nothing...yet</p>}
              <ul className="grid grid-cols-1 gap-4 w-full">
                {likes.items.map((item) => (
                  <LikeItem key={item.id} data={item} />
                ))}
              {/* {likes?.items.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))} */}
              </ul>
          </div>
        </div>

    </div>
  )
};

export default LikesPage;