"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { TbFaceId, TbFaceIdError } from "react-icons/tb";
import React from "react";
import useCart from "@/hooks/use-cart";
import useLike from "@/hooks/use-like";

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

interface SuccessPageProps {}

export const revalidate = 0;

const SuccessPage: React.FC<SuccessPageProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const cart = useCart();
  const likes = useLike();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && session_id) {
      const verifyPayment = async () => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/verify-payment?session_id=${session_id}`
          );
          const data = response.data;
          // console.log("data.productIds", data.productIds);
          if (data.success) {
            toastSuccess("Payment verified.");
            cart.removeAll();
            if (data.productIds && Array.isArray(data.productIds)) {
              data.productIds.forEach((productId: string) => {
                likes.removeItem(productId);
              });
            }
          } else {
            toastError("Payment verification failed.");
          }
          // Sending orderId to thankyou-for-your-purchase page
          router.push(`/thankyou-for-your-purchase?orderId=${data.orderId}`);
        } catch (err) {
          toastError("Error verifying payment.");
          console.error("Error verifying payment:", err);
          router.push("/");
        }
      };
      verifyPayment();
    }
  }, [isMounted, session_id, router]);

  if (!isMounted) {
    return (
      <div className="flex flex-row w-full h-full bg-white justify-center items-center p-1">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-row w-full h-full bg-white justify-center items-center p-1">
      Processing payment...
    </div>
  );
};

export default SuccessPage;
