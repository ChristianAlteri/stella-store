"use client";

import getOrderDetails from "@/actions/get-order-details";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import OrderSummary from "./order-summary";

interface ThankYouOrderDetailsProps {}

const ThankYouOrderDetails: React.FC<ThankYouOrderDetailsProps> = ({}) => {
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  //   let orderId = searchParams.get("orderId");
  let orderId = "12acb679-0b6b-4a07-be49-b06432e6a7cf";

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const data = await getOrderDetails({ orderId });
      setResponse(data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (addressString: string) => {
    const address = JSON.parse(addressString);

    return `${address.line1 || ""}${address.line2 ? ", " + address.line2 : ""}
${address.city || ""}, ${address.state || ""} ${address.postal_code || ""}
${address.country || ""}`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-row justify-center text-center items-center shadow-md border rounded-md h-full w-2/3 gap-5">
        <div>Loading ...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center text-center items-center shadow-md border rounded-md h-full w-2/3 gap-5 p-4">
      {/* Adjusted overflow container */}
      <div
        className="overflow-auto flex flex-col justify-center text-center items-center"
        style={{ maxHeight: "calc(100vh - 64px)" }} 
      >
        <div className="flex flex-col gap-2 justify-center items-center p-4">
          <h1>Order Details</h1>
          <h1>
            Thank You for Your Purchase!
            {response && response.orderItemId && (
              <p className="underline">Your order ID is: {orderId}</p>
            )}
          </h1>
          <h1 className="text-blue-gray-600 underline">
            Keep track of your order
          </h1>
          <h1>
            An order confirmation has been sent to {response?.order?.email}
          </h1>
          <h1>
            Delivery to{" "}
            {response?.order?.address
              ? formatAddress(response.order.address)
              : ""}
          </h1>
        </div>

        <div className="flex flex-col gap-2 justify-center items-center p-4">
          <h1>Order Summary</h1>
          <OrderSummary products={response.products} />
        </div>
      </div>
    </div>
  );
};

export default ThankYouOrderDetails;
