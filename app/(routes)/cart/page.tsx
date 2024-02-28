

import { useEffect, useState } from 'react';

import Container from '@/components/ui/Container';
import useCart from '@/hooks/use-cart';

import Summary from './components/summary'
import CartItem from './components/cart-item';
import SuggestedContainer from '@/components/ui/SuggestedContainer';
import getProducts from '@/actions/get-products';
import { Product } from '@/types';
import CartPage from './components/cart-page';



const CartPageServer = async () => {

  const products = await getProducts({all: true});

  return (
    <div className="flex flex-col w-full bg-white">
      <div className="flex flex-row w-full gap-3 bg-white justify-center">



        <CartPage />


      </div>
        <SuggestedContainer route="recommended" title="NEW ARRIVALS" data={products}/>
    </div>
  )
};

export default CartPageServer;