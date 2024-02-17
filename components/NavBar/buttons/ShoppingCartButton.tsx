"use client";

import { ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/components/ui/button";
import { CiShoppingCart } from "react-icons/ci";
// import useCart from "@/hooks/use-cart";

const ShoppingCartButton = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
//   const cart = useCart();

  if (!isMounted) {
    return null;
  }

  return ( 
    <div className="">
      <Button onClick={() => router.push('/cart')} className="flex ">
      <CiShoppingCart size={"20px"} className="hover:cursor-pointer hover:text-stone-900 hover:underline"/>
        <span className="p-1 text-xs text-green-800">
          {/* {cart.items.length} */}10
        </span>
      </Button>
    </div>
  );
}
 
export default ShoppingCartButton;