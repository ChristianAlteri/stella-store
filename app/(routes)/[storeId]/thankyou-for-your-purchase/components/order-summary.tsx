"use client";

import { Product } from "@/types";
import OrderSummaryItem from "./order-summary-item";

interface OrderSummaryProps {
  products: Product[];
}


const OrderSummary: React.FC<OrderSummaryProps> = ({ products }) => {
  const totalPrice = products.reduce(
    (acc, item) => acc + (parseFloat(item.ourPrice) || 0),
    0
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {products.map((item) => (
          <OrderSummaryItem key={item.id} data={item} />
        ))}
      </div>
      <div className="flex justify-between items-center pt-4 border-t">
        <p className="text-lg font-semibold">Total</p>
        <div className="flex flex-col">
        <p className="text-lg font-semibold text-red-500">£{totalPrice.toFixed(2)}</p>
        <p className="text-super-small font-semibold text-muted-foreground">exclusive of shipping costs</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;



// "use client";

// import { Product } from "@/types";
// import OrderSummaryItem from "./order-summary-item";

// interface OrderSummaryProps {
//   products: Product[];
// }

// const OrderSummary: React.FC<OrderSummaryProps> = ({ products }) => {

// const totalPrice = products.reduce(
//   (acc, item) => acc + (parseFloat(item.ourPrice) || 0),
//   0
// );

//   return (
//     <div className="flex flex-row gap-2">
//       <div>
//         {products.map((item) => (
//           <OrderSummaryItem key={item.id} data={item} />
//         ))}
//       </div>
//       <div className="flex text-center justify-start text-md p-4 gap-2">
//         <p className="flex text-md">
//           Total{" "}
//         </p>
//         <p className="flex text-md text-red-500">{" "} ${totalPrice}</p>
//       </div>
//     </div>
//   );
// };

// export default OrderSummary;
