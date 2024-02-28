"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import { TbFaceId, TbFaceIdError } from "react-icons/tb";
import { Input } from "@/components/ui/input";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

// Custom Toast Error
const toastError = (message: string) => {
    toast.error(message, {
      style: {
        background: "white",
        color: "red",
      },
      icon: <TbFaceIdError size={30} />,
    });
  };
  // Custom Toast Success
  const toastSuccess = (message: string) => {
    toast.error(message, {
      style: {
        background: "white",
        color: "green",
      },
      icon: <TbFaceId size={30} />,
    });
  };

  useEffect(() => {
    if (searchParams.get('success')) {
        toastSuccess('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
        toastError('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.ourPrice)
  }, 0);

  const onCheckout = async () => {
    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        productIds: items.map((item) => item.id)
    });
    window.location = response.data.url;
  }

  return ( 
    <div className="h-full top-0 flex ">
    <div
      className="rounded-lg top-0 bg-white px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-xs text-stone-700">
        Enter your email or continue as a guest
      </h2>
      <Input placeholder="Email" className="mt-1" />
      <h2 className="mt-6 text-sm text-stone-900">
        Order summary
      </h2>
      <div className="mt-3 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-xs text-stone-900">Order total</div>
         <h1 className="text-xs text-stone-900"> £{totalPrice}</h1>
        </div>
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-xs text-stone-900">Shipping</div>
         <h1 className="text-xs text-stone-400">at checkout</h1>
        </div>
      </div>
      <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6 border text-xs rounded-md bg-black text-white p-1">
        Checkout
      </Button>
    </div>
    </div>
  );
}
 
export default Summary;