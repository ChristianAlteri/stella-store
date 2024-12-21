import SuggestedContainer from "@/components/Suggested/SuggestedContainer";
import CartPage from "./components/cart-page";
import { Product } from "@/types";

interface CartPageServerProps {
  params: {
    storeId: string;
  };
}

const CartPageServer: React.FC<CartPageServerProps> = async ({ params }) => {
  return (
    <div className="flex flex-col bg-white">
      <div className="flex justify-center">
        <CartPage />
      </div>
      <SuggestedContainer
        route={`/sale`}
        title="SHOP OUR SALE"
        isFeatured={undefined}
        isOnSale={true}
      />
    </div>
  );
};

export default CartPageServer;
