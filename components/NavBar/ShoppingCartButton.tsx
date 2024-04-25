"use client";

import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/button";
import { CiShoppingCart } from "react-icons/ci";
import useCart from "@/hooks/use-cart";


const ShoppingCartButton = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return ( 
    <div className="">
      <Button onClick={() => router.push('/cart')} className="flex flex-row items-center justify-center">
        <span className="p-1 text-super-small text-green-800">
          {cart.items.length}
        </span>
      <CiShoppingCart size={"27px"} className="flex flex-row justify-center absolute hover:cursor-pointer hover:text-stone-900 hover:underline"/>
      </Button>
    </div>
  );
}
 
export default ShoppingCartButton;