import SuggestedContainer from "@/components/ui/SuggestedContainer";
import Gallery from "@/components/Product/Gallery/single-product-gallery";
import DetailsCard from "@/components/Product/DetailsCard";
import BuyNowCard from "@/components/Product/BuyNowCard";

import getSingleProduct from "@/actions/get-single-product";
import getProducts from "@/actions/get-products";

import { sortByMostLiked, sortByMostViewed, sortPriceLowToHigh } from "@/utils/sortdata";

import MiniProductCard from "@/components/Product/mini-product-card";

interface IndividualProductPageProps {
  params: {
    categoryName: string;
    designerName: string;
    productId: string;
    sellerName: string;
  };
}

const IndividualProductPage: React.FC<IndividualProductPageProps> = async ({
  params,
}) => {
  const product = await getSingleProduct(params.productId);

  const suggestedProductsBasedOnSeller = await getProducts({
    sellerId: product?.seller?.id,
  });
  const suggestedProductsBasedOnCategory = await getProducts({
    categoryId: product?.category?.id,
  });
  const suggestedProductsBasedOnDesigner = await getProducts({
    designerId: product?.designer?.id,
  });

  //sorted data
  const sortedProductsBasedOnSeller = sortPriceLowToHigh(
    suggestedProductsBasedOnSeller
  );
  const sortedProductsBasedOnCategory = sortByMostViewed(
    suggestedProductsBasedOnCategory
  );
  const sortedProductsBasedOnDesigner = sortByMostLiked(
    suggestedProductsBasedOnDesigner
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-3 w-full bg-white p-6">

        {/* Left */}
        <div className="col-span-2 overflow-auto">
          <div
            className={`flex flex-col w-full h-full items-center text-center justify-center ${
              product.isHidden ? "blur-xl" : ""
            }`}
          >
            <Gallery images={product.images} />
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col">
          <div className="flex flex-col text-left justify-center items-start mt-1">
            <DetailsCard data={product} />
          </div>
          {/* <div className="flex flex-col text-right justify-center items-start">
            <BuyNowCard data={product} />
          </div> */}
        <hr className="w-full"/>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex justify-center p-2 gap-4">
        {/* {sortedProductsBasedOnSeller.length > 0 && (
          <SuggestedContainer
            route={`sellers/${product?.seller?.id}`}
            header="sortedProductsBasedOnSeller"
            title={product?.seller?.instagramHandle}
            data={sortedProductsBasedOnSeller}
          />
        )} */}
        <MiniProductCard
          miniProductRoute={`/${product?.seller?.id}`}
          miniProductTitle={`MORE FROM ${product?.seller?.instagramHandle.toUpperCase()}`}
          data={sortedProductsBasedOnSeller}
        />
      </div>
      {sortedProductsBasedOnCategory.length > 0 && ( //most clicked
        <SuggestedContainer
          route={`categories/${product?.category?.id}`}
          header="POPULAR IN"
          title={product?.category?.name} 
          data={sortedProductsBasedOnCategory}
        />
      )}
      {sortedProductsBasedOnDesigner.length > 0 && ( // most liked
        <SuggestedContainer
          route={`designers/${product?.seller?.id}`}
          header="SHOP"
          title={product?.designer?.name}
          data={sortedProductsBasedOnDesigner}
        />
      )}
    </>
  );
};

export default IndividualProductPage;
