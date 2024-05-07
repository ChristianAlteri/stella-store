"use client";

import { useEffect, useState } from 'react';

import Container from '@/components/ui/Container';
import useCart from '@/hooks/use-cart';

import LikeItem from './components/liked-item';
import useLike from '@/hooks/use-like';

export const revalidate = 0;

const LikesPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const likes = useLike();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">My Wishlist</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {likes.items.length === 0 && <p className="text-neutral-500">I wish for nothing.</p>}
              <ul>
                {likes.items.map((item) => (
                  <LikeItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
};

export default LikesPage;