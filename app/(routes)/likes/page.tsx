import SuggestedContainer from "@/components/Suggested/SuggestedContainer";
import LikesPage from "./components/likes-page";
import getProducts from "@/actions/get-products";

interface TopLikesPageProps {
  params: {
    storeId: string;
  };
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
  const products =
    (await getProducts({
      all: true, isArchived: false, isOnline: true,
      ...searchParams,
    })) || [];

  const topLikedProducts = products
    .sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0))
    .slice(0, 10);

  return (
    <div className="flex flex-col bg-white w-full justify-center items-center">
      <div className="flex w-full justify-center items-center">
        <LikesPage products={products} />
      </div>
      <SuggestedContainer
        route={`/trending`}
        title="MOST POPULAR PRODUCTS"
        data={topLikedProducts}
      />
    </div>
  );
};

export default CartPageServer;
