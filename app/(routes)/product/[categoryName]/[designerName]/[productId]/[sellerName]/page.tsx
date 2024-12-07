import SuggestedContainer from "@/components/Suggested/SuggestedContainer";
import Gallery from "@/components/Product/Gallery/single-product-gallery";
import DetailsCard from "@/components/Product/DetailsCard";

import getSingleProduct from "@/actions/get-single-product";
import getProducts from "@/actions/get-products";

import {
  sortByMostLiked,
  sortByMostViewed,
  sortPriceLowToHigh,
} from "@/utils/sortdata";

interface IndividualProductPageProps {
  params: {
    storeId: string;
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
    isOnline: true,
    isArchived: false,
  });
  const suggestedProductsBasedOnCategory = await getProducts({
    categoryId: product?.category?.id,
    isOnline: true,
    isArchived: false,
  });
  const suggestedProductsBasedOnDesigner = await getProducts({
    designerId: product?.designer?.id,
    isOnline: true,
    isArchived: false,
  });
  // const mostViewedProducts = await getMostViewed({all: true});
  const featuredProducts = await getProducts({ all: true, isArchived: false, isOnline: true, isFeatured: true });

  //sorted data
  const sortedProductsBasedOnSeller = sortPriceLowToHigh(
    suggestedProductsBasedOnSeller.slice(0, 7)
  );
  const sortedProductsBasedOnCategory = sortByMostViewed(
    suggestedProductsBasedOnCategory.slice(0, 7)
  );
  const sortedProductsBasedOnDesigner = sortByMostLiked(
    suggestedProductsBasedOnDesigner.slice(0, 7)
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-3 w-full bg-white p-6 items-center justify-center">
        {/* Left */}
        <div className="col-span-2 w-full items-center justify-center">
          <div
            className={`flex flex-col w-full h-full items-center text-center justify-center ${
              product.isHidden ? "blur-xl" : ""
            }`}
          >
            <Gallery images={product.images} />
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col h-full">
          <div className="flex flex-col text-left justify-center items-start">
            <DetailsCard data={product} products={featuredProducts} />
          </div>
          <hr className="w-full" />
        </div>
      </div>

      {/* Suggestions */}
      
      {sortedProductsBasedOnSeller.length > 0 && ( //same seller large screen
        <SuggestedContainer
          route={`/${process.env.NEXT_PUBLIC_STORE_ID}/sellers/${product?.seller?.id}`}
          header={`MORE FROM THIS`}
          title={"SELLER"}
          data={sortedProductsBasedOnSeller}
        />
      )}
      {sortedProductsBasedOnCategory.length > 0 && ( //most clicked
        <SuggestedContainer
          route={`/${process.env.NEXT_PUBLIC_STORE_ID}/categories/${product?.category?.id}`}
          header="POPULAR IN"
          title={product?.category?.name}
          data={sortedProductsBasedOnCategory}
        />
      )}
      {sortedProductsBasedOnDesigner.length > 0 && ( // most liked
        <SuggestedContainer
          route={`/${process.env.NEXT_PUBLIC_STORE_ID}/designers/${product?.designer?.id}`}
          header="SHOP"
          title={product?.designer?.name}
          data={sortedProductsBasedOnDesigner}
        />
      )}
    </>
  );
};

export default IndividualProductPage;
