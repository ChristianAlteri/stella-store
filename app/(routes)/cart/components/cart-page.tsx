"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useCart from "@/hooks/use-cart";
import Summary from "./summary";
import CartItem from "./cart-item";
import toast from "react-hot-toast";
import { TbFaceId } from "react-icons/tb";

// Custom Toast Success
const toastSuccess = (message: string) => {
  toast.success(message, {
    style: {
      background: "white",
      color: "green",
    },
    icon: <TbFaceId size={30} />,
  });
};

interface CartPageProps {}

export const revalidate = 0;

const CartPage: React.FC<CartPageProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const session_id = searchParams.get('session_id');

  useEffect(() => {
    setIsMounted(true);
  }, []);



  if (!isMounted) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex flex-row md:w-1/2 w-full bg-white justify-center items-center p-1">
      <div className="w-2/3 p-4">
        <h1 className="text-sm font-bold text-black">Shopping Cart</h1>
        {cart.items.length === 0 && (
          <p className="text-neutral-500">No items added to cart.</p>
        )}
        <div>
          {cart.items.map((item) => (
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
