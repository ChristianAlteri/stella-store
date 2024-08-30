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
  let orderId: string | undefined = searchParams.get("orderId")!;
  // let orderId = "12acb679-0b6b-4a07-be49-b06432e6a7cf";

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
      <div className="flex flex-col justify-center text-center items-center">
        <div>Loading ...</div>
      </div>
    );
  }

  return (
    <div className="">
        <div className="flex flex-col justify-center text-center items-center">

          <div className="flex-col gap-2 justify-center items-center p-4">
            <h1 className="flex text-start text-xl">
              Thank You for Your Purchase!
              {response && response.orderItemId && (
                <p className="underline">Your order ID is: {orderId}</p>
              )}
            </h1>
            <h1 className="text-start text-sm">
              An order confirmation has been sent to {response?.order?.email}
            </h1>
            <h1  className="text-start text-sm">
              Delivery to{" "}
              {response?.order?.address
                ? formatAddress(response.order.address)
                : ""}
            </h1>
            {/* <h1 className="text-start text-blue-gray-600 underline text-sm hover:underline hover:cursor-pointer">
              Keep track of your order
            </h1> */}
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
