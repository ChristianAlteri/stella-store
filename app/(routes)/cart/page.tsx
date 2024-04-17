import SuggestedContainer from '@/components/Suggested/SuggestedContainer';
import getProducts from '@/actions/get-products';
import CartPage from './components/cart-page';



const CartPageServer = async () => {

  const products = await getProducts({all: true});

  return (

      <div className="flex flex-col bg-white ">
        <div className="flex justify-center ">
          <CartPage />
        </div>
          <SuggestedContainer route="recommended" title="NEW ARRIVALS" data={products}/>
      </div>

  )
};

export default CartPageServer;