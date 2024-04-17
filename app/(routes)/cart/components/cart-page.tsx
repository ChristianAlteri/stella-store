'use client'

import { useEffect, useState } from 'react';

import Container from '@/components/ui/Container';
import useCart from '@/hooks/use-cart';

import Summary from './summary'
import CartItem from './cart-item';
import SuggestedContainer from '@/components/Suggested/SuggestedContainer';
import getProducts from '@/actions/get-products';
import { Product } from '@/types';

interface CartPageProps {
  products?: Product[];

}

export const revalidate = 0;

const CartPage: React.FC<CartPageProps> = ({
  products
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-row w-1/2 bg-white justify-center items-center">
        <div className="w-2/3 p-4">
          <h1 className="text-sm font-bold text-black">Shopping Cart</h1>
              {cart.items.length === 0 && <p className="text-neutral-500">No items added to cart.</p>}
              <div>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
          </div>
        </div>
        <div className="flex justify-center items-center w-1/3">
            <Summary />
        </div>
        {/* <SuggestedContainer route="recommended" title="BASED ON YOUR RECENT ACTIVITY" data={products}/> */}
    </div>
  )
};

export default CartPage;