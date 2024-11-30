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
    <div className="flex flex-row gap-2">
      <div>
        {products.map((item) => (
          <OrderSummaryItem key={item.id} data={item} />
        ))}
      </div>
      <div className="flex text-center justify-start text-md p-4 gap-2">
        <p className="flex text-md">
          Total{" "}
        </p>
        <p className="flex text-md text-red-500">{" "} ${totalPrice}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
