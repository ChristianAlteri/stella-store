"use client";

import { Product } from "@/types";
import CartItem from "../../cart/components/cart-item";
import OrderSummaryItem from "./order-summary-item";

interface OrderSummaryProps {
    products: Product[];
  }

const OrderSummary: React.FC<OrderSummaryProps> = ({products}) => {
  return (
    <div className="">

        <div>
          {products.map((item) => (
            <OrderSummaryItem key={item.id} data={item} />
          ))}
        </div>

      <div className="flex justify-center items-center w-1/3">
        {/* <Summary /> */}Do math
      </div>
      
    </div>
  );
};

export default OrderSummary;
