import SuggestedContainer from "@/components/Suggested/SuggestedContainer";
import getProducts from "@/actions/get-products";
import CartPage from "./components/cart-page";

interface CartPageServerProps {
  params: {
    storeId: string;
  };
}

const CartPageServer: React.FC<CartPageServerProps> = async ({ params }) => {
  const products =
    (await getProducts({ all: true, isArchived: false, isOnline: true, storeIdFromOnlineStore: `${process.env.NEXT_PUBLIC_API_URL}` })) || [];
  const onlySaleItems = products.filter((product) => product.isOnSale).slice(0, 7);

  return (
    <div className="flex flex-col bg-white">
      <div className="flex justify-center">
        <CartPage products={products} />
      </div>
      <SuggestedContainer
        route={`${process.env.NEXT_PUBLIC_API_URL}/sale`}
        title="SHOP OUR SALE"
        data={onlySaleItems}
      />
    </div>
  );
};

export default CartPageServer;
