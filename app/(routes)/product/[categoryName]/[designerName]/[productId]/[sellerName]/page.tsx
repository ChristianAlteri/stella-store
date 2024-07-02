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
  // const mostViewedProducts = await getMostViewed({all: true});
  const featuredProducts = await getProducts({ isFeatured: true });

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
            <DetailsCard data={product} products={featuredProducts} />
          </div>
          <hr className="w-full" />
        </div>
      </div>

      {/* Suggestions */}
      
      {sortedProductsBasedOnSeller.length > 0 && ( //same seller large screen
        <SuggestedContainer
          route={`sellers/${product?.seller?.id}`}
          header={`MORE FROM THIS`}
          title={"DROBE"}
          data={sortedProductsBasedOnSeller}
        />
      )}
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
