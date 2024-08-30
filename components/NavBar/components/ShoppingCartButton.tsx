"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/button";
import { CiShoppingCart } from "react-icons/ci";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";

interface ShoppingCartButtonProps {
  size: string;
  products: Product[];
}

const ShoppingCartButton:React.FC<ShoppingCartButtonProps> = ({ size, products }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [cartProducts, setCartProducts] = useState<Product[]>([]);
  const router = useRouter();
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
  }, [isMounted, products]);

  if (!isMounted) {
    return null;
  }

  return ( 
    <div className="">
      <Button onClick={() => router.push('/cart')} className="flex flex-row items-center justify-center">
        <span className="p-1 text-super-small text-green-800">
          {cartProducts.length}
        </span>
      <CiShoppingCart size={size} className="flex flex-row justify-center absolute hover:cursor-pointer hover:text-stone-900 hover:underline"/>
      </Button>
    </div>
  );
}
 
export default ShoppingCartButton;