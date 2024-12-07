"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import getOrderDetails from "@/actions/get-order-details";
import OrderSummary from "./order-summary";

const ThankYouOrderDetails: React.FC = () => {
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || undefined;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const order = await getOrderDetails({ orderId });
        console.log("Fetched Order:", order);
        setResponse(order);
      } catch (error) {
        console.error("Error fetching order details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const formatAddress = (addressString: string) => {
    if (!addressString) return "";
    const address = JSON.parse(addressString);
    return `${address.line1 || ""}${address.line2 ? ", " + address.line2 : ""}
${address.city || ""}, ${address.state || ""} ${address.postal_code || ""}
${address.country || ""}`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Skeleton className="w-[600px] h-[400px]" />
      </div>
    );
  }

  if (!response) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-gray-500">No order details available.</p>
      </div>
    );
  }

  const products =
    response?.orderItems?.map(
      (orderItem: { product: any }) => orderItem.product
    ) || [];
  console.log("products", products);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Thank You for Your Purchase!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-sm text-gray-600">
              Your order ID is: <span className="font-semibold">{orderId}</span>
            </p>
            <p className="text-center text-sm text-gray-600">
              An order confirmation has been sent to{" "}
              <span className="font-semibold">{response?.email}</span>
            </p>
            
            <div className="bg-gray-100 p-4 rounded-md">
              <h2 className="text-lg font-semibold mb-2">Delivery Address</h2>
              <p className="whitespace-pre-line text-sm">
                {response?.address
                  ? formatAddress(response.address)
                  : "Loading..."}
              </p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
              {products.length > 0 ? (
                <OrderSummary products={products} />
              ) : (
                <p className="text-sm text-gray-500">Loading...</p>
              )}
            </div>
          </div>
          <p className="text-super-small font-semibold text-muted-foreground">if any of this looks wrong please contact us</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYouOrderDetails;

// "use client";

// import getOrderDetails from "@/actions/get-order-details";
// import { useSearchParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import OrderSummary from "./order-summary";

// interface ThankYouOrderDetailsProps {}

// const ThankYouOrderDetails: React.FC<ThankYouOrderDetailsProps> = ({}) => {
//   const [response, setResponse] = useState<any>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const searchParams = useSearchParams();
//   // let orderId: string | undefined = searchParams.get("orderId")!;
//   let orderId = "42b94c34-3399-44d4-96e8-28c0a00d0c8a";

//   useEffect(() => {
//     fetchOrderDetails();
//   }, []);

//   const fetchOrderDetails = async () => {
//     try {
//       const order = await getOrderDetails({ orderId });
//       setResponse(order);
//     } catch (error) {
//       console.error("Error fetching order details:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formatAddress = (addressString: string) => {
//     const address = JSON.parse(addressString);
//     return `${address.line1 || ""}${address.line2 ? ", " + address.line2 : ""}
// ${address.city || ""}, ${address.state || ""} ${address.postal_code || ""}
// ${address.country || ""}`;
//   };

//   if (isLoading) {
//     return (
//       <div className="flex flex-col justify-center text-center items-center">
//         <div>Loading ...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="">
//       <div className="flex flex-col justify-center text-center items-center">
//         <div className="flex-col gap-2 justify-center items-center p-4">
//           <h1 className="flex text-start text-xl">
//             Thank You for Your Purchase!
//             {response && response.orderItemId && (
//               <p className="underline">Your order ID is: {orderId}</p>
//             )}
//           </h1>
//           <h1 className="text-start text-sm">
//             An order confirmation has been sent to {response?.order?.email}
//           </h1>
//           <h1 className="text-start text-sm">
//             Delivery to{" "}
//             {response?.order?.address
//               ? formatAddress(response.order.address)
//               : ""}
//           </h1>
//           {/* <h1 className="text-start text-blue-gray-600 underline text-sm hover:underline hover:cursor-pointer">
//               Keep track of your order
//             </h1> */}
//         </div>

//         <div className="flex flex-col gap-2 justify-center items-center p-4">
//           <h1>Order Summary</h1>
//           <OrderSummary products={response.products} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ThankYouOrderDetails;
