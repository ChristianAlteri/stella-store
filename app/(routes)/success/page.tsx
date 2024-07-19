"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { TbFaceId, TbFaceIdError } from "react-icons/tb";
import React from "react";

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

interface SuccesPageProps {}

export const revalidate = 0;

const SuccesPage: React.FC<SuccesPageProps> = ({}) => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // useEffect(() => {
  //   if (session_id) {
  //     toastSuccess("Payment verified.");
  //     router.push("/");
  //     const verifyPayment = async () => {
  //       try {
  //         const response = await axios.post(
  //           `${process.env.NEXT_PUBLIC_API_URL}/verify-payment?session_id=${session_id}`
  //         );
  //         const data = response.data;
  //       } catch (err) {
  //         console.error("Error verifying payment:", err);
  //       }
  //     };
  //     verifyPayment();
  //     // Clear the cart
  //   } else {
  //     toastError(
  //       "Payment verification failed. Please check your internet connection and try again."
  //     );
  //     router.push("/");
  //   }
  //   // You can call your backend to verify the session_id and mark the order as paid.
  //   // axios
  //   //   .post(`/api/verify-payment?session_id=${session_id}`)
  //   //   .then((res) => res.data())
  //   //   .then((data) => {
  //   //     console.log("FRONT END /SUCCESS", data);
  //   //     if (data.success) {
  //   //       toastSuccess("Payment verified.");
  //   //       router.push("/");
  //   //     } else {
  //   //       alert(
  //   //         "Payment verification failed. Please check your internet connection and try again."
  //   //       );
  //   //     }
  //   //   })
  //   //   .catch((err) => {
  //   //     console.error("Error verifying payment:", err);
  //   //   });
  // }, [isMounted, session_id, router]);

  useEffect(() => {
    if (isMounted && session_id) {
      const verifyPayment = async () => {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/verify-payment?session_id=${session_id}`
          );
          const data = response.data;
          if (data.success) {
            toastSuccess("Payment verified.");
            // Clear the cart
          } else {
            toastError("Payment verification failed.");
            // Can we redirect to the cart page?
          }

          router.push("/");
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
      <div className="flex flex-row w-full bg-white justify-center items-center p-1">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-row w-full bg-white justify-center items-center p-1">
      hi
    </div>
  );
};

export default SuccesPage;
