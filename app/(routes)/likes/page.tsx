import SuggestedContainer from "@/components/Suggested/SuggestedContainer";
import LikesPage from "./components/likes-page";
import getTrending from "@/actions/get-trending";
import getProducts from "@/actions/get-products";

interface TopLikesPageProps {
  searchParams: {
    sizeId: string;
    colorId: string;
    conditionId: string;
    materialId: string;
    genderId: string;
    subcategoryId: string;
    categoryId: string;
    designerId: string;
    sellerId: string;
    sort: string;
    isFeatured: boolean;
    isOnSale: boolean;
    isCharity: boolean;
    isHidden: boolean;
    minPrice: number;
    maxPrice: number;
  };
}

const CartPageServer: React.FC<TopLikesPageProps> = async ({
  searchParams,
}) => {
  const topLikedProducts = await getTrending({
    categoryId: searchParams.categoryId,
    sort: searchParams.sort,
    sizeId: searchParams.sizeId,
    colorId: searchParams.colorId,
    conditionId: searchParams.conditionId,
    materialId: searchParams.materialId,
    genderId: searchParams.genderId,
    subcategoryId: searchParams.subcategoryId,
    isOnSale: searchParams.isOnSale,
    isCharity: searchParams.isCharity,
    isHidden: searchParams.isHidden,
    isFeatured: searchParams.isFeatured,
    designerId: searchParams.designerId,
    sellerId: searchParams.sellerId,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
  });
  const products = await getProducts({
    categoryId: searchParams.categoryId,
    sort: searchParams.sort,
    sizeId: searchParams.sizeId,
    colorId: searchParams.colorId,
    conditionId: searchParams.conditionId,
    materialId: searchParams.materialId,
    genderId: searchParams.genderId,
    subcategoryId: searchParams.subcategoryId,
    isOnSale: searchParams.isOnSale,
    isCharity: searchParams.isCharity,
    isHidden: searchParams.isHidden,
    isFeatured: searchParams.isFeatured,
    designerId: searchParams.designerId,
    sellerId: searchParams.sellerId,
    all: true,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
  });

  return (
    <div className="flex flex-col bg-white ">
      <div className="flex justify-center ">
        <LikesPage 
          products={products}
        />
      </div>
      <SuggestedContainer
        route="trending"
        title="MOST POPULAR PRODUCTS"
        data={topLikedProducts}
      />
    </div>
  );
};

export default CartPageServer;
