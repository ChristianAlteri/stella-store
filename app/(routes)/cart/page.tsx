import SuggestedContainer from '@/components/Suggested/SuggestedContainer';
import getProducts from '@/actions/get-products';
import CartPage from './components/cart-page';

const CartPageServer = async () => {
  const products = await getProducts({all: true});
  const onlySaleItems = products.filter(product => product.isOnSale);

  return (
      <div className="flex flex-col bg-white ">
        <div className="flex justify-center ">
          <CartPage 
          products={products}
          />
        </div>
          <SuggestedContainer route="/sale" title="SHOP OUR SALE" data={onlySaleItems}/>
      </div>
  )
};

export default CartPageServer;