import SuggestedContainer from '@/components/Suggested/SuggestedContainer';
import LikesPage from './components/likes-page';
import getMostViewed from '@/actions/get-most-viewed';

const CartPageServer = async () => {
//   const products = await getProducts({all: true});
  const mostViewedProducts = await getMostViewed({all: true});

  return (
      <div className="flex flex-col bg-white ">
        <div className="flex justify-center ">
          <LikesPage />
        </div>
          <SuggestedContainer route="most-viewed" title="MOST POPULAR PRODUCTS" data={mostViewedProducts}/>
      </div>
  )
};

export default CartPageServer;