"use client";

import { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import Summary from "./summary";
import CartItem from "./cart-item";
import { Product } from "@/types";

interface CartPageProps {
  products: Product[];
}

export const revalidate = 0;

const CartPage: React.FC<CartPageProps> = ({products}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const cartProductsNotArchived = products.filter(
        (product) => !product.isArchived
      );
      const cartProductIds = cart.items.map((item) => item.id);
      const filteredCartProducts = cartProductsNotArchived.filter((product) =>
        cartProductIds.includes(product.id)
      );
      setCartProducts(filteredCartProducts);
    }
  }, [isMounted]);

  if (!isMounted) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex flex-row md:w-1/2 w-full bg-white justify-center items-center p-1">
      <div className="w-2/3 p-4">
        <h1 className="text-sm font-bold text-black">Shopping Cart</h1>
        {cartProducts.length === 0 && (
          <p className="text-neutral-500">No items added to cart.</p>
        )}
        <div>
          {cartProducts.map((item) => (
            <CartItem key={item.id} data={item} />
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center w-1/3">
        <Summary />
      </div>
    </div>
  );
};

export default CartPage;
