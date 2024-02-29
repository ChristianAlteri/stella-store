

import getProducts from '@/actions/get-products';
import SuggestedContainer from '@/components/ui/SuggestedContainer';
import LikesPage from './components/likes-page';

export const revalidate = 0;

const LikesPageServer = async () => {
  const products = await getProducts({all: true});

  return (

      <div className="flex flex-col bg-white ">
        <div className="flex justify-center ">
          <LikesPage />
        </div>
          <SuggestedContainer route="recommended" title="NEW ARRIVALS" data={products}/>
      </div>

  )
};

export default LikesPageServer;