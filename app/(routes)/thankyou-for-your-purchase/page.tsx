import getProducts from "@/actions/get-products";
import ThankYouOrderDetails from "./components/thankyou-order-details";
import SuggestedContainer from "@/components/Suggested/SuggestedContainer";

export const revalidate = 0;

interface ThankYouForYourPurchasePageProps {
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
    isFeatured: boolean | undefined;
    isOnSale: boolean | undefined;
    isCharity: boolean | undefined;
    isHidden: boolean | undefined;
    minPrice: number;
    maxPrice: number;
  };
}

const ThankYouForYourPurchasePage: React.FC<
  ThankYouForYourPurchasePageProps
> = async ({ searchParams }) => {
  const featuredProducts = await getProducts({
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
    isFeatured: true,
    designerId: searchParams.designerId,
    sellerId: searchParams.sellerId,
  });

  return (
    <>
      <div className="grid grid-rows-2 gap-4 h-full">
        <div className="flex overflow-auto w-full justify-center">
          <ThankYouOrderDetails />
        </div>
  
        <div className="flex w-full justify-center items-center">
          <SuggestedContainer
            data={featuredProducts}
            title="CONTINUE SHOPPING OUR STAFF PICKS"
            route="/staff-picks"
          />
        </div>
      </div>
    </>
  );
};

export default ThankYouForYourPurchasePage;
